export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="p-4 border-b bg-white flex justify-between items-center shadow-sm">
            <div className="text-xl font-bold text-[#6a51a6]">Nexis Pay</div>
        </div>
        <div className="flex-grow flex items-center justify-center p-4">
            {children}
        </div>
    </div>
  );
}
