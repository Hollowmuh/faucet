import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'viem/chains';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit }  from "@reown/appkit/react";
import { type AppKitNetwork } from '@reown/appkit/networks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      retry: 1,
    },
  },
});
const projectId = '612505aa4c4b5494c81fcf295bc5b512';
const metadata = {
  name:'Aster Faucet',
  description: 'Aster ecosystem Faucet',
  url: 'localhost:8080',
  icons: ['https://assets.reown.com/reown-profile-pic.png']
};
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  {
    ...mainnet,
    name: 'Ethereum',
    network: 'mainnet',
  } as AppKitNetwork,
  {
    ...sepolia,
    name: 'Sepolia',
    network: 'sepolia',
  } as AppKitNetwork,
];
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  }
});

const App: React.FC = () => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
        </React.StrictMode>
      </WagmiProvider>
  );
};

export default App;