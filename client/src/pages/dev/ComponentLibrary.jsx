import React from 'react';
import SignalDot from '../../components/ui/SignalDot';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function ComponentLibrary() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto bg-[#0F1B1E] text-[#F2EFE9]">
      <h1 className="text-3xl font-bold border-b border-[#1D3238] pb-4">
        SICP Design System Preview
      </h1>

      {/* Signal Dot Demonstration */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#E8A33D]">0.1 Signal Dot Motif</h2>
        <div className="flex gap-6 items-center p-4 bg-[#16262A] rounded-lg border border-[#1D3238]">
          <div className="flex items-center gap-2">
            <SignalDot status="unresolved" />
            <span className="text-sm">Unresolved / Pulsing</span>
          </div>
          <div className="flex items-center gap-2">
            <SignalDot status="resolved" />
            <span className="text-sm">Resolved</span>
          </div>
        </div>
      </section>

      {/* Status Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#E8A33D]">Status Badges</h2>
        <div className="flex gap-3 p-4 bg-[#16262A] rounded-lg border border-[#1D3238]">
          <Badge status="new" />
          <Badge status="routed" />
          <Badge status="in-progress" />
          <Badge status="resolved" />
          <Badge status="urgent" />
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#E8A33D]">Buttons</h2>
        <div className="flex gap-4 p-4 bg-[#16262A] rounded-lg border border-[#1D3238]">
          <Button variant="primary">Primary CTA</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Urgent Action</Button>
        </div>
      </section>
    </div>
  );
}