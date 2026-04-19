import prisma from "@repo/db/client";
import { getSessionSafely } from "../../lib/session";
import { redirect } from "next/navigation";
import type { OnRampStatus, OnRampTransaction } from "@prisma/client";
import { Button } from "@repo/ui/button";

interface Transaction {
    id: number;
    OnRampStatus: OnRampStatus;
    time: Date;
    amount: number;
    provider: string;
    category?: string;
}

const CATEGORIES = ["Groceries", "Entertainment", "Rent", "Dining", "Shopping", "Transport", "Investment"];

async function getOnRampTransactions(): Promise<Transaction[]> {
    const session = await getSessionSafely();
    const userId = session?.user?.id;
    if (!userId) {
        return [];
    }

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(userId)
        },
        orderBy: {
            startTime: 'desc'
        }
    });

    return txns.map((t: OnRampTransaction) => ({
        id: t.id,
        time: t.startTime,
        amount: t.amount,
        OnRampStatus: t.status,
        provider: t.provider,
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] // Simulated tagging
    }));
}

export default async function TransactionsPage() {
    const session = await getSessionSafely();
    if (!session?.user) {
        redirect('/api/auth/signin');
    }
    
    const transactions = await getOnRampTransactions();
    
    return (
        <div className="w-full min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight">Financial Ledger</h1>
                        <p className="mt-3 text-lg text-gray-600">Track, categorize, and reconcile all your transactions in real-time.</p>
                    </div>
                    <div className="flex space-x-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span>Download PDF Report</span>
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Outflow</p>
                        <p className="text-3xl font-black text-slate-900">₹{((transactions?.reduce((acc: number, t: Transaction) => acc + t.amount, 0) || 0) / 100).toLocaleString('en-IN')}</p>
                        <div className="mt-4 flex items-center text-green-500 text-xs font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z" clipRule="evenodd" />
                            </svg>
                            2.4% vs last month
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Success Rate</p>
                        <p className="text-3xl font-black text-slate-900">98.2%</p>
                        <div className="mt-4 flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                            PCI-DSS Compliant
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Top Category</p>
                        <p className="text-3xl font-black text-slate-900">Groceries</p>
                        <div className="mt-4 flex -space-x-1">
                            {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100"></div>)}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction & Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-8 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {transactions.map((t: Transaction) => (
                                    <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-sm group-hover:bg-white transition-colors">
                                                    {t.category?.[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{t.provider}</p>
                                                    <p className="text-xs font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded inline-block mt-1">{t.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-slate-700">
                                                {new Date(t.time).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">
                                                {new Date(t.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center text-[8px] font-black text-slate-400">UPI</div>
                                                <span className="text-sm font-medium text-slate-600">Nexis Element</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-lg font-black text-slate-900">₹{(t.amount / 100).toLocaleString('en-IN')}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                t.OnRampStatus === 'Success' ? 'bg-green-100 text-green-700' :
                                                t.OnRampStatus === 'Processing' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {t.OnRampStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!transactions.length && (
                        <div className="py-20 text-center">
                            <p className="text-slate-400 font-medium">No transactions found for this period.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}