"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransactions } from "../app/lib/actions/onramptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}, {
    name: "Dodo Payments",
    redirectUrl: "https://dodopayments.com/checkout"
}];

export const AddMoney = () => {
    const [selectedBank, setSelectedBank] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);

    const getSelectedBankUrl = () => {
        const bank = SUPPORTED_BANKS.find(x => x.name === selectedBank);
        return bank?.redirectUrl || "";
    };

    const handleAddMoney = async () => {
        if (amount <= 0 || amount > 100000) {
            return;
        }
        
        const bank = SUPPORTED_BANKS.find(x => x.name === selectedBank);
        if (!bank) {
            return;
        }
        
        const res = await createOnRampTransactions(amount * 100, bank.name);
        
        if (res.url) {
            window.location.href = res.url;
            return;
        }
        
        const redirectUrl = bank.redirectUrl;
        if (redirectUrl && SUPPORTED_BANKS.some(b => b.redirectUrl === redirectUrl)) {
            window.location.href = redirectUrl;
        }
    };

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value));
        }} />
        <Select label="Bank" onSelect={(value) => {
            setSelectedBank(value);
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={handleAddMoney}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}