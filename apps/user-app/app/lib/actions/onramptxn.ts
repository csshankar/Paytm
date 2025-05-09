"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransactions(amount:number,provider:string,){
const session = await getServerSession(authOptions);
const token = Math.random().toString();

    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "user not logged in"
        }
    }

    return prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    });
}