import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReCAPTCHA from "react-google-recaptcha";

interface RequestFormProps {
  address: string;
  amount: string;
  isLoading: boolean;
  onAddressChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCaptchaChange: (token: string | null) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const RequestForm = ({
  address,
  amount,
  isLoading,
  onAddressChange,
  onAmountChange,
  onCaptchaChange,
  onSubmit,
  disabled
}: RequestFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Wallet Address</label>
        <Input 
          placeholder="0x..." 
          className="bg-white/50"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <Select value={amount} onValueChange={onAmountChange}>
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
          onChange={onCaptchaChange}
        />
      </div>
      <Button 
        className="w-full bg-gradient-to-r from-faucet-primary to-faucet-secondary hover:opacity-90"
        onClick={onSubmit}
        disabled={disabled || isLoading}
      >
        {isLoading ? "Sending..." : "Request Tokens"}
      </Button>
    </div>
  );
};