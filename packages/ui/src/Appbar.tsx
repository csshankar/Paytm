import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <nav className="fixed top-0 left-0 right-0 w-full flex justify-between items-center border-b border-slate-200 px-6 py-3 bg-white/80 backdrop-blur-md shadow-sm z-[100] h-[65px]">
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

        <div className="flex items-center space-x-6">
            {user && (
                <div className="hidden md:flex items-center space-x-3 pr-4 border-r border-slate-100">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Logged in as</p>
                        <p className="text-sm font-bold text-slate-700 mt-1">{user.name || "User"}</p>
                    </div>
                    <div className="w-9 h-9 bg-gradient-to-tr from-[#6a51a6] to-[#8b6fc9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {user.name ? user.name[0]?.toUpperCase() : "U"}
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
        </div>
    </nav>
}