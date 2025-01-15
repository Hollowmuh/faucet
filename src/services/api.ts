import { toast } from "sonner";

interface TokenRequest {
  address: string;
  amount: string;
  captchaToken: string;
}

// Rate limiting implementation using a Map to store timestamps
const requestTimestamps = new Map<string, number>();
const RATE_LIMIT_DURATION = 1000 * 60 * 60; // 1 hour

const checkRateLimit = (address: string): boolean => {
  const lastRequest = requestTimestamps.get(address);
  const now = Date.now();
  
  if (lastRequest && now - lastRequest < RATE_LIMIT_DURATION) {
    const remainingTime = Math.ceil((RATE_LIMIT_DURATION - (now - lastRequest)) / (1000 * 60));
    toast.error(`Please wait ${remainingTime} minutes before requesting again`);
    return false;
  }
  
  requestTimestamps.set(address, now);
  return true;
};

export const requestTokens = async ({ address, amount, captchaToken }: TokenRequest) => {
  try {
    // Check rate limit
    if (!checkRateLimit(address)) {
      throw new Error("Rate limit exceeded");
    }

    // Validate captcha token
    if (!captchaToken) {
      throw new Error("Invalid CAPTCHA");
    }

    // Mock API endpoint call
    const response = await fetch("/api/request-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        amount,
        captchaToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to request tokens");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getFaucetStatus = async () => {
  try {
    const response = await fetch("/api/faucet-status");
    if (!response.ok) {
      throw new Error("Failed to fetch faucet status");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch faucet status:", error);
    throw error;
  }
};