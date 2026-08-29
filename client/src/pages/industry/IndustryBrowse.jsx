import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Award, CheckCircle } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore';
import SignalDot from '../../components/ui/SignalDot';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function IndustryBrowse() {
  const navigate = useNavigate();
  const { problems, fetchProblems } = useProblemStore();

  useEffect(() => {
    fetchProblems();
  }, []);

  const handlePledge = (problemId) => {
    alert(`Initiating CSR Grant Pledge for ${problemId}. Redirecting to pledge workflow.`);
    navigate('/industry/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-[#1D3238] pb-4">
        <span className="text-xs font-mono text-[#E8A33D] uppercase">Phase 7 • Corporate Social Responsibility</span>
        <h1 className="text-3xl font-bold font-display">CSR Funding Explorer</h1>
        <p className="text-xs text-[#9BA8A6]">Browse verified academic prototypes requiring funding, equipment, or industry mentorship.</p>
      </div>

      <div className="space-y-4">
        {problems.map((item) => (
          <div key={item.id} className="p-6 bg-[#16262A] border border-[#1D3238] rounded-xl space-y-4 hover:border-[#E8A33D]/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SignalDot status={item.status} size="md" />
                <span className="text-xs font-mono text-[#9BA8A6]">{item.id}</span>
                <Badge status={item.status} />
              </div>
              <span className="text-xs font-mono text-[#2F9E8F] bg-[#2F9E8F]/10 px-2.5 py-1 rounded">
                Target Budget: ₹45,000
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#F2EFE9]">{item.title}</h3>
              <p className="text-xs text-[#9BA8A6] mt-1">{item.description}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1D3238] text-xs text-[#9BA8A6]">
              <span className="flex items-center gap-1">
                <Building2 size={14} className="text-[#2F9E8F]" /> Technical Team: {item.assignedInstitution || "Bit Sindri Team Alpha"}
              </span>

              <div className="flex items-center gap-3">
                <Link to={`/problem/${item.id}`} className="hover:text-[#F2EFE9]">
                  View Project Timeline
                </Link>
                <Button variant="secondary" className="py-1.5 text-xs" onClick={() => handlePledge(item.id)}>
                  <Award size={14} /> Pledge Support
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}