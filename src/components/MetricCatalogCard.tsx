import React from 'react';
import { BookOpen, ShieldCheck, Tag, Building2, CheckCircle2 } from 'lucide-react';
import { MetricCatalogData } from '../types';

interface Props {
  data: MetricCatalogData;
}

export const MetricCatalogCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs space-y-3 max-w-2xl">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              {data.name}
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 font-semibold">
                {data.code}
              </span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Semovix 语义认证 ({data.qualityScore})</span>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div className="text-slate-400 flex items-center gap-1 mb-0.5">
            <Tag className="w-3 h-3 text-slate-400" />
            <span>指标域与类型</span>
          </div>
          <p className="font-semibold text-slate-700">{data.category}</p>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div className="text-slate-400 flex items-center gap-1 mb-0.5">
            <Building2 className="w-3 h-3 text-slate-400" />
            <span>业务归口主管单位</span>
          </div>
          <p className="font-semibold text-slate-700">{data.department}</p>
        </div>
      </div>

      {/* Formula & Standard Rules */}
      <div className="space-y-1.5 text-[11px] bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100/60">
        <div>
          <span className="font-bold text-indigo-900">统计计算口径：</span>
          <code className="text-indigo-700 font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-indigo-100 ml-1">
            {data.formula}
          </code>
        </div>
        <div className="text-slate-600 leading-relaxed">
          <span className="font-bold text-indigo-900">标准认定细则：</span>
          {data.rule}
        </div>
      </div>

      {/* Security & Sync Info */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-indigo-600" />
          <span>脱敏密级：<strong className="text-slate-700 font-semibold">{data.securityLevel}</strong></span>
        </div>
        <div>
          更新周期：<span className="font-mono text-slate-700">{data.updateFreq}</span>
        </div>
      </div>
    </div>
  );
};
