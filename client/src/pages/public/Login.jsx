import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import SignalDot from '../../components/ui/SignalDot';
import Button from '../../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auto-detect role mock logic (Section 3.2)
    if (formData.identifier.includes('hei') || formData.identifier.includes('univ')) {
      navigate('/hei/dashboard');
    } else if (formData.identifier.includes('csr') || formData.identifier.includes('industry')) {
      navigate('/industry/dashboard');
    } else if (formData.identifier.includes('admin') || formData.identifier.includes('dhte')) {
      navigate('/admin/analytics');
    } else {
      navigate('/citizen/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] flex flex-col justify-between p-6">
      <header className="flex items-center gap-3 max-w-md mx-auto w-full">
        <Link to="/" className="flex items-center gap-2">
          <SignalDot status="unresolved" size="sm" />
          <span className="font-display font-bold text-lg text-[#F2EFE9]">SICP</span>
        </Link>
      </header>

      <main className="max-w-md mx-auto w-full bg-[#16262A] p-8 rounded-xl border border-[#1D3238] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold font-display">Welcome Back</h1>
          <p className="text-xs text-[#9BA8A6]">
            Enter your credentials to access your dashboard. Role is auto-detected on sign-in.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#9BA8A6]">Email or Phone Number</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#9BA8A6]" size={18} />
              <input
                type="text"
                required
                placeholder="citizen@mail.com or +91 9876543210"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#E8A33D]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#9BA8A6]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#9BA8A6]" size={18} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#E8A33D]"
              />
            </div>
          </div>

          <Button variant="primary" type="submit" className="w-full py-2.5">
            Sign In <ArrowRight size={16} />
          </Button>
        </form>

        {/* Government SSO Placeholder (Section 3.2) */}
        <div className="pt-4 border-t border-[#1D3238] space-y-3">
          <button
            type="button"
            className="w-full bg-[#1D3238] hover:bg-[#28434a] text-[#F2EFE9] border border-[#2F9E8F]/30 text-xs py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} className="text-[#2F9E8F]" />
            Sign in with DigiLocker (Government SSO)
          </button>
        </div>

        <p className="text-center text-xs text-[#9BA8A6]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#E8A33D] font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </main>

      <footer className="text-center text-xs text-[#9BA8A6]">
        SICP PS 26043 | Government of Jharkhand DHTE Collaboration
      </footer>
    </div>
  );
}