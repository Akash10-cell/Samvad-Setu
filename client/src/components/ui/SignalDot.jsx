import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SignalDot({ status = 'unresolved', size = 'md' }) {
  const isResolved = status === 'resolved';

  const sizeClasses = {
    sm: 'w-2.5 h-2.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  if (isResolved) {
    return (
      <div className={`rounded-full bg-[#2F9E8F] flex items-center justify-center text-[#0F1B1E] ${sizeClasses[size]}`}>
        <Check size={size === 'sm' ? 10 : size === 'md' ? 12 : 16} strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulsing ring */}
      <motion.span
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute rounded-full bg-[#E8A33D] ${sizeClasses[size]}`}
      />
      {/* Inner solid amber core */}
      <span className={`relative rounded-full bg-[#E8A33D] ${sizeClasses[size]}`} />
    </div>
  );
}