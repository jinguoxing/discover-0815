import React from 'react';
import { Database, CheckCircle2, ShieldCheck, ArrowRight, FileSearch, Sparkles } from 'lucide-react';
import { DataSolutionData } from '../types';

interface Props {
  data: DataSolutionData;
  onUseSolution?: () => void;
  onViewEvidence?: () => void;
  isConfirmed?: boolean;
}

export const DataSolutionCard: React.FC<Props> = ({
  data,
  onUseSolution,
  onViewEvidence,
  isConfirmed = false,
}) => {
  return (
    <div className="mt-3 bg-white border border-slate-200 rounded-lg p-4 shadow-xs max-w-2xl">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-indigo-50 text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800">{data.title}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-medium border border-indigo-100">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          Semovix 语义治理认证
        </div>
      </div>

      {/* Main Asset Section */}
      <div className="p-3 rounded bg-slate-50 border border-slate-200 mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-semibold text-slate-400">主数据资产</span>
            <span className="text-xs font-bold text-slate-900">{data.mainAsset.name}</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded">
            {data.mainAsset.type}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-slate-400 font-medium shrink-0">覆盖能力:</span>
          <div className="flex flex-wrap gap-1.5">
            {data.mainAsset.coverage.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-xs rounded font-medium shadow-2xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Relation Asset & Metric Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400 font-medium mb-1">关联维度表</div>
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            {data.relationAsset}
          </div>
        </div>

        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400 font-medium mb-1">核心指标口径</div>
          <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>{data.metric.name}</span>
            <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-normal border border-indigo-100">
              {data.metric.definition}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Reasons */}
      <div className="pt-2 pb-2 mb-3 border-t border-slate-100">
        <div className="text-[11px] text-slate-400 font-medium mb-1.5">推荐该方案的原因</div>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
          {data.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={onViewEvidence}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded transition-colors cursor-pointer"
        >
          <FileSearch className="w-3.5 h-3.5 text-slate-500" />
          查看依据
        </button>

        <button
          onClick={onUseSolution}
          disabled={isConfirmed}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
            isConfirmed
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
          }`}
        >
          {isConfirmed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              已确认使用此方案
            </>
          ) : (
            <>
              使用方案
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
