import { redirect } from "next/navigation";
import { getSessionSafely } from "../../lib/session";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { AddMoney } from "../../../components/AddMoneyCard";
import { QuickActions } from "../../../components/QuickActions";
import type { OnRampTransaction } from "@prisma/client";

async function getBalance() {
    const session = await getSessionSafely();
    const userId = session?.user?.id;
    if (!userId) {
        return 0;
    }
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(userId)
        }
    });
    return balance?.amount || 0;
}

async function getRecentTransactions() {
    const session = await getSessionSafely();
    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }
    const transactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(userId)
        },
        orderBy: {
            startTime: 'desc'
        },
        take: 5
    });
    return transactions;
}

export default async function Dashboard() {
    const session = await getSessionSafely();
    if (!session?.user) {
        redirect('/api/auth/signin');
    }
    
    const balance = await getBalance();
    const transactions = await getRecentTransactions();

    return (
        <div className="w-full min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between py-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#6a51a6]">Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back, {session.user.name || "User"}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="flex items-center space-x-2 bg-white p-2 px-4 rounded-full shadow-sm border border-gray-100">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">System Online</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Balance & Quick Actions */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-gradient-to-br from-[#6a51a6] to-[#4b3b7a] rounded-3xl shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                </svg>
                            </div>
                            <div className="p-8 md:p-10 relative z-10">
                                <div className="text-purple-100 text-sm font-medium tracking-wide uppercase">Available Balance</div>
                                <div className="text-5xl md:text-6xl font-extrabold text-white mt-3 flex items-center">
                                    <span className="text-3xl md:text-4xl mr-2 font-normal opacity-80">₹</span>
                                    {(balance / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="mt-8 flex items-center space-x-4">
                                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-xs font-semibold">
                                        Active Wallet
                                    </div>
                                    <div className="text-purple-200 text-sm">
                                        Last updated just now
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="transition-all hover:shadow-md rounded-2xl">
                            <QuickActions />
                        </div>
                    </div>

                    {/* Right Column - Add Money & Transactions */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <AddMoney />
                        </div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <OnRampTransactions 
                                transactions={transactions.map((t: OnRampTransaction) => ({
                                    time: t.startTime,
                                    amount: t.amount,
                                    status: t.status,
                                    provider: t.provider
                                }))} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}