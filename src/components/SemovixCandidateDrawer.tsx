import React, { useState } from 'react';
import { X, Layers, ChevronRight, Info, Check, ShieldCheck, Filter } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate?: (name: string) => void;
}

type CategoryType = 'ALL' | 'ENHANCEMENT' | 'ALTERNATIVE' | 'RELATED';

interface CandidateResource {
  name: string;
  category: 'ENHANCEMENT' | 'ALTERNATIVE' | 'RELATED';
  categoryLabel: string;
  type: string;
  statement: string; // 核心说明
  advantage: string;
  limitation: string;
  recommendation: string;
  badge: '可用' | '需申请';
  operations: string;
}

export const SemovixCandidateDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectCandidate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryType>('ALL');

  if (!isOpen) return null;

  const candidates: CandidateResource[] = [
    {
      name: '人口基本信息',
      category: 'ENHANCEMENT',
      categoryLabel: '增强资源 (ENHANCEMENT)',
      type: 'Data Asset · Table',
      statement: '已纳入完整 Data Solution，当前未进入核心执行组合。',
      advantage: '支持人级明细、自定义年龄段（如 80 岁以上高龄）及个体属性精准过滤',
      limitation: '人级明细表需申请 QUERY 查询权限 (当前处于 QUERY REQUESTABLE 状态)',
      recommendation: '已纳入完整数据方案，待审批完成后即可无缝启用人级深度研判',
      badge: '需申请',
      operations: 'DISCOVER, VIEW_METADATA (QUERY 需申请)',
    },
    {
      name: '人口年度统计',
      category: 'ALTERNATIVE',
      categoryLabel: '替代资源 (ALTERNATIVE)',
      type: 'Data Asset · View',
      statement: '具备历史多年度宏观切片，可作为中长期趋势回溯的备选替代资源。',
      advantage: '覆盖近 5 年常住人口老龄化宏观趋势，自带历史时序切片',
      limitation: '统计粒度为年度大口径，不满足当前街镇级精准空间供需匹配',
      recommendation: '可作为跨年度宏观趋势对比与预测推演的备选替代资源',
      badge: '可用',
      operations: 'DISCOVER, VIEW_METADATA, QUERY, EXPORT',
    },
    {
      name: '自然人家庭关系',
      category: 'RELATED',
      categoryLabel: '延伸资源 (RELATED)',
      type: 'Data Asset · Table',
      statement: '包含家庭户结构与家庭赡养关系，适合延伸至独居老人关爱等深层专题分析。',
      advantage: '涵盖同户家庭成员结构、独居高龄老人识别与家庭抚养负担比',
      limitation: '不直接提供全区街镇级老龄人口规模与机构床位供给指标',
      recommendation: '适合延伸至独居老人关爱、家庭互助型养老等深层专题分析时联合调用',
      badge: '需申请',
      operations: 'DISCOVER, VIEW_METADATA (QUERY 需申请)',
    },
  ];

  const filteredCandidates = selectedFilter === 'ALL'
    ? candidates
    : candidates.filter((c) => c.category === selectedFilter);

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'ENHANCEMENT':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ALTERNATIVE':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'RELATED':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-[2px]">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">其他相关资源</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                当前检索到但未进入核心执行组合的增强资源、替代资源与延伸资源。
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
            title="关闭面板"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-1.5 shrink-0 overflow-x-auto text-xs">
          <span className="text-slate-400 mr-1 flex items-center gap-1 text-[11px]">
            <Filter className="w-3 h-3" />
            分类:
          </span>
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              selectedFilter === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            全部 ({candidates.length})
          </button>
          <button
            onClick={() => setSelectedFilter('ENHANCEMENT')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              selectedFilter === 'ENHANCEMENT'
                ? 'bg-purple-700 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            ENHANCEMENT 增强 (1)
          </button>
          <button
            onClick={() => setSelectedFilter('ALTERNATIVE')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              selectedFilter === 'ALTERNATIVE'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            ALTERNATIVE 替代 (1)
          </button>
          <button
            onClick={() => setSelectedFilter('RELATED')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              selectedFilter === 'RELATED'
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            RELATED 延伸 (1)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
            <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>
              语义检索已为您自动建立跨域关联。您可以查看各类资产的适配场景与使用说明，并可根据后续深入分析需要按需纳入执行。
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredCandidates.map((c, i) => (
              <div
                key={i}
                className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:border-indigo-300 transition-colors space-y-3"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-800 text-sm">{c.name}</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded border ${getCategoryBadgeStyle(
                        c.category
                      )}`}
                    >
                      {c.category}
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded font-mono">
                      {c.type}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded shrink-0 ${
                      c.badge === '可用'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {c.badge}
                  </span>
                </div>

                {/* Core Statement */}
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-700 leading-relaxed">
                  <span className="text-slate-500 font-normal mr-1">定位说明：</span>
                  {c.statement}
                </div>

                {/* Pros & Limitations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-lg space-y-0.5">
                    <span className="font-bold text-emerald-800 block text-[10px]">优点与适用场景</span>
                    <span className="text-emerald-950 leading-relaxed">{c.advantage}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg space-y-0.5">
                    <span className="font-bold text-slate-700 block text-[10px]">局限性与使用前置</span>
                    <span className="text-slate-700 leading-relaxed">{c.limitation}</span>
                  </div>
                </div>

                {/* Recommendation and action */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                  <span className="truncate max-w-[340px]">
                    <strong className="text-slate-700">评估建议：</strong>
                    {c.recommendation}
                  </span>
                  {onSelectCandidate && (
                    <button
                      onClick={() => onSelectCandidate(c.name)}
                      className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-0.5 cursor-pointer shrink-0 ml-2"
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
