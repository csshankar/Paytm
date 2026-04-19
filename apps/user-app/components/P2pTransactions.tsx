import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        to: number,
        from: number
    }[]

}) => {
    if (!transactions.length) {
        return <Card title="Recent Transfers">
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 opacity-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <p className="text-sm font-medium">No transfers yet</p>
                <p className="text-xs">Your peer-to-peer history will appear here</p>
            </div>
        </Card>
    }
    return <Card title="Recent Transfers">
        <div className="pt-4 flex flex-col space-y-1">
            {transactions.map((t, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors duration-150 group">
                    <div className="flex items-center space-x-4">
                        <div className="bg-red-50 p-2 rounded-full text-red-500 group-hover:bg-red-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-800">
                                Sent to User {t.to}
                            </div>
                            <div className="text-gray-500 text-xs flex items-center mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                {t.time.toLocaleString('en-IN', { 
                                    day: '2-digit', 
                                    month: 'short', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="font-extrabold text-red-600 text-lg">
                            - ₹{(t.amount / 100).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] uppercase font-bold tracking-wider text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                            Success
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Card>
}