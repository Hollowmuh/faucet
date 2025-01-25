import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef } from "react";
import { useAccount } from "wagmi";
import { FaucetHook } from "./smart-contract"; // Import the hook

// Token constants remain the same
export const TOKEN_ADDRESSES = {
  NGNA: "0x5652DBd5c763Fe2135618cB83Ceb26Cb66Fb0dD6",
  USDT: "0xfD4Ef88580EA4379090dA6C31585944567da5688",
  DAI: "0x5c22ea5efC8a9BA988709aC3bb4D7f3B1c2913c5"
} as const;

type TokenKey = keyof typeof TOKEN_ADDRESSES;

export const RequestForm = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const { requestTokens } = FaucetHook();
  
  const [address, setAddress] = useState(connectedAddress || '');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState<TokenKey | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async () => {
    // Validate inputs
    if (!token || !amount) {
      return;
    }

    // Get reCAPTCHA token
    const captchaToken = captchaRef.current?.getValue() || null;

    setIsLoading(true);
    try {
      const success = await requestTokens(
        token, 
        parseInt(amount.replace(/,/g, '')), 
        captchaToken
      );

      if (success) {
        // Reset form on success
        setAmount('');
        setToken('');
        captchaRef.current?.reset();
      }
    } catch (error) {
      console.error('Token request failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Wallet Address</label>
        <Input
          placeholder="0x..."
          className="bg-white/50"
          value={isConnected ? connectedAddress || '' : address}
          onChange={(e) => setAddress(e.target.value)}
          readOnly={isConnected}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <Select value={amount} onValueChange={setAmount}>
          <SelectTrigger className="bg-white/50">
            <SelectValue placeholder="Select amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1,000">1,000 Tokens</SelectItem>
            <SelectItem value="10,000">10,000 Tokens</SelectItem>
            <SelectItem value="100,000">100,000 Tokens</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Token</label>
        <Select value={token} onValueChange={(value: TokenKey) => setToken(value)}>
          <SelectTrigger className="bg-white/50">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TOKEN_ADDRESSES).map((tokenKey) => (
              <SelectItem key={tokenKey} value={tokenKey as TokenKey}>
                {tokenKey}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "your-recaptcha-site-key"}
        />
      </div>
      <Button
        className="w-full bg-gradient-to-r from-faucet-primary to-faucet-secondary hover:opacity-90"
        onClick={handleSubmit}
        disabled={!token || !amount || isLoading}
      >
        {isLoading ? "Sending..." : "Request Tokens"}
      </Button>
    </div>
  );
};