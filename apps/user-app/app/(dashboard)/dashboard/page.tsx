import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Card } from "@repo/ui/card";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { AddMoney } from "../../../components/AddMoneyCard";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return balance?.amount || 0;
}

async function getRecentTransactions() {
    const session = await getServerSession(authOptions);
    return prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            startTime: 'desc'
        },
        take: 5
    });
}

export default async function Dashboard() {
    const balance = await getBalance();
    const transactions = await getRecentTransactions();

    return (
        <div className="w-full min-h-screen bg-gradient-to-b bg-slate-150">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold px-4 flex items-center">
                 Dashboard
            </div>
            
            <div className="px-4 mb-8">
                <div className="bg-gradient-to-r from-[#6a51a6] to-[#8b6fc9] rounded-xl shadow-lg">
                    <div className="p-8">
                        <div className="text-white text-sm opacity-90">Available Balance</div>
                        <div className="text-4xl font-bold text-white mt-2 flex items-center">
                            <span className="mr-2">₹</span>
                            {(balance / 100).toFixed(2)}
                        </div>
                        <div className="text-purple-200 text-sm mt-4">
                            Your wallet is ready for transactions
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-4">
                <div className="w-full transition-transform hover:scale-[1.02] duration-300">
                    <AddMoney />
                </div>
                <div className="w-full transition-transform hover:scale-[1.02] duration-300">
                    <OnRampTransactions 
                        transactions={transactions.map(t => ({
                            time: t.startTime,
                            amount: t.amount,
                            status: t.status,
                            provider: t.provider
                        }))} 
                    />
                </div>
            </div>
        </div>
    );
}