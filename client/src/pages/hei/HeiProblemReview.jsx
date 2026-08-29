import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore';
import SignalDot from '../../components/ui/SignalDot';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function HeiProblemReview() {
  const navigate = useNavigate();
  const { problems, fetchProblems } = useProblemStore();
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleClaim = (problemId) => {
    alert(`Problem ${problemId} claimed! Assigning to university project queue.`);
    navigate('/hei/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2 border-b border-[#1D3238] pb-4">
        <span className="text-xs font-mono text-[#2F9E8F] uppercase">Phase 5 • Institutional Workflow</span>
        <h1 className="text-3xl font-bold font-display">Problem Review & Claim Queue</h1>
        <p className="text-xs text-[#9BA8A6]">Select AI-categorized civic problems near your institution to adopt as student Capstone / R&D projects.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-3 bg-[#16262A] p-3 rounded-lg border border-[#1D3238] text-xs">
        <Filter size={16} className="text-[#E8A33D]" />
        <span className="text-[#9BA8A6]">Domain Filter:</span>
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1 rounded-md transition-colors ${selectedFilter === 'all' ? 'bg-[#1D3238] text-[#E8A33D] font-bold' : 'text-[#9BA8A6]'}`}
        >
          All Open Issues
        </button>
        <button
          onClick={() => setSelectedFilter('energy')}
          className={`px-3 py-1 rounded-md transition-colors ${selectedFilter === 'energy' ? 'bg-[#1D3238] text-[#2F9E8F] font-bold' : 'text-[#9BA8A6]'}`}
        >
          Renewable Energy & Water
        </button>
      </div>

      {/* Problem Queue List */}
      <div className="space-y-4">
        {problems.map((item) => (
          <div key={item.id} className="p-6 bg-[#16262A] border border-[#1D3238] rounded-xl space-y-4 hover:border-[#2F9E8F]/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <SignalDot status={item.status} size="md" />
                <span className="text-xs font-mono text-[#9BA8A6]">{item.id}</span>
                <Badge status={item.status} />
              </div>
              <span className="text-xs font-mono text-[#E8A33D] bg-[#E8A33D]/10 px-2.5 py-1 rounded w-fit">
                AI Urgency: {item.urgency || 'Urgent'}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#F2EFE9]">{item.title}</h3>
              <p className="text-xs text-[#9BA8A6] mt-1 line-clamp-2">{item.description}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1D3238] text-xs text-[#9BA8A6]">
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-[#E8A33D]" /> District: {item.location?.district || 'Jharkhand'}
              </span>

              <div className="flex items-center gap-3">
                <Link to={`/problem/${item.id}`} className="hover:text-[#F2EFE9]">
                  View Details
                </Link>
                <Button variant="primary" className="py-1.5 text-xs" onClick={() => handleClaim(item.id)}>
                  <CheckCircle2 size={14} /> Claim Problem
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}