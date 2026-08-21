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
  KeyRound,
  FileCode,
  Tag,
  Building,
  Calendar,
  Eye,
} from 'lucide-react';
import {
  AvailabilitySnapshotViewModel,
  getMarketplaceResourceViewModel,
  getResourceFromSnapshot,
  getResourceStatusDisplay,
} from '../models/availability';

export type EvidenceTabType = 'evidence' | 'resource' | 'availability' | 'relation';

interface Props {
  activeTab: EvidenceTabType;
  onTabChange: (tab: EvidenceTabType) => void;
  selectedResourceId?: string;
  selectedResourceName?: string;
  onOpenPermissionDrawer?: () => void;
  scenario?: 'scenario-a' | 'scenario-b' | 'scenario-c';
  snapshot: AvailabilitySnapshotViewModel;
}

export const SemovixEvidencePanel: React.FC<Props> = ({
  activeTab,
  onTabChange,
  selectedResourceId,
  selectedResourceName = '60岁以上人口数',
  onOpenPermissionDrawer,
  scenario = 'scenario-a',
  snapshot,
}) => {
  const resourceIdentifier = selectedResourceId || selectedResourceName;
  const resourceModel = getMarketplaceResourceViewModel(snapshot, resourceIdentifier);
  const resourceStatus = getResourceStatusDisplay({
    resourceId: resourceModel.resourceId,
    resourceName: resourceModel.resourceName,
    resourceType: resourceModel.resourceType,
    operations: resourceModel.operations,
    checkedAt: resourceModel.checkedAt,
    validUntil: resourceModel.validUntil,
    requestState: resourceModel.requestState,
    roleTag: resourceModel.roleTag,
    isCoreForExecution: resourceModel.isCoreForExecution,
  });

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
                  <span className="font-semibold text-[#172033]">Metric Registry (正式指标库)</span>
                  <span className="px-1.5 py-0.2 bg-emerald-50 text-[#16A36A] text-[9px] font-mono rounded font-semibold border border-emerald-200">
                    Published
                  </span>
                </div>
                <div className="font-bold text-[#172033] text-xs">60岁以上人口数</div>
                <p className="text-[11px] text-[#667085]">官方统计口径，基于统计局常住人口摸底数据。</p>
                <div className="pt-1 text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200/70">
                  <span className="font-medium text-slate-700">指标治理规则：</span>
                  当前未发现正式发布的“老龄化率”指标。如业务需要，可前往指标管理创建或完善正式指标定义。Find Data 阶段不自动创建正式 Metric。
                </div>
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
            <div className="p-4 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl space-y-3.5 shadow-2xs">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#172033]">{resourceModel.resourceName}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] text-[#667085] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E6EAF0]">
                      {resourceModel.typeDisplay}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                      状态：{resourceModel.status}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-md border flex items-center gap-1 ${
                      resourceModel.availabilityBadge.includes('AVAILABLE')
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : resourceModel.availabilityBadge.includes('PENDING')
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {resourceModel.requestState === 'REQUEST_PENDING' && (
                      <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                    )}
                    {resourceModel.availabilityBadge}
                  </span>
                </div>
              </div>

              {/* Dynamic Metadata Attributes */}
              <div className="bg-white rounded-lg border border-[#E6EAF0] p-3 space-y-2 text-[11px]">
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">类型：</span>
                    <span className="font-semibold text-[#172033] font-mono">
                      {resourceModel.resourceType}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">状态：</span>
                    <span className="font-semibold text-emerald-700">
                      {resourceModel.status}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">方案角色：</span>
                    <span className="font-semibold text-[#2563EB]">
                      {resourceModel.roleTag}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">
                      {resourceModel.resourceType === 'Metric' ? '衡量对象：' : '业务对象：'}
                    </span>
                    <span className="font-semibold text-[#172033]">
                      {resourceModel.measureSubject}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">时间语义：</span>
                    <span className="font-semibold text-[#172033]">
                      {resourceModel.timeSemantics}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">记录粒度：</span>
                    <span className="font-semibold text-[#172033]">
                      {resourceModel.granularity}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-[#667085]">相关业务域：</span>
                    <span className="font-semibold text-[#172033]">
                      {resourceModel.businessDomain}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#667085]">责任单位：</span>
                    <span className="font-semibold text-[#172033]">
                      {resourceModel.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* Operations Matrix */}
              <div className="bg-white p-3 rounded-lg border border-[#E6EAF0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                    操作权限语义矩阵 (Operations Matrix)
                  </span>
                  <span className="text-[10px] text-slate-400">实时授权状态</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                  <div className="p-1.5 bg-[#F7F9FC] rounded border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-500">DISCOVER:</span>
                    <span className="font-bold text-emerald-700">{resourceModel.operations.DISCOVER}</span>
                  </div>
                  <div className="p-1.5 bg-[#F7F9FC] rounded border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-500">VIEW_METADATA:</span>
                    <span className="font-bold text-emerald-700">{resourceModel.operations.VIEW_METADATA}</span>
                  </div>
                  <div
                    className={`p-1.5 rounded border flex justify-between items-center ${
                      resourceModel.operations.QUERY === 'ALLOW'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : resourceModel.requestState === 'REQUEST_PENDING'
                        ? 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    <span className="font-semibold">QUERY:</span>
                    <span className="font-bold">
                      {resourceModel.requestState === 'REQUEST_PENDING'
                        ? 'PENDING'
                        : resourceModel.operations.QUERY}
                    </span>
                  </div>
                  <div className="p-1.5 bg-[#F7F9FC] rounded border border-slate-200/70 flex justify-between items-center">
                    <span className="text-slate-500">EXPORT:</span>
                    <span
                      className={`font-bold ${
                        resourceModel.operations.EXPORT === 'ALLOW' ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {resourceModel.operations.EXPORT}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Schema Fields Table */}
              <div className="bg-white p-3 rounded-lg border border-[#E6EAF0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#172033] flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#2563EB]" />
                    {resourceModel.resourceType === 'Metric' ? '指标统计维度与口径' : '关键语义列 (Schema Fields)'}
                  </span>
                  <span className="text-[10px] text-[#667085] font-mono">
                    {resourceModel.fields.length} 列
                  </span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
                  {resourceModel.fields.map((f) => (
                    <div
                      key={f.name}
                      className="p-2 bg-[#F7F9FC] border border-slate-100 rounded text-[10px] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        {f.isPrimaryKey && (
                          <span className="px-1 py-0.2 bg-indigo-100 text-[#4F46E5] rounded text-[8px] font-bold font-mono">
                            PK
                          </span>
                        )}
                        <span className="font-mono font-bold text-slate-800 truncate">{f.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 text-right">
                        <span className="text-slate-500 text-[10px]">{f.comment}</span>
                        <span className="px-1 py-0.2 bg-white border border-slate-200 rounded text-[9px] font-mono text-slate-600">
                          {f.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula & Compliance */}
              <div className="p-3 bg-blue-50/60 border border-blue-200/70 rounded-lg space-y-1.5 text-[11px]">
                <div className="font-bold text-blue-950 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>口径与合规说明</span>
                </div>
                <p className="text-blue-900 leading-relaxed font-mono text-[10px] bg-white/70 p-1.5 rounded border border-blue-100">
                  {resourceModel.summaryOrFormula}
                </p>
                <p className="text-slate-600 text-[10px] leading-relaxed">
                  {resourceModel.complianceNotes}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-1 space-y-2">
                {resourceModel.operations.QUERY === 'REQUESTABLE' &&
                  resourceModel.requestState === 'NOT_REQUESTED' &&
                  onOpenPermissionDrawer && (
                    <button
                      onClick={onOpenPermissionDrawer}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>申请该资源查询权限 (QUERY Permission)</span>
                    </button>
                  )}

                <button className="w-full py-2 bg-white border border-[#E6EAF0] hover:bg-slate-50 text-[#172033] font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
                  <span>在语义资产目录中查看完整详情</span>
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
                  Single Source of Truth · 权限检查：刚刚
                </p>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-mono font-bold rounded">
                {snapshot.summaryLabel}
              </span>
            </div>

            {/* List all resources strictly from AvailabilitySnapshotViewModel with explicit operation semantics */}
            <div className="border border-[#E6EAF0] rounded-xl overflow-hidden divide-y divide-[#E6EAF0] shadow-2xs bg-white">
              {snapshot.resources.map((res) => {
                const status = getResourceStatusDisplay(res);
                const isQueryAllowed = res.operations.QUERY === 'ALLOW' || res.requestState === 'AVAILABLE';
                const isMetadataAllowed = res.operations.VIEW_METADATA === 'ALLOW';

                return (
                  <div key={res.resourceId} className="p-3.5 bg-white space-y-2.5 text-xs hover:bg-slate-50/50 transition-colors">
                    {/* Top title & primary status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#172033] text-sm">{res.resourceName}</span>
                        <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                          {res.resourceType}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Primary Status with Operation semantics: QUERY · AVAILABLE or QUERY · REQUESTABLE */}
                        <span className={`px-2 py-0.5 border text-[10px] font-bold rounded flex items-center gap-1 ${
                          isQueryAllowed
                            ? 'bg-emerald-50 text-[#16A36A] border-emerald-200'
                            : res.requestState === 'REQUEST_PENDING'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {status.isPending && <Clock className="w-3 h-3 text-amber-700 animate-pulse" />}
                          {isQueryAllowed
                            ? 'QUERY · AVAILABLE'
                            : res.requestState === 'REQUEST_PENDING'
                            ? 'QUERY · REQUEST_PENDING'
                            : 'QUERY · REQUESTABLE'}
                        </span>

                        {status.canApply && onOpenPermissionDrawer && (
                          <button
                            onClick={onOpenPermissionDrawer}
                            className="px-2 py-0.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded text-[11px] font-medium cursor-pointer shadow-2xs"
                          >
                            {status.isPending ? '查看进度' : '申请权限'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Operation breakdown pills (P1-03) */}
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                      {/* VIEW_METADATA */}
                      <div className="p-1.5 bg-[#F7F9FC] rounded border border-slate-200/70 flex items-center justify-between">
                        <span className="text-slate-500">元数据:</span>
                        <span className="font-bold text-emerald-700">
                          {isMetadataAllowed ? 'AVAILABLE' : 'DENY'}
                        </span>
                      </div>

                      {/* QUERY */}
                      <div
                        className={`p-1.5 rounded border flex items-center justify-between ${
                          isQueryAllowed
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                            : res.requestState === 'REQUEST_PENDING'
                            ? 'bg-amber-100 border-amber-300 text-amber-900'
                            : 'bg-amber-50/70 border-amber-200 text-amber-800'
                        }`}
                      >
                        <span className="font-semibold">查询:</span>
                        <span className="font-bold">
                          {res.requestState === 'REQUEST_PENDING'
                            ? 'PENDING'
                            : isQueryAllowed
                            ? 'AVAILABLE'
                            : 'REQUESTABLE'}
                        </span>
                      </div>

                      {/* EXPORT */}
                      <div className="p-1.5 bg-[#F7F9FC] rounded border border-slate-200/70 flex items-center justify-between">
                        <span className="text-slate-500">导出:</span>
                        <span
                          className={`font-bold ${
                            res.operations.EXPORT === 'ALLOW' ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {res.operations.EXPORT === 'ALLOW' ? 'AVAILABLE' : 'DENY'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic summary and footer */}
            <div className="p-3.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl text-[11px] text-[#667085] leading-relaxed space-y-1.5 shadow-2xs">
              <div className="font-bold text-[#172033] flex items-center justify-between">
                <span>可用性统一度量：{snapshot.bottomSummaryText}</span>
                <span className="text-[10px] text-[#2563EB] font-normal font-mono bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                  权限检查：刚刚
                </span>
              </div>
              <p className="text-slate-600">
                当前状态是实时权限快照，进入查询、导出或 API 调用前仍会重新鉴权。
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

