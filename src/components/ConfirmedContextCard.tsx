import React from 'react';
import { CheckCircle2, ShieldAlert, Check, Ban, AlertCircle } from 'lucide-react';
import { ConfirmedContextData } from '../types';

interface Props {
  data: ConfirmedContextData;
}

export const ConfirmedContextCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="mt-3 bg-emerald-50/60 border border-emerald-200/90 rounded-xl p-4 shadow-2xs max-w-2xl space-y-3">
      <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-900 tracking-wide">
            {data.statusText}
          </span>
          {data.selectionId && (
            <span className="px-2 py-0.5 bg-emerald-100/80 text-emerald-800 rounded font-mono text-[10px] font-semibold border border-emerald-200">
              {data.selectionId} · Rev {data.revision || 2}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-white/90 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Execution Context Bound</span>
        </div>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">目标模型</span>
          <span className="font-semibold text-slate-800 text-xs truncate block" title={data.metric}>
            {data.metric}
          </span>
        </div>
        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">分析范围</span>
          <span className="font-semibold text-slate-800 text-xs truncate block" title={data.scope}>
            {data.scope}
          </span>
        </div>
        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">下钻粒度</span>
          <span className="font-semibold text-slate-800 text-xs truncate block">{data.dimension}</span>
        </div>
        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100">
          <span className="text-slate-400 block text-[10px] mb-0.5">授权状态</span>
          <span className="font-semibold text-emerald-700 text-xs truncate block">
            {data.selectedItems ? `${data.selectedItems.length} 项已授权` : '4 项可用'}
          </span>
        </div>
      </div>

      {/* Selected Items (Strict Execution Selection) */}
      {data.selectedItems && data.selectedItems.length > 0 && (
        <div className="space-y-1 bg-white/80 p-2.5 rounded-lg border border-emerald-100/80">
          <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-[#16A36A]" />
            <span>本次执行资产 (Execution Selection · {data.selectedItems.length}项已绑定)</span>
          </span>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {data.selectedItems.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[11px] font-medium rounded border border-emerald-200 flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Excluded Items (Explicitly Excluded) */}
      {data.excludedItems && data.excludedItems.length > 0 && (
        <div className="space-y-1 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 text-xs">
          <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
            <Ban className="w-3 h-3 text-amber-700" />
            <span>本次排除资产 (Excluded from Selection)</span>
          </span>
          <div className="space-y-1 pt-0.5">
            {data.excludedItems.map((ex, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] bg-white/80 px-2 py-1 rounded border border-amber-100 text-amber-950">
                <span className="font-semibold">{ex.name}</span>
                <span className="font-mono text-[10px] text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
                  {ex.reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Limitations note */}
      {data.limitations && data.limitations.length > 0 && (
        <div className="p-2 bg-slate-100/70 rounded-lg text-[11px] text-slate-600 flex items-start gap-1.5 border border-slate-200/60">
          <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-700">执行约束与边界说明：</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600">
              {data.limitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

