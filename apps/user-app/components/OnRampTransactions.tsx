import { Card } from "@repo/ui/card"
import type { OnRampStatus } from "@prisma/client";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatus,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Wallet Top-up History">
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 opacity-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <p className="text-sm font-medium">No top-up activity</p>
                    <p className="text-xs mt-1">Add money to your wallet to get started</p>
                </div>
            </Card>
        );
    }
    
    const getStatusStyles = (status: OnRampStatus) => {
        switch(status) {
            case 'Success': 
                return {
                    bg: 'bg-green-50',
                    text: 'text-green-700',
                    dot: 'bg-green-500',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                };
            case 'Processing':
                return {
                    bg: 'bg-amber-50',
                    text: 'text-amber-700',
                    dot: 'bg-amber-500',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 animate-spin">
                            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.984a.75.75 0 00-.75.75v4.25a.75.75 0 001.5 0v-2.22l.51.51a7 7 0 0011.758-3.141.75.75 0 10-1.69-.795z" clipRule="evenodd" />
                          </svg>
                };
            default:
                return {
                    bg: 'bg-red-50',
                    text: 'text-red-700',
                    dot: 'bg-red-500',
                    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                          </svg>
                };
        }
    };

    return (
        <Card title="Wallet Top-up History">
            <div className="pt-4 flex flex-col space-y-1">
                {transactions.map((t, index) => {
                    const styles = getStatusStyles(t.status);
                    return (
                        <div key={index} className="flex justify-between items-center p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200 group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                                    {t.provider.substring(0, 4).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">
                                        Added via {t.provider}
                                    </div>
                                    <div className="text-gray-400 text-xs mt-0.5 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {t.time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="font-extrabold text-gray-900 text-lg">
                                    + ₹{(t.amount / 100).toLocaleString('en-IN')}
                                </div>
                                <div className={`mt-1 flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.bg} ${styles.text}`}>
                                    {styles.icon}
                                    {t.status}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}