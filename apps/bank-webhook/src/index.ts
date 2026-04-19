import express from "express";
import db from "@repo/db/client";
import { z } from 'zod';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const webhookSchema = z.object({
    token: z.string().min(1).max(255),
    user_identifier: z.string().regex(/^\d+$/),
    amount: z.string().regex(/^\d+$/).transform(val => {
        const num = Number(val);
        if (isNaN(num) || num <= 0 || num > 10000000) {
            throw new z.ZodError([{
                code: "custom",
                path: ["amount"],
                message: "Invalid amount"
            }]);
        }
        return num;
    }),
    signature: z.string()
});

function verifyWebhookSignature(payload: Record<string, unknown>, signature: string, secret: string): boolean {
    if (!secret) {
        console.warn('WEBHOOK_SECRET not configured, skipping signature verification');
        return false;
    }
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(payload))
        .digest('hex');
    
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}

app.post("/hdfcWebhook", async (req, res) => {
    try {
        const paymentInformation = webhookSchema.parse(req.body);
        
        const webhookSecret = process.env.WEBHOOK_SECRET;
        if (process.env.NODE_ENV === 'production') {
            if (!webhookSecret) {
                return res.status(500).json({
                    message: "Webhook configuration error"
                });
            }
            if (!paymentInformation.signature) {
                return res.status(401).json({
                    message: "Webhook signature is required"
                });
            }
            const isValidSignature = verifyWebhookSignature(
                req.body,
                paymentInformation.signature,
                webhookSecret
            );
            
            if (!isValidSignature) {
                return res.status(401).json({
                    message: "Invalid webhook signature"
                });
            }
        } else if (webhookSecret && paymentInformation.signature) {
            const isValidSignature = verifyWebhookSignature(
                req.body,
                paymentInformation.signature,
                webhookSecret
            );
            
            if (!isValidSignature) {
                return res.status(401).json({
                    message: "Invalid webhook signature"
                });
            }
        }
        
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
            db.balance.upsert({
                where: {
                    userId: Number(paymentInformation.user_identifier)
                },
                update: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                },
                create: {
                    userId: Number(paymentInformation.user_identifier),
                    amount: paymentInformation.amount,
                    locked: 0
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

app.post("/dodoWebhook", async (req, res) => {
    try {
        const paymentInformation = webhookSchema.parse(req.body);
        
        const webhookSecret = process.env.DODO_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;
        if (process.env.NODE_ENV === 'production') {
            if (!webhookSecret) {
                return res.status(500).json({
                    message: "Webhook configuration error"
                });
            }
            if (!paymentInformation.signature) {
                return res.status(401).json({
                    message: "Webhook signature is required"
                });
            }
            const isValidSignature = verifyWebhookSignature(
                req.body,
                paymentInformation.signature,
                webhookSecret
            );
            
            if (!isValidSignature) {
                return res.status(401).json({
                    message: "Invalid webhook signature"
                });
            }
        }
        
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
            db.balance.upsert({
                where: {
                    userId: Number(paymentInformation.user_identifier)
                },
                update: {
                    amount: {
                        increment: paymentInformation.amount
                    }
                },
                create: {
                    userId: Number(paymentInformation.user_identifier),
                    amount: paymentInformation.amount,
                    locked: 0
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