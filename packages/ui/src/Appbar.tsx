"use client"
import { useState, useEffect } from "react";
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
        email?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const nextTheme = !isDarkMode;
        setIsDarkMode(nextTheme);
        if (nextTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 w-full flex justify-between items-center border-b border-slate-200 px-6 py-3 bg-white/80 backdrop-blur-md shadow-sm z-[100] h-[65px]">
            <div className="flex items-center">
                <a href="/dashboard" className="hover:opacity-80 transition-opacity flex items-center space-x-2">
                    <div className="bg-[#6a51a6] p-1.5 rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <div className="text-xl text-[#6a51a6] font-extrabold tracking-tighter">
                        Nexis<span className="text-slate-400 font-medium">Pay</span>
                    </div>
                </a>
            </div>

            <div className="flex items-center space-x-6 relative">
                {user && (
                    <div 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center space-x-3 pr-4 border-r border-slate-100 cursor-pointer select-none hover:opacity-85 transition-opacity"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Logged in as</p>
                            <p className="text-sm font-bold text-slate-700 mt-1">{user.name || "User"}</p>
                        </div>
                        <div className="w-9 h-9 bg-gradient-to-tr from-[#6a51a6] to-[#8b6fc9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm relative">
                            {user.name ? user.name[0]?.toUpperCase() : "U"}
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center">
                    <Button 
                        onClick={user ? onSignout : onSignin} 
                        variant={user ? "secondary" : "primary"}
                        size="sm"
                        className={user ? "text-red-600 hover:text-red-700 hover:bg-red-50 border-transparent shadow-none" : ""}
                    >
                        {user ? "Logout" : "Login"}
                    </Button>
                </div>

                {/* Profile Options & Dark Mode Dropdown */}
                {user && showDropdown && (
                    <>
                        <div className="fixed inset-0 z-[140]" onClick={() => setShowDropdown(false)} />
                        <div className="absolute right-0 top-[45px] w-72 bg-white border border-slate-150 rounded-2xl shadow-xl p-4 z-[150] animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800">
                            {/* Header */}
                            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                                <div className="w-10 h-10 bg-gradient-to-tr from-[#6a51a6] to-[#8b6fc9] rounded-full flex items-center justify-center text-white font-black text-sm shadow-sm">
                                    {user.name ? user.name[0]?.toUpperCase() : "U"}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{user.name || "User"}</p>
                                    <p className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block mt-0.5 uppercase tracking-wider">Premium Member</p>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2 space-y-1">
                                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Edit Profile Info</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Security & PIN</span>
                                </button>

                                {/* Dark Mode Toggle */}
                                <div className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600">
                                        {isDarkMode ? (
                                            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                            </svg>
                                        )}
                                        <span>Dark Mode</span>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={toggleDarkMode}
                                        className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${isDarkMode ? 'bg-[#6a51a6]' : 'bg-slate-200'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Logout Footer */}
                            <div className="pt-2 border-t border-slate-100 mt-1">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setShowDropdown(false);
                                        onSignout();
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout Account</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}