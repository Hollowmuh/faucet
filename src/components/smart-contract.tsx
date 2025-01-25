import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";
import { useAccount } from 'wagmi';

// Token Faucet Contract Configuration
const CONTRACT_ADDRESS = import.meta.env.VITE_FAUCET_CONTRACT_ADDRESS;
const TOKEN_ADDRESSES = {
  NGNA: "0x5652DBd5c763Fe2135618cB83Ceb26Cb66Fb0dD6",
  USDT: "0xfD4Ef88580EA4379090dA6C31585944567da5688",
  DAI: "0x5c22ea5efC8a9BA988709aC3bb4D7f3B1c2913c5"
};

export function FaucetHook() {
  const { toast } = useToast();
  const { address: userAddress, isConnected } = useAccount();
  
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const forceInitializeContract = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Ethereum provider not found. Please install MetaMask.');
      }
      
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
      
      if (!isConnected) {
        throw new Error('Wallet not connected');
      }
      
      const signerInstance = await web3Provider.getSigner();
      setSigner(signerInstance);
      
      if (!CONTRACT_ADDRESS) {
        throw new Error('Faucet contract address missing');
      }
      
      // Import ABI dynamically or define here
      const contractABI = [
        "function requestTokens(address tokenAddress, uint256 amount, string memory captchaResponse)",
        "function addSupportedToken(address tokenAddress)",
        "function withdrawTokens(address tokenAddress, uint256 amount)"
      ];
      
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signerInstance
      );
      
      setContract(contractInstance);
      setIsInitializing(false);
      return contractInstance;
    } catch (error) {
      console.error('Error in force initialization:', error);
      toast({
        title: "Initialization Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await forceInitializeContract();
      } catch (error) {
        setIsInitializing(false);
      }
    };
    init();
  }, [isConnected]);

  const requestTokens = async (tokenKey, amount) => {
    if (!isConnected) {
      toast({
        title: "Error",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const contractInstance = await forceInitializeContract();
      
      // Convert token key to address
      const tokenAddress = TOKEN_ADDRESSES[tokenKey];
      if (!tokenAddress) {
        throw new Error('Invalid token selected');
      }

      // Call contract method to request tokens
      const tx = await contractInstance.requestTokens(
        tokenAddress, 
        amount
      );
      
      await tx.wait();

      toast({
        title: "Success",
        description: `${amount} ${tokenKey} tokens requested successfully!`,
        variant: "default",
      });

      return true;
    } catch (error) {
      console.error('Token request error:', error);
      toast({
        title: "Token Request Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    requestTokens,
    isConnected,
    userAddress,
    contract,
    isInitializing
  };
}