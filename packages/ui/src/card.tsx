import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="border border-gray-100 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4">
        {title}
      </h1>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
