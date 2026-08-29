import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Building2, MapPin, TrendingUp, AlertTriangle, CheckCircle2, Award } from 'lucide-react';
import { useProblemStore } from '../../store/problemStore';
import SignalDot from '../../components/ui/SignalDot';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminAnalytics() {
  const { problems, fetchProblems } = useProblemStore();

  useEffect(() => {
    fetchProblems();
  }, []);

  const total = problems.length;
  const resolved = problems.filter((p) => p.status === 'resolved').length;
  const inProgress = problems.filter((p) => p.status === 'in-progress' || p.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 max-w-6xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1D3238] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2F9E8F] mb-1">
            <ShieldCheck size={14} /> DHTE State Administrative Access
          </div>
          <h1 className="text-3xl font-bold font-display">Government Analytics & Oversight</h1>
          <p className="text-xs text-[#9BA8A6]">Statewide civic resolution metrics and university performance tracking.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/map">
            <Button variant="outline" className="py-2.5 px-4 text-xs">
              <MapPin size={16} /> Open District Map
            </Button>
          </Link>
        </div>
      </div>

      {/* State Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6] uppercase">Total Geo-Signals</p>
          <p className="text-3xl font-bold font-display text-[#E8A33D]">{total + 1247}</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6] uppercase">Active HEI Partners</p>
          <p className="text-3xl font-bold font-display text-[#2F9E8F]">42</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6] uppercase">CSR Funds Mobilized</p>
          <p className="text-3xl font-bold font-display text-[#F2EFE9]">₹1.28 Cr</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6] uppercase">Resolution Rate</p>
          <p className="text-3xl font-bold font-display text-[#2F9E8F]">71.4%</p>
        </div>
      </div>

      {/* Two Column Layout: Leaderboard & Moderation Queue */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* HEI Institutional Leaderboard */}
        <div className="bg-[#16262A] p-6 rounded-xl border border-[#1D3238] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Award size={18} className="text-[#E8A33D]" /> Top HEI Technical Partners
            </h2>
            <span className="text-xs font-mono text-[#9BA8A6]">Ranked by Resolutions</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#0F1B1E] rounded-lg border border-[#1D3238]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#E8A33D] font-bold">01</span>
                <div>
                  <p className="font-bold text-[#F2EFE9]">BIT Sindri</p>
                  <p className="text-[#9BA8A6]">18 Active Projects • 34 Resolved</p>
                </div>
              </div>
              <span className="font-bold text-[#2F9E8F] bg-[#2F9E8F]/10 px-2 py-1 rounded">Grade A</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0F1B1E] rounded-lg border border-[#1D3238]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#9BA8A6] font-bold">02</span>
                <div>
                  <p className="font-bold text-[#F2EFE9]">Ranchi University</p>
                  <p className="text-[#9BA8A6]">12 Active Projects • 22 Resolved</p>
                </div>
              </div>
              <span className="font-bold text-[#2F9E8F] bg-[#2F9E8F]/10 px-2 py-1 rounded">Grade A</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0F1B1E] rounded-lg border border-[#1D3238]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#9BA8A6] font-bold">03</span>
                <div>
                  <p className="font-bold text-[#F2EFE9]">NIT Jamshedpur</p>
                  <p className="text-[#9BA8A6]">09 Active Projects • 19 Resolved</p>
                </div>
              </div>
              <span className="font-bold text-[#E8A33D] bg-[#E8A33D]/10 px-2 py-1 rounded">Grade B+</span>
            </div>
          </div>
        </div>

        {/* Live Problem Feed & Audit Monitor */}
        <div className="bg-[#16262A] p-6 rounded-xl border border-[#1D3238] space-y-4">
          <h2 className="text-lg font-bold font-display flex items-center gap-2">
            <TrendingUp size={18} className="text-[#2F9E8F]" /> Live Problem Signal Feed
          </h2>

          <div className="space-y-3">
            {problems.map((item) => (
              <div key={item.id} className="p-3 bg-[#0F1B1E] rounded-lg border border-[#1D3238] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#9BA8A6]">{item.id}</span>
                  <Badge status={item.status} />
                </div>
                <p className="font-bold text-[#F2EFE9] line-clamp-1">{item.title}</p>
                <div className="flex justify-between text-[#9BA8A6]">
                  <span>District: {item.location?.district || "Ranchi"}</span>
                  <Link to={`/problem/${item.id}`} className="text-[#E8A33D] hover:underline">
                    Inspect &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}