import React from 'react';
import { GitCommit, ShieldCheck, CheckCircle2, ArrowRight, FileCheck, Hash } from 'lucide-react';
import { LineageQualityData } from '../types';

interface Props {
  data: LineageQualityData;
}

export const LineageQualityCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs space-y-3 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <GitCommit className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">数据血缘与质量存证凭证</h4>
            <p className="text-[10px] text-slate-400">目标资产：{data.targetAsset}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-medium border border-purple-100">
          <ShieldCheck className="w-3 h-3 text-purple-600" />
          <span>Semovix 区块链可信认证</span>
        </div>
      </div>

      {/* Lineage Flow Nodes */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-slate-400 font-medium">数据处理加工血缘链路 (Lineage Path)：</div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-1 text-[10px]">
          {data.nodes.map((nd, idx) => (
            <React.Fragment key={nd.step}>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 min-w-[120px] shrink-0 text-center">
                <div className="text-[9px] text-indigo-600 font-mono font-semibold uppercase">{nd.type}</div>
                <div className="font-bold text-slate-800 text-[10px] mt-0.5 truncate">{nd.name}</div>
              </div>
              {idx < data.nodes.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Quality Checks list */}
      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1.5 text-[11px]">
        <div className="font-bold text-slate-700 flex items-center gap-1 text-[10px]">
          <FileCheck className="w-3 h-3 text-emerald-600" />
          Semovix 自动化数据质量合规稽核结果：
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          {data.checks.map((chk, idx) => (
            <div key={idx} className="bg-white p-1.5 rounded border border-slate-200/80 flex items-center justify-between">
              <span className="text-slate-600">{chk.name}</span>
              <span className="font-bold font-mono text-emerald-600 flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                {chk.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hash & Auth Stamp */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 bg-slate-100/70 p-2 rounded-lg font-mono">
        <div className="flex items-center gap-1 truncate max-w-[320px]">
          <Hash className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">存证 Hash: {data.hash}</span>
        </div>
        <div className="text-slate-500 font-sans font-medium text-[10px]">
          发证机构：{data.certificateAuthority}
        </div>
      </div>
    </div>
  );
};
