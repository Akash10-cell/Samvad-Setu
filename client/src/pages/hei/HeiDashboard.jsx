import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, CheckCircle2, ArrowUpRight, Search, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SignalDot from '../../components/ui/SignalDot';

export default function HeiDashboard() {
  const activeClaims = [
    {
      id: 'SICP-2026-8901',
      title: 'Solar Water Pump Malfunction in Secondary School',
      district: 'Khunti',
      team: 'Team Alpha (CSE)',
      status: 'in-progress',
      progress: '60%',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1D3238] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2F9E8F] mb-1">
            <Sparkles size={14} /> Birsa Institute of Technology, Sindri
          </div>
          <h1 className="text-3xl font-bold font-display">HEI Portal & Workspace</h1>
        </div>
        <Link to="/hei/review">
          <Button variant="primary" className="py-2.5 px-4">
            <Search size={18} /> Browse Problem Queue
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6]">Claimed Problems</p>
          <p className="text-3xl font-bold font-display text-[#E8A33D]">04</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6]">Student Teams Assigned</p>
          <p className="text-3xl font-bold font-display text-[#2F9E8F]">06</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6]">Deployed Solutions</p>
          <p className="text-3xl font-bold font-display text-[#F2EFE9]">02</p>
        </div>
      </div>

      {/* Active Projects Table */}
      <div className="bg-[#16262A] border border-[#1D3238] rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold font-display">Active Institutional Projects</h2>

        <div className="divide-y divide-[#1D3238]">
          {activeClaims.map((item) => (
            <div key={item.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SignalDot status={item.status} size="sm" />
                  <span className="text-xs font-mono text-[#9BA8A6]">{item.id}</span>
                  <Badge status={item.status} />
                </div>
                <h3 className="font-bold text-[#F2EFE9]">{item.title}</h3>
                <p className="text-xs text-[#9BA8A6]">Location: {item.district} | Assigned: <strong className="text-[#2F9E8F]">{item.team}</strong></p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-xs font-mono text-[#9BA8A6]">Milestone Progress</span>
                  <p className="text-sm font-bold text-[#E8A33D]">{item.progress}</p>
                </div>
                <Link to={`/problem/${item.id}`}>
                  <Button variant="outline" className="text-xs py-2">
                    Workspace <ArrowUpRight size={14} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}