export const Center = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`flex justify-center items-center h-full w-full ${className}`}>
            {children}
        </div>
    )
}