import express from "express";
import db from "@repo/db/client";
import { z } from 'zod';

const app = express();
app.use(express.json());

// Zod schema for webhook payload validation
const webhookSchema = z.object({
    token: z.string(),
    user_identifier: z.string(),
    amount: z.string().transform(val => Number(val)),
    signature: z.string() // Add this if HDFC provides a signature
});

app.post("/hdfcWebhook", async (req, res) => {
    try {
        // Validate incoming webhook data
        const paymentInformation = webhookSchema.parse(req.body);
        
        // Verify the transaction exists and is in Processing state
        const transaction = await db.onRampTransaction.findFirst({
            where: {
                token: paymentInformation.token,
                status: "Processing"
            }
        });

        if (!transaction) {
            return res.status(400).json({
                message: "Invalid or already processed transaction"
            });
        }

        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.user_identifier)
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success"
                }
            })
        ]);

        res.json({ message: "Success" });
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({
                message: "Invalid webhook payload",
                errors: e.errors
            });
        }
        console.error(e);
        res.status(500).json({
            message: "Error while processing webhook"
        });
    }
});

app.listen(3003);