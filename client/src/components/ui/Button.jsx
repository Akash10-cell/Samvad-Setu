import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-[#E8A33D] hover:bg-[#d49232] text-[#0F1B1E] font-semibold",
    secondary: "bg-[#1D3238] hover:bg-[#28434a] text-[#F2EFE9] border border-[#2F9E8F]/30",
    danger: "bg-[#C1443B] hover:bg-[#a83a32] text-[#F2EFE9]",
    outline: "border border-[#9BA8A6]/40 text-[#F2EFE9] hover:bg-[#16262A]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}