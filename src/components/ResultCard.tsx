import React from 'react';
import { Users, FileSearch, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { ResultData } from '../types';

interface Props {
  data: ResultData;
  onContinue?: () => void;
  onViewEvidence?: () => void;
}

export const ResultCard: React.FC<Props> = ({ data, onContinue, onViewEvidence }) => {
  return (
    <div className="mt-3 bg-white border border-slate-200 rounded-lg p-4 shadow-xs max-w-2xl">
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-indigo-50 text-indigo-600">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800">{data.title}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-100">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          语义统计核验通过
        </div>
      </div>

      {/* Main Metric Stat Display */}
      <div className="bg-indigo-50/50 border border-indigo-100/80 rounded p-3 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-500 font-medium block mb-0.5">
            {data.metricName} (常住)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              {data.coreValue}
            </span>
            <span className="text-xs font-bold text-slate-600">{data.coreUnit}</span>
          </div>
        </div>

        <div className="text-right pl-4 border-l border-indigo-200/60">
          <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-white px-2.5 py-1 rounded border border-indigo-100 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>{data.supplementLabel}: {data.supplementValue}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">
            占全区常住总人口比重
          </span>
        </div>
      </div>

      {/* Scope and info row */}
      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 mb-3">
        <div>
          <span className="text-slate-400 mr-1">统计范围:</span>
          <span className="font-semibold text-slate-700">{data.scope}</span>
        </div>
        <div>
          <span className="text-slate-400 mr-1">统计口径:</span>
          <span className="font-semibold text-slate-700">{data.metricName} (年龄≥60岁)</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={onViewEvidence}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded transition-colors cursor-pointer"
        >
          <FileSearch className="w-3.5 h-3.5 text-slate-500" />
          查看依据
        </button>
        <button
          onClick={onContinue}
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-all cursor-pointer"
        >
          继续分析
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

