import React from 'react';
import {
  FileCheck2,
  Database,
  Lock,
  Unlock,
  Key,
  Network,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  ChevronRight,
  UserCheck,
  Tag,
  Clock,
  Check,
} from 'lucide-react';

export type EvidenceTabType = 'evidence' | 'resource' | 'availability' | 'relation';

interface Props {
  activeTab: EvidenceTabType;
  onTabChange: (tab: EvidenceTabType) => void;
  onRequestPermission: () => void;
  isPermissionGranted: boolean;
}

export const FindDataEvidencePanel: React.FC<Props> = ({
  activeTab,
  onTabChange,
  onRequestPermission,
  isPermissionGranted,
}) => {
  return (
    <aside className="w-[410px] bg-white border-l border-[#E6EAF0] flex flex-col h-full text-xs font-sans shrink-0 select-none">
      {/* Header & Tabs */}
      <div className="p-3.5 border-b border-[#EEF2F6] bg-[#F7F9FC]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#172033] text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            推荐依据与可信证据
          </h2>
          <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-[#4F46E5] font-semibold px-2 py-0.5 rounded-full">
            Semovix Governance
          </span>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/60 rounded-lg text-[11px] font-semibold">
          <button
            onClick={() => onTabChange('evidence')}
            className={`py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'evidence'
                ? 'bg-white text-[#2563EB] shadow-xs font-bold'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            方案依据
          </button>
          <button
            onClick={() => onTabChange('resource')}
            className={`py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'resource'
                ? 'bg-white text-[#2563EB] shadow-xs font-bold'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            当前资源
          </button>
          <button
            onClick={() => onTabChange('availability')}
            className={`py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'availability'
                ? 'bg-white text-[#2563EB] shadow-xs font-bold'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            可用性
          </button>
          <button
            onClick={() => onTabChange('relation')}
            className={`py-1.5 px-2 rounded-md transition-all text-center cursor-pointer ${
              activeTab === 'relation'
                ? 'bg-white text-[#2563EB] shadow-xs font-bold'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            相关关系
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[#172033]">
        {/* TAB 01: 方案依据 */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            {/* 目标匹配 */}
            <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs flex items-center justify-between">
                <span>目标匹配</span>
                <span className="text-[10px] text-[#2563EB] font-mono bg-blue-50 px-1.5 py-0.5 rounded">
                  Goal Alignment
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-[#667085]">
                <div className="flex justify-between">
                  <span>当前目标：</span>
                  <strong className="text-[#172033]">老年人口规模 × 养老服务资源匹配</strong>
                </div>
                <div className="flex justify-between">
                  <span>行政范围：</span>
                  <span className="text-[#172033]">闵行区 · 街镇级</span>
                </div>
                <div className="flex justify-between">
                  <span>人口标准：</span>
                  <span className="text-[#172033]">60 岁及以上常住人口</span>
                </div>
              </div>
            </div>

            {/* 业务语义 */}
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">业务语义识别</div>
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-[#667085] block mb-1">识别业务对象：</span>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] font-semibold rounded-md border border-indigo-100">
                      自然人
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] font-semibold rounded-md border border-indigo-100">
                      行政区域
                    </span>
                    <span className="px-2 py-0.5 bg-indigo-50 text-[#4F46E5] font-semibold rounded-md border border-indigo-100">
                      养老机构
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[#667085] block mb-1">关键业务术语：</span>
                  <div className="flex flex-wrap gap-1 text-[10px] text-[#667085]">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">老年人口</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">常住人口</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">街镇</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded">养老服务床位</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 需求覆盖 */}
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">需求覆盖映射</div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6]">
                  <span className="text-[#667085]">人口主体 / 年龄</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="font-semibold text-[#172033]">人口基本信息视图</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6]">
                  <span className="text-[#667085]">街镇维度统一</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="font-semibold text-[#172033]">行政区划</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6]">
                  <span className="text-[#667085]">养老机构 / 床位</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="font-semibold text-[#172033]">养老机构信息</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6]">
                  <span className="text-[#667085]">老年人口标准规模</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="font-semibold text-[#172033]">60岁以上人口数</span>
                </div>
              </div>
            </div>

            {/* 适配依据 */}
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">适配依据</div>
              <div className="space-y-2 text-[11px]">
                <div className="border-l-2 border-[#2563EB] pl-2 space-y-0.5">
                  <div className="font-semibold text-[#172033]">人口基本信息视图</div>
                  <div className="text-[10px] text-[#667085]">
                    记录粒度：<strong className="text-slate-800">人级</strong> | 业务主体：<strong className="text-slate-800">自然人</strong>
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono">来源：Data Semantics · 已确认</div>
                </div>

                <div className="border-l-2 border-[#16A36A] pl-2 space-y-0.5">
                  <div className="font-semibold text-[#172033]">60 岁以上人口数</div>
                  <div className="text-[10px] text-[#667085]">标准：企业正式老年人口统计口径</div>
                  <div className="text-[9px] text-[#16A36A] font-mono">来源：Metric Registry · Published</div>
                </div>

                <div className="border-l-2 border-[#16A36A] pl-2 space-y-0.5">
                  <div className="font-semibold text-[#172033]">养老机构信息</div>
                  <div className="text-[10px] text-[#667085]">关键语义：所属区域 · 床位数量</div>
                  <div className="text-[9px] text-[#4F46E5] font-mono">来源：Data Semantics</div>
                </div>
              </div>
            </div>

            {/* 可信与时效 */}
            <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl space-y-1.5 text-[11px]">
              <div className="font-bold text-[#172033] flex items-center justify-between">
                <span>可信与时效凭证</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" />
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>语义状态：</span>
                <span className="text-[#172033] font-semibold">核心语义已确认</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>最近更新：</span>
                <span className="text-[#172033]">今天 04:00 (自动数据同步)</span>
              </div>
              <div className="flex justify-between text-[#667085]">
                <span>数据质量：</span>
                <span className="text-[#16A36A] font-semibold">无阻塞问题 (血缘校验 100%)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 02: 当前资源 */}
        {activeTab === 'resource' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#172033] text-sm">人口基本信息视图</span>
                <span className="px-2 py-0.5 bg-indigo-100 text-[#4F46E5] text-[10px] font-bold rounded">
                  Data Asset · View
                </span>
              </div>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                全区常住人口及户籍人口基础信息视图，覆盖人口身份、年龄、出生日期及所属行政街镇。
              </p>
            </div>

            {/* 角色与使用原因 */}
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">在当前方案中的角色</div>
              <div className="px-2.5 py-1 bg-amber-50 text-[#F59E0B] font-bold rounded-md border border-amber-200 text-xs inline-block">
                核心人口数据
              </div>

              <div className="pt-2 border-t border-[#EEF2F6] space-y-1.5 text-[11px]">
                <span className="font-semibold text-[#172033] block">为什么使用这项资源：</span>
                <ul className="space-y-1 text-[#667085] list-disc list-inside">
                  <li>主要记录主体：自然人</li>
                  <li>记录粒度：人级明细</li>
                  <li>同时覆盖出生日期（年龄判定）</li>
                  <li>同时覆盖常住状态（常住人口筛查）</li>
                  <li>包含所属行政区域编码（街镇聚合）</li>
                </ul>
              </div>
            </div>

            {/* 关键字段语义 */}
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">关键字段语义</div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6] flex justify-between">
                  <span className="font-bold text-[#172033]">person_id</span>
                  <span className="font-sans text-[#667085]">人员标识 (自然人)</span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6] flex justify-between">
                  <span className="font-bold text-[#172033]">birth_date</span>
                  <span className="font-sans text-[#667085]">出生日期 (年龄计算)</span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6] flex justify-between">
                  <span className="font-bold text-[#172033]">resident_status</span>
                  <span className="font-sans text-[#667085]">常住状态 (常住/暂住)</span>
                </div>
                <div className="p-2 bg-[#F7F9FC] rounded-lg border border-[#EEF2F6] flex justify-between">
                  <span className="font-bold text-[#172033]">region_code</span>
                  <span className="font-sans text-[#667085]">行政区域编码 (街镇)</span>
                </div>
              </div>
            </div>

            {/* Safe Notice */}
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl space-y-1 text-[11px] font-mono border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                Semovix Privacy Governed
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                已执行 C2 政务数据脱敏规范。严禁在找数阶段渲染或输出真实姓名、身份证及手机号等隐私行数据。
              </p>
            </div>

            <button
              onClick={() => alert('资产详情模式：数据归口部门为上海市民政局，已关联全区 14 个街镇常住人口元数据。')}
              className="w-full py-2 bg-white border border-[#E6EAF0] hover:bg-[#F7F9FC] text-[#2563EB] font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              查看完整资产详情
            </button>
          </div>
        )}

        {/* TAB 03: 可用性 */}
        {activeTab === 'availability' && (
          <div className="space-y-4">
            <div className="p-3 bg-[#F7F9FC] border border-[#E6EAF0] rounded-xl flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#172033] text-xs">当前方案可用性</h3>
                <p className="text-[10px] text-[#667085]">3 项可用 · 1 项需要申请</p>
              </div>
              {isPermissionGranted ? (
                <span className="px-2 py-0.5 bg-emerald-100 text-[#16A36A] text-[10px] font-bold rounded flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  全部可用
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-amber-100 text-[#F59E0B] text-[10px] font-bold rounded flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  待申请授权
                </span>
              )}
            </div>

            {/* List */}
            <div className="space-y-2.5">
              {/* Asset 1: 人口基本信息视图 */}
              <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172033] text-xs">人口基本信息视图</span>
                  {isPermissionGranted ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-[10px] font-bold rounded flex items-center gap-1">
                      <Unlock className="w-3 h-3" />
                      AVAILABLE · 已授权
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-50 text-[#F59E0B] border border-amber-200 text-[10px] font-bold rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      REQUESTABLE · 需要申请
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#667085]">
                  说明：{isPermissionGranted ? '您已获得该资源的离散脱敏查询权限。' : '当前可被检索发现，但尚无明细查询权限。'}
                </p>

                {!isPermissionGranted && (
                  <button
                    onClick={onRequestPermission}
                    className="w-full py-1.5 bg-[#F59E0B] hover:bg-amber-600 text-white rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    申请使用此资源
                  </button>
                )}
              </div>

              {/* Asset 2: 行政区划 */}
              <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172033] text-xs">行政区划</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-[10px] font-bold rounded flex items-center gap-1">
                    <Unlock className="w-3 h-3" />
                    AVAILABLE
                  </span>
                </div>
                <p className="text-[11px] text-[#667085]">说明：基础公共主数据，全员可直接查阅与映射。</p>
              </div>

              {/* Asset 3: 养老机构信息 */}
              <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172033] text-xs">养老机构信息</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-[10px] font-bold rounded flex items-center gap-1">
                    <Unlock className="w-3 h-3" />
                    AVAILABLE
                  </span>
                </div>
                <p className="text-[11px] text-[#667085]">说明：已通过民政部门公开目录校验，可以直接使用。</p>
              </div>

              {/* Asset 4: 60 岁以上人口数 */}
              <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#172033] text-xs">60 岁以上人口数</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-[#16A36A] border border-emerald-200 text-[10px] font-bold rounded flex items-center gap-1">
                    <Unlock className="w-3 h-3" />
                    AVAILABLE
                  </span>
                </div>
                <p className="text-[11px] text-[#667085]">说明：企业级发布标准指标，全员公开可调阅。</p>
              </div>
            </div>

            {/* Note */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-[#667085] leading-relaxed flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#172033]">权限校验须知：</span>
                可发现不代表可查询。真正进入问数或分析时，底层网关仍将动态执行严苛的数据访问控制。
              </div>
            </div>
          </div>
        )}

        {/* TAB 04: 相关关系 */}
        {activeTab === 'relation' && (
          <div className="space-y-4">
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">业务对象与关联图谱</div>
              <p className="text-[11px] text-[#667085] leading-relaxed">
                围绕“行政区域（街镇）”建立数据组合关联模型：
              </p>

              {/* Minimal Relation View */}
              <div className="p-3 bg-[#F7F9FC] border border-[#EEF2F6] rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="px-2.5 py-1 bg-indigo-50 text-[#4F46E5] font-bold rounded-md border border-indigo-100">
                    自然人 (人级人口)
                  </div>
                  <span className="text-[10px] text-[#667085] font-sans">Business Object</span>
                </div>

                <div className="flex items-center justify-center text-[#2563EB] text-[10px] font-sans gap-1">
                  <ArrowRight className="w-3 h-3 rotate-90" />
                  <span>所属行政区域编码 (region_code)</span>
                </div>

                <div className="p-2.5 bg-blue-50 text-[#2563EB] font-bold rounded-lg border border-blue-200 text-center">
                  行政区域 (闵行区各街镇)
                </div>

                <div className="flex items-center justify-center text-[#2563EB] text-[10px] font-sans gap-1">
                  <ArrowRight className="w-3 h-3 -rotate-90" />
                  <span>所属区域 (region_code)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="px-2.5 py-1 bg-indigo-50 text-[#4F46E5] font-bold rounded-md border border-indigo-100">
                    养老机构 (资源/床位)
                  </div>
                  <span className="text-[10px] text-[#667085] font-sans">Business Object</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="p-3 bg-white border border-[#E6EAF0] rounded-xl space-y-2">
              <div className="font-bold text-[#172033] text-xs">绑定与语义映射</div>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-1 bg-slate-100 text-[#172033] font-semibold rounded">
                  Business Object: 自然人 / 行政区域 / 养老机构
                </span>
                <span className="px-2 py-1 bg-indigo-50 text-[#4F46E5] font-semibold rounded">
                  Semantic Relationship: 区域隶属 / 资源覆盖
                </span>
                <span className="px-2 py-1 bg-emerald-50 text-[#16A36A] font-semibold rounded">
                  Data Binding: 已确认关联路径
                </span>
              </div>
            </div>

            {/* Relation Summary Note */}
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-[#2563EB] leading-relaxed">
              <span className="font-bold text-blue-950">语义关联合规说明：</span>
              当前数据方案可围绕“行政区域”维度进行多源数据的聚合分析，关联逻辑已在 Semovix 语义网关成功验签。
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
