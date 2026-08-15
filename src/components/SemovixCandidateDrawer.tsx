import React from 'react';
import { X, Layers, ChevronRight, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate?: (name: string) => void;
}

export const SemovixCandidateDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectCandidate,
}) => {
  if (!isOpen) return null;

  const candidates = [
    {
      name: '人口基本信息',
      type: 'Data Asset · Table',
      reason: '支持人级明细下钻与精确年龄段校验',
      limitation: '包含敏感信息，处于 REQUESTABLE 需申请状态',
      recommendation: '已包含在 Data Solution 增强套件中',
      badge: '需申请',
    },
    {
      name: '人口年度统计',
      type: 'Data Asset · View',
      reason: '具备多年度历史切片，便于进行粗粒度回溯',
      limitation: '空间粒度仅到区级，不支持街镇维度下钻',
      recommendation: '不建议作为当前街镇配比的主资源',
      badge: '可用',
    },
    {
      name: '自然人家庭关系',
      type: 'Data Asset · Table',
      reason: '支持户籍家庭户与独居老人判定',
      limitation: '业务焦点偏向家庭结构而非整体人口规模',
      recommendation: '适合未来延伸至独居老人专项研判',
      badge: '需申请',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-[2px]">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">其他候选资源 (Candidate Resources)</h3>
              <p className="text-xs text-slate-500">语义检索召回的平行数据资产对比</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              候选资源经过 Semantic Discovery 初筛，但未能入选最小足够 Data Solution。您可以查看其适配原因与局限性。
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
            {candidates.map((c, i) => (
              <div key={i} className="p-4 bg-white hover:bg-slate-50/70 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{c.name}</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] rounded font-mono">
                      {c.type}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                      c.badge === '可用'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {c.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                  <div className="bg-emerald-50/50 border border-emerald-100/60 p-2 rounded">
                    <span className="font-semibold text-emerald-800 block mb-0.5">适合原因</span>
                    <span className="text-emerald-900">{c.reason}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-2 rounded">
                    <span className="font-semibold text-slate-700 block mb-0.5">局限性</span>
                    <span className="text-slate-600">{c.limitation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>评估建议：{c.recommendation}</span>
                  {onSelectCandidate && (
                    <button
                      onClick={() => onSelectCandidate(c.name)}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>替换至方案</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
