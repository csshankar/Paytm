"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidPhone = (phone: string) => {
        return /^\d{10,15}$/.test(phone);
    };

    const isValidAmount = (amt: string) => {
        const num = Number(amt);
        return !isNaN(num) && num > 0 && num <= 100000;
    };

    const handleSend = async () => {
        if (!isValidPhone(number) || !isValidAmount(amount)) {
            return;
        }
        setLoading(true);
        try {
            await p2pTransfer(number, Number(amount) * 100);
            // Optional: Add success toast or reset form
            setAmount("");
            setNumber("");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Send Money">
            <div className="pt-4 space-y-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                    <div className="flex items-center space-x-3 text-slate-500 mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Recipient Details</span>
                    </div>
                    <TextInput 
                        placeholder="Enter mobile number" 
                        label="Mobile Number" 
                        onChange={(value) => setNumber(value)} 
                    />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                    <div className="flex items-center space-x-3 text-slate-500 mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Transaction Amount</span>
                    </div>
                    <TextInput 
                        placeholder="0.00" 
                        label="Amount (INR)" 
                        onChange={(value) => setAmount(value)} 
                    />
                </div>

                <div className="pt-4">
                    <Button onClick={handleSend}>
                        {loading ? "Processing..." : "Secure Transfer"}
                    </Button>
                    <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">
                        Powered by FastPay Secure
                    </p>
                </div>
            </div>
        </Card>
    );
}