import React, { useState } from 'react';
import {
  ShieldCheck,
  Database,
  FileCode2,
  SlidersHorizontal,
  ExternalLink,
  CheckCircle2,
  Layers3,
  Sparkles,
} from 'lucide-react';
import { EvidenceState } from '../types';

interface Props {
  evidence: EvidenceState;
  highlightKey?: string;
  onOpenFullEvidence: () => void;
}

export const EvidenceSummary: React.FC<Props> = ({
  evidence,
  highlightKey,
  onOpenFullEvidence,
}) => {
  return (
    <aside className="w-[360px] bg-slate-50/50 border-l border-slate-200 flex flex-col h-full shrink-0 select-none overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Evidence
            </span>
            <span className="text-xs text-slate-400 font-medium">可信凭证</span>
          </div>

          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-100">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            已完成语义校验
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Module 1: 数据来源 */}
        <div
          className={`bg-white border rounded-lg p-3.5 transition-all ${
            highlightKey === 'sources'
              ? 'border-indigo-400 ring-2 ring-indigo-500/10 shadow-xs'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                <Database className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800">模块 1：数据来源</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">2 个资产</span>
          </div>

          <div className="space-y-2">
            {evidence.sources.map((src) => (
              <div
                key={src.id}
                className="p-2.5 rounded bg-slate-50 border border-slate-100 flex items-start justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    {src.name}
                    {src.verifiedBySemovix && (
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {src.code}
                  </div>
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-white text-slate-600 border border-slate-200 rounded shrink-0">
                  {src.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: 指标口径 */}
        <div
          className={`bg-white border rounded-lg p-3.5 transition-all ${
            highlightKey === 'metric'
              ? 'border-indigo-400 ring-2 ring-indigo-500/10 shadow-xs'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                <FileCode2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800">模块 2：指标口径</span>
            </div>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-medium border border-indigo-100">
              Semovix Standard
            </span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{evidence.metricDef.name}</span>
              <span className="text-[10px] font-medium text-slate-500">
                {evidence.metricDef.domain}
              </span>
            </div>
            <div className="text-slate-600 leading-relaxed font-normal bg-white p-2 rounded border border-slate-200/80 text-[11px]">
              <span className="text-slate-400 font-semibold block text-[10px] mb-0.5">业务定义:</span>
              {evidence.metricDef.rule}
            </div>
          </div>
        </div>

        {/* Module 3: 分析条件 */}
        <div
          className={`bg-white border rounded-lg p-3.5 transition-all ${
            highlightKey === 'conditions'
              ? 'border-indigo-400 ring-2 ring-indigo-500/10 shadow-xs'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-indigo-50 text-indigo-600">
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800">模块 3：分析条件</span>
            </div>
            <span className="text-[10px] text-slate-400">Context Bounds</span>
          </div>

          <div className="space-y-1.5 text-xs">
            {evidence.conditions.map((cond, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100"
              >
                <span className="text-slate-400 font-medium">{cond.label}:</span>
                <span className="font-semibold text-slate-800">{cond.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Data Lineage Preview Pill */}
        <div className="p-3 bg-emerald-50/80 border border-emerald-100 rounded-lg text-xs text-emerald-900 space-y-1">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5">
              <Layers3 className="w-3.5 h-3.5 text-emerald-600" />
              数据血缘链路与质量
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
              99.8% 校验
            </span>
          </div>
          <div className="text-[11px] text-emerald-700 font-mono truncate pt-0.5">
            {evidence.lineagePath}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-3.5 border-t border-slate-200 bg-white sticky bottom-0">
        <button
          onClick={onOpenFullEvidence}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded transition-colors cursor-pointer"
        >
          <span>查看完整依据</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </aside>
  );
};
