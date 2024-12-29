import prisma from "@repo/db/client";
// import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
type OnRampStatus = 'Success' | 'Processing' | 'Failure';

interface  t {
    OnRampStatus: OnRampStatus;
    time: Date,
    amount: number,
    provider: string
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });


    return txns.map((t: {
        [x: string]: any; id: number; token: string; amount: number; provider: string; status: OnRampStatus; startTime: Date; userId: number; 
    }) => ({
        time: t.startTime,
        amount: t.amount,
        OnRampStatus: t.status,
        provider: t.provider
    }));
}

export default async function TransactionsPage() {
    const transactions = await getOnRampTransactions();
    
    return (
        <div className="w-full min-h-screen bg-gradient-to-br bg-slate-150">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section with Stats */}
                <div className="py-8 sm:py-12">
                    <h1 className="text-3xl sm:text-4xl text-[#6a51a6] font-bold mb-8">
                        Transactions History
                    </h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#ededed] p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="text-sm text-gray-600">Total Transactions</div>
                            <div className="text-2xl font-bold text-[#6a51a6]">{transactions.length}</div>
                        </div>
                        <div className="bg-[#ededed] p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="text-sm text-gray-600">Successful</div>
                            <div className="text-2xl font-bold text-green-600">
                                {transactions.filter((t: t) => t.OnRampStatus === 'Success').length}
                            </div>
                        </div>
                        <div className="bg-[#ededed] p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="text-sm text-gray-600">Processing</div>
                            <div className="text-2xl font-bold text-yellow-600">
                                {transactions.filter((t: t) => t.OnRampStatus === 'Processing').length}
                            </div>
                        </div>
                        <div className="bg-[#ededed] p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="text-sm text-gray-600">Total Amount</div>
                            <div className="text-2xl font-bold text-[#6a51a6]">
                                ₹ {(transactions.reduce((acc:any, t:t) => acc + t.amount, 0) / 100).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-[#ededed] rounded-2xl shadow-lg overflow-hidden mb-8 border border-purple-100">
                    {/* Table Header */}
                    <div className="hidden sm:flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-50 to-white">
                        <div className="text-sm font-semibold text-gray-600">Transaction Details</div>
                        <div className="text-sm font-semibold text-gray-600">Amount & Status</div>
                    </div>

                    {/* Transactions */}
                    <div className="divide-y divide-purple-50">
                        {transactions.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="text-4xl mb-4">💫</div>
                                <div className="text-gray-500">No transactions yet</div>
                                <div className="text-sm text-gray-400">Your transactions will appear here</div>
                            </div>
                        ) : (
                            transactions.map((t:t, idx:any) => (
                                <div 
                                    key={idx}
                                    className="group p-4 sm:p-6 hover:bg-purple-50 active:bg-purple-100 transition-all duration-200 cursor-pointer"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                        {/* Transaction Details */}
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-110 ${
                                                t.OnRampStatus === 'Success' ? 'bg-green-500 shadow-lg shadow-green-200' :
                                                t.OnRampStatus === 'Processing' ? 'bg-yellow-500 shadow-lg shadow-yellow-200' :
                                                'bg-red-500 shadow-lg shadow-red-200'
                                            }`} />
                                            <div>
                                                <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                                                    {t.provider}
                                                </div>
                                                <div className="text-sm text-gray-500 group-hover:text-gray-600">
                                                    {new Date(t.time).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Amount and Status */}
                                        <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                                            <span className="text-lg sm:text-base font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                                                ₹ {(t.amount / 100).toFixed(2)}
                                            </span>
                                            <span className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-all group-hover:shadow-md ${
                                                t.OnRampStatus === 'Success' ? 'bg-green-100 text-green-700 group-hover:bg-green-200' :
                                                t.OnRampStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200' :
                                                'bg-red-100 text-red-700 group-hover:bg-red-200'
                                            }`}>
                                                {t.OnRampStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}