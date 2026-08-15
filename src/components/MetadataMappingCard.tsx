import React, { useState } from 'react';
import { MetadataMappingData } from '../types';
import { Database, ShieldCheck, Key, Eye, EyeOff, Lock, Code2 } from 'lucide-react';

interface Props {
  data: MetadataMappingData;
}

export const MetadataMappingCard: React.FC<Props> = ({ data }) => {
  const [showMasked, setShowMasked] = useState(true);

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3 font-sans text-xs my-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-xs sm:text-sm">{data.tableChineseName}</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                {data.tableName}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              数据源头: {data.ownerDept} · 国家标准: {data.standardGb}
            </div>
          </div>
        </div>

        <div className="text-right font-mono">
          <div className="text-[10px] text-slate-400">核验记录总数</div>
          <div className="text-xs font-bold text-indigo-700">{data.recordCount} 条</div>
        </div>
      </div>

      {/* Field Dictionary Table */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 mb-1.5">
          <span className="flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-indigo-600" /> 数据结构与 C2 级脱敏字段字典
          </span>
          <button
            onClick={() => setShowMasked(!showMasked)}
            className="flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            {showMasked ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{showMasked ? '脱敏规则示列' : '原始类型明细'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[11px] text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <th className="p-1.5 font-semibold">物理字段名</th>
                <th className="p-1.5 font-semibold">中文业务含义</th>
                <th className="p-1.5 font-semibold">数据类型</th>
                <th className="p-1.5 font-semibold">安全脱敏规则 (C2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {data.fields.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="p-1.5 font-bold text-slate-800 flex items-center gap-1">
                    {f.primaryKey && <Key className="w-3 h-3 text-amber-500 shrink-0" />}
                    <span>{f.name}</span>
                  </td>
                  <td className="p-1.5 font-sans text-slate-700">{f.label}</td>
                  <td className="p-1.5 text-indigo-600">{f.dataType}</td>
                  <td className="p-1.5 font-sans">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        f.maskRule.includes('SHA256') || f.maskRule.includes('掩码')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {f.maskRule}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Footer */}
      <div className="p-2 bg-slate-900 text-slate-300 rounded-lg text-[10px] font-mono flex items-center justify-between border border-slate-800">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>合规存证: {data.complianceNotes}</span>
        </div>
        <span className="text-emerald-400 font-bold">Semovix Security Gateway Pass</span>
      </div>
    </div>
  );
};
