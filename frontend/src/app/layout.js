"use client";

import "./globals.css";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectWallet } from "@/components/ConnectWallet";
import { goerli } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function RootLayout({ children }) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [goerli],
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
        <QueryClientProvider client={client}>
          <WagmiConfig config={config}>
            <>
              <ConnectWallet />
              {children}
            </>
          </WagmiConfig>
        </QueryClientProvider>
      </body>
    </html>
  );
}
