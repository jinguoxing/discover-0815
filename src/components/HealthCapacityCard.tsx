import React from 'react';
import { HealthCapacityData } from '../types';
import { Activity, Hospital, AlertTriangle, ShieldAlert, HeartPulse, ChevronRight } from 'lucide-react';

interface Props {
  data: HealthCapacityData;
}

export const HealthCapacityCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3 font-sans text-xs my-2">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800 text-xs sm:text-sm">{data.title}</span>
            <div className="text-[10px] text-slate-400">统计范围: {data.district}卫生健康委监管医院</div>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-full border ${
            data.capacityLevel === '高压'
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : data.capacityLevel === '警戒'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>医疗承载预警: {data.capacityLevel}</span>
        </div>
      </div>

      {/* Top 3 High Level KPI Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">日均门急诊总量</div>
          <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
            {data.outpatientVolume}
          </div>
          <div className="text-[10px] text-rose-600 font-medium">高峰拥挤度 +14.2%</div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">病床整体使用率</div>
          <div className="text-base sm:text-lg font-bold text-rose-600 font-mono mt-0.5">
            {data.bedOccupancyRate}
          </div>
          <div className="text-[10px] text-slate-400">超预警阈值 90%</div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
          <div className="text-[10px] text-slate-400">社区卫生中心数</div>
          <div className="text-base sm:text-lg font-bold text-indigo-700 font-mono mt-0.5">
            {data.healthCentersCount} <span className="text-xs font-sans text-slate-500 font-normal">家</span>
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">100% 联动发热门诊</div>
        </div>
      </div>

      {/* Hospital Breakdown Table */}
      <div>
        <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Hospital className="w-3.5 h-3.5 text-indigo-600" /> 重点医院门诊与病床使用明细
          </span>
          <span className="text-[10px] text-slate-400">卫健委实时监控监控中心</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <th className="p-2 font-semibold">医院名称</th>
                <th className="p-2 font-semibold">等级</th>
                <th className="p-2 font-semibold">病床占用率</th>
                <th className="p-2 font-semibold">日门诊量</th>
                <th className="p-2 font-semibold">运行状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.hospitals.map((h, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="p-2 font-bold text-slate-800">{h.name}</td>
                  <td className="p-2 font-mono text-slate-500 text-[10px]">{h.grade}</td>
                  <td className="p-2 font-mono font-bold text-rose-600">{h.bedRate}</td>
                  <td className="p-2 font-mono text-slate-700">{h.dailyOutpatient}</td>
                  <td className="p-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        h.status === '超负荷'
                          ? 'bg-rose-100 text-rose-800 font-bold'
                          : h.status === '高位运行'
                          ? 'bg-amber-100 text-amber-800 font-semibold'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Advice Notice */}
      <div className="p-2.5 bg-rose-50/70 border border-rose-100 rounded-lg text-rose-900 text-[11px] space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-rose-800">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          分级诊疗与应急调度建议：
        </div>
        <p className="leading-relaxed text-[10px] text-rose-800">{data.emergencyAdvice}</p>
      </div>
    </div>
  );
};
