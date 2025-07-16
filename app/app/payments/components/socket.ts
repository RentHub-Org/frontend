import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

export type Payload = { address: string; message: string; signature: string };

const usePaymentSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const [init, setInit] = useState(false);
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [error, setError] = useState({ status: false, message: "" });
  const [cancelled, setCancelled] = useState({ status: false, message: "" });
  const [token, setToken] = useState<string>();
  const [clockInterval, setClockInterval] = useState<any>(null);
  const [ connStatus, setConnStatus ] = useState<Number>(0);
  // 0 not connected yello
  // 1 connected green
  // 2 error red

  const successCallbackRef = useRef<(msg: string) => void>(() => {});
  const errorCallbackRef = useRef<(err: string) => void>(() => {});
  const cancelledCallbackRef = useRef<(msg: string) => void>(() => {});
  const tokenCallbackRef = useRef<(token: string) => void>(() => {});
  const timeUpdateCallbackRef = useRef<(time: number) => void>(() => {});

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_CORE_BASE_URL + "/payments");
    setSocket(newSocket);

    newSocket.on("connect", () => {
       // console.log("⚠️⚠️⚠️Connected to WebSocket⚠️⚠️⚠️");
      setConnStatus(1);
    });

    newSocket.on("disconnect", () => {
       // console.log("Disconnected from WebSocket");
      setConnStatus(0);
      setSocket(null);
    });

    newSocket.on("error", (message: any) => {
      setConnStatus(2);
      console.error("Socket Error:", message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const initiatePayment = (payload: string) => {
    if(init){
      toast.error("Already connected to the server. Please wait for the response.");
      return ;
    }
    if (socket) {
       // console.log("Payload: ", payload);
       // console.log("Sent the payload to the server...");
      setInit(true);
      
      
      socket.on("token", (message: string) => {
         // console.log("Got the token...", message);
        setToken(message);
        tokenCallbackRef.current(message);
      });

      socket.on("time", (remainingTime: string) => {
         // console.log("yo time:, ", remainingTime);
        timeUpdateCallbackRef.current(parseInt(remainingTime));
      });

      socket.on("error", (message: string) => {
        setError({ status: true, message });
        errorCallbackRef.current(message);
      });


      socket.on("success", (message: string) => {
        setSuccess({ status: true, message });
        successCallbackRef.current(message);
      });

      socket.on("end_payment", (message: string) => {
        setCancelled({ status: true, message });
        clearInterval(clockInterval);
        cancelledCallbackRef.current(message);
      });
      
      socket.on("canceled", (message: string) => {
        setCancelled({ status: true, message });
        clearInterval(clockInterval);
        cancelledCallbackRef.current(message);
      });

      // sendingf the init after every callback is set....
      socket.emit("initiate_payment", payload);
    
    }
  };

  const startClock = () => {
    const _interval = setInterval(() => {
      socket.emit("sink_clock");
    }, 5000);
    setClockInterval(_interval);
  }

  const cancelPayment = () => {
    if (socket) {
      socket.emit("cancel_payment");
      setInit(false);
    }
  };
   const refresh = ()=>{
    // this refreshed the client conn....
    const newSocket = io(process.env.NEXT_PUBLIC_CORE_BASE_URL + "/payments");
    setSocket(newSocket);
   }

  return {
    initiatePayment,
    cancelPayment,
    setSuccessCallback: (callback: (msg: string) => void) => (successCallbackRef.current = callback),
    setErrorCallback: (callback: (err: string) => void) => (errorCallbackRef.current = callback),
    setTimeUpdateCallback: (callback: (time: number) => void) => (timeUpdateCallbackRef.current = callback),
    setCancelledCallback: (callback: (msg: string) => void) => (cancelledCallbackRef.current = callback),
    setTokenCallback: (callback: (token: string) => void) => (tokenCallbackRef.current = callback),
    setInit,
    startClock,
    refresh,
    clockInterval,
    connStatus,
    token,
    init,
    success,
    error,
    cancelled,
  };
};

export default usePaymentSocket;
