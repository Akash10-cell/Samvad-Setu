import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Building2, Search, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function IndustryDashboard() {
  const pledges = [
    {
      id: 'SICP-2026-8901',
      title: 'Solar Water Pump Malfunction in Secondary School',
      hei: 'BIT Sindri',
      pledgedAmount: '₹15,000',
      status: 'in-progress',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1B1E] text-[#F2EFE9] p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1D3238] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E8A33D] mb-1">
            <Building2 size={14} /> Tata Steel Foundation (CSR Partner)
          </div>
          <h1 className="text-3xl font-bold font-display">Industry & CSR Portal</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/industry/csr-report">
            <Button variant="outline" className="py-2.5 px-4 text-xs">
              <FileText size={16} /> Generate CSR Report
            </Button>
          </Link>
          <Link to="/industry/browse">
            <Button variant="primary" className="py-2.5 px-4 text-xs">
              <Search size={16} /> Browse Projects to Fund
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6]">Total Capital Committed</p>
          <p className="text-3xl font-bold font-display text-[#E8A33D]">₹4,50,000</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6]">Projects Sponsored</p>
          <p className="text-3xl font-bold font-display text-[#2F9E8F]">08</p>
        </div>
        <div className="bg-[#16262A] p-5 rounded-xl border border-[#1D3238] space-y-1">
          <p className="text-xs font-mono text-[#9BA8A6]">Impact Beneficiaries</p>
          <p className="text-3xl font-bold font-display text-[#F2EFE9]">12,400+</p>
        </div>
      </div>

      {/* Active CSR Pledges Table */}
      <div className="bg-[#16262A] border border-[#1D3238] rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold font-display">Active Funded Projects</h2>

        <div className="divide-y divide-[#1D3238]">
          {pledges.map((item) => (
            <div key={item.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#9BA8A6]">{item.id}</span>
                  <Badge status={item.status} />
                </div>
                <h3 className="font-bold text-[#F2EFE9]">{item.title}</h3>
                <p className="text-xs text-[#9BA8A6]">Technical Partner: <strong className="text-[#2F9E8F]">{item.hei}</strong></p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-xs font-mono text-[#9BA8A6]">Pledged Grant</span>
                  <p className="text-sm font-bold text-[#E8A33D]">{item.pledgedAmount}</p>
                </div>
                <Link to={`/problem/${item.id}`}>
                  <Button variant="outline" className="text-xs py-2">
                    Audit Project
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