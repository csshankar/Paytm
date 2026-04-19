"use client"
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";

export default function ScanPage() {
    const [isScanning, setIsScanning] = useState(true);

    return (
        <div className="w-full min-h-screen bg-slate-900 md:bg-slate-50">
            <div className="max-w-4xl mx-auto md:py-10 px-4">
                <div className="hidden md:block mb-8">
                    <h1 className="text-3xl font-bold text-[#6a51a6]">Scan & Pay</h1>
                    <p className="text-gray-600 mt-1">Scan any QR code to pay instantly.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Viewfinder Section */}
                    <div className="relative group">
                        <div className="bg-black rounded-3xl aspect-[3/4] md:aspect-square overflow-hidden relative border-4 border-slate-800 shadow-2xl">
                            {/* Animated Scanning Line */}
                            <div className="absolute inset-0 z-10 pointer-events-none">
                                <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent absolute top-0 animate-[scan_3s_linear_infinite]"></div>
                                
                                {/* Corner Accents */}
                                <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-purple-500 rounded-tl-lg"></div>
                                <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-purple-500 rounded-tr-lg"></div>
                                <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-purple-500 rounded-bl-lg"></div>
                                <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-purple-500 rounded-br-lg"></div>
                            </div>

                            {/* Placeholder for Camera View */}
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                <div className="text-center p-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-slate-700 mx-auto mb-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                    <p className="text-slate-500 text-sm font-medium">Camera access required</p>
                                    <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full text-xs font-bold hover:bg-purple-700 transition-colors">
                                        Enable Camera
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
                            <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </button>
                            <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Manual Entry Section */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Manual Entry</h2>
                            <div className="space-y-4">
                                <TextInput 
                                    label="Mobile Number or UPI ID" 
                                    placeholder="e.g. 9876543210 or user@upi" 
                                    onChange={() => {}} 
                                />
                                <div className="pt-2">
                                    <Button fullWidth onClick={() => {}}>
                                        Continue to Pay
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Payments</h2>
                            <div className="space-y-4">
                                {[
                                    { name: "Starbucks Coffee", upi: "starbucks@hdfc", icon: "S" },
                                    { name: "John Doe", upi: "john@okicici", icon: "J" },
                                    { name: "Amazon Pay", upi: "amazon@apl", icon: "A" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors group">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-400">{item.upi}</p>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
