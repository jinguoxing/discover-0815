import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  Shield,
  Lock,
  Building2,
  MapPin,
  Check,
  ExternalLink,
  Users,
  Clock,
} from 'lucide-react';
import { EvidenceTabType } from './SemovixEvidencePanel';
import { PermissionRequestState, ExecutionSelection, AvailabilitySnapshotViewModel } from '../types';
import { createExecutionSelection } from '../models/availability';

interface Props {
  onSelectResource: (name: string, tab?: EvidenceTabType) => void;
  onOpenPermission: () => void;
  onOpenCandidate: () => void;
  onEnterAskData?: (selection: ExecutionSelection) => void;
  permissionState?: PermissionRequestState;
  snapshot?: AvailabilitySnapshotViewModel;
}

export const SemovixScenarioCDialogue: React.FC<Props> = ({
  onSelectResource,
  onOpenPermission,
  onOpenCandidate,
  onEnterAskData,
  permissionState = 'NOT_REQUESTED',
  snapshot,
}) => {
  const [isPipelineExpanded, setIsPipelineExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* ---------------- Round 01 · Goal Understanding ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            我想分析闵行区各街镇老年人口规模和养老服务资源是否匹配。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              我理解你希望同时看两部分：<strong className="text-[#2563EB]">各街镇老年人口规模</strong>，以及
              <strong className="text-[#2563EB]">养老服务资源是否与人口分布匹配</strong>。
              我会从人口服务和养老服务相关资源中，寻找能够覆盖人口、行政区域和养老机构床位供给的数据。
            </div>

            {/* 当前理解 结构化卡片 */}
            <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <span className="font-bold text-xs text-[#172033]">当前理解</span>
                <span className="text-[10px] text-[#2563EB] font-medium cursor-pointer hover:underline">
                  调整理解
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">分析目标</span>
                  <span className="font-bold text-[#172033] text-[11px] leading-tight block mt-0.5">
                    老年人口规模 × 养老服务匹配
                  </span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">业务对象</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    <span className="font-bold text-[#4F46E5] text-[10px]">自然人</span>
                    <span className="font-bold text-[#4F46E5] text-[10px]">行政区域</span>
                    <span className="font-bold text-[#4F46E5] text-[10px]">养老机构</span>
                  </div>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">空间维度</span>
                  <span className="font-bold text-[#172033] text-[11px] block mt-0.5">街镇</span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">人口范围</span>
                  <span className="font-bold text-[#172033] text-[11px] block mt-0.5">60岁及以上 · 常住</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 02 · Requirement Convergence ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            先按 60 岁及以上常住人口，街镇维度就可以。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              好的，已把分析范围收敛为<strong className="text-[#2563EB]">60 岁及以上常住人口 × 街镇 × 养老资源供给</strong>。这个信息已经足够形成第一版决策型数据方案，我继续为你查找并对齐相关跨域资源。
            </div>

            {/* 需求已更新 */}
            <div className="flex items-center gap-2 p-2 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg text-xs">
              <span className="font-bold text-[#172033] text-[11px]">需求已更新：</span>
              <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#2563EB] rounded text-[11px] font-medium">
                60岁及以上
              </span>
              <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#2563EB] rounded text-[11px] font-medium">
                常住人口
              </span>
              <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#2563EB] rounded text-[11px] font-medium">
                街镇
              </span>
              <span className="px-2 py-0.5 bg-white border border-[#E6EAF0] text-[#4F46E5] rounded text-[11px] font-medium">
                养老机构与床位
              </span>
            </div>

            {/* 流水线状态折叠条 */}
            <div className="border border-[#E6EAF0] rounded-xl bg-white overflow-hidden text-xs">
              <button
                onClick={() => setIsPipelineExpanded(!isPipelineExpanded)}
                className="w-full p-3 bg-[#F7F9FC] flex items-center justify-between hover:bg-[#EEF2F6] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2 text-[#667085]">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="font-bold text-[#172033]">正在为你查找合适的数据…</span>
                  <span className="text-[10px] text-[#667085] hidden sm:inline">
                    · 已定位人口服务与养老服务 · 正在检查跨域资源可用性
                  </span>
                </div>
                {isPipelineExpanded ? (
                  <ChevronDown className="w-4 h-4 text-[#667085]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#667085]" />
                )}
              </button>

              {isPipelineExpanded && (
                <div className="p-3 bg-white space-y-2 text-[#667085] border-t border-[#E6EAF0] text-[11px]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                    <span>已理解业务目标：老年人口规模 × 养老服务资源匹配</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                    <span>已解析业务语义：自然人（60岁以上）、行政区域（街镇）、养老机构（床位供给）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                    <span>已定位跨域数据资源：人口规模指标、行政区划库、民政养老设施目录</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                    <span>已完成资源覆盖与可用性评估：4项直接可用，1项人级视图需申请</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 03 · Data Solution ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            有哪些数据可以用？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              找到了一套跨域覆盖比较完整的决策型数据方案。
              核心使用<strong className="text-[#2563EB]">60 岁以上人口数</strong>确定老年人口规模，通过<strong className="text-[#2563EB]">行政区划</strong>统一街镇维度，并结合<strong className="text-[#2563EB]">养老机构基本信息</strong>与<strong className="text-[#2563EB]">养老机构服务能力</strong>分析机构分布与床位供需比。<strong className="text-[#4F46E5]">人口基本信息</strong>可作为可选增强资源支持未来人级下钻。
            </div>

            {/* 老年人口养老服务匹配分析 · 数据方案 卡片 */}
            <div className="bg-white p-4 rounded-xl border border-[#2563EB]/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <div>
                  <h4 className="font-bold text-sm text-[#172033] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#2563EB]" />
                    <span>老年人口养老服务匹配分析 · 数据方案</span>
                  </h4>
                  <p className="text-[10px] text-[#667085] mt-0.5">跨域决策型找数推荐方案 (Decision-oriented Cross-Domain Solution)</p>
                </div>
                <span className="px-2 py-0.5 bg-blue-50 text-[#2563EB] font-bold text-[10px] rounded-full border border-blue-200">
                  Semovix Solution
                </span>
              </div>

              {/* Resource List */}
              <div className="space-y-2 text-xs">
                {/* 1. 60 岁以上人口数 */}
                <div
                  onClick={() => onSelectResource('60岁以上人口数', 'resource')}
                  className="p-3 bg-white border border-[#E6EAF0] hover:border-[#2563EB] rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        60 岁以上人口数
                      </span>
                      <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono rounded font-semibold border border-blue-200">
                        PRIMARY · 人口规模
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Metric · 负责：60岁及以上常住人口规模 · 空间粒度：街镇
                  </div>
                </div>

                {/* 2. 行政区划 */}
                <div
                  onClick={() => onSelectResource('行政区划', 'resource')}
                  className="p-3 bg-white border border-[#E6EAF0] hover:border-[#2563EB] rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        行政区划
                      </span>
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 text-[9px] font-mono rounded font-semibold">
                        REFERENCE · 区域维度
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Data Asset · 负责：统一街镇名称、代码与行政空间关联
                  </div>
                </div>

                {/* 3. 养老机构基本信息 */}
                <div
                  onClick={() => onSelectResource('养老机构基本信息', 'resource')}
                  className="p-3 bg-white border border-[#E6EAF0] hover:border-[#2563EB] rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        养老机构基本信息
                      </span>
                      <span className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] text-[9px] font-mono rounded font-semibold border border-indigo-200">
                        DOMAIN · 养老机构
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Data Asset · 负责：机构名称、机构类型、所属街镇、运营状态与地址
                  </div>
                </div>

                {/* 4. 养老机构服务能力 */}
                <div
                  onClick={() => onSelectResource('养老机构服务能力', 'resource')}
                  className="p-3 bg-white border border-[#E6EAF0] hover:border-[#2563EB] rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        养老机构服务能力
                      </span>
                      <span className="px-1.5 py-0.2 bg-indigo-50 text-[#4F46E5] text-[9px] font-mono rounded font-semibold border border-indigo-200">
                        DOMAIN · 供给能力
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Data Asset · 负责：规划床位数、可用床位数、护理型床位占比
                  </div>
                </div>

                {/* 5. 人口基本信息 (Optional) */}
                <div
                  onClick={() => onSelectResource('人口基本信息', 'resource')}
                  className="p-3 bg-slate-50 border border-slate-200 hover:border-amber-400 rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 group-hover:text-[#2563EB]">
                        人口基本信息
                      </span>
                      <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-mono rounded font-semibold">
                        OPTIONAL ENHANCEMENT · 人级补充
                      </span>
                    </div>
                    {permissionState === 'REQUEST_PENDING' ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold text-[10px] rounded border border-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-700 animate-pulse" />
                        REQUEST_PENDING · 申请处理中
                      </span>
                    ) : permissionState === 'AVAILABLE' ? (
                      <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200">
                        AVAILABLE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10px] rounded border border-amber-200 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-600" />
                        REQUESTABLE · 需申请
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    负责：人级粒度下钻（如高龄老人、独居老人明细）
                  </div>
                </div>
              </div>

              {/* 覆盖状态 & 缺口 */}
              <div className="pt-2 border-t border-[#E6EAF0] space-y-2 text-xs">
                <div className="p-2.5 bg-[#F7F9FC] rounded-lg space-y-1.5">
                  <span className="font-bold text-[#172033] text-[11px] block">方案覆盖检查：</span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-[#172033]">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>老年人口规模（已覆盖）</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>街镇分布维度（已覆盖）</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>养老机构数量（已覆盖）</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>养老床位资源（已覆盖）</span>
                    </div>
                  </div>
                </div>

                {/* 缺口提示 */}
                <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 leading-relaxed">
                  <span className="font-bold block mb-0.5">当前方案缺口 (Current Gap)：</span>
                  当前已发现资源覆盖了<strong>机构与床位供给侧</strong>，但尚未覆盖<strong>养老服务实际使用记录</strong>（如机构真实入住率、月度服务人次）。如需分析实际使用饱和度，可后续补充服务工单或结算数据。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 04 · Cross-domain Logic Explanation ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            为什么需要组合这几个数据，不能直接用一张表吗？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              因为当前决策分析跨越了两个独立的业务域：<strong className="text-[#2563EB]">人口服务（需求侧）</strong>与
              <strong className="text-[#2563EB]">养老服务（供给侧）</strong>。
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] space-y-2 text-xs">
              <span className="font-bold text-[#172033] block">跨域方案关联逻辑：</span>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 text-[11px] leading-relaxed">
                <li>
                  <strong>需求端：</strong> 使用已经治理并正式发布的 <span className="font-mono text-[#2563EB]">60 岁以上人口数</span> 指标，口径统一且准确；
                </li>
                <li>
                  <strong>供给端：</strong> 使用 <span className="font-mono text-[#4F46E5]">养老机构基本信息</span> 与 <span className="font-mono text-[#4F46E5]">养老机构服务能力</span> 统计各街镇机构数量与可用床位数；
                </li>
                <li>
                  <strong>空间对齐：</strong> 通过 <span className="font-mono text-slate-800">行政区划</span> 街镇标准代码将两端数据关联，从而计算出<strong>「每千名老人床位数」</strong>与<strong>「床位供需缺口」</strong>。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 05 · Scope Changed ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            如果我想进一步看 80 岁以上高龄老人或独居老人的养老床位缺口呢？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              如果需要进一步下钻到 80 岁以上高龄或独居老人，数据方案会发生变化。
            </div>

            {/* 数据方案变化预判 */}
            <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <span className="font-bold text-xs text-[#172033]">数据方案变化预判</span>
                <span className="text-[10px] text-[#4F46E5] font-mono">Scope Changed</span>
              </div>

              <div className="space-y-2 text-[11px] text-slate-700">
                <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded-lg space-y-1">
                  <span className="font-bold text-[#4F46E5] block">1. 高龄老人 (80岁+)：</span>
                  <p className="leading-relaxed">
                    当前 <span className="font-mono text-slate-800">60岁以上人口数</span> 无法直接下钻到 80 岁。需要将 <span className="font-mono text-[#2563EB]">人口基本信息</span> 转为主资源，基于出生日期动态过滤计算（需申请查询权限）。
                  </p>
                </div>

                <div className="p-2.5 bg-indigo-50/60 border border-indigo-100 rounded-lg space-y-1">
                  <span className="font-bold text-[#4F46E5] block">2. 独居老人识别：</span>
                  <p className="leading-relaxed">
                    需要引入 <span className="font-mono text-[#2563EB]">自然人家庭关系</span> 数据，识别同户仅有单一高龄老人的记录。
                  </p>
                </div>
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
              你目前可以发现并查看它的元数据与字段说明，但人级明细的 QUERY 查询操作需要申请。当前标准的 60 岁以上养老供需匹配分析不受影响，4项核心资源均可直接使用。
            </div>

            {/* 当前可用性面板 */}
            <div className="space-y-2 py-1">
              <div className="p-3 bg-slate-100/70 rounded-lg space-y-1.5 text-[11px]">
                <div className="font-semibold text-slate-800 pb-1 border-b border-slate-200/60 flex items-center justify-between">
                  <span>当前可用性快照</span>
                  <span className="text-[10px] text-slate-500 font-mono">Operation: QUERY</span>
                </div>
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
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="font-medium text-slate-700">行政区划</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                    查询：AVAILABLE
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="font-medium text-slate-700">养老机构基本信息</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                    查询：AVAILABLE
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-slate-700">养老机构服务能力</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                    查询：AVAILABLE
                  </span>
                </div>
              </div>

              {permissionState === 'REQUEST_PENDING' ? (
                <button
                  onClick={onOpenPermission}
                  className="w-full py-2 bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 border border-amber-300 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span>申请处理中 · 查看审批进度 (REQ-2026-0815-9921)</span>
                </button>
              ) : (
                <button
                  onClick={onOpenPermission}
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
            那先用可以直接用的 4 项资源进行供需匹配分析。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              可以。当前 4 项可用资源已经完全足够完成街镇级 60 岁以上老年人口与养老床位供需匹配分析。
            </div>

            {/* 本次执行选择 */}
            <div className="bg-white p-4 rounded-xl border border-[#2563EB]/40 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <h4 className="font-bold text-sm text-[#172033]">本次执行选择</h4>
                <span className="text-[10px] text-[#667085]">Minimal & Sufficient Execution</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="space-y-1">
                  <span className="text-[#16A36A] font-bold text-[11px] block">✓ 本次使用（4项直接可用）：</span>
                  <div className="grid grid-cols-2 gap-1.5 text-[#172033] text-[11px]">
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>60 岁以上人口数</span>
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>行政区划</span>
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>养老机构基本信息</span>
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>养老机构服务能力</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <span className="text-slate-600 font-bold text-[11px] block">暂不使用：</span>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] flex justify-between items-center">
                    <span>人口基本信息 (人级)</span>
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
            还有其他相关的养老服务设施数据吗？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              系统还发现了部分补充类养老与人口资产（如社区助餐点分布、人口年度统计、自然人家庭关系等）。当前 4 项核心资源已足以回答各街镇床位供需匹配，补充资源可作为后续专题扩展。
            </div>

            {/* 轻量入口 */}
            <div className="pt-1">
              <button
                onClick={onOpenCandidate}
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
            那就用这套方案开始分析各街镇的养老资源匹配度吧。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3.5 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              可以。当前方案已锁定 4 项核心数据资源，涵盖闵行区各街镇 60 岁以上老年人口与养老机构床位供给。
            </div>

            {/* 准备进入决策问数 卡片 */}
            <div className="bg-gradient-to-br from-white via-[#F7F9FC] to-blue-50/40 p-5 rounded-2xl border-2 border-[#2563EB] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#172033]">准备进入决策问数</h3>
                  <p className="text-xs text-[#667085]">
                    已锁定本次跨域找数方案，准备开展街镇级养老供需匹配分析
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded-md shadow-2xs">
                  Ready
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[#667085] block text-[11px] mb-1 font-medium">Execution Selection (4项核心资产)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['60 岁以上人口数', '行政区划', '养老机构基本信息', '养老机构服务能力'].map((res) => (
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
                    <span className="font-bold text-[#172033]">闵行区 · 14个街镇/工业区</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E6EAF0] rounded-lg">
                    <span className="text-[#667085] block text-[10px]">分析模型</span>
                    <span className="font-bold text-[#2563EB]">每千名老人床位数 · 供需缺口预警</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px]">
                  <span className="text-slate-500 block text-[10px]">当前范围限制</span>
                  <span className="font-medium text-slate-700">
                    基于供给侧床位能力测算，不含实时人级入住记录
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (onEnterAskData && snapshot) {
                      const selection = createExecutionSelection(snapshot);
                      onEnterAskData(selection);
                    }
                  }}
                  className="flex-1 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>使用当前方案进入问数</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>

                <button className="px-4 py-3 bg-white border border-[#E6EAF0] hover:bg-slate-50 text-[#667085] font-medium text-xs rounded-xl transition-colors cursor-pointer">
                  继续调整分析参数
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
