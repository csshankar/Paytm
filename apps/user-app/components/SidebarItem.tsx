"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return (
        <div 
            className={`flex items-center cursor-pointer p-3 pl-6 my-1 mx-2 rounded-lg transition-all duration-200 ease-in-out group ${
                selected 
                ? "bg-[#6a51a6] text-white shadow-md" 
                : "text-slate-600 hover:bg-slate-100"
            }`} 
            onClick={() => router.push(href)}
        >
            <div className={`mr-3 ${selected ? "text-white" : "text-slate-500 group-hover:text-[#6a51a6]"}`}>
                {icon}
            </div>
            <div className={`font-medium ${selected ? "text-white" : "group-hover:text-slate-900"}`}>
                {title}
            </div>
        </div>
    );
}