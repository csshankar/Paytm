import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getSessionSafely } from "../../lib/session";
import { redirect } from "next/navigation";
import type { OnRampStatus, OnRampTransaction } from "@prisma/client";

async function getBalance() {
    const session = await getSessionSafely();
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getSessionSafely();
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            startTime: 'desc'
        },
        take: 10
    });
    return txns.map((t: OnRampTransaction) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransferPage() {
    const session = await getSessionSafely();
    if (!session?.user) {
        redirect('/api/auth/signin');
    }
    
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="w-full min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight">Transfer & Top-up</h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                        Add funds to your secure wallet or manage your balances with ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Add Money */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
                            <div className="bg-[#6a51a6] p-4 text-white text-center font-bold text-sm uppercase tracking-widest">
                                Quick Wallet Top-up
                            </div>
                            <div className="p-2">
                                <AddMoney />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Balance & Transactions */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <BalanceCard amount={balance.amount} locked={balance.locked} />
                        </div>
                        
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
                            <OnRampTransactions transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}