"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { useState } from "react";

export default function SplitBillPage() {
    const groups = [
        { name: "Flatmates", members: 4, balance: "₹1,200", status: "owe", color: "bg-blue-100 text-blue-600" },
        { name: "Goa Trip 2025", members: 6, balance: "₹4,500", status: "owed", color: "bg-green-100 text-green-600" },
        { name: "Dinner Group", members: 3, balance: "₹0", status: "settled", color: "bg-slate-100 text-slate-600" }
    ];

    const activities = [
        { user: "Rahul", action: "paid for", item: "Dinner at Olive", amount: "₹2,400", emoji: "🍕", time: "2h ago" },
        { user: "You", action: "added", item: "Grocery Shopping", amount: "₹1,100", emoji: "🛒", time: "5h ago" },
        { user: "Sneha", action: "paid for", item: "Uber Ride", amount: "₹450", emoji: "🚖", time: "Yesterday" }
    ];

    return (
        <div className="w-full min-h-screen bg-slate-50 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight">Split Bill</h1>
                        <p className="mt-3 text-lg text-gray-600">Social finance made easy. Split expenses with friends instantly.</p>
                    </div>
                    <Button onClick={() => {}}>+ New Group</Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-1">You are owed</p>
                            <h2 className="text-4xl font-black text-slate-900">₹5,240.00</h2>
                        </div>
                        <div className="bg-green-50 p-4 rounded-2xl text-green-600 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">You owe</p>
                            <h2 className="text-4xl font-black text-slate-900">₹1,850.00</h2>
                        </div>
                        <div className="bg-red-50 p-4 rounded-2xl text-red-600 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Groups Sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2 mb-4">Your Groups</h3>
                        {groups.map((group, i) => (
                            <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:border-purple-200 cursor-pointer transition-all group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-2xl ${group.color} flex items-center justify-center font-bold text-lg`}>
                                            {group.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{group.name}</p>
                                            <p className="text-xs text-slate-400">{group.members} members</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-black ${group.status === 'owed' ? 'text-green-600' : group.status === 'owe' ? 'text-red-600' : 'text-slate-400'}`}>
                                            {group.balance}
                                        </p>
                                        <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50">{group.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Activity Feed */}
                    <div className="lg:col-span-8">
                        <Card title="Activity Feed - Flatmates">
                            <div className="flex flex-col space-y-6 pt-4">
                                {activities.map((act, i) => (
                                    <div key={i} className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-3xl transition-colors group">
                                        <div className="text-3xl bg-white w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                                            {act.emoji}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-slate-900 font-medium">
                                                        <span className="font-black">{act.user}</span> {act.action} <span className="font-black">{act.item}</span>
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">{act.time}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-slate-900">{act.amount}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Amount</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex items-center space-x-2">
                                                <div className="flex -space-x-2">
                                                    {[1,2,3].map(m => <div key={m} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>)}
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">+3 others split equally</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-6">
                                    <Button fullWidth variant="primary" className="py-4 text-lg">Settle Up Now</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
