import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  Shield,
  Lock,
  FileText,
  UserCheck,
  Building2,
  MapPin,
  Clock,
  ExternalLink,
  Bell,
  User,
  MoreHorizontal,
  RefreshCw,
  HelpCircle,
  Check,
} from 'lucide-react';
import { SemovixEvidencePanel, EvidenceTabType } from './SemovixEvidencePanel';
import { SemovixPermissionDrawer } from './SemovixPermissionDrawer';
import { SemovixCandidateDrawer } from './SemovixCandidateDrawer';

interface Props {
  onEnterAskData?: (selection?: any) => void;
}

export const SemovixFindDataDemo: React.FC<Props> = ({ onEnterAskData }) => {
  // Scenario state: 'scenario-c' (default), 'scenario-a', 'scenario-b'
  const [activeScenario, setActiveScenario] = useState<'scenario-a' | 'scenario-b' | 'scenario-c'>('scenario-c');

  // Evidence Panel active tab
  const [evidenceTab, setEvidenceTab] = useState<EvidenceTabType>('evidence');

  // Drawers state
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);
  const [isCandidateOpen, setIsCandidateOpen] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Expandable pipeline state in Round 02
  const [isPipelineExpanded, setIsPipelineExpanded] = useState(false);

  // Selected resource for Right Evidence Panel
  const [selectedResource, setSelectedResource] = useState('人口基本信息');

  // Interactive input state
  const [inputQuery, setInputQuery] = useState('');

  const handleSelectResourceForEvidence = (name: string, tab: EvidenceTabType = 'resource') => {
    setSelectedResource(name);
    setEvidenceTab(tab);
  };

  return (
    <div className="w-full h-full bg-[#F7F9FC] font-sans text-[#172033] flex flex-col overflow-hidden select-none">
      {/* ================= HEADER ================= */}
      <header className="h-14 border-b border-[#E6EAF0] bg-white px-5 flex items-center justify-between shrink-0 z-20">
        {/* Left: Semovix Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-2xs italic">
            SX
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="font-bold text-[#172033] text-sm tracking-tight">Semovix</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#667085] font-medium">AI 工作台</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#2563EB] font-bold">找数</span>
          </div>
        </div>

        {/* Middle: Current Task & Status Tag */}
        <div className="hidden md:flex items-center gap-2.5 bg-[#F7F9FC] px-3.5 py-1.5 rounded-full border border-[#E6EAF0] text-xs">
          <span className="font-semibold text-[#172033]">
            {activeScenario === 'scenario-c' && '老年人口养老服务资源匹配分析'}
            {activeScenario === 'scenario-a' && '各街镇 60 岁以上常住人口规模分析'}
            {activeScenario === 'scenario-b' && '老年人口公共服务热线诉求特征分析'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]"></span>
          <span className="text-[11px] text-[#16A36A] font-bold">数据方案已形成</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E6EAF0] hover:bg-slate-50 text-[#172033] rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-2xs">
            <Plus className="w-3.5 h-3.5 text-[#667085]" />
            <span>新建任务</span>
          </button>

          <button className="p-1.5 text-[#667085] hover:text-[#172033] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>

          <button className="p-1.5 text-[#667085] hover:text-[#172033] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>

          <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            SX
          </div>
        </div>
      </header>

      {/* ================= 3-COLUMN MAIN BODY ================= */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* ---------------- LEFT SIDEBAR (250px) ---------------- */}
        <aside className="w-[250px] bg-white border-r border-[#E6EAF0] flex flex-col shrink-0 overflow-hidden select-none">
          {/* Top Search */}
          <div className="p-3 border-b border-[#E6EAF0]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#667085] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="搜索会话…"
                className="w-full pl-8 pr-3 py-1.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-xs outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>

          {/* Hero Scenarios Section */}
          <div className="p-3 space-y-2 border-b border-[#E6EAF0]">
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider px-1">
              政务人口 · 示例任务
            </div>

            {/* Scenario A */}
            <div
              onClick={() => setActiveScenario('scenario-a')}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                activeScenario === 'scenario-a'
                  ? 'bg-blue-50/70 border-blue-200 shadow-2xs'
                  : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#172033] line-clamp-1">
                  各街镇老年人口规模需要哪些数据？
                </span>
                <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[9px] rounded shrink-0">
                  单域找数
                </span>
              </div>
              <p className="text-[10px] text-[#667085]">人口服务 · 人口统计</p>
            </div>

            {/* Scenario B */}
            <div
              onClick={() => setActiveScenario('scenario-b')}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                activeScenario === 'scenario-b'
                  ? 'bg-blue-50/70 border-blue-200 shadow-2xs'
                  : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#172033] line-clamp-1">
                  分析老年人口的公共服务热线诉求情况
                </span>
                <span className="px-1.5 py-0.2 bg-[#4F46E5]/10 text-[#4F46E5] text-[9px] rounded shrink-0 font-medium">
                  跨域找数
                </span>
              </div>
              <p className="text-[10px] text-[#667085]">人口服务 × 公共服务</p>
            </div>

            {/* Scenario C (Active Default) */}
            <div
              onClick={() => setActiveScenario('scenario-c')}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                activeScenario === 'scenario-c'
                  ? 'bg-blue-50/80 border-[#2563EB]/40 shadow-2xs ring-1 ring-blue-500/20'
                  : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#2563EB] line-clamp-1">
                  分析老年人口规模与养老服务资源是否匹配
                </span>
                <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[9px] font-bold rounded shrink-0">
                  决策型找数
                </span>
              </div>
              <p className="text-[10px] text-blue-900/80 font-medium">人口服务 × 养老服务</p>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider px-1">
              最近
            </div>
            <div className="space-y-0.5 text-[#172033]">
              {[
                '找人口服务相关数据',
                '闵行区老年人口趋势',
                '热线诉求数据分析',
                '老龄人口指标口径',
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-xs text-[#667085] hover:text-[#172033] truncate"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Current Context (Left Bottom) */}
          <div className="p-3 border-t border-[#E6EAF0] bg-[#F7F9FC] space-y-2.5 text-xs">
            <div className="text-[11px] font-bold text-[#172033] uppercase tracking-wider flex items-center justify-between">
              <span>当前上下文</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-blue-100 text-[#2563EB] rounded font-mono">Context</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="text-[#667085] block text-[10px]">当前目标</span>
                <span className="font-bold text-[#172033]">老年人口 × 养老服务资源匹配</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[10px]">范围</span>
                <span className="font-medium text-[#172033]">上海市闵行区</span>
              </div>

              <div>
                <span className="text-[#667085] block text-[10px]">当前业务范围</span>
                <div className="flex gap-1 mt-0.5">
                  <span className="px-1.5 py-0.2 bg-white border border-[#E6EAF0] text-[#172033] rounded text-[10px]">
                    人口服务
                  </span>
                  <span className="px-1.5 py-0.2 bg-white border border-[#E6EAF0] text-[#172033] rounded text-[10px]">
                    养老服务
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[#667085] block text-[10px]">识别业务对象</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {['自然人', '行政区域', '养老机构'].map((obj) => (
                    <span
                      key={obj}
                      className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] border border-indigo-100 rounded text-[10px] font-medium"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ---------------- MIDDLE WORKSPACE (~920px) ---------------- */}
        <main className="flex-1 bg-[#F7F9FC] flex flex-col overflow-hidden relative">
          {/* Scrollable Conversation History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* ================ ROUND 01 ================ */}
            <div className="space-y-3">
              {/* User Bubble */}
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg shadow-2xs leading-relaxed">
                  我想分析闵行区各街镇老年人口规模和养老服务资源是否匹配。
                </div>
              </div>

              {/* AI Response & Understanding Block */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs space-y-2 leading-relaxed">
                    <p>
                      我理解你希望同时回答两个问题：各街镇有多少老年人口，以及养老机构和床位资源是否与人口分布匹配。
                    </p>
                    <p className="text-[#667085]">
                      我会优先从人口服务和养老服务相关资源中寻找能够覆盖人口、区域和养老资源的数据。
                    </p>
                  </div>

                  {/* Block: 当前理解 */}
                  <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#172033] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                        当前理解
                      </h4>
                      <button className="text-[11px] text-[#2563EB] hover:underline font-medium cursor-pointer">
                        调整理解
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-[#F7F9FC] p-2 rounded border border-[#E6EAF0]">
                        <span className="text-[#667085] block text-[10px]">目标</span>
                        <span className="font-semibold text-[#172033]">老年人口规模 × 养老服务资源匹配</span>
                      </div>
                      <div className="bg-[#F7F9FC] p-2 rounded border border-[#E6EAF0]">
                        <span className="text-[#667085] block text-[10px]">业务对象</span>
                        <span className="font-semibold text-[#172033]">自然人 · 行政区域 · 养老机构</span>
                      </div>
                      <div className="bg-[#F7F9FC] p-2 rounded border border-[#E6EAF0]">
                        <span className="text-[#667085] block text-[10px]">主要维度</span>
                        <span className="font-semibold text-[#172033]">街镇</span>
                      </div>
                      <div className="bg-[#F7F9FC] p-2 rounded border border-[#E6EAF0]">
                        <span className="text-[#667085] block text-[10px]">人口范围</span>
                        <span className="font-semibold text-[#172033]">60 岁及以上 · 常住人口</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 02 ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  先按 60 岁及以上常住人口，街镇维度就可以。
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-2 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    好的，这个范围已经足够形成第一版数据方案，我继续查找相关资源。
                  </div>

                  {/* Badge: 需求已更新 */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#667085]">需求已更新：</span>
                    {['60岁及以上', '常住人口', '街镇'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-blue-50 text-[#2563EB] border border-blue-100 rounded text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Pipeline: 正在查找合适的数据 */}
                  <div className="bg-white rounded-xl border border-[#E6EAF0] overflow-hidden text-xs">
                    <button
                      onClick={() => setIsPipelineExpanded(!isPipelineExpanded)}
                      className="w-full px-3.5 py-2 bg-[#F7F9FC] flex items-center justify-between text-[#667085] font-medium cursor-pointer hover:bg-slate-100/60 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-[11px]">
                        <RefreshCw className="w-3.5 h-3.5 text-[#2563EB] animate-spin" />
                        正在查找合适的数据…
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isPipelineExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isPipelineExpanded && (
                      <div className="p-3 bg-white space-y-1.5 text-[11px] text-[#667085] border-t border-[#E6EAF0]">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                          <span>已理解业务目标</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                          <span>已定位人口服务与养老服务范围</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                          <span>已解析相关业务语义</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                          <span>正在检查资源覆盖与可用状态</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 03 MAIN DATA SOLUTION ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  有哪些数据可以用？
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-4 max-w-3xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    找到了一套目前覆盖比较完整的数据方案。人口规模优先使用正式人口指标；行政区划用于统一街镇维度；养老机构与养老服务能力资源用于描述机构和床位供给。人口基本信息可以支持进一步的人级分析，但当前需要申请使用权限。
                  </div>

                  {/* MAIN CARD: 老年人口养老服务匹配分析 · 数据方案 */}
                  <div className="bg-white rounded-xl border border-[#2563EB]/40 shadow-md overflow-hidden ring-1 ring-blue-500/10">
                    {/* Card Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/50 border-b border-[#E6EAF0] flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#172033]">
                            老年人口养老服务匹配分析 · 数据方案
                          </h3>
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">
                            Data Solution
                          </span>
                        </div>
                        <p className="text-xs text-[#667085] mt-0.5">当前推荐的最小且足够资源组合</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2563EB]">V1.0 Certified</span>
                    </div>

                    {/* Resources List */}
                    <div className="p-4 space-y-3 divide-y divide-[#E6EAF0]">
                      {/* Resource 01 */}
                      <div className="pt-2 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#172033]">60 岁以上人口数</span>
                            <span className="px-1.5 py-0.2 bg-emerald-50 text-[#16A36A] text-[10px] font-mono border border-emerald-200 rounded font-bold">
                              Metric · Published
                            </span>
                          </div>
                          <p className="text-xs text-[#667085]">
                            角色：<strong className="text-[#172033]">人口规模</strong> | 负责：正式老年人口统计口径
                          </p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-xs font-bold rounded-md">
                          AVAILABLE
                        </span>
                      </div>

                      {/* Resource 02 */}
                      <div className="pt-3 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#172033]">行政区划</span>
                            <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[10px] font-mono border border-blue-200 rounded">
                              Data Asset
                            </span>
                          </div>
                          <p className="text-xs text-[#667085]">
                            角色：<strong className="text-[#172033]">区域维度</strong> | 负责：街镇 / 社区 / 行政区域统一
                          </p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-xs font-bold rounded-md">
                          AVAILABLE
                        </span>
                      </div>

                      {/* Resource 03 */}
                      <div className="pt-3 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#172033]">养老机构基本信息</span>
                            <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[10px] font-mono border border-blue-200 rounded">
                              Data Asset
                            </span>
                          </div>
                          <p className="text-xs text-[#667085]">
                            角色：<strong className="text-[#172033]">养老机构</strong> | 负责：机构名称 · 类型 · 所属区域 · 运营状态
                          </p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-xs font-bold rounded-md">
                          AVAILABLE
                        </span>
                      </div>

                      {/* Resource 04 */}
                      <div className="pt-3 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#172033]">养老机构服务能力</span>
                            <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[10px] font-mono border border-blue-200 rounded">
                              Data Asset
                            </span>
                          </div>
                          <p className="text-xs text-[#667085]">
                            角色：<strong className="text-[#172033]">服务能力</strong> | 负责：床位总量 · 可用床位 · 服务类型
                          </p>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-xs font-bold rounded-md">
                          AVAILABLE
                        </span>
                      </div>

                      {/* Optional Resource 05 */}
                      <div className="pt-3 flex items-start justify-between bg-amber-50/40 -mx-4 px-4 py-2.5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-800">人口基本信息</span>
                            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-mono border border-amber-200 rounded font-semibold">
                              Data Asset · Table (人级补充)
                            </span>
                          </div>
                          <p className="text-xs text-amber-900/80">
                            角色：<strong className="text-amber-950">人级补充数据</strong> | 负责：自然人 · 出生日期 · 常住状态 · 所属区域
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 border text-xs font-bold rounded ${
                            isPermissionGranted
                              ? 'bg-emerald-50 text-[#16A36A] border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}>
                            {isPermissionGranted ? 'AVAILABLE' : 'REQUESTABLE · 需要申请'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Coverage Checklist */}
                    <div className="p-4 bg-[#F7F9FC] border-t border-[#E6EAF0] space-y-2">
                      <div className="font-bold text-xs text-[#172033]">当前方案覆盖：</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>老年人口规模 (已覆盖)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>街镇分布 (已覆盖)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>养老机构数量 (已覆盖)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>养老床位资源 (已覆盖)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                          <Lock className="w-3.5 h-3.5" />
                          <span>人级明细分析 (需要人口明细权限)</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Gap */}
                    <div className="p-3.5 bg-amber-50/70 border-t border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <strong className="font-bold text-amber-950">当前方案缺口：</strong>
                      当前已发现资源尚未覆盖 <strong className="underline">养老服务实际使用情况</strong>，例如入住率、服务人次或真实服务使用记录。
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 bg-white border-t border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEnterAskData && onEnterAskData()}
                          className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>使用当前可用方案进入问数</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setIsPermissionOpen(true)}
                          className="px-3.5 py-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          申请人口明细权限
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#667085]">
                        <button
                          onClick={() => handleSelectResourceForEvidence('人口基本信息', 'evidence')}
                          className="hover:text-[#2563EB] font-medium underline cursor-pointer"
                        >
                          查看推荐依据
                        </button>
                        <button
                          onClick={() => setIsCandidateOpen(true)}
                          className="hover:text-[#2563EB] font-medium underline cursor-pointer"
                        >
                          查看其他候选 · 3
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 04 EVIDENCE QUESTION ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  为什么这些资源要组合使用？
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    因为当前目标同时涉及人口规模、空间分布和养老服务能力，没有单一资源可以完整覆盖。正式人口指标负责回答“有多少老年人口”，行政区划统一街镇维度，养老机构和服务能力资源负责回答“养老资源在哪里、能提供多少服务能力”。
                  </div>

                  {/* Mapping Block */}
                  <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-2">
                    <h4 className="font-bold text-xs text-[#172033]">需求 → 资源映射</h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#667085]">
                      <div className="p-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded flex justify-between">
                        <span>人口规模</span>
                        <span className="font-bold text-[#2563EB]">→ 60岁以上人口数</span>
                      </div>
                      <div className="p-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded flex justify-between">
                        <span>街镇</span>
                        <span className="font-bold text-[#2563EB]">→ 行政区划</span>
                      </div>
                      <div className="p-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded flex justify-between">
                        <span>养老机构</span>
                        <span className="font-bold text-[#2563EB]">→ 养老机构基本信息</span>
                      </div>
                      <div className="p-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded flex justify-between">
                        <span>床位能力</span>
                        <span className="font-bold text-[#2563EB]">→ 养老机构服务能力</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 05 RELATIONSHIP BOUNDARY ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  这些数据之间已经可以直接关联了吗？
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    目前已经确认这些资源在业务上都与“行政区域”相关，并且养老机构资源之间存在明确的数据绑定关系。人口与养老资源可以围绕行政区域进行组合，但具体查询关联路径需要在进入分析后进一步验证。
                  </div>

                  {/* Relation Status Block */}
                  <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#172033]">关系状态</h4>
                      <button
                        onClick={() => handleSelectResourceForEvidence('关系网络', 'relation')}
                        className="text-[11px] text-[#4F46E5] hover:underline font-medium cursor-pointer"
                      >
                        查看详细图谱
                      </button>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                        <span>自然人 → 居住于 → 行政区域</span>
                        <span className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] rounded text-[10px] font-mono">
                          R1 · Semantic Relation
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                        <span>养老机构 → 位于 → 行政区域</span>
                        <span className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] rounded text-[10px] font-mono">
                          R1 · Semantic Relation
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                        <span>养老机构 → 服务能力</span>
                        <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded text-[10px] font-mono">
                          R2 · Resource Binding
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded text-[11px] text-indigo-900 font-medium">
                      <strong>人口 × 养老机构：</strong> R3 · Analytical Relation Candidate (可围绕行政区域组合，尚未标记为 Verified Query Relation)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 06 PERMISSION QUESTION ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  人口基本信息我现在可以直接用吗？
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    目前你可以发现并查看这项资源的业务说明和安全元数据，但还没有实际查询权限，因此状态是 <strong className="text-amber-600">需要申请</strong>。这不会影响它作为完整数据方案的一部分被推荐。
                  </div>

                  {/* Compact Availability List & Submit Button */}
                  <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-3">
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center py-1 border-b border-slate-100">
                        <span className="font-semibold text-slate-800">人口基本信息</span>
                        <span className="px-2 py-0.5 bg-amber-50 text-[#F59E0B] border border-amber-200 font-bold rounded text-[10px]">
                          REQUESTABLE
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-100">
                        <span className="font-semibold text-slate-800">行政区划</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded text-[10px]">AVAILABLE</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-100">
                        <span className="font-semibold text-slate-800">养老机构基本信息</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded text-[10px]">AVAILABLE</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-100">
                        <span className="font-semibold text-slate-800">养老机构服务能力</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded text-[10px]">AVAILABLE</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="font-semibold text-slate-800">60岁以上人口数</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded text-[10px]">AVAILABLE</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsPermissionOpen(true)}
                      className="w-full py-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      提交使用申请
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 07 ALTERNATIVE EXECUTION SELECTION ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  那先不申请，先用我现在能用的数据。
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    可以。完整推荐方案仍然保留人口基本信息，但这次进入分析时，我只使用当前已经可用的四项资源。
                  </div>

                  {/* Execution Selection Visual Block */}
                  <div className="bg-white p-4 rounded-xl border border-[#2563EB]/30 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                      <h4 className="font-bold text-sm text-[#172033]">本次执行选择 (Execution Selection)</h4>
                      <span className="text-[10px] text-[#667085]">基于：当前 Data Solution</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="space-y-1">
                        <span className="text-[#16A36A] font-bold text-[11px] block">✓ 本次使用：</span>
                        <div className="grid grid-cols-2 gap-1.5 text-[#172033] text-[11px]">
                          <div className="p-1.5 bg-emerald-50/50 border border-emerald-100 rounded">60岁以上人口数</div>
                          <div className="p-1.5 bg-emerald-50/50 border border-emerald-100 rounded">行政区划</div>
                          <div className="p-1.5 bg-emerald-50/50 border border-emerald-100 rounded">养老机构基本信息</div>
                          <div className="p-1.5 bg-emerald-50/50 border border-emerald-100 rounded">养老机构服务能力</div>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <span className="text-amber-800 font-bold text-[11px] block">暂不使用：</span>
                        <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] flex justify-between">
                          <span>人口基本信息</span>
                          <span className="text-amber-700 font-medium">等待权限</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 08 MISSING METRIC SCENARIO ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  这个方案里有没有正式的“老龄化率”指标？
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    当前没有在已发布指标中发现“老龄化率”。现有资源能够提供相关人口数据，但我不会把临时推算公式当作企业正式指标。
                  </div>

                  {/* Missing Metric Block */}
                  <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">老龄化率</span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 font-mono text-[10px] rounded">
                        未发现 Published Metric
                      </span>
                    </div>

                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-700 space-y-1">
                      <div>相关可用指标：<strong className="text-[#172033]">60岁以上人口数</strong></div>
                      <p className="text-[#667085]">提示：老龄化率需在数据资产发布后上架至 Metric Registry，系统暂不代建未认证派生指标。</p>
                    </div>

                    <div className="flex gap-2 text-[11px]">
                      <button className="px-2.5 py-1 bg-white border border-[#E6EAF0] hover:bg-slate-50 rounded text-slate-700 cursor-pointer">
                        查看相关数据
                      </button>
                      <button className="px-2.5 py-1 bg-white border border-[#E6EAF0] hover:bg-slate-50 rounded text-slate-700 cursor-pointer">
                        前往指标定义
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 09 NEW REQUIREMENT / SOLUTION DIFF ================ */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  我还想看近三年的变化趋势。
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    这个要求新增了“历史时间覆盖”。当前养老机构和行政区划资源仍然适用，但现有正式人口指标主要覆盖当前统计口径，暂不能确认能够完整支持近三年趋势。
                  </div>

                  {/* Diff Block: 数据方案已更新 */}
                  <div className="bg-white p-4 rounded-xl border border-[#2563EB]/40 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                      <h4 className="font-bold text-sm text-[#2563EB]">数据方案已更新 (Solution Diff)</h4>
                      <span className="text-[10px] bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded font-mono">Diff View</span>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <div className="p-2 bg-blue-50/60 border border-blue-100 rounded text-blue-900 font-medium">
                        新增需求：<strong>近三年历史趋势</strong>
                      </div>

                      <div className="space-y-1 text-slate-700">
                        <span className="font-semibold block">保留资源：</span>
                        <p className="text-slate-600">行政区划 · 养老机构基本信息 · 养老机构服务能力</p>
                      </div>

                      <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-900 leading-relaxed">
                        <strong>当前方案缺口：</strong> 当前已发现资源尚未覆盖完整的近三年人口历史变化。
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button className="px-3 py-1.5 bg-[#2563EB] text-white font-semibold text-xs rounded-lg shadow-2xs cursor-pointer">
                        查找补充数据
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[#E6EAF0] text-slate-700 font-medium text-xs rounded-lg hover:bg-slate-50 cursor-pointer">
                        先使用当前方案
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================ ROUND 10 ASK DATA HANDOFF ================ */}
            <div className="space-y-3 pb-6">
              <div className="flex justify-end">
                <div className="bg-[#2563EB] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium shadow-2xs">
                  那先用当前可用的数据做一个街镇级的初步分析。
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                  X
                </div>
                <div className="space-y-4 max-w-2xl text-xs text-[#172033]">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-xs border border-[#E6EAF0] shadow-2xs leading-relaxed">
                    可以。当前选择已经能够支持街镇级老年人口规模、养老机构数量和床位资源的初步比较。人级明细、老龄化率和近三年趋势暂不包含在本次分析中。
                  </div>

                  {/* Visual Handoff Card: 准备进入问数 */}
                  <div className="bg-gradient-to-br from-white via-[#F7F9FC] to-blue-50/40 p-5 rounded-2xl border-2 border-[#2563EB] shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-3">
                      <div>
                        <h3 className="text-base font-bold text-[#172033]">准备进入问数 (Ask Data Handoff)</h3>
                        <p className="text-xs text-[#667085]">已锁定本次 Execution Selection，准备开展多维交互研判</p>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded-md shadow-2xs">
                        Ready
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className="text-[#667085] block text-[11px] mb-1 font-medium">Execution Selection (本次使用资源)</span>
                        <div className="flex flex-wrap gap-1.5">
                          {['60岁以上人口数', '行政区划', '养老机构基本信息', '养老机构服务能力'].map((res) => (
                            <span
                              key={res}
                              className="px-2.5 py-1 bg-white border border-emerald-200 text-emerald-800 text-xs font-medium rounded-lg flex items-center gap-1 shadow-2xs"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                              {res}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                        <div className="p-2.5 bg-white border border-[#E6EAF0] rounded-lg">
                          <span className="text-[#667085] block text-[10px]">分析范围</span>
                          <span className="font-bold text-[#172033]">闵行区 · 街镇级</span>
                        </div>
                        <div className="p-2.5 bg-white border border-[#E6EAF0] rounded-lg">
                          <span className="text-[#667085] block text-[10px]">当前限制</span>
                          <span className="font-medium text-amber-800">不含人级明细 / 正式老龄化率 / 近三年趋势</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onEnterAskData && onEnterAskData()}
                        className="flex-1 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                      >
                        <span>使用本次选择进入问数</span>
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>

                      <button className="px-4 py-3 bg-white border border-[#E6EAF0] hover:bg-slate-50 text-[#667085] font-medium text-xs rounded-xl transition-colors cursor-pointer">
                        继续查找补充数据
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================ BOTTOM STICKY DATA SOLUTION CONTEXT ================ */}
          <div className="border-t border-[#E6EAF0] bg-white p-4 shadow-lg shrink-0 space-y-3">
            {/* Row 1: Current Data Solution Chips */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                <span className="font-bold text-[#172033] shrink-0 text-xs">当前数据方案：</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-medium shrink-0">
                  60岁以上人口数 · 可用
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-medium shrink-0">
                  行政区划 · 可用
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-medium shrink-0">
                  养老机构 · 可用
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-medium shrink-0">
                  养老服务能力 · 可用
                </span>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded text-[11px] font-medium shrink-0">
                  人口基本信息 · 需申请
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#667085] font-semibold shrink-0">
                4 可用 · 1 需申请
              </span>
            </div>

            {/* Row 2: Input Box & Main Action */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="继续调整需求，或基于当前数据方案提出下一步…"
                  className="w-full px-4 py-2.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl text-xs outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>

              <button
                onClick={() => onEnterAskData && onEnterAskData()}
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>进入问数</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* ---------------- RIGHT EVIDENCE PANEL (410px) ---------------- */}
        <SemovixEvidencePanel
          activeTab={evidenceTab}
          onTabChange={setEvidenceTab}
          selectedResourceName={selectedResource}
          onOpenPermissionDrawer={() => setIsPermissionOpen(true)}
        />
      </div>

      {/* Permission Drawer */}
      <SemovixPermissionDrawer
        isOpen={isPermissionOpen}
        onClose={() => setIsPermissionOpen(false)}
        assetName="人口基本信息"
        onSubmitSuccess={() => setIsPermissionGranted(true)}
      />

      {/* Candidate Resources Drawer */}
      <SemovixCandidateDrawer
        isOpen={isCandidateOpen}
        onClose={() => setIsCandidateOpen(false)}
      />
    </div>
  );
};
