import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

export const TransactionHistory = () => {
  const transactions = [
    {
      address: "0x1234...5678",
      amount: "20",
      timestamp: "2 mins ago",
      status: "completed",
    },
    {
      address: "0x8765...4321",
      amount: "10",
      timestamp: "5 mins ago",
      status: "completed",
    },
  ];

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/30 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-faucet-primary" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-white/50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{tx.address}</span>
                <span className="text-xs text-gray-500">{tx.timestamp}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{tx.amount} Tokens</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};