import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { P2pTransactions } from "../../../components/P2pTransactions";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getp2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        to: t.toUserId,
        from: t.fromUserId
    }))
}
export default async function () {
    const transactions = await getp2pTransactions();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8  font-bold ">
                P2P Transfer
            </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        
            <div>
                <SendCard />
            </div>
            <div >
                <P2pTransactions transactions={transactions} />
            </div>
        </div>

    </div>
}