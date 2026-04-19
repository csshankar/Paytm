import { Card } from "@repo/ui/card";
import Link from "next/link";

export const QuickActions = () => {
    const actions = [
        {
            title: "Scan QR",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.008v.008H6.75V6.75Zm0 9.75h.008v.008H6.75v-.008Zm9.75-9.75h.008v.008h-.008V6.75ZM13.5 13.5h.008v.008H13.5V13.5Zm3.375 3.375h.008v.008h-.008v-.008Zm0-3.375h.008v.008h-.008V13.5Zm-3.375 3.375h.008v.008H13.5v-.008Zm2.25 2.25h.008v.008h-.008v-.008Zm0-4.5h.008v.008h-.008v-.008Z" />
            </svg>,
            color: "bg-blue-100 text-blue-600",
            href: "/scan"
        },
        {
            title: "Pay Bills",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>,
            color: "bg-green-100 text-green-600",
            href: "/bills"
        },
        {
            title: "To Mobile",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>,
            color: "bg-purple-100 text-purple-600",
            href: "/p2p"
        },
        {
            title: "Passbook",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 1 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
            </svg>,
            color: "bg-orange-100 text-orange-600",
            href: "/transactions"
        }
    ];


    return (
        <Card title="Quick Actions">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {actions.map((action, index) => (
                    <Link 
                        key={index} 
                        href={action.href}
                        className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                        <div className={`p-3 rounded-full ${action.color} mb-2`}>
                            {action.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.title}</span>
                    </Link>
                ))}
            </div>
        </Card>
    );
};
