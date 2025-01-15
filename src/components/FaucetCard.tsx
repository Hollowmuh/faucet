import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { toast } from "sonner";

export const FaucetCard = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const validateAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Input validation
      if (!address) {
        toast.error("Please enter a wallet address");
        return;
      }
      
      if (!validateAddress(address)) {
        toast.error("Please enter a valid Ethereum address");
        return;
      }

      if (!amount) {
        toast.error("Please select an amount");
        return;
      }

      if (!captchaToken) {
        toast.error("Please complete the CAPTCHA");
        return;
      }

      // Log request attempt for monitoring
      console.log("Token request attempt:", {
        address,
        amount,
        timestamp: new Date().toISOString(),
      });

      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Tokens sent successfully!");
      
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("Failed to send tokens. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          <Input 
            placeholder="0x..." 
            className="bg-white/50"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Select value={amount} onValueChange={setAmount}>
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
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "your-recaptcha-site-key"}
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-faucet-primary to-faucet-secondary hover:opacity-90"
          onClick={handleSubmit}
          disabled={isLoading || !captchaToken}
        >
          {isLoading ? "Sending..." : "Request Tokens"}
        </Button>
      </CardFooter>
    </Card>
  );
};