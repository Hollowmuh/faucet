import { Button } from "@/components/ui/button";
import { WalletIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-faucet-primary to-faucet-secondary bg-clip-text text-transparent">
            Token Faucet
          </span>
        </div>
        <Button variant="outline" className="gap-2">
          <WalletIcon className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};