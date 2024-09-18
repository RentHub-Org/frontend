'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, CheckCircle2, Link2 } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { init } from 'next/dist/compiled/webpack/webpack'
import { signIn, useSession } from 'next-auth/react'
import { AdapterName } from '@tronweb3/tronwallet-abstract-adapter'

export default function Component() {
  const { connect, disconnect, select, connected } = useWallet();
  const session = useSession();
  console.log("session",session);
  const [currentStep, setCurrentStep] = useState(1)
  const [walletInstalled, setWalletInstalled] = useState(false)
  const [walletConnected, setWalletConnected] = useState(connected)
  const [signedIn, setSignedIn] = useState(false)
  useEffect(()=>{
    if(session.status == "authenticated"){
      setSignedIn(true);
      setCurrentStep(4);
    }
    if(window.tronLink === undefined){
      return;
    }
    if(!window.tronLink.ready){
      window.tronLink.request({ method: 'tron_requestAccounts' });
      if(window.tronLink.tronWeb.defaultAddress){
        setWalletConnected(true);
        setWalletInstalled(true);
        setCurrentStep(2);
      }
    }

  },[window?.tronLink,session]);

  console.log("");
  const steps = [
    { title: "Install Wallet", icon: Wallet },
    { title: "Connect Wallet", icon: Link2 },
    { title: "Sign Message", icon: CheckCircle2 },
  ]
  const check = ()=>{
    if(window.tronLink === undefined){
      return;
    }
    else {
      setWalletInstalled(true);
      setCurrentStep(2);
    }
    if(window.tronLink.ready){
      window.tronLink.request({ method: 'tron_requestAccounts' });
      setWalletInstalled(true);
      setCurrentStep(2);
      if(window.tronLink.tronWeb?.defaultAddress){
        setWalletConnected(true);
        setCurrentStep(3);
      }
    }
  }
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
      setSignedIn(true);
      setCurrentStep(4);
    } else {
      console.error("Sign in failed");
    }
  }
  const handleInstallWallet = () => {
    window.open("https://chromewebstore.google.com/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec?hl=en","_blank");
    if(window.tronLink === undefined)return;
    window?.tronLink.request({ method: 'tron_requestAccounts' });
    check();
  }

  const handleConnectWallet = async () => {
    if(window.tronLink === undefined)return;
    await window.tronLink.request({ method: 'tron_requestAccounts' });
    if(window.tronLink.tronWeb.defaultAddress){
      setWalletConnected(true);
      setCurrentStep(3);
    }
    check();
  }

  const handleSignTransaction = () => {
    initSignin();
    check();
  }

  return (
    <>
    <div className="relative h-screen flex items-center justify-center gap-5 p-6 overflow-hidden">
      <div className='flex flex-col items-center'>
        <div className="flex justify-center gap-3 items-center">
          <Image
            src="/flux.svg"
            alt="Hero image"
            width={90}
            height={90}
            className="rounded-lg shadow-lg border border-theme-2"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-center my-16">
            RentHub <span className="text-theme-3 text-lg">BTFS</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-full pt-4 flex flex-col items-center gap-4">
            <p className="text-xl md:text-left">
              Visit the docs to begin integrating RentHub BTFS into your application.
            </p>
            <Link href='https://docs.renthub.cloud'
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"        
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#DCE1DE_0%,#216869_50%,#DCE1DE_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Visit Documentation
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen  flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Image
                src="/tron.jpg"
                alt="Tron Wallet"
                width={40}
                height={40}
                className="rounded-lg shadow-lg border-2 border-theme-2"
              />
              Login with Tron Wallet
            </CardTitle>
            <CardDescription>Complete these steps to access the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`rounded-full p-2 ${
                    currentStep > index + 1 ? 'bg-green-500' : 
                    currentStep === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">{step.title}</p>
                    {currentStep === index + 1 && (
                      <p className="text-sm text-gray-500">In progress...</p>
                    )}
                    {currentStep > index + 1 && (
                      <p className="text-sm text-green-500">Completed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            {currentStep === 1 && (
              <Button onClick={handleInstallWallet} disabled={walletInstalled}>
                {walletInstalled ? 'Wallet Installed' : 'Install Wallet'}
              </Button>
            )}
            {currentStep === 2 && (
              <Button onClick={handleConnectWallet} disabled={walletConnected}>
                {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </Button>
            )}
            {currentStep === 3 && (
              <Button onClick={handleSignTransaction} disabled={signedIn}>
                {signedIn ? 'Signed In' : 'Sign Message'}
              </Button>
            )}
            {signedIn && (
              <p className="text-green-500 font-medium">Login Successful!</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
    <footer className="absolute bottom-4 right-5 text-center text-sm text-gray-500">
      © 2024 Our Platform. All rights reserved.
    </footer>
    </>
  );
};