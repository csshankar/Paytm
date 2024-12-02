import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pTransactions";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { div } from "framer-motion/client";

async function getp2pTransactions(searchQuery?: string) {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id),
            OR: searchQuery ? [
                { toUserId: parseInt(searchQuery) || undefined }
            ] : undefined
        },
        orderBy: {
            timestamp: 'desc'
        },
        take: 5
    });
    return txns.map(t => ({
        key: t.timestamp,
        time: t.timestamp,
        amount: t.amount,
        to: t.toUserId,
        from: t.fromUserId
    }))
}

export default async function ({ searchParams }: { searchParams: { search?: string } }) {
    const transactions = await getp2pTransactions(searchParams.search);
    
    return <div className="w-screen ">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8  font-bold ">
                P2P Transfer
            </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4  ">
            <div className="transition-transform hover:scale-[1.02] duration-300"> 
                <SendCard />
            </div>
            <div className="transition-transform hover:scale-[1.02] duration-300">
                <P2pTransactions transactions={transactions} />
            </div>
        </div>

    </div>
}