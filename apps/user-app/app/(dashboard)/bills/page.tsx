"use client"
import { Card } from "@repo/ui/card";
import { useState } from "react";

export default function BillsPage() {
    const categories = [
        { name: "Mobile Recharge", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>, color: "bg-blue-50 text-blue-600" },
        { name: "Electricity", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, color: "bg-amber-50 text-amber-600" },
        { name: "Water Bill", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>, color: "bg-cyan-50 text-cyan-600" },
        { name: "Broadband", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" /></svg>, color: "bg-indigo-50 text-indigo-600" },
        { name: "DTH Recharge", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" /></svg>, color: "bg-red-50 text-red-600" },
        { name: "Gas Booking", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>, color: "bg-orange-50 text-orange-600" },
    ];

    return (
        <div className="w-full min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight">Recharge & Pay Bills</h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                        Fastest way to pay all your bills and keep your services running.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center space-x-4">
                                <div className={`p-4 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{cat.name}</h3>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Instant Payment</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Billers</h2>
                    <div className="flex flex-col space-y-2">
                        {[
                            { name: "Airtel Postpaid", id: "9876543210", amount: "₹849.00", due: "Due in 3 days" },
                            { name: "Tata Power", id: "100234567", amount: "₹2,140.00", due: "Due today" }
                        ].map((biller, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold group-hover:bg-purple-100 group-hover:text-purple-600">
                                        {biller.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{biller.name}</p>
                                        <p className="text-xs text-gray-400">ID: {biller.id}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800">{biller.amount}</p>
                                    <p className="text-xs text-red-500 font-medium">{biller.due}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
