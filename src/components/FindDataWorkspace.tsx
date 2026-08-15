import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Database,
  Layers,
  CheckCircle2,
  Lock,
  Unlock,
  Key,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sliders,
  Send,
  Paperclip,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Building2,
  Users,
  Clock,
  ExternalLink,
  HelpCircle,
  Tag,
  Check,
  RefreshCw,
} from 'lucide-react';
import { FindDataEvidencePanel, EvidenceTabType } from './FindDataEvidencePanel';
import { PermissionApplyDrawer } from './PermissionApplyDrawer';

interface Props {
  onEnterAskData: (solutionContext?: any) => void;
  onSwitchViewMode: (mode: 'find' | 'ask') => void;
}

export const FindDataWorkspace: React.FC<Props> = ({ onEnterAskData, onSwitchViewMode }) => {
  // Right Evidence Panel Tab State
  const [evidenceTab, setEvidenceTab] = useState<EvidenceTabType>('evidence');
  // Permission Drawer State
  const [isPermissionDrawerOpen, setIsPermissionDrawerOpen] = useState(false);
  // Granted permission status
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  // Expandable Working State in Round 02
  const [isWorkingStateExpanded, setIsWorkingStateExpanded] = useState(false);
  // User input text
  const [inputText, setInputText] = useState('');

  // Additional dynamic chat rounds if user sends custom message
  const [customRounds, setCustomRounds] = useState<Array<{ user: string; ai: string }>>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText('');

    setCustomRounds((prev) => [
      ...prev,
      {
        user: userMsg,
        ai: `已针对新的找数指令：“${userMsg}”更新当前 Semovix 语义匹配逻辑。相关数据方案已同步保持，您可以直接点击下方【使用当前方案进入问数】开始分析。`,
      },
    ]);

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F7F9FC] text-[#172033] font-sans overflow-hidden">
      {/* Top Header (~60-64px) */}
      <header className="h-14 border-b border-[#E6EAF0] bg-white flex items-center justify-between px-5 shrink-0 z-20 select-none">
        {/* Left Logo & Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center text-white text-xs font-bold italic shadow-xs">
            SX
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#172033] text-sm tracking-tight">Semovix</span>
            <span className="text-[#E6EAF0]">|</span>
            <span className="text-[#667085] font-medium">AI 工作台 / 找数</span>
          </div>
        </div>

        {/* Middle: Current Task & Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#F7F9FC] px-3 py-1 rounded-full border border-[#E6EAF0] text-xs">
            <span className="text-[#667085]">当前任务：</span>
            <span className="font-bold text-[#172033]">老年人口养老服务匹配分析</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A] animate-pulse"></span>
            <span className="text-[11px] text-[#16A36A] font-semibold">数据方案已形成</span>
          </div>

          {/* Workbench View Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => onSwitchViewMode('find')}
              className="px-3 py-1 rounded-md bg-white text-[#2563EB] font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>AI 找数 (Solution Builder)</span>
            </button>
            <button
              onClick={() => onSwitchViewMode('ask')}
              className="px-3 py-1 rounded-md text-[#667085] hover:text-[#172033] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 问数 (Analytics)</span>
            </button>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => alert('已开启新找数任务')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E6EAF0] hover:bg-[#F7F9FC] text-[#172033] rounded-lg font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            新建对话
          </button>
          <div className="w-7 h-7 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            政
          </div>
        </div>
      </header>

      {/* Main 3-Column Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar · Conversation History (~250px) */}
        <aside className="w-[250px] bg-white border-r border-[#E6EAF0] flex flex-col h-full shrink-0 select-none text-xs">
          <div className="p-3 border-b border-[#EEF2F6] space-y-2">
            <button
              onClick={() => alert('已新建找数任务')}
              className="w-full py-2 bg-[#F7F9FC] hover:bg-[#EEF2F6] border border-[#E6EAF0] text-[#172033] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#2563EB]" />
              <span>新建任务</span>
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#667085]" />
              <input
                type="text"
                placeholder="搜索历史对话…"
                className="w-full pl-8 pr-2.5 py-1.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-[11px] focus:outline-hidden text-[#172033]"
              />
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5">今天</div>
              <div className="space-y-1">
                <div className="p-2 bg-blue-50/80 border border-blue-200 text-[#2563EB] font-bold rounded-lg flex items-center gap-2 cursor-pointer shadow-xs">
                  <Database className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">老年人口养老服务匹配分析</span>
                </div>
                <div className="p-2 hover:bg-[#F7F9FC] text-[#667085] rounded-lg cursor-pointer truncate">
                  公共服务热线工单找数
                </div>
                <div className="p-2 hover:bg-[#F7F9FC] text-[#667085] rounded-lg cursor-pointer truncate">
                  街镇人口结构分析
                </div>
                <div className="p-2 hover:bg-[#F7F9FC] text-[#667085] rounded-lg cursor-pointer truncate">
                  养老机构覆盖分析
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5">昨天</div>
              <div className="space-y-1">
                <div className="p-2 hover:bg-[#F7F9FC] text-[#667085] rounded-lg cursor-pointer truncate">
                  常住人口趋势分析
                </div>
                <div className="p-2 hover:bg-[#F7F9FC] text-[#667085] rounded-lg cursor-pointer truncate">
                  人口指标口径查询
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Current Context Card */}
          <div className="p-3 border-t border-[#EEF2F6] bg-[#F7F9FC] space-y-2 text-[11px]">
            <div className="font-bold text-[#172033] flex items-center justify-between">
              <span>当前上下文</span>
              <span className="w-2 h-2 rounded-full bg-[#16A36A]"></span>
            </div>
            <div className="space-y-1 text-[#667085]">
              <div>
                <span className="text-[#667085] block">目标：</span>
                <strong className="text-[#172033]">老年人口 × 养老服务资源匹配</strong>
              </div>
              <div className="flex justify-between">
                <span>范围：</span>
                <span className="text-[#172033]">闵行区</span>
              </div>
              <div className="flex justify-between">
                <span>业务域：</span>
                <span className="text-[#172033]">人口服务 · 养老服务</span>
              </div>
              <div>
                <span className="text-[#667085] block mb-0.5">业务对象：</span>
                <div className="flex flex-wrap gap-1 text-[9px] font-mono">
                  <span className="px-1.5 py-0.5 bg-white border border-[#E6EAF0] rounded text-[#172033]">自然人</span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#E6EAF0] rounded text-[#172033]">行政区域</span>
                  <span className="px-1.5 py-0.5 bg-white border border-[#E6EAF0] rounded text-[#172033]">养老机构</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Workspace · Conversational Data Solution Workspace (~920px) */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
          {/* Scrollable Chat Area showing 8 Rounds of Dialogue */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
            {/* ROUND 01 · Compact early round */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  我想分析闵行区各街镇老年人口规模和养老服务资源匹配情况。
                </div>
              </div>

              {/* AI Response */}
              <div className="flex gap-2.5 items-start">
                <div className="w-6 h-6 rounded-md bg-[#2563EB] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  X
                </div>
                <div className="space-y-2 text-xs text-[#172033] max-w-3xl">
                  <p className="leading-relaxed">
                    我理解你希望同时看两部分：<strong className="text-[#2563EB]">各街镇老年人口规模</strong>，以及
                    <strong className="text-[#2563EB]">养老服务资源是否与人口分布匹配</strong>。 我会优先从人口服务和养老服务相关资源中寻找能够覆盖人口、行政区域和养老机构的数据。
                  </p>

                  {/* Block: 当前理解 */}
                  <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#172033] text-xs">当前理解</span>
                      <button
                        onClick={() => alert('调整理解：可在下方对话框重新修正人口范围或维度。')}
                        className="text-[11px] text-[#2563EB] hover:underline font-semibold cursor-pointer"
                      >
                        调整理解
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      <div className="bg-white p-2 rounded-lg border border-[#EEF2F6]">
                        <span className="text-[#667085] block text-[10px]">分析目标</span>
                        <strong className="text-[#172033]">老年人口规模 × 养老资源匹配</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#EEF2F6]">
                        <span className="text-[#667085] block text-[10px]">业务对象</span>
                        <div className="font-mono text-[10px] text-[#4F46E5] mt-0.5">
                          `自然人` `行政区域` `养老机构`
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#EEF2F6]">
                        <span className="text-[#667085] block text-[10px]">主要维度</span>
                        <div className="font-mono text-[10px] text-[#172033] mt-0.5">`街镇` `年龄`</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#EEF2F6]">
                        <span className="text-[#667085] block text-[10px]">人口范围</span>
                        <div className="font-mono text-[10px] text-[#172033] mt-0.5">`60岁及以上` `常住人口`</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROUND 02 · 收敛条件 */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  先按 60 岁及以上常住人口来算，街镇维度就可以。
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-2 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  好的，已把分析范围收敛为<strong className="text-[#2563EB]">60 岁及以上常住人口 × 街镇</strong>。这个信息已经足够形成第一版数据方案，我继续查找相关资源。
                </p>

                {/* Block: 需求已更新 */}
                <div className="flex items-center gap-2 p-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-[11px]">
                  <span className="font-bold text-[#172033]">需求已更新：</span>
                  <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] rounded font-mono text-[#4F46E5]">
                    60岁及以上
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] rounded font-mono text-[#4F46E5]">
                    常住人口
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] rounded font-mono text-[#4F46E5]">
                    街镇
                  </span>
                </div>

                {/* AI Working State */}
                <div className="border border-[#E6EAF0] rounded-lg bg-white overflow-hidden text-[11px]">
                  <button
                    onClick={() => setIsWorkingStateExpanded(!isWorkingStateExpanded)}
                    className="w-full p-2.5 bg-[#F7F9FC] flex items-center justify-between hover:bg-[#EEF2F6] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-[#667085]">
                      <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span className="font-semibold text-[#172033]">
                        正在为你查找合适的数据
                      </span>
                      <span className="text-[10px] text-[#667085]">
                        · 已定位人口服务与养老服务范围 · 正在检查相关资源
                      </span>
                    </div>
                    {isWorkingStateExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  {isWorkingStateExpanded && (
                    <div className="p-3 bg-white space-y-1.5 text-[#667085] border-t border-[#EEF2F6]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" />
                        <span>已理解业务目标：老年人口规模 × 养老服务匹配</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" />
                        <span>已定位相关业务范围：人口服务、养老设施与地理行政区划</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" />
                        <span>正在查找数据资源：匹配物理视图与正式发布指标</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" />
                        <span>正在检查覆盖与可用状态：C2 安全脱敏与网关授权校验</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ROUND 03 · 核心 Data Solution 卡片展现 */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  有哪些数据可以用？
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-3 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  找到了一套目前覆盖比较完整的数据方案。 核心使用<strong className="text-[#2563EB]">人口基本信息视图</strong>确定老年人口规模，再通过<strong className="text-[#2563EB]">行政区划</strong>统一街镇维度，并结合<strong className="text-[#2563EB]">养老机构信息</strong>分析机构和床位资源分布。
                </p>

                {/* THE MAIN VISUAL HERO: DATA SOLUTION CARD */}
                <div className="p-4 bg-white border border-[#2563EB]/40 rounded-2xl shadow-sm space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F6]">
                    <div>
                      <h3 className="font-bold text-[#172033] text-sm sm:text-base flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#2563EB]" />
                        老年人口养老服务匹配分析 · 数据方案
                      </h3>
                      <p className="text-[11px] text-[#667085] mt-0.5">
                        当前推荐的最小且足够资源组合 (Recommended Minimal Data Solution)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-50 text-[#2563EB] font-bold text-[10px] rounded-full border border-blue-200">
                      Semovix Solution V1
                    </span>
                  </div>

                  {/* Core & Supporting Resources */}
                  <div className="space-y-2.5">
                    {/* Core Resource */}
                    <div
                      onClick={() => setEvidenceTab('resource')}
                      className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] hover:border-[#2563EB] rounded-xl flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-[#F59E0B] rounded-lg border border-amber-200">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                              人口基本信息视图
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-200 text-[#172033] font-mono rounded">
                              Data Asset · View
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-[#4F46E5] font-bold rounded">
                              核心数据
                            </span>
                          </div>
                          <div className="text-[11px] text-[#667085] mt-0.5">
                            负责：人口主体 · 出生日期 · 常住状态 · 所属区域
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPermissionGranted ? (
                          <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded-md border border-emerald-200 flex items-center gap-1">
                            <Unlock className="w-3 h-3" />
                            AVAILABLE
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-amber-50 text-[#F59E0B] font-bold text-[10px] rounded-md border border-amber-200 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            REQUESTABLE · 需要申请
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Supporting Resource 1 */}
                    <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-[#16A36A] rounded-lg border border-emerald-200">
                          <Database className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#172033]">行政区划</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-[#667085] font-mono rounded">
                              Data Asset
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-[#667085] font-semibold rounded">
                              支撑数据
                            </span>
                          </div>
                          <div className="text-[11px] text-[#667085] mt-0.5">
                            负责：街镇 / 社区 / 行政区域统一
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded-md border border-emerald-200 flex items-center gap-1">
                        <Unlock className="w-3 h-3" />
                        AVAILABLE
                      </span>
                    </div>

                    {/* Supporting Resource 2 */}
                    <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-[#16A36A] rounded-lg border border-emerald-200">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#172033]">养老机构信息</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-[#667085] font-mono rounded">
                              Data Asset
                            </span>
                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-[#667085] font-semibold rounded">
                              支撑数据
                            </span>
                          </div>
                          <div className="text-[11px] text-[#667085] mt-0.5">
                            负责：养老机构 · 所属区域 · 床位资源
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded-md border border-emerald-200 flex items-center gap-1">
                        <Unlock className="w-3 h-3" />
                        AVAILABLE
                      </span>
                    </div>

                    {/* Published Metric */}
                    <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-[#4F46E5] rounded-lg border border-indigo-200">
                          <Tag className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#172033]">60 岁以上人口数</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-[#4F46E5] font-mono font-bold rounded">
                              Metric · Published
                            </span>
                          </div>
                          <div className="text-[11px] text-[#667085] mt-0.5">
                            负责：企业正式老年人口统计口径
                          </div>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded-md border border-emerald-200 flex items-center gap-1">
                        <Unlock className="w-3 h-3" />
                        AVAILABLE
                      </span>
                    </div>
                  </div>

                  {/* Coverage Row */}
                  <div className="p-3 bg-[#F7F9FC] rounded-xl border border-[#EEF2F6] flex flex-wrap items-center justify-between text-[11px]">
                    <span className="font-bold text-[#172033]">当前方案覆盖：</span>
                    <div className="flex flex-wrap gap-2 text-[#16A36A] font-semibold">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> 人口规模
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> 街镇分布
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> 养老机构资源
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" /> 养老床位资源
                      </span>
                    </div>
                  </div>

                  {/* Current Solution Gap */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#172033]">当前方案缺口：</span>
                      当前已发现的资源尚未覆盖<strong className="text-amber-950">养老服务实际使用情况</strong>。
                    </div>
                  </div>

                  {/* Solution Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#EEF2F6]">
                    <div className="flex items-center gap-2">
                      {!isPermissionGranted ? (
                        <button
                          onClick={() => setIsPermissionDrawerOpen(true)}
                          className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Key className="w-3.5 h-3.5" />
                          申请并继续
                        </button>
                      ) : (
                        <button
                          onClick={() => onEnterAskData()}
                          className="px-4 py-2 bg-[#16A36A] hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          使用完整方案进入问数
                        </button>
                      )}

                      <button
                        onClick={() => onEnterAskData()}
                        className="px-3.5 py-2 bg-white border border-[#E6EAF0] hover:bg-[#F7F9FC] text-[#172033] font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        进入问数
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[11px]">
                      <button
                        onClick={() => alert('调整方案：在下方输入框中补充额外要求。')}
                        className="text-[#667085] hover:text-[#172033] transition-colors cursor-pointer"
                      >
                        调整方案
                      </button>
                      <button
                        onClick={() => setEvidenceTab('evidence')}
                        className="text-[#2563EB] font-semibold hover:underline cursor-pointer"
                      >
                        查看推荐依据
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROUND 04 · 用户追问推荐原因 */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  为什么人口基本信息视图是核心数据？
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-2 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  因为当前目标首先需要确定“哪些人属于 60 岁及以上常住人口”，而这项资源在人级粒度上同时覆盖了<strong className="text-[#2563EB]">出生日期、常住状态和所属行政区域</strong>，因此最适合作为人口侧的核心数据来源。
                </p>

                {/* Block: 推荐依据摘要 */}
                <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2 text-[11px]">
                  <div className="font-bold text-[#172033] text-xs">推荐依据摘要</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#667085]">
                    <div>
                      <span>主要记录主体：</span>
                      <strong className="text-[#172033] block">自然人</strong>
                    </div>
                    <div>
                      <span>记录粒度：</span>
                      <strong className="text-[#172033] block">人级</strong>
                    </div>
                    <div>
                      <span>关键语义：</span>
                      <span className="text-[#172033] font-mono block">出生日期 · 常住状态 · 行政区域</span>
                    </div>
                    <div>
                      <span>当前角色：</span>
                      <span className="text-[#4F46E5] font-bold block">核心人口数据</span>
                    </div>
                  </div>

                  <div className="pt-1 text-right">
                    <button
                      onClick={() => setEvidenceTab('resource')}
                      className="text-[#2563EB] font-semibold hover:underline text-[11px] cursor-pointer"
                    >
                      查看资产详情 →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ROUND 05 · 用户询问权限 */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  它现在我能直接用吗？
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-2 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  目前你可以查看这项资源的业务说明和字段语义，但还没有实际查询权限，因此状态是 <strong className="text-[#F59E0B]">需要申请</strong>。其余三项核心资源目前可以直接使用。
                </p>

                {/* Compact Status Block */}
                <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2 text-[11px]">
                  <div className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#172033]">人口基本信息视图</span>
                      {isPermissionGranted ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded">
                          AVAILABLE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-50 text-[#F59E0B] font-bold rounded">
                          REQUESTABLE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#667085]">行政区划</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded">
                        AVAILABLE
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#667085]">养老机构信息</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded">
                        AVAILABLE
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#667085]">60岁以上人口数</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded">
                        AVAILABLE
                      </span>
                    </div>
                  </div>

                  {!isPermissionGranted && (
                    <div className="pt-1">
                      <button
                        onClick={() => setIsPermissionDrawerOpen(true)}
                        className="px-3 py-1.5 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        申请人口数据权限
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ROUND 06 · 替代方案 */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  如果先不申请权限，有没有可以先做的方案？
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-2 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  可以。 你可以先使用已经可用的 <strong className="text-[#2563EB]">60 岁以上人口数指标 + 行政区划 + 养老机构信息</strong>，完成街镇级老年人口规模和养老资源分布的初步比较。
                </p>

                {/* Alternative Plan Block */}
                <div className="p-3.5 bg-white border border-[#E6EAF0] rounded-xl space-y-3 text-[11px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-1">
                      <span className="font-bold text-[#16A36A] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        这个替代方案可以做
                      </span>
                      <ul className="text-[#667085] space-y-0.5 list-disc list-inside">
                        <li>街镇级老年人口规模比较</li>
                        <li>养老机构数量分布</li>
                        <li>床位资源分布</li>
                        <li>人口规模与养老资源的区域比较</li>
                      </ul>
                    </div>

                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                      <span className="font-bold text-[#667085] flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        暂时不能做
                      </span>
                      <ul className="text-[#667085] space-y-0.5 list-disc list-inside">
                        <li>人级明细分析</li>
                        <li>自定义人口筛选</li>
                        <li>个体层面的服务匹配</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onEnterAskData({ plan: 'alternative' })}
                      className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      使用可用资源继续
                    </button>
                    {!isPermissionGranted && (
                      <button
                        onClick={() => setIsPermissionDrawerOpen(true)}
                        className="px-3.5 py-1.5 bg-white border border-[#E6EAF0] hover:bg-[#F7F9FC] text-[#172033] font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        仍申请完整方案
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ROUND 07 · 增加趋势需求 */}
            <div className="space-y-3 pb-3 border-b border-[#EEF2F6]">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  我还想看近三年的变化趋势。
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-2 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  这个需求增加了一个新的关键条件：<strong className="text-[#2563EB]">历史时间覆盖</strong>。当前行政区划和养老机构信息仍然适用，但人口基本信息视图主要描述当前状态，不能直接证明能够支持近三年人口变化趋势。
                </p>

                {/* Diff Block: 数据方案已更新 */}
                <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2 text-[11px]">
                  <div className="font-bold text-[#172033] text-xs">数据方案已更新 (Diff View)</div>
                  <div className="space-y-1 text-[#667085]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#172033]">新增需求：</span>
                      <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] font-bold rounded">
                        近三年历史趋势
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#172033]">保留资源：</span>
                      <span>行政区划 · 养老机构信息</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#172033]">当前限制：</span>
                      <span>现有人口方案主要覆盖当前状态</span>
                    </div>
                    <div className="text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 font-semibold">
                      当前方案缺口：当前已发现资源尚未覆盖完整的近三年人口历史变化。
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => alert('已发起对历史人口镜像快照库的进一步检索。')}
                      className="px-3.5 py-1.5 bg-[#2563EB] text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      查找补充数据
                    </button>
                    <button
                      onClick={() => onEnterAskData()}
                      className="px-3.5 py-1.5 bg-white border border-[#E6EAF0] text-[#172033] font-semibold rounded-lg text-xs hover:bg-[#F7F9FC] transition-colors cursor-pointer"
                    >
                      继续使用当前方案
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ROUND 08 · 准备进入问数 Handoff Block */}
            <div className="space-y-3 pb-3">
              {/* User Msg */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                  那先用当前可用数据，做一个街镇级的初步分析。
                </div>
              </div>

              {/* AI Response */}
              <div className="space-y-3 text-xs text-[#172033] pl-8">
                <p className="leading-relaxed">
                  可以。当前可用方案已经能够支持<strong className="text-[#2563EB]">街镇级老年人口规模、养老机构数量和床位资源分布的初步比较</strong>。人级明细和近三年趋势暂不纳入这次分析。
                </p>

                {/* THE HANDOFF BLOCK */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                      准备进入问数 (Handoff to Ask Data)
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-[#16A36A] font-mono font-bold px-2 py-0.5 rounded">
                      Context Inherited
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-100 space-y-0.5">
                      <span className="text-[#667085] block text-[10px]">使用资源</span>
                      <div className="font-semibold text-[#172033]">
                        60岁以上人口数 / 行政区划 / 养老机构
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-100 space-y-0.5">
                      <span className="text-[#667085] block text-[10px]">分析范围</span>
                      <div className="font-semibold text-[#172033]">闵行区 · 街镇级</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-100 space-y-0.5">
                      <span className="text-[#667085] block text-[10px]">当前限制</span>
                      <div className="font-semibold text-slate-600">
                        不含人级明细 / 近三年趋势
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => onEnterAskData()}
                      className="px-5 py-2.5 bg-[#16A36A] hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      使用当前方案进入问数
                    </button>
                    <button
                      onClick={() => alert('继续在找数模块检索新的历史时间序列包。')}
                      className="px-4 py-2.5 bg-white border border-[#E6EAF0] hover:bg-[#F7F9FC] text-[#172033] font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      继续查找补充数据
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom rounds created by user input */}
            {customRounds.map((rd, index) => (
              <div key={index} className="space-y-3 pb-3 border-b border-[#EEF2F6]">
                <div className="flex justify-end">
                  <div className="max-w-xl bg-[#F7F9FC] border border-[#E6EAF0] text-[#172033] p-3 rounded-xl text-xs shadow-2xs">
                    {rd.user}
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-md bg-[#2563EB] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    X
                  </div>
                  <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl text-xs text-[#172033] max-w-3xl leading-relaxed">
                    {rd.ai}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Sticky Context Bar (76-88px) */}
          <div className="p-3 border-t border-[#E6EAF0] bg-white space-y-2 shrink-0 select-none">
            {/* Context Chips Bar */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#172033]">当前数据方案：</span>
                <div className="flex flex-wrap gap-1 font-mono">
                  <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] font-bold rounded border border-blue-200">
                    60岁以上人口数
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-[#172033] font-semibold rounded border border-slate-200">
                    行政区划
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-[#172033] font-semibold rounded border border-slate-200">
                    养老机构
                  </span>
                  {isPermissionGranted && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold rounded border border-emerald-200">
                      人口基本信息视图 (已授)
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-[#667085] font-semibold">
                {isPermissionGranted ? '4 项全部可用' : '3 项可用 · 1 需申请'}
              </span>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendCustomMessage} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="继续调整需求，或使用当前方案开始问数…"
                  className="w-full pl-3 pr-10 py-2.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl text-xs focus:outline-hidden focus:border-[#2563EB] text-[#172033]"
                />
                <button
                  type="button"
                  onClick={() => alert('已选择自然人人口与空间附件')}
                  className="absolute right-3 top-2.5 text-[#667085] hover:text-[#172033]"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="submit"
                  className="p-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onEnterAskData()}
                  className="px-4 py-2.5 bg-[#16A36A] hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  进入问数
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Right Panel · Evidence Panel (~410px) */}
        <FindDataEvidencePanel
          activeTab={evidenceTab}
          onTabChange={setEvidenceTab}
          onRequestPermission={() => setIsPermissionDrawerOpen(true)}
          isPermissionGranted={isPermissionGranted}
        />
      </div>

      {/* Permission Drawer */}
      <PermissionApplyDrawer
        isOpen={isPermissionDrawerOpen}
        onClose={() => setIsPermissionDrawerOpen(false)}
        onApproveSuccess={() => setIsPermissionGranted(true)}
        assetName="人口基本信息视图"
      />
    </div>
  );
};
