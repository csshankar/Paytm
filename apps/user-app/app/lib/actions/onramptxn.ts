"use server"

import { getSessionSafely } from "../session";
import prisma from "@repo/db/client";
import { randomUUID } from "crypto";
import { z } from "zod";

const SUPPORTED_PROVIDERS = ["HDFC Bank", "Axis Bank", "Dodo Payments"];

const amountSchema = z.number().positive().max(10000000).int();
const providerSchema = z.string().min(1).max(100).refine(
    (val) => SUPPORTED_PROVIDERS.some(p => val.includes(p) || p.includes(val)),
    { message: "Invalid provider" }
);

export async function createOnRampTransactions(amount: number, provider: string) {
    const session = await getSessionSafely();
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "Error creating transaction"
        }
    }

    const amountValidation = amountSchema.safeParse(amount);
    if (!amountValidation.success) {
        return {
            message: "Error creating transaction"
        }
    }

    const providerValidation = providerSchema.safeParse(provider);
    if (!providerValidation.success) {
        return {
            message: "Error creating transaction"
        }
    }

    // Dodo Payments Integration
    if (provider === "Dodo Payments") {
        const apiKey = process.env.DODO_PAYMENTS_API_KEY;
        const productId = process.env.DODO_PAYMENTS_PRODUCT_ID;

        if (!apiKey || !productId) {
            console.error("Dodo configuration missing");
            return { message: "Payment provider configuration error" };
        }

        try {
            const response = await fetch('https://test.dodopayments.com/checkouts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_cart: [{
                        product_id: productId,
                        quantity: Math.max(1, amount / 100) // Assuming amount is in paise, and product is 1 INR
                    }],
                    billing_address: {
                        country_code: 'IN',
                    },
                    customer: {
                        name: session.user.name || "User",
                        email: session.user.email || "user@example.com"
                    },
                    return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/dashboard`
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Dodo API Error:", response.status, errorData);
                return { message: "Payment provider error" };
            }

            const data = await response.json();
            const token = data.session_id || data.payment_link_id || randomUUID();

            await prisma.onRampTransaction.create({
                data: {
                    userId: Number(userId),
                    amount: amount,
                    status: "Processing",
                    startTime: new Date(),
                    provider: provider,
                    token: token
                }
            });

            return {
                message: "Transaction created",
                url: data.checkout_url || data.payment_link
            };

        } catch (e) {
            console.error("Dodo Integration Error:", e);
            return { message: "Error creating transaction" };
        }
    }

    const token = randomUUID();

    try {
        await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                status: "Processing",
                startTime: new Date(),
                provider: provider,
                token: token
            }
        });
        return {
            message: "Success"
        }
    } catch (e) {
        return {
            message: "Error creating transaction"
        }
    }
}