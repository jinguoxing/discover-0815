import React from 'react';
import { TrafficGovernanceData } from '../types';
import { Navigation, AlertTriangle, Bus, Gauge, ArrowUpRight } from 'lucide-react';

interface Props {
  data: TrafficGovernanceData;
}

export const TrafficGovernanceCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3 font-sans text-xs my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-100">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800 text-xs sm:text-sm">{data.title}</span>
            <div className="text-[10px] text-slate-400">研判走廊: {data.corridor}</div>
          </div>
        </div>

        <div className="text-[10px] bg-slate-900 text-sky-400 font-mono px-2 py-0.5 rounded font-bold">
          交通委 & GIS 实时算子
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">早晚高峰拥堵指数</div>
          <div className="text-base sm:text-lg font-bold text-amber-600 font-mono mt-0.5">
            {data.congestionIndex}
          </div>
          <div className="text-[10px] text-amber-700 font-medium">中度拥堵 Level 3</div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">高峰通行时速</div>
          <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
            {data.peakSpeed}
          </div>
          <div className="text-[10px] text-slate-400">设计时速 60 km/h</div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">500m 接驳公交覆盖</div>
          <div className="text-base sm:text-lg font-bold text-emerald-600 font-mono mt-0.5">
            {data.transit500mCoverage}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">轨道交通12/15号线</div>
        </div>
      </div>

      {/* Bottlenecks List */}
      <div>
        <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> 核心路段拥堵瓶颈点及通行速度
          </span>
          <span className="text-[10px] text-slate-400">交通诱导图层</span>
        </div>

        <div className="space-y-1.5">
          {data.bottlenecks.map((b, idx) => (
            <div
              key={idx}
              className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <div>
                  <span className="font-bold text-slate-800">{b.location}</span>
                  <span className="text-[10px] text-slate-400 ml-2">问题: {b.issue}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono">
                <span className="text-slate-600 text-[10px]">时速: <strong className="text-slate-900">{b.speed}</strong></span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-sans font-medium ${
                    b.status === '严重拥堵'
                      ? 'bg-rose-100 text-rose-800 font-bold'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Proposal */}
      <div className="p-2.5 bg-sky-50/70 border border-sky-100 rounded-lg text-sky-900 text-[10px] leading-relaxed">
        <span className="font-bold text-sky-950 flex items-center gap-1 mb-0.5">
          <Bus className="w-3.5 h-3.5 text-sky-600" />
          交通微循环与定制公交优化方案：
        </span>
        {data.proposal}
      </div>
    </div>
  );
};
