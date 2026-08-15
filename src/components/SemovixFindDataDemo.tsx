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
import { SemovixScenarioCDialogue } from './SemovixScenarioCDialogue';
import { SemovixScenarioBDialogue } from './SemovixScenarioBDialogue';
import { PermissionRequestState, ExecutionSelection } from '../types';
import {
  getAvailabilitySnapshot,
  getResourceFromSnapshot,
  getResourceStatusDisplay,
  createExecutionSelection,
} from '../models/availability';

interface Props {
  onEnterAskData?: (selection: ExecutionSelection) => void;
}

export const SemovixFindDataDemo: React.FC<Props> = ({ onEnterAskData }) => {
  // Scenario state: 'scenario-a' (default: Scenario 01 单域找数), 'scenario-b', 'scenario-c'
  const [activeScenario, setActiveScenario] = useState<'scenario-a' | 'scenario-b' | 'scenario-c'>('scenario-a');

  // Evidence Panel active tab
  const [evidenceTab, setEvidenceTab] = useState<EvidenceTabType>('evidence');

  // Drawers state
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);
  const [isCandidateOpen, setIsCandidateOpen] = useState(false);
  const [permissionState, setPermissionState] = useState<PermissionRequestState>('NOT_REQUESTED');

  // Expandable pipeline state in Round 02
  const [isPipelineExpanded, setIsPipelineExpanded] = useState(false);

  // Selected resource for Right Evidence Panel
  const [selectedResource, setSelectedResource] = useState('60岁以上人口数');

  // Interactive input state
  const [inputQuery, setInputQuery] = useState('');

  // Unified Single Source of Truth Availability Snapshot
  const availabilitySnapshot = getAvailabilitySnapshot(activeScenario, permissionState);

  const handleSelectResourceForEvidence = (name: string, tab: EvidenceTabType = 'evidence') => {
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
            {activeScenario === 'scenario-a' && '各街镇 60 岁以上常住人口规模需要哪些数据？'}
            {activeScenario === 'scenario-b' && '分析老年人口的公共服务热线诉求情况'}
            {activeScenario === 'scenario-c' && '分析老年人口规模与养老服务资源是否匹配'}
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

          <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            X
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

            {/* Scenario A (Scenario 01) */}
            <div
              onClick={() => setActiveScenario('scenario-a')}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                activeScenario === 'scenario-a'
                  ? 'bg-blue-50/80 border-[#2563EB]/40 shadow-2xs ring-1 ring-blue-500/20'
                  : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold text-xs line-clamp-1 ${activeScenario === 'scenario-a' ? 'text-[#2563EB]' : 'text-[#172033]'}`}>
                  各街镇老年人口规模需要哪些数据？
                </span>
                <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded shrink-0 ${
                  activeScenario === 'scenario-a' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  单域找数
                </span>
              </div>
              <p className="text-[10px] text-[#667085]">人口服务 · 人口统计</p>
            </div>

            {/* Scenario B (Scenario 02) */}
            <div
              onClick={() => setActiveScenario('scenario-b')}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                activeScenario === 'scenario-b'
                  ? 'bg-blue-50/80 border-[#2563EB]/40 shadow-2xs ring-1 ring-blue-500/20'
                  : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold text-xs line-clamp-1 ${activeScenario === 'scenario-b' ? 'text-[#2563EB]' : 'text-[#172033]'}`}>
                  分析老年人口的公共服务热线诉求情况
                </span>
                <span className="px-1.5 py-0.2 bg-[#4F46E5]/10 text-[#4F46E5] text-[9px] rounded shrink-0 font-medium">
                  跨域找数
                </span>
              </div>
              <p className="text-[10px] text-[#667085]">人口服务 × 公共服务</p>
            </div>

            {/* Scenario C (Scenario 03) */}
            <div
              onClick={() => setActiveScenario('scenario-c')}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                activeScenario === 'scenario-c'
                  ? 'bg-blue-50/80 border-[#2563EB]/40 shadow-2xs ring-1 ring-blue-500/20'
                  : 'bg-white border-transparent hover:bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold text-xs line-clamp-1 ${activeScenario === 'scenario-c' ? 'text-[#2563EB]' : 'text-[#172033]'}`}>
                  分析老年人口规模与养老服务资源是否匹配
                </span>
                <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[9px] font-bold rounded shrink-0">
                  决策型找数
                </span>
              </div>
              <p className="text-[10px] text-[#667085]">人口服务 × 养老服务</p>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
            <div className="text-[11px] font-bold text-[#667085] uppercase tracking-wider px-1">
              最近
            </div>
            <div className="space-y-0.5 text-[#172033]">
              {[
                '各街镇 60 岁以上人口规模',
                '找人口服务相关数据',
                '闵行区老年人口趋势',
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

            {activeScenario === 'scenario-a' ? (
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-[#667085] block text-[10px]">当前目标</span>
                  <span className="font-bold text-[#172033]">各街镇 60 岁以上常住人口规模</span>
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
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] block text-[10px]">识别业务对象</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {['自然人', '行政区域'].map((obj) => (
                      <span
                        key={obj}
                        className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] border border-indigo-100 rounded text-[10px] font-medium"
                      >
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] block text-[10px]">关键业务语义</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {['60岁及以上', '常住人口', '街镇'].map((sem) => (
                      <span
                        key={sem}
                        className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] border border-blue-100 rounded text-[10px]"
                      >
                        {sem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-[#667085] block text-[10px]">当前目标</span>
                  <span className="font-bold text-[#172033]">
                    {activeScenario === 'scenario-b' ? '老年人口热线诉求分析' : '老年人口 × 养老服务资源匹配'}
                  </span>
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
                      {activeScenario === 'scenario-b' ? '公共服务' : '养老服务'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ---------------- MIDDLE WORKSPACE (~920px) ---------------- */}
        <main className="flex-1 bg-[#F7F9FC] flex flex-col overflow-hidden relative">
          {/* Scrollable Conversation History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeScenario === 'scenario-a' ? (
              /* ==================== SCENARIO 01 (9 ROUNDS) ==================== */
              <>
                {/* ---------------- Round 01 · Goal Understanding ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      我想知道闵行区各街镇 60 岁以上常住人口规模，需要哪些数据？
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                      <div className="space-y-1 py-1 text-xs text-[#1E293B] leading-relaxed">
                        <p>
                          我理解你的目标是获得闵行区街镇级的老年常住人口规模。这个问题主要属于人口服务范围，我会优先寻找已经正式发布的人口指标，再判断是否需要人口明细数据进行补充。
                        </p>
                      </div>

                      {/* Card 1: 当前理解 (Current Understanding) */}
                      <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-[#172033] flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                            当前理解
                          </h4>
                          <button className="text-[11px] text-[#2563EB] hover:underline font-medium cursor-pointer">
                            调整理解
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                            <span className="text-[#64748B] block text-[10px] mb-0.5">目标</span>
                            <span className="font-semibold text-[#172033]">各街镇老年人口规模</span>
                          </div>
                          <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                            <span className="text-[#64748B] block text-[10px] mb-0.5">人口范围</span>
                            <span className="font-semibold text-[#172033]">60 岁及以上常住人口</span>
                          </div>
                          <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                            <span className="text-[#64748B] block text-[10px] mb-0.5">空间粒度</span>
                            <span className="font-semibold text-[#172033]">街镇</span>
                          </div>
                          <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                            <span className="text-[#64748B] block text-[10px] mb-0.5">业务对象</span>
                            <span className="font-semibold text-[#172033]">自然人 · 行政区域</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 02 · Requirement Ready ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      对，就是按街镇统计人数，不需要个人明细。
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-2.5 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        明白。当前目标只需要街镇级人口规模，不需要人级查询，因此我会优先选择已经治理好的正式人口指标，而不是直接使用人口明细表。
                      </div>

                      {/* 需求已更新 */}
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-[11px] font-semibold text-[#64748B]">需求已更新：</span>
                        {['街镇级', '人口规模', '不需要人级明细'].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-blue-50 text-[#2563EB] border border-blue-200 rounded-md text-[11px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* 正在查找合适的数据… */}
                      <div className="pt-1">
                        <button
                          onClick={() => setIsPipelineExpanded(!isPipelineExpanded)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100/70 hover:bg-slate-200/60 border border-slate-200/80 rounded-lg text-slate-600 font-medium text-[11px] cursor-pointer transition-colors"
                        >
                          <RefreshCw className="w-3 h-3 text-[#2563EB] animate-spin" />
                          <span>正在查找合适的数据…</span>
                          <ChevronDown
                            className={`w-3 h-3 transition-transform text-slate-400 ${isPipelineExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {isPipelineExpanded && (
                          <div className="mt-2 p-3 bg-white rounded-lg border border-slate-200/80 space-y-1.5 text-[11px] text-[#64748B] shadow-2xs">
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                              <span>已定位人口服务范围</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                              <span>已解析自然人与行政区域语义</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                              <span>已检查正式人口指标</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                              <span>正在检查相关数据资源与可用状态</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 03 · Main Data Solution ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      现在有哪些数据可以用？
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3.5 max-w-3xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        当前目标可以用一套非常精简的数据方案完成。正式的“60 岁以上人口数”指标负责人口规模，行政区划资源负责统一街镇维度；人口基本信息只作为进一步自定义人口条件时的增强资源，不是完成当前任务的必要条件。
                      </div>

                      {/* 主卡: 各街镇老年人口规模 · 数据方案 */}
                      <div className="bg-white rounded-xl border border-[#2563EB]/40 shadow-md overflow-hidden ring-1 ring-blue-500/10">
                        {/* Card Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/50 border-b border-[#E6EAF0] flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-[#172033]">
                                各街镇老年人口规模 · 数据方案
                              </h3>
                              <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded">
                                Data Solution
                              </span>
                            </div>
                            <p className="text-xs text-[#667085] mt-0.5">当前最小且足够资源组合</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#2563EB]">V1.0 Minimal & Sufficient</span>
                        </div>

                        {/* Resources List */}
                        <div className="p-4 space-y-3 divide-y divide-[#E6EAF0]">
                          {/* Resource 01 */}
                          <div
                            onClick={() => handleSelectResourceForEvidence('60 岁以上人口数', 'resource')}
                            className="pt-2 flex items-start justify-between cursor-pointer hover:bg-slate-50/80 -mx-2 px-2 py-1 rounded-lg transition-colors"
                            title="点击查看资源证据"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#172033] hover:text-[#2563EB]">60 岁以上人口数</span>
                                <span className="px-1.5 py-0.2 bg-emerald-50 text-[#16A36A] text-[10px] font-mono border border-emerald-200 rounded font-bold">
                                  Metric · Published
                                </span>
                              </div>
                              <p className="text-xs text-[#667085]">
                                角色：<strong className="text-[#172033]">PRIMARY · 人口规模</strong> | 负责：正式 60 岁及以上人口统计口径
                              </p>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-xs font-bold rounded-md shrink-0">
                              AVAILABLE
                            </span>
                          </div>

                          {/* Resource 02 */}
                          <div
                            onClick={() => handleSelectResourceForEvidence('行政区划', 'resource')}
                            className="pt-3 flex items-start justify-between cursor-pointer hover:bg-slate-50/80 -mx-2 px-2 py-1 rounded-lg transition-colors"
                            title="点击查看资源证据"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#172033] hover:text-[#2563EB]">行政区划</span>
                                <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[10px] font-mono border border-blue-200 rounded">
                                  Data Asset
                                </span>
                              </div>
                              <p className="text-xs text-[#667085]">
                                角色：<strong className="text-[#172033]">REFERENCE · 区域维度</strong> | 负责：街镇编码 · 街镇名称 · 行政层级统一
                              </p>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-xs font-bold rounded-md shrink-0">
                              AVAILABLE
                            </span>
                          </div>

                          {/* Optional Enhancement */}
                          {(() => {
                            const personRes = getResourceFromSnapshot(availabilitySnapshot, '人口基本信息');
                            const personStatus = personRes ? getResourceStatusDisplay(personRes) : null;
                            return (
                              <div
                                onClick={() => handleSelectResourceForEvidence('人口基本信息', 'resource')}
                                className="pt-3 flex items-start justify-between bg-amber-50/40 -mx-4 px-4 py-2.5 cursor-pointer hover:bg-amber-50/70 transition-colors"
                                title="点击查看资源证据"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-slate-800">人口基本信息</span>
                                    <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-mono border border-amber-200 rounded font-semibold">
                                      Data Asset · Table
                                    </span>
                                  </div>
                                  <p className="text-xs text-amber-900/90">
                                    角色：<strong className="text-amber-950">OPTIONAL ENHANCEMENT · 人级补充</strong> | 用途：出生日期 · 常住状态 · 所属行政区域
                                  </p>
                                  <p className="text-[11px] text-slate-500 italic">
                                    说明：当前目标不依赖该资源即可完成。
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {personStatus && (
                                    <span className={`px-2 py-0.5 border text-xs font-bold rounded flex items-center gap-1 ${personStatus.pillClasses}`}>
                                      {personStatus.isPending && <Clock className="w-3 h-3 text-amber-700 animate-pulse" />}
                                      {personStatus.badgeLabel}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Coverage Checklist */}
                        <div className="p-4 bg-[#F7F9FC] border-t border-[#E6EAF0] space-y-2">
                          <div className="font-bold text-xs text-[#172033]">当前方案覆盖：</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>60 岁及以上人口规模</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>常住人口口径</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>街镇维度</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#16A36A] font-medium">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>行政区域统一</span>
                            </div>
                          </div>
                        </div>

                        {/* Current Limitation */}
                        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
                          <strong className="font-bold text-slate-800">当前方案限制：</strong>
                          当前正式指标适合标准街镇人口规模分析；如需自定义年龄段或人级筛选，则需要人口明细资源。
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
                              onClick={() => handleSelectResourceForEvidence('60岁以上人口数', 'evidence')}
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

                {/* ---------------- Round 04 · Why Metric First ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      为什么不直接用人口基本信息表来统计？
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        因为你现在需要的是标准街镇人口规模，而不是人级明细。已有正式发布指标已经固定了人口定义和统计口径，直接使用正式指标能减少重复计算和口径偏差；人口基本信息更适合自定义年龄范围或人级分析。
                      </div>

                      {/* 推荐依据摘要 */}
                      <div className="space-y-2 py-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#1E293B] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
                            <span>推荐依据摘要</span>
                          </span>
                          <button
                            onClick={() => handleSelectResourceForEvidence('60岁以上人口数', 'evidence')}
                            className="text-[11px] text-[#2563EB] hover:underline font-medium cursor-pointer"
                          >
                            方案依据 ➔
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[11px]">
                          <div className="p-2 bg-slate-100/70 rounded-lg">
                            <span className="text-slate-500 block text-[10px]">正式口径</span>
                            <span className="font-bold text-[#2563EB]">→ Metric Registry</span>
                          </div>
                          <div className="p-2 bg-slate-100/70 rounded-lg">
                            <span className="text-slate-500 block text-[10px]">街镇维度</span>
                            <span className="font-bold text-[#2563EB]">→ 行政区划</span>
                          </div>
                          <div className="p-2 bg-slate-100/70 rounded-lg">
                            <span className="text-slate-500 block text-[10px]">人级自定义分析</span>
                            <span className="font-bold text-[#2563EB]">→ 人口基本信息</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 05 · Custom Age Requirement ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      如果我想改成 65 岁及以上呢？
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        这会改变人口条件。当前已发现的正式指标是“60 岁以上人口数”，暂不能把它直接作为“65 岁以上人口数”使用。
                      </div>

                      {/* 数据方案变化预判 */}
                      <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                          <h4 className="font-bold text-sm text-[#172033]">数据方案变化预判</h4>
                          <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-mono font-medium">
                            Scope Changed
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2.5 bg-blue-50/60 border border-blue-100 rounded-lg">
                            <span className="text-[#64748B] block text-[10px] mb-0.5">新需求</span>
                            <span className="font-bold text-[#2563EB]">65 岁及以上</span>
                          </div>
                          <div className="p-2.5 bg-amber-50/60 border border-amber-100 rounded-lg">
                            <span className="text-[#64748B] block text-[10px] mb-0.5">当前正式指标</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-800">60 岁以上人口数</span>
                              <span className="text-[10px] text-amber-800 font-medium">(不能直接替代)</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-1 text-[11px]">
                          <span className="font-semibold text-slate-800 block">可以继续的路径：</span>
                          <ol className="list-decimal list-inside space-y-1 text-slate-600 bg-[#F7F9FC] p-2.5 rounded-lg border border-[#E6EAF0]">
                            <li>查找是否存在已发布的 65 岁以上人口指标</li>
                            <li>如无正式指标，在获得人口明细权限后进入分析阶段按年龄条件查询</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 06 · Permission ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      人口基本信息现在我能用吗？
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        你目前可以发现并查看它的业务说明，但 QUERY 操作需要申请。当前标准的 60 岁以上人口规模分析不受影响。
                      </div>

                      {/* 当前可用性 */}
                      <div className="space-y-2 py-1">
                        <div className="p-3 bg-slate-100/70 rounded-lg space-y-1.5 text-[11px]">
                          <div className="font-semibold text-slate-800 pb-1 border-b border-slate-200/60">当前可用性</div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                            <span className="font-semibold text-slate-800">人口基本信息</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-slate-500">元数据：AVAILABLE</span>
                              {permissionState === 'REQUEST_PENDING' ? (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[10px] border border-amber-300 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-700 animate-pulse" />
                                  查询：REQUEST_PENDING (审批中)
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                                  查询：REQUESTABLE
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                            <span className="font-medium text-slate-700">60 岁以上人口数</span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                              查询：AVAILABLE
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="font-medium text-slate-700">行政区划</span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                              查询：AVAILABLE
                            </span>
                          </div>
                        </div>

                        {permissionState === 'REQUEST_PENDING' ? (
                          <button
                            onClick={() => setIsPermissionOpen(true)}
                            className="w-full py-2 bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 border border-amber-300 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                            <span>申请处理中 · 查看审批进度 (REQ-2026-0815-9921)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsPermissionOpen(true)}
                            className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            提交人口明细使用申请
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 07 · Current Execution Selection ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      那先按 60 岁以上，用现在可以直接用的资源。
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        可以。这次不需要人口明细，当前两项可用资源已经足够完成街镇级老年人口规模分析。
                      </div>

                      {/* 本次执行选择 */}
                      <div className="bg-white p-4 rounded-xl border border-[#2563EB]/40 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                          <h4 className="font-bold text-sm text-[#172033]">本次执行选择</h4>
                          <span className="text-[10px] text-[#667085]">Minimal & Sufficient Execution</span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="space-y-1">
                            <span className="text-[#16A36A] font-bold text-[11px] block">✓ 本次使用：</span>
                            <div className="grid grid-cols-2 gap-1.5 text-[#172033] text-[11px]">
                              <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                                <span>60 岁以上人口数</span>
                              </div>
                              <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                                <span>行政区划</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1 pt-1">
                            <span className="text-slate-600 font-bold text-[11px] block">暂不使用：</span>
                            <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] flex justify-between items-center">
                              <span>人口基本信息</span>
                              <span className="px-1.5 py-0.2 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-mono">
                                OPTIONAL · QUERY REQUESTABLE
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 08 · Candidate Resources ---------------- */}
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      还有其他相关的人口数据吗？
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        有一些相关资源，但对于当前“街镇级 60 岁以上人口规模”并不是更优的核心选择。
                      </div>

                      {/* 轻量入口: 查看其他相关资源 · 3 */}
                      <div className="pt-1">
                        <button
                          onClick={() => setIsCandidateOpen(true)}
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-[#2563EB]/40 text-[#2563EB] rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                        >
                          <Layers className="w-4 h-4" />
                          <span>查看其他相关资源 · 3</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------------- Round 09 · Ask Data Handoff ---------------- */}
                <div className="space-y-3 pb-6">
                  <div className="flex justify-end">
                    <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
                      那就用这套方案开始看各街镇人数吧。
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
                      X
                    </div>
                    <div className="space-y-3.5 max-w-2xl text-xs text-[#172033]">
                      <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
                        可以。当前选择已经覆盖街镇级 60 岁以上常住人口规模，并采用正式人口统计口径。
                      </div>

                      {/* 准备进入问数 卡片 */}
                      <div className="bg-gradient-to-br from-white via-[#F7F9FC] to-blue-50/40 p-5 rounded-2xl border-2 border-[#2563EB] shadow-lg space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-3">
                          <div>
                            <h3 className="text-base font-bold text-[#172033]">准备进入问数</h3>
                            <p className="text-xs text-[#667085]">已锁定本次 Execution Selection，准备开展街镇级人口问数分析</p>
                          </div>
                          <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded-md shadow-2xs">
                            Ready
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div>
                            <span className="text-[#667085] block text-[11px] mb-1 font-medium">Execution Selection</span>
                            <div className="flex flex-wrap gap-1.5">
                              {['60 岁以上人口数', '行政区划'].map((res) => (
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
                              <span className="text-[#667085] block text-[10px]">人口口径</span>
                              <span className="font-bold text-[#2563EB]">60 岁及以上常住人口</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px]">
                            <span className="text-slate-500 block text-[10px]">当前限制</span>
                            <span className="font-medium text-slate-700">不包含人级明细与自定义年龄段</span>
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
                            继续调整人口条件
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : activeScenario === 'scenario-c' ? (
              /* ==================== SCENARIO 03 (DECISION-ORIENTED FIND DATA) ==================== */
              <SemovixScenarioCDialogue
                onSelectResource={handleSelectResourceForEvidence}
                onOpenPermission={() => setIsPermissionOpen(true)}
                onOpenCandidate={() => setIsCandidateOpen(true)}
                onEnterAskData={onEnterAskData}
                permissionState={permissionState}
                snapshot={availabilitySnapshot}
              />
            ) : (
              /* ==================== SCENARIO 02 (CROSS-DOMAIN FIND DATA) ==================== */
              <SemovixScenarioBDialogue
                onSelectResource={handleSelectResourceForEvidence}
                onOpenPermission={() => setIsPermissionOpen(true)}
                onOpenCandidate={() => setIsCandidateOpen(true)}
                onEnterAskData={onEnterAskData}
                permissionState={permissionState}
                snapshot={availabilitySnapshot}
              />
            )}
          </div>

          {/* ================ BOTTOM STICKY DATA SOLUTION CONTEXT ================ */}
          <div className="border-t border-[#E6EAF0] bg-white p-4 shadow-lg shrink-0 space-y-3">
            {/* Row 1: Current Data Solution Chips (Strictly derived from availabilitySnapshot) */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 overflow-x-auto py-0.5">
                <span className="font-bold text-[#172033] shrink-0 text-xs">当前数据方案：</span>
                {availabilitySnapshot.resources.map((res) => {
                  const status = getResourceStatusDisplay(res);
                  return (
                    <button
                      key={res.resourceId}
                      onClick={() => handleSelectResourceForEvidence(res.resourceName, 'availability')}
                      className={`px-2 py-0.5 border rounded text-[11px] font-medium shrink-0 flex items-center gap-1 cursor-pointer transition-colors ${status.pillClasses}`}
                    >
                      {status.isPending && <Clock className="w-3 h-3 text-amber-700 animate-pulse" />}
                      <span>{res.resourceName} · {status.badgeLabel}</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[11px] font-mono text-[#667085] font-semibold shrink-0">
                {availabilitySnapshot.bottomSummaryText}
              </span>
            </div>

            {/* Row 2: Input Box & Main Action */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="继续调整人口范围、时间或分析维度…"
                  className="w-full px-4 py-2.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl text-xs outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
                />
              </div>

              <button
                onClick={() => {
                  if (onEnterAskData) {
                    const selection = createExecutionSelection(availabilitySnapshot);
                    onEnterAskData(selection);
                  }
                }}
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
              >
                <span>使用本次选择进入问数</span>
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
          scenario={activeScenario}
          snapshot={availabilitySnapshot}
        />
      </div>

      {/* Permission Drawer */}
      <SemovixPermissionDrawer
        isOpen={isPermissionOpen}
        onClose={() => setIsPermissionOpen(false)}
        assetName="人口基本信息"
        resource={getResourceFromSnapshot(availabilitySnapshot, '人口基本信息')}
        requestState={permissionState}
        onSubmitSuccess={() => setPermissionState('REQUEST_PENDING')}
      />

      {/* Candidate Resources Drawer */}
      <SemovixCandidateDrawer
        isOpen={isCandidateOpen}
        onClose={() => setIsCandidateOpen(false)}
      />
    </div>
  );
};
