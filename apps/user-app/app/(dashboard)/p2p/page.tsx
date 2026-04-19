import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { getSessionSafely } from "../../lib/session";
import { redirect } from "next/navigation";

async function getp2pTransactions(searchQuery?: string) {
    const session = await getSessionSafely();
    const userId = Number(session?.user?.id);
    
    const whereClause: { fromUserId: number; toUserId?: number } = {
        fromUserId: userId
    };

    if (searchQuery) {
        const parsedId = Number.parseInt(searchQuery, 10);
        if (!Number.isNaN(parsedId) && parsedId > 0) {
            whereClause.toUserId = parsedId;
        }
    }

    const txns = await prisma.p2pTransfer.findMany({
        where: whereClause,
        orderBy: {
            timestamp: 'desc'
        },
        take: 10
    });
    return txns.map((t: any) => ({
        key: t.timestamp.getTime(),
        time: t.timestamp,
        amount: t.amount,
        to: t.toUserId,
        from: t.fromUserId
    }))
}

export default async function P2PPage(props: { searchParams: Promise<{ search?: string }> }) {
    const searchParams = await props.searchParams;
    const session = await getSessionSafely();
    if (!session?.user) {
        redirect('/api/auth/signin');
    }
    
    const transactions = await getp2pTransactions(searchParams.search);
    
    return (
        <div className="w-full min-h-screen bg-slate-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight">P2P Transfer</h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                        Send money instantly to anyone with a valid mobile number. Safe, secure, and lightning fast.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 transition-all hover:shadow-xl rounded-2xl"> 
                            <SendCard />
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                            <P2pTransactions transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}