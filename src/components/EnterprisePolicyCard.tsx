import React from 'react';
import { EnterprisePolicyData } from '../types';
import { Building2, TrendingUp, DollarSign, Award, CheckCircle2 } from 'lucide-react';

interface Props {
  data: EnterprisePolicyData;
}

export const EnterprisePolicyCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3 font-sans text-xs my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800 text-xs sm:text-sm">{data.title}</span>
            <div className="text-[10px] text-slate-400">经信委 × 财政局 产业扶持核算数据</div>
          </div>
        </div>

        <div className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
          专精特新政策评估
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">财政扶持总额</div>
          <div className="text-sm font-bold text-indigo-700 font-mono mt-0.5">{data.totalSubsidies}</div>
          <div className="text-[9px] text-slate-400">兑现率 100%</div>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">认定企业数</div>
          <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">{data.companyCount} 家</div>
          <div className="text-[9px] text-emerald-600 font-medium">国家级小巨人 28家</div>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">平均研发投入比</div>
          <div className="text-sm font-bold text-emerald-600 font-mono mt-0.5">{data.avgRndRatio}</div>
          <div className="text-[9px] text-emerald-600">远超全市均值</div>
        </div>

        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">产值同比拉动</div>
          <div className="text-sm font-bold text-indigo-900 font-mono mt-0.5">{data.outputGrowth}</div>
          <div className="text-[9px] text-indigo-600 font-medium">ROI 放大 4.2 倍</div>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div>
        <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-600" /> 重点扶持示范企业与税收贡献
          </span>
          <span className="text-[10px] text-slate-400">国家级与省级专精特新清单</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <th className="p-2 font-semibold">企业名称</th>
                <th className="p-2 font-semibold">行业赛道</th>
                <th className="p-2 font-semibold">获得补贴资金</th>
                <th className="p-2 font-semibold">年度地方税收贡献</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.topBeneficiaries.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="p-2 font-bold text-slate-800">{b.company}</td>
                  <td className="p-2 text-slate-600 text-[10px]">{b.category}</td>
                  <td className="p-2 font-mono font-bold text-indigo-700">{b.subsidy}</td>
                  <td className="p-2 font-mono font-bold text-emerald-600">{b.taxContribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Note */}
      <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded-lg text-[10px] text-indigo-900 leading-relaxed flex items-start gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">政策绩效总结：</span>
          {data.evalSummary}
        </div>
      </div>
    </div>
  );
};
