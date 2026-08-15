import React from 'react';
import { Target, MapPin, Compass, Layers } from 'lucide-react';
import { UnderstandingData } from '../types';

interface Props {
  data: UnderstandingData;
}

export const UnderstandingCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-3 bg-white border border-slate-200 rounded-lg p-4 shadow-xs max-w-2xl">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
          <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
            分析意图理解
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200">
          Xino AI Semantic Understanding
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-100">
          <Target className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-slate-400 font-medium mb-0.5">分析对象</div>
            <div className="text-slate-800 font-semibold">{data.object}</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-100">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-slate-400 font-medium mb-0.5">区域范围</div>
            <div className="text-slate-800 font-semibold">{data.region}</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-100">
          <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-slate-400 font-medium mb-0.5">分析目标</div>
            <div className="text-slate-800 font-semibold">{data.target}</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-100">
          <Layers className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-slate-400 font-medium mb-0.5">分析方向</div>
            <div className="text-slate-800 font-semibold">{data.direction}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
