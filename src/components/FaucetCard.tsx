import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { requestTokens } from "@/services/api";
import { RequestForm } from "./RequestForm";

/**
 * FaucetCard Component
 * 
 * This component handles the token distribution interface for the faucet.
 * It integrates with a smart contract (to be implemented) for token distribution.
 * 
 * Smart Contract Integration TODO:
 * 1. Implement ERC20 token contract with minting capabilities
 * 2. Add distributeTokens function with access control
 * 3. Implement rate limiting on-chain
 * 4. Add emergency pause functionality
 * 5. Setup events for monitoring and tracking
 */
export const FaucetCard = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Validate Ethereum address format
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

      // Call API service
      await requestTokens({
        address,
        amount,
        captchaToken,
      });
      
      toast.success("Tokens sent successfully!");
      
      // Reset form
      setAddress("");
      setAmount("");
      setCaptchaToken(null);
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to send tokens. Please try again.");
      }
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
      <CardContent>
        <RequestForm 
          address={address}
          amount={amount}
          isLoading={isLoading}
          onAddressChange={setAddress}
          onAmountChange={setAmount}
          onCaptchaChange={setCaptchaToken}
          onSubmit={handleSubmit}
          disabled={!captchaToken}
        />
      </CardContent>
    </Card>
  );
};