import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return (
        <Card title="Wallet Balance Details">
            <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 bg-green-50 rounded-lg text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Unlocked Funds</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-gray-900 text-sm">
                            ₹{(amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Locked Balance</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-gray-900 text-sm">
                            ₹{(locked / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-[#6a51a6] to-[#7c63b8] text-white shadow-md shadow-purple-100 flex justify-between items-center">
                    <div>
                        <div className="text-purple-100 text-[10px] font-bold uppercase tracking-widest opacity-85">Total Net Balance</div>
                        <div className="text-xl font-extrabold mt-0.5">
                            ₹{((locked + amount) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Card>
    );
}