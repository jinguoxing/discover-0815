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
  Clock,
} from 'lucide-react';
import {
  AvailabilitySnapshotViewModel,
  getResourceFromSnapshot,
  getResourceStatusDisplay,
} from '../models/availability';

export type EvidenceTabType = 'evidence' | 'resource' | 'availability' | 'relation';

interface Props {
  activeTab: EvidenceTabType;
  onTabChange: (tab: EvidenceTabType) => void;
  selectedResourceName?: string;
  onOpenPermissionDrawer?: () => void;
  scenario?: 'scenario-a' | 'scenario-b' | 'scenario-c';
  snapshot: AvailabilitySnapshotViewModel;
}

export const SemovixEvidencePanel: React.FC<Props> = ({
  activeTab,
  onTabChange,
  selectedResourceName = '人口基本信息',
  onOpenPermissionDrawer,
  scenario = 'scenario-a',
  snapshot,
}) => {
  const selectedResource = getResourceFromSnapshot(snapshot, selectedResourceName);
  const selectedStatus = selectedResource ? getResourceStatusDisplay(selectedResource) : null;
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
          { id: 'availability', label: `可用性 (${snapshot.availableCount}/${snapshot.totalCount})` },
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

              {/* Fact A: Metric Registry */}
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#172033]">Metric Registry</span>
                  <span className="px-1.5 py-0.2 bg-emerald-50 text-[#16A36A] text-[9px] font-mono rounded font-semibold border border-emerald-200">
                    Published
                  </span>
                </div>
                <div className="font-bold text-[#172033] text-xs">60岁以上人口数</div>
                <p className="text-[11px] text-[#667085]">官方统计口径，基于统计局常住人口摸底数据。</p>
              </div>

              {/* Fact B: Business Semantics */}
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#172033]">Business Semantics</span>
                  <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono rounded border border-blue-200">
                    Published
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {scenario === 'scenario-a'
                    ? ['自然人', '行政区域'].map((obj) => (
                        <span
                          key={obj}
                          className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#172033] rounded text-[11px] font-medium"
                        >
                          {obj}
                        </span>
                      ))
                    : scenario === 'scenario-b'
                    ? ['自然人', '服务工单', '行政区域'].map((obj) => (
                        <span
                          key={obj}
                          className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#172033] rounded text-[11px] font-medium"
                        >
                          {obj}
                        </span>
                      ))
                    : ['自然人', '行政区域', '养老机构'].map((obj) => (
                        <span
                          key={obj}
                          className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#172033] rounded text-[11px] font-medium"
                        >
                          {obj}
                        </span>
                      ))}
                </div>
              </div>

              {/* Fact C: Data Semantics */}
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#172033]">Data Semantics</span>
                  <span className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] text-[9px] font-mono rounded border border-indigo-200">
                    Effective
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="bg-white p-2 border border-[#E6EAF0] rounded">
                    <div className="text-[#172033] font-bold">人口基本信息</div>
                    <div className="flex items-center gap-3 text-[11px] text-[#667085] mt-0.5">
                      <span>记录主体：<strong className="text-[#172033]">自然人</strong></span>
                      <span>粒度：<strong className="text-[#172033]">人级</strong></span>
                    </div>
                  </div>
                  {scenario === 'scenario-b' && (
                    <div className="bg-white p-2 border border-[#E6EAF0] rounded">
                      <div className="text-[#172033] font-bold">公共服务热线工单记录表</div>
                      <div className="flex items-center gap-3 text-[11px] text-[#667085] mt-0.5">
                        <span>记录主体：<strong className="text-[#172033]">服务工单</strong></span>
                        <span>粒度：<strong className="text-[#172033]">工单事件</strong></span>
                      </div>
                    </div>
                  )}
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
                <div className="font-semibold text-[#172033]">方案推导评估</div>
                <div className="space-y-1.5 text-slate-700">
                  {scenario === 'scenario-b' ? (
                    <>
                      <div className="bg-white p-2 border border-amber-200 rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">实际老年诉求人识别</span>
                        <span className="text-amber-800 font-semibold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded">
                          人口基本信息 + 服务工单 (当前需要跨域关联)
                        </span>
                      </div>
                      <div className="bg-white p-2 border border-emerald-200 rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">区域比较方案</span>
                        <span className="text-emerald-800 font-semibold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                          60+人口数 + 服务工单 + 行政区划 (当前可执行)
                        </span>
                      </div>
                    </>
                  ) : scenario === 'scenario-c' ? (
                    <>
                      <div className="bg-white p-2 border border-[#E6EAF0] rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">人口规模</span>
                        <span className="text-[#2563EB] font-semibold">→ 60岁以上人口数</span>
                      </div>
                      <div className="bg-white p-2 border border-[#E6EAF0] rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">街镇</span>
                        <span className="text-[#2563EB] font-semibold">→ 行政区划</span>
                      </div>
                      <div className="bg-white p-2 border border-[#E6EAF0] rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">机构分布</span>
                        <span className="text-[#2563EB] font-semibold">→ 养老机构基本信息</span>
                      </div>
                      <div className="bg-white p-2 border border-[#E6EAF0] rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">床位能力</span>
                        <span className="text-[#2563EB] font-semibold">→ 养老机构服务能力</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-2 border border-[#E6EAF0] rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">人口规模</span>
                        <span className="text-[#2563EB] font-semibold">→ 60岁以上人口数</span>
                      </div>
                      <div className="bg-white p-2 border border-[#E6EAF0] rounded flex justify-between items-center">
                        <span className="font-medium text-slate-700">街镇</span>
                        <span className="text-[#2563EB] font-semibold">→ 行政区划</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg text-[11px] text-blue-900 leading-relaxed font-medium">
                <strong>当前判断：</strong>{' '}
                {scenario === 'scenario-a'
                  ? '标准人口规模分析不需要人级资源。'
                  : scenario === 'scenario-b'
                  ? '人级跨域关联需申请权限且路径待验证；区域级统计对比可直接执行。'
                  : '当前方案能够完整覆盖人口规模与养老资源供给侧分析。'}
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
                  {scenario === 'scenario-a'
                    ? '已有正式指标能够直接满足当前统计目标，因此不应默认把更敏感、更细粒度的人口明细作为核心资源。'
                    : scenario === 'scenario-b'
                    ? '当前两个方案解决的问题不同：人级跨域方案可以识别真实老年诉求人，但需要权限和更强关系证据；区域方案可以立即执行，但只能比较人口规模和整体诉求分布。'
                    : '因为当前目标同时需要人口规模、地域和养老服务能力，所以单一资源不足以完成整个目标。'}
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
                  <span className="text-[10px] text-[#667085] font-mono">
                    {selectedResource?.resourceType === 'Metric'
                      ? 'Metric Registry · Published'
                      : 'Data Asset · Marketplace Published'}
                  </span>
                </div>
                {selectedStatus && (
                  <span className={`px-2 py-0.5 border text-[10px] rounded ${selectedStatus.pillClasses}`}>
                    {selectedStatus.badgeLabel}
                  </span>
                )}
              </div>

              {/* Operations Matrix from unified model */}
              {selectedResource && (
                <div className="bg-white p-2.5 rounded border border-[#E6EAF0] space-y-1.5">
                  <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                    操作权限矩阵 (Operations Matrix)
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                    <div className="p-1 bg-[#F7F9FC] rounded border border-slate-200/60 flex justify-between">
                      <span className="text-slate-500">DISCOVER:</span>
                      <span className="font-bold text-emerald-700">{selectedResource.operations.DISCOVER}</span>
                    </div>
                    <div className="p-1 bg-[#F7F9FC] rounded border border-slate-200/60 flex justify-between">
                      <span className="text-slate-500">VIEW_METADATA:</span>
                      <span className="font-bold text-emerald-700">{selectedResource.operations.VIEW_METADATA}</span>
                    </div>
                    <div className={`p-1 rounded border flex justify-between ${
                      selectedResource.operations.QUERY === 'ALLOW'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : selectedResource.requestState === 'REQUEST_PENDING'
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      <span className="font-semibold">QUERY:</span>
                      <span className="font-bold">
                        {selectedResource.requestState === 'REQUEST_PENDING'
                          ? 'REQUEST_PENDING'
                          : selectedResource.operations.QUERY}
                      </span>
                    </div>
                    <div className="p-1 bg-[#F7F9FC] rounded border border-slate-200/60 flex justify-between">
                      <span className="text-slate-500">EXPORT:</span>
                      <span className={`font-bold ${
                        selectedResource.operations.EXPORT === 'ALLOW' ? 'text-emerald-700' : 'text-rose-600'
                      }`}>
                        {selectedResource.operations.EXPORT}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-[#E6EAF0] text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">当前方案角色</span>
                  <span className="font-semibold text-[#172033]">
                    {selectedResource?.roleTag || (
                      selectedResourceName === '60岁以上人口数'
                        ? 'PRIMARY · 人口规模'
                        : selectedResourceName === '行政区划'
                        ? 'REFERENCE · 区域维度'
                        : selectedResourceName === '养老机构基本信息'
                        ? 'DOMAIN · 养老机构'
                        : selectedResourceName === '养老机构服务能力'
                        ? 'DOMAIN · 供给能力'
                        : selectedResourceName === '12345热线工单信息' || selectedResourceName === '12345市民热线工单信息'
                        ? 'DOMAIN · 市民热线工单'
                        : 'OPTIONAL ENHANCEMENT · 人级补充'
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">主要记录主体</span>
                  <span className="font-semibold text-[#172033]">
                    {selectedResourceName === '行政区划'
                      ? '行政区域'
                      : selectedResourceName === '养老机构基本信息' || selectedResourceName === '养老机构服务能力'
                      ? '养老机构'
                      : selectedResourceName.includes('热线')
                      ? '工单记录'
                      : '自然人'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">记录粒度</span>
                  <span className="font-semibold text-[#172033]">
                    {selectedResourceName === '60岁以上人口数'
                      ? '街镇聚合指标 (Metric Level)'
                      : selectedResourceName === '行政区划'
                      ? '街镇/村居级'
                      : selectedResourceName === '养老机构基本信息' || selectedResourceName === '养老机构服务能力'
                      ? '机构级 (Facility Level)'
                      : selectedResourceName.includes('热线')
                      ? '工单级 (Ticket Level)'
                      : '人级 (Individual Level)'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-[#667085]">相关业务域</span>
                  <span className="font-semibold text-[#172033]">
                    {selectedResourceName.includes('养老')
                      ? '养老服务 · 设施与床位'
                      : selectedResourceName.includes('热线')
                      ? '公共服务 · 12345工单'
                      : '人口服务 · 人口统计'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-semibold text-[#667085]">
                  {selectedResourceName === '60岁以上人口数' ? '指标统计口径' : '关键语义列'}
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedResourceName === '60岁以上人口数'
                    ? ['age >= 60', 'resident_status = 常住', 'region_granularity = 街镇'].map((f) => (
                        <span
                          key={f}
                          className="px-2 py-1 bg-white border border-[#E6EAF0] text-[#172033] text-[10px] font-mono rounded"
                        >
                          {f}
                        </span>
                      ))
                    : selectedResourceName === '行政区划'
                    ? ['region_code (街镇编码)', 'region_name (街镇名称)', 'level (行政层级)'].map((f) => (
                        <span
                          key={f}
                          className="px-2 py-1 bg-white border border-[#E6EAF0] text-[#172033] text-[10px] font-mono rounded"
                        >
                          {f}
                        </span>
                      ))
                    : selectedResourceName === '养老机构基本信息'
                    ? ['org_id (机构ID)', 'org_name (机构名称)', 'region_code (所属街镇)', 'org_type (机构类型)'].map((f) => (
                        <span
                          key={f}
                          className="px-2 py-1 bg-white border border-[#E6EAF0] text-[#172033] text-[10px] font-mono rounded"
                        >
                          {f}
                        </span>
                      ))
                    : selectedResourceName === '养老机构服务能力'
                    ? ['org_id (机构ID)', 'total_beds (规划床位)', 'available_beds (可用床位)', 'care_beds (护理床位)'].map((f) => (
                        <span
                          key={f}
                          className="px-2 py-1 bg-white border border-[#E6EAF0] text-[#172033] text-[10px] font-mono rounded"
                        >
                          {f}
                        </span>
                      ))
                    : ['birth_date (出生日期)', 'resident_status (常住状态)', 'region_code (行政区域)'].map((f) => (
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                  统一可用性快照 (Availability Snapshot)
                </h3>
                <p className="text-[10px] text-[#667085] mt-0.5">
                  Single Source of Truth · 检查时间：{snapshot.timestamp}
                </p>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-mono font-bold rounded">
                {snapshot.summaryLabel}
              </span>
            </div>

            {/* List all resources strictly from AvailabilitySnapshotViewModel */}
            <div className="border border-[#E6EAF0] rounded-lg overflow-hidden divide-y divide-[#E6EAF0]">
              {snapshot.resources.map((res) => {
                const status = getResourceStatusDisplay(res);

                return (
                  <div key={res.resourceId} className="p-3 bg-white space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#172033]">{res.resourceName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({res.resourceType})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 border text-[10px] rounded flex items-center gap-1 ${status.pillClasses}`}>
                          {status.isPending && <Clock className="w-3 h-3 text-amber-700 animate-pulse" />}
                          {status.badgeLabel}
                        </span>
                        {status.canApply && onOpenPermissionDrawer && (
                          <button
                            onClick={onOpenPermissionDrawer}
                            className="text-[11px] text-[#2563EB] hover:underline font-medium cursor-pointer"
                          >
                            {status.isPending ? '查看进度' : '申请'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Operations pill matrix */}
                    <div className="flex items-center gap-1.5 text-[10px] font-mono pt-0.5">
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                        DISCOVER: {res.operations.DISCOVER}
                      </span>
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                        VIEW_METADATA: {res.operations.VIEW_METADATA}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded font-semibold ${
                        res.operations.QUERY === 'ALLOW'
                          ? 'bg-emerald-50 text-[#16A36A]'
                          : res.requestState === 'REQUEST_PENDING'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-amber-50 text-[#F59E0B]'
                      }`}>
                        QUERY: {res.requestState === 'REQUEST_PENDING' ? 'PENDING' : res.operations.QUERY}
                      </span>
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded">
                        EXPORT: {res.operations.EXPORT}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic summary badge box */}
            <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-[11px] text-[#667085] leading-relaxed space-y-1">
              <div className="font-semibold text-[#172033]">
                可用性统一度量：{snapshot.bottomSummaryText}
              </div>
              <p>
                当前所有视图（中间方案卡片、右侧依据面板、底部状态栏、授权抽屉）严格消费统一的 <code className="text-[#2563EB] font-bold">AvailabilitySnapshotViewModel</code>。
              </p>
            </div>
          </div>
        )}

        {activeTab === 'relation' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              {scenario === 'scenario-a'
                ? '指标维度关系 (Metric Dimension Mapping)'
                : scenario === 'scenario-b'
                ? '跨域业务对象与关系结构 (Cross-Domain Semantic Relations)'
                : '业务对象与关系结构 (Semantic Relation View)'}
            </h3>

            {/* Scenario A: Metric Dimension / Reference Mapping (Simple, no complex join) */}
            {scenario === 'scenario-a' ? (
              <div className="p-5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl text-center space-y-4">
                <div className="inline-block p-3 bg-white border border-emerald-200 rounded-xl shadow-2xs">
                  <div className="font-bold text-xs text-[#172033]">60岁以上人口数</div>
                  <div className="text-[10px] text-[#16A36A] font-mono mt-0.5">Published Metric</div>
                </div>

                <div className="flex flex-col items-center justify-center text-[#2563EB]">
                  <div className="h-6 w-0.5 bg-blue-300"></div>
                  <div className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-medium text-[#2563EB] my-1">
                    按行政区域统计 · Reference Mapping
                  </div>
                  <div className="text-blue-500 text-xs">▼</div>
                </div>

                <div className="inline-block p-3 bg-white border border-blue-200 rounded-xl shadow-2xs">
                  <div className="font-bold text-xs text-[#172033]">行政区划</div>
                  <div className="text-[10px] text-[#2563EB] font-mono mt-0.5">Reference Data Asset</div>
                </div>

                <div className="p-3 bg-white border border-[#E6EAF0] rounded-lg text-[11px] text-left text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">维度映射关系说明：</div>
                  <p>
                    • 关系类型：<strong>Metric Dimension / Reference Mapping</strong>
                  </p>
                  <p>• 关联字段：<code>region_code (街镇编码)</code></p>
                  <p>• 无需人级 Join，指标直接挂接行政区划维度即可完成街镇聚合。</p>
                </div>
              </div>
            ) : scenario === 'scenario-b' ? (
              /* Scenario B: Cross-Domain Population × Public Service Hotline Diagram */
              <div className="space-y-4">
                <div className="p-4 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl text-center space-y-3">
                  {/* Top Node: 人口基本信息 */}
                  <div className="inline-block px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-bold shadow-2xs">
                    人口基本信息
                  </div>

                  {/* Down Arrow: R2 Resource Binding */}
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="h-4 w-0.5 bg-indigo-300"></div>
                    <span className="text-[10px] text-[#4F46E5] font-mono bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 my-0.5">
                      │ R2 Resource Binding
                    </span>
                    <div className="text-[#4F46E5] text-xs">▼</div>
                  </div>

                  {/* Middle Node: 自然人 */}
                  <div className="inline-block px-4 py-2 bg-indigo-50 border border-indigo-200 text-[#4F46E5] rounded-xl text-xs font-bold shadow-2xs">
                    自然人 (Person)
                  </div>

                  {/* Up/Down Arrow: R1 诉求人 */}
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="text-[#2563EB] text-xs">▲</div>
                    <span className="text-[10px] text-[#2563EB] font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-100 my-0.5">
                      │ R1 诉求人 (Caller Subject)
                    </span>
                    <div className="h-4 w-0.5 bg-blue-300"></div>
                  </div>

                  {/* Middle Node 2: 服务工单 */}
                  <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 text-[#2563EB] rounded-xl text-xs font-bold shadow-2xs">
                    服务工单 (Service Ticket)
                  </div>

                  {/* Down Arrow: R2 Resource Binding */}
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="h-4 w-0.5 bg-blue-300"></div>
                    <span className="text-[10px] text-[#2563EB] font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-100 my-0.5">
                      │ R2 Resource Binding
                    </span>
                    <div className="text-[#2563EB] text-xs">▼</div>
                  </div>

                  {/* Bottom Node: 公共服务热线工单记录表 */}
                  <div className="inline-block px-3 py-1.5 bg-white border border-[#2563EB]/40 text-[#172033] rounded-lg text-xs font-bold shadow-2xs">
                    公共服务热线工单记录表
                  </div>
                </div>

                {/* Candidate Assessment Card */}
                <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-2 text-[11px]">
                  <div className="flex items-center justify-between font-bold text-purple-950">
                    <span className="text-xs">跨域人口身份关联</span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-mono rounded font-bold border border-purple-200">
                      R3 · Analytical Relation Candidate
                    </span>
                  </div>
                  <p className="text-purple-900 leading-relaxed">
                    说明：当前存在业务和数据映射依据，但尚未达到 <strong>R4 Verified Query Relation</strong>。
                  </p>
                  <p className="text-[10px] text-purple-800/80">
                    具体人口身份关联方式需要 Ask Data / Analytical Runtime 进一步验证。
                  </p>
                </div>
              </div>
            ) : (
              /* Scenario C Graph Visual */
              <div className="space-y-4">
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
        )}
      </div>
    </aside>
  );
};
