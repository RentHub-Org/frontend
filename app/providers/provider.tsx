'use client'

import { SessionProvider } from "next-auth/react";
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletDisconnectedError, WalletError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { useCallback, useMemo } from "react";
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters';
import { ThemeProvider } from "./theme-provider";

export default function Provider({children}:{children: React.ReactNode}){
    const adapters = useMemo(() => [new TronLinkAdapter()],[]);
    function onError(e: WalletError) {
        if (e instanceof WalletNotFoundError) {
            console.error(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            console.error(e.message);
        } else console.error(e.message);
    }
    const onAccountsChanged = useCallback((curAddr: any, preAddr: any) => {
        console.log('new address is: ', curAddr, ' previous address is: ', preAddr);
    }, []);
    
    return (
        <WalletProvider onError={onError}  adapters={adapters} onAccountsChanged={onAccountsChanged}>
            <SessionProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </SessionProvider>
        </WalletProvider>
    )
}