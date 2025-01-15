import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets } from "lucide-react";

export const FaucetCard = () => {
  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/30 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-faucet-primary" />
          Request Tokens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Wallet Address</label>
          <Input placeholder="0x..." className="bg-white/50" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Select>
            <SelectTrigger className="bg-white/50">
              <SelectValue placeholder="Select amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Tokens</SelectItem>
              <SelectItem value="20">20 Tokens</SelectItem>
              <SelectItem value="50">50 Tokens</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-faucet-primary to-faucet-secondary hover:opacity-90">
          Request Tokens
        </Button>
      </CardFooter>
    </Card>
  );
};