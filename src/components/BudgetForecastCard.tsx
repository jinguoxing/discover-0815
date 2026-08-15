import React from 'react';
import { DollarSign, TrendingUp, Sparkles, PieChart, CheckCircle2, ArrowRight } from 'lucide-react';
import { BudgetForecastData } from '../types';

interface Props {
  data: BudgetForecastData;
}

export const BudgetForecastCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs space-y-3 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{data.title}</h4>
            <p className="text-[10px] text-slate-400">基于高龄失能增长模型与财政倾斜算法测算</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold border border-indigo-100">
          <TrendingUp className="w-3 h-3 text-indigo-600" />
          <span>年均增长率 (CAGR) {data.cagr}</span>
        </div>
      </div>

      {/* 3-Year Projection Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-2 px-3">规划年度</th>
              <th className="py-2 px-2 text-right">莘庄镇需求</th>
              <th className="py-2 px-2 text-right">七宝镇需求</th>
              <th className="py-2 px-2 text-right">颛桥镇需求</th>
              <th className="py-2 px-3 text-right bg-indigo-50/50 text-indigo-900 font-bold">合计预算需求</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.years.map((yr, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-800">{yr.year}</td>
                <td className="py-2 px-2 text-right font-mono text-slate-700">{yr.xinzhuang}</td>
                <td className="py-2 px-2 text-right font-mono text-slate-700">{yr.qibao}</td>
                <td className="py-2 px-2 text-right font-mono text-slate-700">{yr.zhuanqiao}</td>
                <td className="py-2 px-3 text-right font-mono font-bold text-indigo-700 bg-indigo-50/30">
                  {yr.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Capital Allocation Ratio Cards */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
          <PieChart className="w-3 h-3 text-indigo-600" />
          预算资金精准投放建议比重：
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {data.allocations.map((alc, idx) => (
            <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-[11px]">{alc.area}</span>
                <span className="text-[11px] font-bold font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                  {alc.ratio}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 leading-tight">{alc.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Suggestion Box */}
      <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-2.5 text-[11px] text-emerald-950 space-y-1">
        <div className="font-bold text-emerald-900 flex items-center gap-1 text-[10px]">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          政务决策配套政策建议：
        </div>
        <p className="leading-relaxed">{data.policySuggestion}</p>
      </div>
    </div>
  );
};
