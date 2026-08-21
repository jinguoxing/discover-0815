import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Database,
  FileCode,
  Layers,
  Lock,
  Calendar,
  Sparkles,
  GitCommit,
} from 'lucide-react';
import { EvidenceState } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  evidence: EvidenceState;
}

export const EvidenceModal: React.FC<Props> = ({ isOpen, onClose, evidence }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Semovix 完整数据依据与可信追溯
              </h3>
              <p className="text-xs text-slate-500">
                Enterprise Data Governance & Lineage Certification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-700">
          {/* Certificate Badge */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-emerald-900">
                  Semovix 语义治理平台核验凭证
                </div>
                <div className="text-[11px] text-emerald-700/80 mt-0.5">
                  指标与数据资产符合企业级语义与质量规范
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold bg-white text-emerald-700 border border-emerald-200 rounded-full shadow-2xs shrink-0">
              Pass Grade A+
            </span>
          </div>

          {/* Data Quality & Security Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>数据质量得分</span>
              </div>
              <div className="text-lg font-bold text-slate-900">{evidence.dataQualityPassRate}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span>密级等级</span>
              </div>
              <div className="text-xs font-bold text-slate-800 truncate">{evidence.securityLevel}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>数据刷新周期</span>
              </div>
              <div className="text-xs font-bold text-slate-800">日度增量同步 (Daily)</div>
            </div>
          </div>

          {/* Metric SQL Formula & Definition */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <FileCode className="w-4 h-4 text-blue-600" />
              <span>指标口径计算公式与约束</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed border border-slate-800 overflow-x-auto">
              <div className="text-blue-400 font-semibold mb-1">-- Semovix Semantic Metric: {evidence.metricDef.name}</div>
              <code>{evidence.metricDef.formula}</code>
            </div>
            <div className="text-slate-500 text-[11px]">
              数据责任部门: <span className="text-slate-800 font-semibold">{evidence.metricDef.owner}</span>
            </div>
          </div>

          {/* Lineage Trace */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <GitCommit className="w-4 h-4 text-indigo-600" />
              <span>级联血缘追溯 (Cascading Lineage)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-slate-400">ODS 原始层:</span>
                <span className="font-semibold text-slate-900">ODS_POLICE_POP (公安常住人口表)</span>
              </div>
              <div className="pl-4 border-l-2 border-slate-200 ml-1 py-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="text-slate-400">DWD 明细层:</span>
                  <span className="font-semibold text-slate-900">DWD_CITIZEN_INFO (市民全景视图)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                  <span className="text-slate-400">DWT 主题层:</span>
                  <span className="font-semibold text-slate-900">DWT_POP_THEME (人口人口统计主题)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-slate-400">APP 应用视图:</span>
                <span className="font-bold text-emerald-800">v_pop_demographics_theme (本工作区已绑定的视图)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Semovix Enterprise Data Governance Audit ID: #AUD-2026-88492
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            完成查看
          </button>
        </div>
      </div>
    </div>
  );
};
