import React from 'react';
import {
  ShieldCheck,
  Database,
  Link,
  Lock,
  CheckCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileText,
  Layers,
  Check,
} from 'lucide-react';

export type EvidenceTabType = 'evidence' | 'resource' | 'availability' | 'relation';

interface Props {
  activeTab: EvidenceTabType;
  onTabChange: (tab: EvidenceTabType) => void;
  selectedResourceName?: string;
  onOpenPermissionDrawer?: () => void;
}

export const SemovixEvidencePanel: React.FC<Props> = ({
  activeTab,
  onTabChange,
  selectedResourceName = '人口基本信息',
  onOpenPermissionDrawer,
}) => {
  return (
    <aside className="w-[410px] bg-white border-l border-[#E6EAF0] flex flex-col shrink-0 overflow-hidden h-full select-none text-[#172033]">
      {/* Panel Header */}
      <div className="p-4 border-b border-[#E6EAF0] bg-white">
        <h2 className="text-sm font-bold text-[#172033]">推荐依据</h2>
        <p className="text-[11px] text-[#667085] mt-0.5">Semovix 语义智能与资产合规背书</p>
      </div>

      {/* 4 Tabs */}
      <div className="flex border-b border-[#E6EAF0] bg-[#F7F9FC] text-xs font-medium">
        {[
          { id: 'evidence', label: '方案依据' },
          { id: 'resource', label: '当前资源' },
          { id: 'availability', label: '可用性' },
          { id: 'relation', label: '相关关系' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as EvidenceTabType)}
            className={`flex-1 py-2.5 text-center transition-all cursor-pointer border-b-2 ${
              activeTab === tab.id
                ? 'border-[#2563EB] bg-white text-[#2563EB] font-bold shadow-2xs'
                : 'border-transparent text-[#667085] hover:text-[#172033] hover:bg-slate-100/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {activeTab === 'evidence' && (
          <div className="space-y-5">
            {/* 1. Source Facts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"></span>
                  1. Source Facts (事实源)
                </h3>
                <span className="text-[10px] text-[#667085]">Verified Metadata</span>
              </div>

              {/* Fact A: Business Semantics */}
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#172033]">Business Semantics</span>
                  <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono rounded">
                    Published
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {['自然人', '行政区域', '养老机构'].map((obj) => (
                    <span
                      key={obj}
                      className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#172033] rounded text-[11px]"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fact B: Metric Registry */}
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#172033]">Metric</span>
                  <span className="px-1.5 py-0.2 bg-emerald-50 text-[#16A36A] text-[9px] font-mono rounded">
                    Metric Registry · Published
                  </span>
                </div>
                <div className="font-bold text-[#172033] text-xs">60岁以上人口数</div>
                <p className="text-[11px] text-[#667085]">官方统计口径，基于统计局常住人口摸底数据。</p>
              </div>

              {/* Fact C: Data Semantics */}
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#172033]">Data Semantics</span>
                  <span className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] text-[9px] font-mono rounded">
                    Effective
                  </span>
                </div>
                <div className="text-[#172033] font-medium">人口基本信息</div>
                <div className="flex items-center gap-3 text-[11px] text-[#667085]">
                  <span>记录主体：<strong className="text-[#172033]">自然人</strong></span>
                  <span>记录粒度：<strong className="text-[#172033]">人级</strong></span>
                </div>
              </div>
            </div>

            {/* 2. Derived Assessment */}
            <div className="space-y-3 pt-2 border-t border-[#E6EAF0]">
              <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full"></span>
                2. Derived Assessment (推导评估)
              </h3>

              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-2 text-[11px]">
                <div className="font-semibold text-[#172033]">需求覆盖映射</div>
                <div className="grid grid-cols-2 gap-1.5 text-slate-700">
                  <div className="bg-white p-1.5 border border-[#E6EAF0] rounded flex justify-between">
                    <span>人口规模</span>
                    <span className="text-[#2563EB] font-mono">→ 60岁以上人口数</span>
                  </div>
                  <div className="bg-white p-1.5 border border-[#E6EAF0] rounded flex justify-between">
                    <span>街镇维度</span>
                    <span className="text-[#2563EB] font-mono">→ 行政区划</span>
                  </div>
                  <div className="bg-white p-1.5 border border-[#E6EAF0] rounded flex justify-between">
                    <span>机构分布</span>
                    <span className="text-[#2563EB] font-mono">→ 养老机构基本信息</span>
                  </div>
                  <div className="bg-white p-1.5 border border-[#E6EAF0] rounded flex justify-between">
                    <span>床位能力</span>
                    <span className="text-[#2563EB] font-mono">→ 养老机构服务能力</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-[11px] text-blue-900 leading-relaxed font-medium">
                <strong>适配判断：</strong> 当前方案能够完整覆盖人口规模与养老资源供给侧分析。
              </div>
            </div>

            {/* 3. AI Explanation */}
            <div className="pt-2 border-t border-[#E6EAF0]">
              <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#7C3AED]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI 解释</span>
                </div>
                <p className="text-[11px] text-purple-900/90 leading-relaxed">
                  因为当前目标同时需要人口规模、地域和养老服务能力，所以单一资源不足以完成整个目标。
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resource' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#172033]">{selectedResourceName}</h3>
                  <span className="text-[10px] text-[#667085] font-mono">Data Asset · Marketplace Published</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-[#F59E0B] border border-amber-200 text-[10px] font-bold rounded">
                  REQUESTABLE
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E6EAF0] text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">当前方案角色</span>
                  <span className="font-semibold text-[#172033]">人级补充数据</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">主要记录主体</span>
                  <span className="font-semibold text-[#172033]">自然人</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">记录粒度</span>
                  <span className="font-semibold text-[#172033]">人级 (Individual Level)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">相关业务域</span>
                  <span className="font-semibold text-[#172033]">人口服务 / 人口基础</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold text-[#667085]">关键语义列 (Key Semantic Fields)</span>
                <div className="flex flex-wrap gap-1">
                  {['birth_date (出生日期)', 'resident_status (常住状态)', 'region_code (行政区域)'].map((f) => (
                    <span
                      key={f}
                      className="px-2 py-1 bg-white border border-[#E6EAF0] text-[#172033] text-[10px] font-mono rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button className="w-full py-2 bg-white border border-[#E6EAF0] hover:bg-slate-50 text-[#172033] font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
                  <span>查看完整资源详情</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#667085]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              当前资源可用性 (Runtime Snapshot)
            </h3>

            <div className="border border-[#E6EAF0] rounded-lg overflow-hidden divide-y divide-[#E6EAF0]">
              {[
                { name: '人口基本信息', status: 'REQUESTABLE', color: 'text-[#F59E0B] bg-amber-50 border-amber-200' },
                { name: '60岁以上人口数', status: 'AVAILABLE', color: 'text-[#16A36A] bg-emerald-50 border-emerald-200' },
                { name: '行政区划', status: 'AVAILABLE', color: 'text-[#16A36A] bg-emerald-50 border-emerald-200' },
                { name: '养老机构基本信息', status: 'AVAILABLE', color: 'text-[#16A36A] bg-emerald-50 border-emerald-200' },
                { name: '养老机构服务能力', status: 'AVAILABLE', color: 'text-[#16A36A] bg-emerald-50 border-emerald-200' },
              ].map((res, i) => (
                <div key={i} className="p-3 bg-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#172033]">{res.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 border text-[10px] font-bold rounded ${res.color}`}>
                      {res.status === 'AVAILABLE' ? 'AVAILABLE' : 'REQUESTABLE · 需要申请'}
                    </span>
                    {res.status === 'REQUESTABLE' && onOpenPermissionDrawer && (
                      <button
                        onClick={onOpenPermissionDrawer}
                        className="text-[11px] text-[#2563EB] hover:underline font-medium cursor-pointer"
                      >
                        申请
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-[11px] text-[#667085] leading-relaxed">
              当前状态是实时权限快照。进入查询、导出或 API 调用前仍会重新鉴权。
            </div>
          </div>
        )}

        {activeTab === 'relation' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              业务对象与关系结构 (Semantic Relation View)
            </h3>

            {/* Light Graph Visual */}
            <div className="p-4 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-center space-y-3">
              <div className="flex items-center justify-around text-xs font-bold text-[#172033]">
                <div className="px-3 py-1.5 bg-white border border-[#E6EAF0] rounded-lg shadow-2xs">自然人</div>
                <span className="text-[10px] text-[#4F46E5] font-mono">R1 居住于 →</span>
                <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-[#4F46E5] rounded-lg shadow-2xs">
                  行政区域
                </div>
              </div>

              <div className="flex items-center justify-around text-xs font-bold text-[#172033]">
                <div className="px-3 py-1.5 bg-white border border-[#E6EAF0] rounded-lg shadow-2xs">养老机构</div>
                <span className="text-[10px] text-[#4F46E5] font-mono">R1 位于 →</span>
                <div className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-[#4F46E5] rounded-lg shadow-2xs">
                  行政区域
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#172033] pt-2 border-t border-slate-200">
                <div className="px-3 py-1.5 bg-white border border-[#E6EAF0] rounded-lg shadow-2xs">养老机构</div>
                <span className="text-[10px] text-emerald-600 font-mono">R2 提供 →</span>
                <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg shadow-2xs">
                  养老服务能力
                </div>
              </div>
            </div>

            {/* Inter-domain Analytical Relation */}
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg space-y-1 text-[11px]">
              <div className="flex items-center justify-between font-bold text-[#4F46E5]">
                <span>人口资源 ↔ 养老资源</span>
                <span className="px-1.5 py-0.2 bg-white text-[#4F46E5] text-[9px] font-mono border border-indigo-200 rounded">
                  R3 · Analytical Relation Candidate
                </span>
              </div>
              <p className="text-slate-700 pt-1">
                说明：可以围绕行政区域进行分析组合，具体查询关联路径将在 Ask Data 阶段验证。
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
