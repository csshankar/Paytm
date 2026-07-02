"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { useState } from "react";

interface Group {
    id: number;
    name: string;
    members: number;
    balance: string;
    status: string;
    color: string;
}

interface Activity {
    user: string;
    action: string;
    item: string;
    amount: string;
    emoji: string;
    time: string;
}

export default function SplitBillPage() {
    const [groups, setGroups] = useState<Group[]>([
        { id: 1, name: "Flatmates", members: 4, balance: "₹1,200", status: "owe", color: "bg-blue-100 text-blue-600" },
        { id: 2, name: "Goa Trip 2025", members: 6, balance: "₹4,500", status: "owed", color: "bg-green-100 text-green-600" },
        { id: 3, name: "Dinner Group", members: 3, balance: "₹0", status: "settled", color: "bg-slate-100 text-slate-600" }
    ]);

    const [activeGroupId, setActiveGroupId] = useState(1);

    // Modal and Form States
    const [showNewGroupModal, setShowNewGroupModal] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupMembers, setNewGroupMembers] = useState(3);
    const [showSettleModal, setShowSettleModal] = useState(false);

    const activitiesMap: Record<number, Activity[]> = {
        1: [
            { user: "Rahul", action: "paid for", item: "Dinner at Olive", amount: "₹2,400", emoji: "🍕", time: "2h ago" },
            { user: "You", action: "added", item: "Grocery Shopping", amount: "₹1,100", emoji: "🛒", time: "5h ago" },
            { user: "Sneha", action: "paid for", item: "Uber Ride", amount: "₹450", emoji: "🚖", time: "Yesterday" }
        ],
        2: [
            { user: "You", action: "paid for", item: "Villa Booking", amount: "₹18,000", emoji: "🏡", time: "1 day ago" },
            { user: "Amit", action: "added", item: "Car Rental", amount: "₹6,000", emoji: "🚗", time: "2 days ago" }
        ],
        3: [
            { user: "Rohan", action: "paid for", item: "Movie Tickets", amount: "₹1,200", emoji: "🎬", time: "3 days ago" }
        ]
    };

    const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];
    const activities = activitiesMap[activeGroupId] || [];

    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim()) return;

        const newGroup: Group = {
            id: Date.now(),
            name: newGroupName,
            members: Number(newGroupMembers),
            balance: "₹0",
            status: "settled",
            color: "bg-purple-100 text-purple-600 animate-pulse"
        };

        setGroups([...groups, newGroup]);
        setNewGroupName("");
        setNewGroupMembers(3);
        setShowNewGroupModal(false);
    };

    const handleSettleUp = () => {
        setGroups(groups.map(g => g.id === activeGroupId ? { ...g, balance: "₹0", status: "settled" } : g));
        setShowSettleModal(true);
    };

    return (
        <div className="w-full h-[calc(100vh-65px)] bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex flex-col h-full">
                {/* Fixed Top Section */}
                <div className="shrink-0">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-[#6a51a6] tracking-tight">Split Bill</h1>
                            <p className="mt-1 text-sm text-gray-500">Social finance made easy. Split expenses with friends instantly.</p>
                        </div>
                        <Button onClick={() => setShowNewGroupModal(true)}>+ New Group</Button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all duration-300">
                            <div>
                                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">You are owed</p>
                                <h2 className="text-3xl font-black text-slate-900">₹5,240.00</h2>
                            </div>
                            <div className="bg-green-50 p-3 rounded-xl text-green-600 group-hover:scale-105 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all duration-300">
                            <div>
                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">You owe</p>
                                <h2 className="text-3xl font-black text-slate-900">₹1,850.00</h2>
                            </div>
                            <div className="bg-red-50 p-3 rounded-xl text-red-600 group-hover:scale-105 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Split Layout Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow overflow-hidden min-h-0 pb-4">
                    {/* Groups Sidebar */}
                    <div className="lg:col-span-4 space-y-4 overflow-y-auto h-full pr-2 pb-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 mb-2">Your Groups</h3>
                        {groups.map((group) => (
                            <div 
                                key={group.id} 
                                onClick={() => setActiveGroupId(group.id)}
                                className={`p-4 rounded-2xl shadow-sm border cursor-pointer transition-all group ${
                                    activeGroupId === group.id 
                                        ? "border-[#6a51a6] bg-purple-50/30" 
                                        : "border-slate-100 bg-white hover:border-purple-200"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-xl ${group.color} flex items-center justify-center font-bold text-base`}>
                                            {group.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{group.name}</p>
                                            <p className="text-[10px] text-slate-400">{group.members} members</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xs font-black ${
                                            group.status === 'owed' ? 'text-green-600' : 
                                            group.status === 'owe' ? 'text-red-600' : 'text-slate-400'
                                        }`}>
                                            {group.balance}
                                        </p>
                                        <p className="text-[8px] uppercase font-bold tracking-tighter opacity-50">{group.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Activity Feed */}
                    <div className="lg:col-span-8 overflow-y-auto h-full pr-2 pb-6">
                        <Card title={`Activity Feed - ${activeGroup?.name || "Group"}`}>
                            <div className="flex flex-col space-y-4 pt-2">
                                {activities.map((act, i) => (
                                    <div key={i} className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors group">
                                        <div className="text-2xl bg-white w-12 h-12 rounded-xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                                            {act.emoji}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs text-slate-900 font-medium">
                                                        <span className="font-black">{act.user}</span> {act.action} <span className="font-black">{act.item}</span>
                                                    </p>
                                                    <p className="text-[9px] text-slate-400 mt-1">{act.time}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base font-black text-slate-900">{act.amount}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Total Amount</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex items-center space-x-2">
                                                <div className="flex -space-x-2">
                                                    {[1,2,3].map(m => <div key={m} className="w-5 h-5 rounded-full border-2 border-white bg-slate-200"></div>)}
                                                </div>
                                                <span className="text-[9px] font-bold text-slate-400">+{activeGroup?.members ? activeGroup.members - 1 : 2} others split equally</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {activities.length === 0 && (
                                    <div className="py-12 text-center text-slate-400 text-sm">
                                        No bills added to this group yet.
                                    </div>
                                )}
                                {activeGroup?.status !== 'settled' && (
                                    <div className="pt-4">
                                        <Button fullWidth onClick={handleSettleUp} className="py-3 text-base">Settle Up Now</Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showNewGroupModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Create New Group</h2>
                        <p className="text-sm text-gray-500 mb-6">Set up a group to start splitting bills instantly.</p>
                        <form onSubmit={handleCreateGroup} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Group Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="e.g. Goa Trip, Flatmates" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#6a51a6]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Number of Members</label>
                                <input 
                                    type="number" 
                                    min="2" 
                                    max="50" 
                                    required 
                                    value={newGroupMembers}
                                    onChange={(e) => setNewGroupMembers(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#6a51a6]"
                                />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowNewGroupModal(false)}
                                    className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-2xl text-sm transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-3.5 bg-[#6a51a6] hover:bg-[#543b8c] text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-purple-100"
                                >
                                    Create Group
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showSettleModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Group Settled!</h2>
                        <p className="text-sm text-gray-500 mb-6 font-medium">All outstanding balances in this group have been successfully settled.</p>
                        <button 
                            onClick={() => setShowSettleModal(false)}
                            className="w-full py-3.5 bg-[#6a51a6] hover:bg-[#543b8c] text-white font-bold rounded-2xl text-sm transition-all"
                        >
                            Awesome
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
