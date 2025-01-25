import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";
import { WalletConnect } from "./WalletConnect";

export const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-faucet-primary to-faucet-secondary bg-clip-text text-transparent">
            Token Faucet
          </span>
        </div>
        <WalletConnect/>
      </div>
    </header>
  );
};