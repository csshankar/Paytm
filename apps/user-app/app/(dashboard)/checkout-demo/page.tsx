"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";

export default function CheckoutDemoPage() {
    const [oneClickEnabled, setOneClickEnabled] = useState(true);

    return (
        <div className="w-full min-h-screen bg-slate-50 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-[#6a51a6] tracking-tight">Embedded Checkout</h1>
                    <p className="mt-3 text-lg text-gray-600">Secure, PCI-compliant payment forms that integrate seamlessly into any site.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Embedded Form */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">Checkout Element</h3>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>
                            </div>
                            
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nexis Secure Element</span>
                                    <div className="flex space-x-1">
                                        <div className="w-6 h-4 bg-slate-200 rounded-sm"></div>
                                        <div className="w-6 h-4 bg-slate-200 rounded-sm"></div>
                                        <div className="w-6 h-4 bg-slate-200 rounded-sm"></div>
                                    </div>
                                </div>
                                
                                <TextInput label="Card Number" placeholder="xxxx xxxx xxxx xxxx" onChange={() => {}} />
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput label="Expiry" placeholder="MM/YY" onChange={() => {}} />
                                    <TextInput label="CVV" placeholder="xxx" onChange={() => {}} />
                                </div>
                                <TextInput label="Cardholder Name" placeholder="John Doe" onChange={() => {}} />
                                
                                <div className="pt-4">
                                    <Button fullWidth onClick={() => {}}>Pay ₹4,999.00</Button>
                                </div>
                                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-tighter">
                                    🔒 Raw card data never touches your server
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* One-Click Checkout */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-2">One-Click Experience</h3>
                        <div className="bg-gradient-to-br from-[#6a51a6] to-[#4b3b7a] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10 space-y-6">
                                <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-100">User Recognized</span>
                                </div>
                                
                                <h4 className="text-2xl font-black leading-tight">Welcome back, <br /> Rahul!</h4>
                                <p className="text-sm text-purple-100/80 font-medium">Pay instantly using your saved Visa ending in 4242.</p>
                                
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold uppercase text-purple-200">Payment Method</span>
                                        <span className="text-[10px] text-purple-200 underline cursor-pointer">Edit</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] font-black text-blue-800">VISA</div>
                                        <span className="text-sm font-bold">•••• 4242</span>
                                    </div>
                                </div>
                                
                                <div className="pt-2">
                                    <Button variant="secondary" fullWidth className="py-4 text-purple-900 font-black shadow-xl hover:bg-white transition-all">
                                        🚀 Pay with One-Click
                                    </Button>
                                </div>
                                
                                <div className="flex items-center justify-center space-x-2 opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                    </svg>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Tokenized Secure Checkout</span>
                                </div>
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-[#6a51a6] mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                    </svg>
                                </div>
                                <h5 className="text-xs font-black text-slate-800 mb-1 tracking-tight">Vaulting</h5>
                                <p className="text-[10px] text-slate-400 font-medium">PCI-DSS compliant client-side vaulting.</p>
                            </div>
                            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                                <h5 className="text-xs font-black text-slate-800 mb-1 tracking-tight">Passkeys</h5>
                                <p className="text-[10px] text-slate-400 font-medium">One-click recognition via biometric login.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
