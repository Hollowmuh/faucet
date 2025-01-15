import { FaucetCard } from "@/components/FaucetCard";
import { Header } from "@/components/Header";
import { NetworkStatus } from "@/components/NetworkStatus";
import { TransactionHistory } from "@/components/TransactionHistory";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="container py-8 space-y-8">
        <NetworkStatus />
        <FaucetCard />
        <TransactionHistory />
      </main>
    </div>
  );
};

export default Index;