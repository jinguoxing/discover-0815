import React from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { ConfirmedContextData } from '../types';

interface Props {
  data: ConfirmedContextData;
}

export const ConfirmedContextCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3.5 shadow-2xs max-w-2xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-800 tracking-wide">
            {data.statusText}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200/60">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Semovix Context Bound
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-xs pt-1">
        <div className="bg-white/90 p-2 rounded-md border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">绑定数据</span>
          <span className="font-semibold text-slate-800 truncate block">{data.dataset}</span>
        </div>
        <div className="bg-white/90 p-2 rounded-md border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">目标指标</span>
          <span className="font-semibold text-slate-800 truncate block">{data.metric}</span>
        </div>
        <div className="bg-white/90 p-2 rounded-md border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">分析范围</span>
          <span className="font-semibold text-slate-800 truncate block">{data.scope}</span>
        </div>
        <div className="bg-white/90 p-2 rounded-md border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">下钻维度</span>
          <span className="font-semibold text-slate-800 truncate block">{data.dimension}</span>
        </div>
      </div>
    </div>
  );
};
