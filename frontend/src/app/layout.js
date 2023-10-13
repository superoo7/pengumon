"use client";

import "./globals.css";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectWallet } from "@/components/ConnectWallet";

export default function RootLayout({ children }) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [publicProvider()]
  );

  const config = createConfig({
    publicClient,
    webSocketPublicClient,
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
  });
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          <>
            <ConnectWallet />
            {children}
          </>
        </WagmiConfig>
      </body>
    </html>
  );
}
