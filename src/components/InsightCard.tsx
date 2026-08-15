import React from 'react';
import { Lightbulb, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { InsightData } from '../types';

interface Props {
  data: InsightData;
  onFollowUpFacility?: () => void;
}

export const InsightCard: React.FC<Props> = ({ data, onFollowUpFacility }) => {
  return (
    <div className="mt-3 bg-white border border-amber-200/80 rounded-lg p-4 shadow-xs max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-amber-100 text-amber-700">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-800">{data.title}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200">
          <Sparkles className="w-3 h-3 text-amber-600" />
          Xino AI Advisor Recommendation
        </div>
      </div>

      {/* Priorities List */}
      <div className="space-y-2.5 mb-3">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          优先关注区域与布局建议
        </div>

        {data.priorities.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {item.id}
                </span>
                <span className="text-xs font-bold text-slate-900">{item.townName}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  {item.reasonTag}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                老龄化率: <span className="font-bold text-slate-800">{item.agingRate}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 pl-6 leading-relaxed">{item.reasonDetail}</p>
          </div>
        ))}
      </div>

      {/* Suggestion Footer Note */}
      <div className="pt-2.5 border-t border-amber-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{data.suggestion}</span>
        </div>

        {onFollowUpFacility && (
          <button
            onClick={onFollowUpFacility}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200/80 rounded transition-colors cursor-pointer"
          >
            结合养老设施覆盖分析
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

