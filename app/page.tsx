'use client'

// import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  // const { wallet, address, connected, select, connect, disconnect, signMessage, signTransaction } = useWallet();
  return (
   <div>
    {/* { address ? <p>Address: {address}</p> : <p><button></button></p> }  */}
    <button onClick={()=>{
      signIn();
    }}>
      signin
    </button>
    {JSON.stringify(session)}
   </div>
  );
}
