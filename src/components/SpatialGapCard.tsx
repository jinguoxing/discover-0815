import React from 'react';
import { Building2, AlertTriangle, CheckCircle2, TrendingUp, MapPin } from 'lucide-react';
import { SpatialGapData } from '../types';

interface Props {
  data: SpatialGapData;
}

export const SpatialGapCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs space-y-3 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{data.title}</h4>
            <p className="text-[10px] text-slate-400">结合 500 米生活圈与 80 岁以上高龄独居人群交叉研判</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-medium border border-amber-200">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>供需紧平衡状态</span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-slate-700 text-[11px] leading-relaxed font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        {data.summary}
      </p>

      {/* Data Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-2 px-3">重点街镇</th>
              <th className="py-2 px-2 text-right">80岁+高龄独居</th>
              <th className="py-2 px-2 text-center">长者食堂</th>
              <th className="py-2 px-2 text-center">照料床位</th>
              <th className="py-2 px-2 text-center">500m覆盖率</th>
              <th className="py-2 px-2 text-center">缺口等级</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.rows.map((row, idx) => {
              const isHighPressure = row.gapLevel === '高压';
              return (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2 px-3 font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-600 shrink-0" />
                    {row.town}
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-slate-700 font-semibold">{row.elderlySolo}</td>
                  <td className="py-2 px-2 text-center font-mono text-slate-700">{row.canteenCount} 家</td>
                  <td className="py-2 px-2 text-center font-mono text-slate-700">{row.careBeds} 张</td>
                  <td className="py-2 px-2 text-center">
                    <div className="flex items-center justify-center gap-1 font-mono font-bold text-slate-800">
                      <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            isHighPressure ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: row.coverage500m }}
                        />
                      </div>
                      <span className="text-[10px]">{row.coverage500m}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        isHighPressure
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {row.gapLevel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key finding */}
      <div className="bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100 text-[11px] text-indigo-950 space-y-1">
        <div className="font-bold text-indigo-900 flex items-center gap-1 text-[10px]">
          <TrendingUp className="w-3 h-3 text-indigo-600" />
          研判发现 (Key Finding)：
        </div>
        <p className="leading-relaxed">{data.keyFinding}</p>
      </div>
    </div>
  );
};
