"use server"
import { getSessionSafely } from "../session";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const phoneSchema = z.string().min(10).max(15).regex(/^\d+$/, "Phone must contain only digits");
const amountSchema = z.number().positive().max(10000000).int();

export async function p2pTransfer(to: string, amount: number) {
    const session = await getSessionSafely();
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }

    const phoneValidation = phoneSchema.safeParse(to);
    if (!phoneValidation.success) {
        return {
            message: "Error while sending"
        }
    }

    const amountValidation = amountSchema.safeParse(amount);
    if (!amountValidation.success) {
        return {
            message: "Error while sending"
        }
    }

    const validatedAmount = amountValidation.data;
    const validatedPhone = phoneValidation.data;

    const toUser = await prisma.user.findFirst({
        where: {
            number: validatedPhone
        }
    });

    if (!toUser) {
        return {
            message: "Error while sending"
        }
    }

    if (Number(from) === toUser.id) {
        return {
            message: "Error while sending"
        }
    }
    try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });
            if (!fromBalance || fromBalance.amount < validatedAmount) {
                throw new Error('Insufficient funds');
            }

            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: validatedAmount } },
            });

            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: validatedAmount } },
            });

            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount: validatedAmount,
                    timestamp: new Date()
                }
            })
        });
        return {
            message: "Transfer successful"
        }
    } catch (e) {
        return {
            message: "Error while sending"
        }
    }
}