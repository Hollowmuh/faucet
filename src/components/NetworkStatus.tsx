import { Card, CardContent } from "@/components/ui/card";
import { Network } from "lucide-react";

export const NetworkStatus = () => {
  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/30 border-2">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-faucet-primary" />
          <span className="font-medium">Network Status</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm">Ethereum Testnet</span>
        </div>
      </CardContent>
    </Card>
  );
};