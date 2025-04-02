'use client'
import React from "react";
import { useState } from "react";
import InfoModal from "./InfoModal";
import usePaymentSocket, { Payload } from "./socket";
import { useEffect } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import QRCode from "react-qr-code";
import { CheckCircle, Dot, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const options: any = {
  module_color: "#FFF",
  background_color: "#000",
};


export default function PaymentModal({address}: { address: string }) {

  const {  initiatePayment, 
    cancelPayment,
    setErrorCallback, 
    setSuccessCallback, 
    setTimeUpdateCallback,
    setCancelledCallback,
    setTokenCallback,
    setInit,
    startClock,
    refresh,
    clockInterval,
    token,
    init, 
    success, 
    connStatus,
    error,
    cancelled } = usePaymentSocket();

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [localToken, setLocalToken] = useState<string>("");
  const [localTimeInterval, setLocalTimeInterval] = useState<any>(null);
  const [ lastErrorMessage, setLastErrorMessage ] = useState<string>("");
  const [ successMEssage, setSuccessMEssage ] = useState<string>("");
  const [ windowState, setWindowState ] = useState(2);
  /*
    0-> initial request tioken state.
    1-> qr showinf state
    2-> success state view
    3-> error state view
    4-> cancelled state view
  */
  // const { signMessage, connected } = useWallet();

  // useEffect(()=>{
  //   const doit = ()=>{
  //     if(!connected){
  //       // connect();
  //     }
  //   }
  //   doit();
  // }, []);

  const errorCallBack = (message: string)=>{ 
    toast.error(message);
    setWindowState(3);
    switch(message){
      case "No active token found for this client.":
        setWindowState(3);
        setLastErrorMessage("No active token found for this client.");
         // we reset the intervel too...
        if(localTimeInterval){
          clearInterval(localTimeInterval);
        }
        clearInterval(clockInterval);

        refresh(); // this renewes the socket connection.
        break;
      case "No available tokens. Try again later.":
        setWindowState(3);
        setLastErrorMessage("No available tokens. Try again later.");
        if(localTimeInterval){
          clearInterval(localTimeInterval);
        }
        clearInterval(clockInterval);
        refresh(); // this renewes the socket connection.
        break;
      case "payment_timeout":
        setLastErrorMessage("Payment Timeout. Please try again.");
        if(localTimeInterval){
          clearInterval(localTimeInterval);
        }
        clearInterval(clockInterval);
        break;
      default:
        setLastErrorMessage(message);
    }
    // add more logic if needed...
  } 
  const successCallBack = (message: string)=>{
    toast.success(message);
    setSuccessMEssage(message);
    setWindowState(2);
    if(localTimeInterval){
      clearInterval(localTimeInterval);
    }
    clearInterval(clockInterval);

    // add more logic if needed...
  }
  const timeUpdateCallBack = (time: number)=>{
    setTimeLeft(time);
  }
  const cancelledCallBack = (message: string)=>{
    alert("cancelled with message: " + message);
    // add more logic if needed...
  }
  const tokenCallBack = (message: string)=>{
    // alert("token with message: " + message);
    setLocalToken(message);
    setWindowState(1);
    startClock();
    // add more logic if needed...
  }
  console.log("localtoken:", localToken);

  const onConnect = async ()=>{
     // get teh wallet connect system..
    // if(!connected){
    //   alert("Please connect to the server first");
    //   return;
    // }
    // initiate the payment process
    try{

      const payload: Payload = {
        address: address || "",
        message: "",
        signature: ""
      }
    // mesasge type: address:validTill 
    const message = address + ":" + (Date.now() + 1000 * 60 * 5).toString(); // valid for 5 minutes for testing....
    // const signature = await signMessage(message);
    const signature = await window.tronWeb?.trx.signMessageV2(message);
    payload.message = message;
    payload.signature = signature || "";
    console.log("payload ", payload);
    initiatePayment(JSON.stringify(payload));
     // setting the callbacks man......
    setErrorCallback(errorCallBack);
    setSuccessCallback(successCallBack);
    setCancelledCallback(cancelledCallBack);
    setTokenCallback(tokenCallBack);
    setTimeUpdateCallback(timeUpdateCallBack);
     // set up a interval to loop to zero for time..
    const localTimeInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);
    setLocalTimeInterval(localTimeInterval);
    
    setInit(true);
    }catch(err: any){
      toast.info(err);
    }
  }

  const [ visible, setvisible ] = useState(true); 
   
  return (
    <div className="flex justify-center my-2 w-full relative ">
      <div className="absolute right-[15px] top-[5px] z-20 flex items-center">
        Socket Status 
        <Dot className={cn(
          connStatus == 1 && "text-green-500",
          connStatus == 0 && "text-yellow-500",
          connStatus == 2 && "text-red-500",
          "w-10 h-10 animate-pulse"
          )}/>
      </div>
        { visible ? <InfoModal trigger={setvisible} /> : 
          <CardSpotlight className="w-full rounded-[20px]">
            { windowState == 0 &&               
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                <div className="absolute inset-0 backdrop-blur-md bg-black/30 rounded-[27px]"></div>
                <div className="relative z-10 text-center space-y-6">
                  <h2 className="text-2xl font-bold text-white">Request A token To Porceed</h2>
                  <p className="text-white/80 max-w-md mx-auto">
                    Token correspondes to a single payment issued to a single address.
                  </p>
                  <button
                    onClick={onConnect}
                    className="px-6 py-3 bg-theme-5 hover:bg-theme-3/90 text-white rounded-full 
                              font-medium transition-all transform hover:scale-105"
                  >
                    Request Token
                  </button>
                </div>
              </div>
            }
            { windowState == 1 && 
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                <div className="absolute inset-0   bg-black/30 rounded-[27px]"></div>
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-6 gap-8">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                  <h3 className="text-xl font-semibold mb-4">Scan QR Code to Pay</h3>
                  { token && <QR value={token} />}
                  <p className="mt-4 text-sm text-theme-1-600 text-center">
                    Scan this code with your payment app to complete the transaction
                  </p>
                </div>

                <div className="w-full md:w-1/2 flex items-center">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-l font-semibold mb-4 border-2 text-align-center rounded-[5px] bg-theme-1/10 p-2">Pay above 16 trx. the credits will be calculated accordingly.</h3>
                    <h3 className="text-xl font-semibold mb-4">Time Remaining</h3>
                    <Clock milliseconds={timeLeft} />
                    <p className="mt-4 text-sm text-gray-600 text-center">
                      Your payment session will expire when the timer reaches zero
                    </p>
                    <button
                    onClick={()=>{ 
                      cancelPayment();
                      if(localTimeInterval){
                        clearInterval(localTimeInterval);
                      }
                      clearInterval(clockInterval);
                      refresh();
                    }}
                    className="px-6 py-3 bg-theme-5 hover:bg-theme-3/90 text-black rounded-full 
                              font-medium transition-all transform hover:scale-105"
                    >
                   Cancel Transaction session
                    </button>
                  </div>
                </div>
              </div>
            </div>
            }
            { windowState == 2 &&
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle className="w-24 h-24 text-green-500" />
                  </div>
          
                  <h2 className="text-2xl font-bold">Payment Successful!</h2>
                  successMEssage
                  <p className="text-gray-600 max-w-md mx-auto">
                  {successMEssage}
                  </p>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your payment has been processed successfully. Thank you for your transaction.
                    The details will be visible in 'Payments'{"->"}'Show HIstory'
                  </p>
          
                  <div className="pt-4">
                   <button
                    onClick={()=>{setWindowState(0); refresh(); }}
                    className="px-6 py-3 bg-theme-5 hover:bg-theme-3/90 text-white rounded-full 
                              font-medium transition-all transform hover:scale-105"
                  >
                    New Payment.
                  </button>
                  </div>
                </div>
              </div>
            }
            { windowState == 3 &&
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <XCircle className="w-24 h-24 text-red-500" />
                  </div>
          
                  <h2 className="text-2xl font-bold text-red-700">Session expired, with reason....</h2>
          
                  <p className="text-gray-600 max-w-md mx-auto">{lastErrorMessage}</p>
          
                  <div className="pt-4">
                  <button
                    onClick={()=>{setWindowState(0); refresh(); }}
                    className="px-6 py-3 bg-theme-5 hover:bg-theme-3/90 text-white rounded-full 
                              font-medium transition-all transform hover:scale-105"
                  >
                    Retry with a new session
                  </button>
                  </div>
                </div>
              </div>
          }
          </CardSpotlight>
        }
    </div>
  );
    // here......




}

/*

"use client"

export default function ConnectOverlay({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 backdrop-blur-md bg-black/30 rounded-[27px]"></div>

      <div className="relative z-10 text-center space-y-6">
        <h2 className="text-2xl font-bold text-white">Connect to Server</h2>
        <p className="text-white/80 max-w-md mx-auto">
          Please connect to the server to continue with your payment process
        </p>

        <button
          onClick={onConnect}
          className="px-6 py-3 bg-theme-1 hover:bg-theme-1/90 text-white rounded-full 
                    font-medium transition-all transform hover:scale-105"
        >
          Connect
        </button>
      </div>
    </div>
  )
}


*/
function QR({ value }: { value: string }) {
  // This is a placeholder component
  // In a real implementation, you would use a QR code generation library

  return (
    <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
      <div className="text-center p-3 bg-white rounded-lg shadow-md">
        <QRCode value={value} />
      </div>
    </div>
  )
}

function Clock({ milliseconds }: { milliseconds: number }) {
  // Format seconds into MM:SS
  const formatTime = (totalmilliSeconds: number) => {
    const minutes = Math.floor(totalmilliSeconds / 60000)
    const seconds = Math.floor(totalmilliSeconds % 60000 /1000) 
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full border-4 border-theme-1 flex items-center justify-center">
        <span className="text-3xl font-bold">{formatTime(milliseconds)}</span>
      </div>
    </div>
  )
}

