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
        take: 50
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
        <div className="w-full h-[calc(100vh-65px)] bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex flex-col h-full">
                {/* Fixed Header */}
                <div className="mb-6 shrink-0">
                    <h1 className="text-3xl font-extrabold text-[#6a51a6] tracking-tight">Transfer & Top-up</h1>
                    <p className="mt-1 text-sm text-gray-600 max-w-2xl">
                        Add funds to your secure wallet or manage your balances with ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow overflow-hidden min-h-0 pb-4">
                    {/* Left Column: Add Money (Fixed) */}
                    <div className="lg:col-span-5 h-fit">
                        <AddMoney />
                    </div>

                    {/* Right Column: Balance & Transactions (Only Transactions Scroll) */}
                    <div className="lg:col-span-7 flex flex-col h-full overflow-hidden space-y-6">
                        <div className="shrink-0">
                            <BalanceCard amount={balance.amount} locked={balance.locked} />
                        </div>
                        
                        <div className="flex-grow overflow-y-auto min-h-0 pr-1 pb-4">
                            <OnRampTransactions transactions={transactions} initialVisibleCount={5} showLoadMore={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}