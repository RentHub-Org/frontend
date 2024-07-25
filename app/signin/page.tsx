'use client'    
// import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Signin() {
//   const { wallet, address, connected, select, connect, disconnect, signMessage, signTransaction } = useWallet();
    // const router = useRouter();
    const initSignin = async () => {
        // const signature: String = await signMessage(address+":loggin_in_to_session");
        if(window.tronLink === undefined){
            console.log("TronLink not found");
            return;
        }
        if(!window.tronLink.ready){
            window.tronLink.request({ method: 'tron_requestAccounts' });
            return;
        }
        const message = window.tronLink.tronWeb.defaultAddress?.base58 + ":logging_in_to_session";
        const signature = await window.tronLink.tronWeb.trx.signMessageV2(message);
        console.log("signature:",signature);
        const res = await signIn("tronAuth", { message, signature, redirect: false });
        console.log("signInres:",res);      
        
        if (res?.ok) {
          // router.push("/app");
        } else {
          console.error("Sign in failed");
        }
    }
    const [ address, setAddress ] = useState("");
    useEffect(()=>{
        if(window.tronLink === undefined){
            console.log("TronLink not found");
            return;
        }
        if(!window.tronLink.ready){
            window.tronLink.request({ method: 'tron_requestAccounts' });
            return;
        }
        setAddress(window.tronLink.tronWeb.defaultAddress?.base58 || "");
    },[]);    
    const session  = useSession();
  return (
    <div>
        {/* <ConnectComponent/>
        <Profile/>
        <Content/> */}
      { address } 
      <button onClick={initSignin}>
        signin
      </button>
      {JSON.stringify(session)}
    </div>
  );
}
// function ConnectComponent(){
//         const { connect, disconnect, select, connected } = useWallet();
//     return <div className="flex gap-3">
//       <button type="button" className="bg-yellow-900" onClick={() => select('TronLink Adapter' as any)}> Select TronLink</button>
//       <button type="button" className="bg-yellow-900" disabled={connected} onClick={connect}>Connect</button>
//       <button type="button" className="bg-yellow-900" disabled={!connected} onClick={disconnect}>Disconnect</button>
//     </div>;
// }
// function Profile() {
//     const { address, connected, wallet } = useWallet();
//     return (<div>
//         <p> <span>Connection Status:</span> {connected ? 'Connected' : 'Disconnected'}</p>
//         <p> <span>Your selected Wallet:</span> {wallet?.adapter.name} </p>
//         <p> <span>Your Address:</span> {address} </p>
//     </div>);
// }

// import { AdapterName } from '@tronweb3/tronwallet-abstract-adapter';

// function Content() {
//     const { connect, disconnect, select, connected } = useWallet();
//     return (
//         <div>
//             <button type="button" onClick={() => select('TronLink Adapter' as AdapterName)}>
//                 Select TronLink
//             </button>
//             <button type="button" disabled={connected} onClick={connect}>
//                 Connect
//             </button>
//             <button type="button" disabled={!connected} onClick={disconnect}>
//                 Disconnect
//             </button>
//         </div>
//     );
// }