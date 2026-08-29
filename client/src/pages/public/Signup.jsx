import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Users, GraduationCap, Building2, ShieldAlert, ArrowRight } from 'lucide-react';
import SignalDot from '../../components/ui/SignalDot';
import Button from '../../components/ui/Button';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';

  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    orgName: '',
    regId: '',
    consent: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'citizen') {
      navigate('/citizen/dashboard');
    } else if (role === 'university') {
      navigate('/hei/dashboard');
    } else {
      navigate('/industry/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] flex flex-col justify-between p-6">
      <header className="flex items-center gap-3 max-w-lg mx-auto w-full">
        <Link to="/" className="flex items-center gap-2">
          <SignalDot status="unresolved" size="sm" />
          <span className="font-display font-bold text-lg text-[#F2EFE9]">SICP</span>
        </Link>
      </header>

      <main className="max-w-lg mx-auto w-full bg-[#16262A] p-8 rounded-xl border border-[#1D3238] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold font-display">Create an Account</h1>
          <p className="text-xs text-[#9BA8A6]">Select your registration path below[cite: 1].</p>
        </div>

        {/* Step 1: Role Selector Cards (Section 3.3)[cite: 1] */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setRole('citizen')}
            className={`p-3 rounded-lg border text-center text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
              role === 'citizen'
                ? 'bg-[#1D3238] border-[#E8A33D] text-[#E8A33D]'
                : 'bg-[#0F1B1E] border-[#1D3238] text-[#9BA8A6]'
            }`}
          >
            <Users size={18} />
            Citizen
          </button>

          <button
            type="button"
            onClick={() => setRole('university')}
            className={`p-3 rounded-lg border text-center text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
              role === 'university'
                ? 'bg-[#1D3238] border-[#2F9E8F] text-[#2F9E8F]'
                : 'bg-[#0F1B1E] border-[#1D3238] text-[#9BA8A6]'
            }`}
          >
            <GraduationCap size={18} />
            University
          </button>

          <button
            type="button"
            onClick={() => setRole('industry')}
            className={`p-3 rounded-lg border text-center text-xs font-semibold flex flex-col items-center gap-2 transition-all ${
              role === 'industry'
                ? 'bg-[#1D3238] border-[#E8A33D] text-[#E8A33D]'
                : 'bg-[#0F1B1E] border-[#1D3238] text-[#9BA8A6]'
            }`}
          >
            <Building2 size={18} />
            Industry / CSR
          </button>
        </div>

        {/* Institutional Pending Verification Notice (Section 3.3)[cite: 1] */}
        {role !== 'citizen' && (
          <div className="p-3 bg-[#1D3238] border border-[#2F9E8F]/40 rounded-lg flex items-start gap-2 text-xs text-[#9BA8A6]">
            <ShieldAlert size={16} className="text-[#2F9E8F] shrink-0 mt-0.5" />
            <span>
              Institutional accounts require verification by DHTE Administrators prior to claiming or funding projects[cite: 1].
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#9BA8A6]">Full Name / Representative Name</label>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg py-2.5 px-4 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#E8A33D]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#9BA8A6]">Phone / Email</label>
            <input
              type="text"
              required
              placeholder="contact@domain.com or +91..."
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg py-2.5 px-4 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#E8A33D]"
            />
          </div>

          {role !== 'citizen' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#9BA8A6]">Organisation Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Birsa Agricultural University"
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg py-2.5 px-4 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#2F9E8F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#9BA8A6]">AISHE Code / CIN / Registration Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., U-0205"
                  value={formData.regId}
                  onChange={(e) => setFormData({ ...formData, regId: e.target.value })}
                  className="w-full bg-[#0F1B1E] border border-[#1D3238] rounded-lg py-2.5 px-4 text-sm text-[#F2EFE9] focus:outline-none focus:border-[#2F9E8F]"
                />
              </div>
            </>
          )}

          {/* DPDP Compliance Checkbox (Section 3.3)[cite: 1] */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 accent-[#E8A33D]"
            />
            <label htmlFor="consent" className="text-xs text-[#9BA8A6] leading-relaxed">
              We'll use your submission and location to route your problem. We never sell your data (DPDP Act Compliant)[cite: 1].
            </label>
          </div>

          <Button variant="primary" type="submit" className="w-full py-2.5">
            Complete Registration <ArrowRight size={16} />
          </Button>
        </form>

        <p className="text-center text-xs text-[#9BA8A6]">
          Already registered?{' '}
          <Link to="/login" className="text-[#E8A33D] font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </main>

      <footer className="text-center text-xs text-[#9BA8A6]">
        SICP PS 26043 | Government of Jharkhand DHTE Collaboration[cite: 1]
      </footer>
    </div>
  );
}