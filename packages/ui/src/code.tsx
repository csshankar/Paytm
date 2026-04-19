export function Code({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code className={`bg-slate-100 text-[#6a51a6] px-2 py-1 rounded-md font-mono text-sm border border-slate-200 ${className}`}>
      {children}
    </code>
  );
}
