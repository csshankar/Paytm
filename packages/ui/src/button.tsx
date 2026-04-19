"use client";

import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const baseStyles = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "text-white bg-[#6a51a6] hover:bg-[#5b4395] focus:ring-purple-300 shadow-sm hover:shadow",
    secondary: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-100",
    outline: "text-[#6a51a6] bg-transparent border border-[#6a51a6] hover:bg-purple-50 focus:ring-purple-100",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-200",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      onClick={onClick} 
      type={type} 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
