import React from 'react';
import {
  Sparkles,
  CheckCircle,
  ChevronRight,
  Layers,
  ArrowRight,
  Shield,
  Lock,
  Check,
  AlertTriangle,
  HelpCircle,
  XCircle,
  FileText,
  Building2,
  Users,
  PhoneCall,
  GitFork,
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

export const SemovixScenarioBDialogue: React.FC<Props> = ({
  onSelectResource,
  onOpenPermission,
  onOpenCandidate,
  onEnterAskData,
  permissionState = 'NOT_REQUESTED',
  snapshot,
}) => {
  return (
    <div className="space-y-6">
      {/* ---------------- Round 01 · Ambiguous Goal (MUST_CLARIFY) ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            我想分析闵行区老年人口的公共服务热线诉求情况，看看哪些街镇问题比较集中。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              这里有一个会直接影响数据方案的关键区别：你说的“老年人口诉求”，是指<strong className="text-[#2563EB]">实际由老年人提出的服务热线诉求</strong>，还是想比较<strong className="text-[#2563EB]">老年人口较多的街镇与整体热线诉求分布</strong>？
            </div>

            {/* 需要确认 (MUST_CLARIFY) 卡片 */}
            <div className="bg-white p-4 rounded-xl border-2 border-amber-300/80 shadow-2xs space-y-3 bg-gradient-to-br from-white to-amber-50/30">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#172033]">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>需要确认 · 业务目标歧义澄清</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono text-[10px] font-bold rounded">
                  MUST_CLARIFY
                </span>
              </div>

              <p className="text-[11px] text-[#667085]">
                请确认你的真实分析口径，不同的业务定义对应完全不同的跨域数据架构与权限要求：
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 bg-white border border-amber-200 rounded-lg hover:border-[#2563EB] transition-colors cursor-pointer space-y-1 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                      A
                    </span>
                    <span className="font-bold text-[#172033] text-xs">实际由 60 岁以上人口提出的诉求</span>
                  </div>
                  <p className="text-[10px] text-[#667085] pl-7">
                    人级跨域关联 · 需识别诉求人年龄与常住状态 · 需要人口明细查询权限
                  </p>
                </div>

                <div className="p-3 bg-white border border-amber-200 rounded-lg hover:border-[#2563EB] transition-colors cursor-pointer space-y-1 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                      B
                    </span>
                    <span className="font-bold text-[#172033] text-xs">老年人口规模与整体热线诉求做区域比较</span>
                  </div>
                  <p className="text-[10px] text-[#667085] pl-7">
                    区域统计对比 · 使用现成指标与工单汇总 · 数据直接可用无需明细权限
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 02 · Clarification ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            我要看实际由 60 岁以上常住人口提出的诉求，按街镇和诉求类型分析。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              明白。这个目标需要同时识别诉求人是否属于 60 岁以上常住人口，并读取服务热线工单中的诉求类型与所属区域，因此需要跨<strong className="text-[#2563EB]">人口服务</strong>和<strong className="text-[#2563EB]">公共服务</strong>两个业务范围寻找数据。
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
                  <span className="text-[#667085] block text-[10px]">人口条件</span>
                  <span className="font-bold text-[#172033] text-[11px] leading-tight block mt-0.5">
                    60 岁以上 · 常住人口
                  </span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">服务事件</span>
                  <span className="font-bold text-[#4F46E5] text-[11px] block mt-0.5">
                    公共服务热线工单
                  </span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">分析维度</span>
                  <span className="font-bold text-[#172033] text-[11px] block mt-0.5">街镇 · 诉求类型</span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#E6EAF0]">
                  <span className="text-[#667085] block text-[10px]">核心业务对象</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    <span className="font-bold text-[#4F46E5] text-[10px]">自然人</span>
                    <span className="font-bold text-[#4F46E5] text-[10px]">服务工单</span>
                    <span className="font-bold text-[#4F46E5] text-[10px]">行政区域</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 03 · Cross-domain Data Solution ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            需要哪些数据？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              当前需要人口资源和服务热线工单资源共同完成。人口基本信息负责判断诉求人年龄与常住状态，服务热线工单负责诉求内容、类型和发生区域，行政区划负责统一街镇范围。正式的“60 岁以上人口数”指标可以作为区域人口背景，但不能替代对实际诉求人的识别。
            </div>

            {/* 老年人口服务热线诉求分析 · Data Solution */}
            <div className="bg-white p-4 rounded-xl border border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <div>
                  <h4 className="font-bold text-sm text-[#172033] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#2563EB]" />
                    <span>老年人口服务热线诉求分析 · Data Solution</span>
                  </h4>
                  <p className="text-[10px] text-[#667085] mt-0.5">跨域组装方案 · 人口服务 × 公共服务</p>
                </div>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-bold text-[10px] rounded-full border border-amber-200">
                  PARTIAL SOLUTION
                </span>
              </div>

              {/* 4 Resources */}
              <div className="space-y-2 text-xs">
                {/* Resource 01: 人口基本信息 */}
                <div
                  onClick={() => onSelectResource('人口基本信息', 'resource')}
                  className="p-3 bg-amber-50/40 border border-amber-200 hover:border-amber-400 rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        人口基本信息
                      </span>
                      <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-mono rounded font-semibold">
                        PRIMARY · 人口身份识别
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
                        QUERY REQUESTABLE · 需申请
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Data Asset · Table · 负责：出生日期 · 常住状态 · 自然人身份
                  </div>
                </div>

                {/* Resource 02: 公共服务热线工单记录表 */}
                <div
                  onClick={() => onSelectResource('公共服务热线工单记录表', 'resource')}
                  className="p-3 bg-white border border-[#E6EAF0] hover:border-[#2563EB] rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        公共服务热线工单记录表
                      </span>
                      <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono rounded font-semibold border border-blue-200">
                        PRIMARY · 服务诉求事件
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Data Asset · Table · 负责：诉求记录 · 诉求类型 · 时间 · 所属区域
                  </div>
                </div>

                {/* Resource 03: 行政区划 */}
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
                        REFERENCE · 街镇维度
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Data Asset · 负责：统一街镇编码与所属行政空间
                  </div>
                </div>

                {/* Resource 04: 60 岁以上人口数 */}
                <div
                  onClick={() => onSelectResource('60岁以上人口数', 'evidence')}
                  className="p-3 bg-white border border-[#E6EAF0] hover:border-[#2563EB] rounded-lg transition-colors cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#172033] group-hover:text-[#2563EB]">
                        60 岁以上人口数
                      </span>
                      <span className="px-1.5 py-0.2 bg-purple-50 text-[#7C3AED] text-[9px] font-mono rounded font-semibold border border-purple-200">
                        SUPPORTING · 人口背景规模
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] font-bold text-[10px] rounded border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      AVAILABLE
                    </span>
                  </div>
                  <div className="text-[11px] text-[#667085]">
                    类型：Metric · Published · 用途：街镇老年人口规模背景 / 后续标准化比较
                  </div>
                </div>
              </div>

              {/* 覆盖状态 & 缺口 */}
              <div className="pt-2 border-t border-[#E6EAF0] space-y-2.5 text-xs">
                <div className="p-3 bg-[#F7F9FC] rounded-lg space-y-2">
                  <span className="font-bold text-[#172033] text-[11px] block">当前方案覆盖：</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                    <div className="flex items-center justify-between p-1.5 bg-white rounded border border-[#E6EAF0]">
                      <span className="text-slate-700">老年人口识别</span>
                      <span className="text-amber-800 font-bold text-[10px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        PARTIALLY COVERED · 需要人口查询权限
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-white rounded border border-[#E6EAF0]">
                      <span className="text-slate-700">服务热线诉求</span>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        COVERED
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-white rounded border border-[#E6EAF0]">
                      <span className="text-slate-700">诉求类型</span>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        COVERED
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-white rounded border border-[#E6EAF0]">
                      <span className="text-slate-700">街镇维度</span>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        COVERED
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-white rounded border border-[#E6EAF0]">
                      <span className="text-slate-700">老年人口规模背景</span>
                      <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        COVERED
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 bg-white rounded border border-[#E6EAF0]">
                      <span className="text-slate-700">跨域实际人群关联</span>
                      <span className="text-purple-700 font-bold text-[10px] bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                        UNCERTAIN
                      </span>
                    </div>
                  </div>
                </div>

                {/* 突出：当前方案缺口 */}
                <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-lg text-[11px] text-amber-950 space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      当前方案缺口 (Current Gap)
                    </span>
                    <span className="font-mono text-[9px] bg-amber-200/80 px-1.5 py-0.2 rounded text-amber-900">
                      RELATIONSHIP_UNVERIFIED
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    人口资源与服务热线诉求人之间存在业务关联语义，但目前尚未确认可直接用于查询的跨域技术关联路径。因此当前 Data Solution 为 <strong>PARTIAL</strong>，而不是 COMPLETE。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 04 · Relationship Question ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            人口表和服务热线工单已经可以直接关联了吗？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              目前能够确认“服务工单存在诉求人”“诉求人属于自然人”这一业务关系，也能够确认人口资源和工单资源分别绑定到相关业务对象；但当前还没有足够证据把这种业务关系表述为已经验证的查询关联路径。
            </div>

            {/* Relationship Evidence 卡片 */}
            <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <span className="font-bold text-xs text-[#172033] flex items-center gap-1.5">
                  <GitFork className="w-4 h-4 text-[#4F46E5]" />
                  <span>Relationship Evidence (关系证据链)</span>
                </span>
                <span className="text-[10px] text-[#4F46E5] font-mono font-semibold">Semantic vs Query</span>
              </div>

              <div className="space-y-2 text-[11px] text-slate-700">
                <div className="p-2.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#172033]">服务工单 → 诉求人 → 自然人</span>
                    <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono font-bold rounded">
                      R1 · Semantic Relation
                    </span>
                  </div>
                  <p className="text-[#667085]">业务语义层确认：每条热线工单对应一个提出诉求的市民主体。</p>
                </div>

                <div className="p-2.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#172033]">自然人 → 人口基本信息</span>
                    <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono font-bold rounded">
                      R2 · Resource Binding
                    </span>
                  </div>
                  <p className="text-[#667085]">资源绑定确认：自然人主数据绑定人口基本信息表。</p>
                </div>

                <div className="p-2.5 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#172033]">服务工单 → 热线工单资源</span>
                    <span className="px-1.5 py-0.2 bg-blue-50 text-[#2563EB] text-[9px] font-mono font-bold rounded">
                      R2 · Resource Binding
                    </span>
                  </div>
                  <p className="text-[#667085]">资源绑定确认：服务工单事件绑定公共服务热线工单记录表。</p>
                </div>

                <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-950">跨域自然人识别：</span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 text-[10px] font-mono font-bold rounded">
                        R3 · Analytical Relation Candidate
                      </span>
                      <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[10px] font-mono font-bold rounded">
                        NOT R4
                      </span>
                    </div>
                  </div>
                  <p className="text-purple-900 leading-relaxed">
                    说明：具体人口身份关联方式需要 Ask Data / Analytical Runtime 进一步验证。当前未在元数据中确认物理主外键，严禁假设直接关联。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 05 · Permission ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            人口基本信息目前能直接查询吗？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              当前你可以发现并查看人口资源的业务与语义信息，但 QUERY 需要申请，因此完整的“实际老年人诉求识别”目前不能直接执行。
            </div>

            {/* 可用性状态面板 */}
            <div className="space-y-2 py-1">
              <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-lg space-y-1.5 text-[11px]">
                <div className="font-semibold text-[#172033] pb-1 border-b border-[#E6EAF0] flex justify-between items-center">
                  <span>当前可用性快照 (Availability Snapshot)</span>
                  <span className="text-[10px] text-[#667085]">Operation-level ACL</span>
                </div>
                
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-bold text-[#172033]">人口基本信息</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">VIEW METADATA · AVAILABLE</span>
                    {permissionState === 'REQUEST_PENDING' ? (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-[10px] border border-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-700 animate-pulse" />
                        QUERY · REQUEST_PENDING (审批中)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                        QUERY · REQUESTABLE
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-700">公共服务热线工单记录表</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                    QUERY · AVAILABLE
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="font-medium text-slate-700">行政区划</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                    QUERY · AVAILABLE
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-slate-700">60 岁以上人口数</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] font-bold rounded text-[10px]">
                    QUERY · AVAILABLE
                  </span>
                </div>
              </div>

              {permissionState === 'REQUEST_PENDING' ? (
                <button
                  onClick={onOpenPermission}
                  className="w-full py-2.5 bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 border border-amber-300 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span>申请处理中 · 查看审批进度 (REQ-2026-0815-9921)</span>
                </button>
              ) : (
                <button
                  onClick={onOpenPermission}
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  <span>提交人口数据使用申请</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 06 · Alternative Plan ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            如果先不用人口明细，还能分析什么？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              可以形成一个不依赖人级关联的区域比较方案：比较各街镇 60 岁以上人口规模与整体服务热线诉求数量和类型分布。但需要明确，这个方案回答的是“老年人口较多地区的热线诉求情况”，不能证明这些诉求实际由老年人提出。
            </div>

            {/* 方案边界与口径差异展示 */}
            <div className="bg-white p-4 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <span className="font-bold text-xs text-[#172033]">替代方案边界与口径差异</span>
                <span className="text-[10px] text-[#2563EB] font-medium">Clear Boundary</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                {/* 可先完成 */}
                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                    <span>可先完成 (Available Now)</span>
                  </div>
                  <div className="space-y-1 text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <span>✓</span>
                      <span>各街镇 60+ 人口规模</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>✓</span>
                      <span>各街镇服务热线诉求总量</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>✓</span>
                      <span>各街镇诉求类型分布</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>✓</span>
                      <span>人口规模与热线诉求的区域比较</span>
                    </div>
                  </div>
                </div>

                {/* 暂时不能证明 */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>暂时不能证明 (Limitations)</span>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span>×</span>
                      <span>哪些具体工单由 60+ 人群提出</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>×</span>
                      <span>老年诉求人实际诉求率</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>×</span>
                      <span>老年人个人层面诉求特征</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 07 · Execution Selection ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            那先做区域层面的比较。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              可以。本次先选择当前可直接使用的资源，不使用人口明细，也不做实际诉求人身份关联。
            </div>

            {/* 本次执行选择 */}
            <div className="bg-white p-4 rounded-xl border border-[#2563EB]/40 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-2">
                <h4 className="font-bold text-sm text-[#172033]">本次执行选择 (Execution Selection)</h4>
                <span className="text-[10px] text-[#2563EB] font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Scope: 区域级对比
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="space-y-1.5">
                  <span className="text-[#16A36A] font-bold text-[11px] block">✓ 使用资源（3项直接可用）：</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[#172033] text-[11px]">
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>60岁以上人口数</span>
                    </div>
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded font-medium flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#16A36A]" />
                      <span>公共服务热线工单记录表</span>
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
                      QUERY REQUESTABLE · 暂不纳入本次执行
                    </span>
                  </div>
                </div>

                <div className="p-2 bg-blue-50/50 border border-blue-100 rounded text-[11px] text-blue-900">
                  <strong>分析范围已锁定为：</strong> 区域级对比（非“老年人实际诉求识别”）
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 08 · Request Type ---------------- */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            诉求类型也可以一起看吗？
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              可以。服务热线工单资源本身能够提供诉求类型和区域维度，因此当前 Execution Selection 可以支持各街镇整体热线诉求类型分布。只是这些工单目前不能被标记为“老年人本人提出”。
            </div>

            {/* 轻量 Coverage Update */}
            <div className="bg-white p-3.5 rounded-xl border border-[#E6EAF0] shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#172033] text-[11px]">方案覆盖微调 (Coverage Update)</span>
                <span className="text-[10px] text-[#667085]">Incremental Update</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center justify-between p-2 bg-emerald-50/50 border border-emerald-100 rounded">
                  <span className="text-slate-700">诉求类型分布</span>
                  <span className="text-emerald-700 font-bold text-[10px]">COVERED</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-700">老年诉求人识别</span>
                  <span className="text-slate-500 font-bold text-[10px]">NOT COVERED</span>
                </div>
              </div>
              <div className="text-[10px] text-amber-800 bg-amber-50/60 p-2 rounded border border-amber-100">
                保留缺口：跨域自然人身份关联待验证（基于当前区域级比较方案继续执行）
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Round 09 · Ask Data Handoff ---------------- */}
      <div className="space-y-3 pb-6">
        <div className="flex justify-end">
          <div className="bg-[#EFF4FB] text-[#1E293B] border border-[#DCE4F0] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium max-w-lg leading-relaxed shadow-2xs">
            那先用这套数据做街镇级区域比较。
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ring-2 ring-purple-100">
            X
          </div>
          <div className="space-y-3.5 max-w-2xl text-xs text-[#172033]">
            <div className="py-1 text-xs text-[#1E293B] leading-relaxed">
              可以。这次分析将比较各街镇 60 岁以上人口规模与整体公共服务热线诉求量、诉求类型分布。分析结果不会把热线工单解释为“老年人实际提出的诉求”。
            </div>

            {/* 准备进入问数 卡片 */}
            <div className="bg-gradient-to-br from-white via-[#F7F9FC] to-blue-50/40 p-5 rounded-2xl border-2 border-[#2563EB] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#172033]">准备进入问数</h3>
                  <p className="text-xs text-[#667085]">
                    已锁定本次跨域区域对比找数方案
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded-md shadow-2xs">
                  Ready
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[#667085] block text-[11px] mb-1 font-medium">
                    Execution Selection (3项已就绪资产)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['60岁以上人口数', '公共服务热线工单记录表', '行政区划'].map((res) => (
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
                    <span className="text-[#667085] block text-[10px]">可分析内容</span>
                    <span className="font-bold text-[#2563EB]">
                      老年人口规模 · 热线诉求总量 · 诉求类型分布 · 区域差异
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-900 font-bold text-[10px]">当前限制 (Current Scope Limitation)</span>
                    <span className="text-[9px] font-mono bg-amber-200/60 text-amber-900 px-1 rounded">
                      人口身份关联待验证
                    </span>
                  </div>
                  <p className="text-amber-950 font-medium">
                    不能识别实际老年诉求人，结果表现为各街镇人口规模与热线诉求总量的宏观关联。
                  </p>
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
                  <span>使用本次选择进入问数</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>

                <button
                  onClick={onOpenPermission}
                  className="px-4 py-3 bg-white border border-[#E6EAF0] hover:bg-slate-50 text-[#667085] font-medium text-xs rounded-xl transition-colors cursor-pointer"
                >
                  继续完善跨域数据方案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
