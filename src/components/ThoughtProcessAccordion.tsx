import React, { useState } from 'react';
import { Brain, ChevronDown, ChevronUp, CheckCircle2, Sparkles, ShieldCheck, Database, Network, Lock } from 'lucide-react';

interface Props {
  steps?: string[];
  duration?: string;
  defaultOpen?: boolean;
  cardType?: string;
  sqlQuery?: string;
  verificationHash?: string;
}

export const ThoughtProcessAccordion: React.FC<Props> = ({
  steps,
  duration = '1.8 秒',
  defaultOpen = false,
  cardType,
  sqlQuery,
  verificationHash,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!steps || steps.length === 0) return null;

  // Determine dynamic semantic mapping based on card type
  const getSemanticDetails = () => {
    switch (cardType) {
      case 'metric_catalog':
        return {
          intent: '【找数】指标字典与规范查询',
          targetEntity: '指标编码: M_CARE_SUBSIDY_002 (高龄与失能老人护理补贴额度)',
          sourceDept: '民政局社会福利处 × 卫健委老年健康处',
          auditPass: '100% 规则合规',
          defaultHash: '0x3c8f...92a1',
        };
      case 'gis_asset':
        return {
          intent: '【找数】空间地理要素图层检索',
          targetEntity: '空间图层: v_senior_facility_gis (328 处社区养老设施点位)',
          sourceDept: '市规划资源局 × 闵行区社区养老 GIS 空间数据库',
          auditPass: '100% 空间坐标对齐',
          defaultHash: '0x7b1d...e842',
        };
      case 'lineage_quality':
        return {
          intent: '【找数】跨部门数据血缘与质量存证',
          targetEntity: '链路视图: ODS (公安/民政/卫健) ➔ DWD ➔ DWT ➔ 业务服务表',
          sourceDept: '上海市政务数据治理与统一共享交换平台',
          auditPass: '区块链验签通过',
          defaultHash: '0x8f2a...c4e9',
        };
      case 'spatial_gap':
        return {
          intent: '【问数】空间供需缺口与 500m 覆盖交叉研判',
          targetEntity: '研判模型: 500m 社区服务圈 Buffer 缓冲区 + 高龄独居叠加计算',
          sourceDept: '闵行区人口数据库 × 社区生活圈空间设施库',
          auditPass: '标签对齐度 99.8%',
          defaultHash: '0x5e91...b320',
        };
      case 'budget_forecast':
        return {
          intent: '【问数】财政预算推演与政策资金配比',
          targetEntity: '测算模型: 2026-2028 年高龄失能护理转移支付预测 (CAGR 14.4%)',
          sourceDept: '区财政局预算管理处 × 民政福利资金监管系统',
          auditPass: '精算模型审计通过',
          defaultHash: '0x9d4a...f71e',
        };
      default:
        return {
          intent: '【找数/问数】语义解析与数据智能对齐',
          targetEntity: 'Semovix 语义指标与底层数据表自动映射',
          sourceDept: '上海市政务大数据共享总线',
          auditPass: '数据安全与质量核验通过',
          defaultHash: '0x2a18...d69f',
        };
    }
  };

  const semanticInfo = getSemanticDetails();
  const displayHash = verificationHash || semanticInfo.defaultHash;

  return (
    <div className="w-full max-w-2xl mb-2 font-sans">
      {/* Accordion Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
          isOpen
            ? 'bg-slate-900 text-slate-100 border-slate-800 shadow-sm'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-indigo-900 border-slate-200/80 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Brain className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-800 text-[12px] group-hover:text-indigo-900">
            AI 思考推演与数据源凭证
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono font-medium">
            耗时 {duration}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600">
          <span className="text-[10px] bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded text-indigo-700">
            {isOpen ? '收起面板' : '查看推理逻辑'}
          </span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />}
        </div>
      </button>

      {/* Accordion Collapsible Panel */}
      {isOpen && (
        <div className="mt-1.5 p-3.5 bg-slate-900 rounded-xl text-slate-200 text-xs border border-slate-800 shadow-xl space-y-3 animate-fadeIn">
          {/* Header Banner */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <span className="flex items-center gap-1.5 font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Semovix AI 语义治理与逻辑推理轨迹
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {semanticInfo.auditPass}
            </span>
          </div>

          {/* Section 1: Semantic Matching Details */}
          <div className="bg-slate-800/90 rounded-lg p-2.5 border border-slate-700/80 text-[11px] space-y-1.5">
            <div className="text-slate-400 font-semibold flex items-center gap-1.5 text-[10px]">
              <Network className="w-3 h-3 text-indigo-400" />
              1. 语义特征与意图映射分析：
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-700/60">
                <span className="text-slate-500">意图识别：</span>
                <span className="text-indigo-300 font-medium ml-1">{semanticInfo.intent}</span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-700/60">
                <span className="text-slate-500">目标实体：</span>
                <span className="text-emerald-300 font-mono font-medium ml-1 truncate inline-block max-w-[170px] align-bottom">
                  {semanticInfo.targetEntity}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Logical Reasoning Steps */}
          <div className="space-y-1.5">
            <div className="text-slate-400 font-semibold flex items-center gap-1.5 text-[10px] pl-1">
              <Brain className="w-3 h-3 text-indigo-400" />
              2. 链式逻辑推理步骤 (Reasoning Steps)：
            </div>
            <div className="space-y-2 pl-2 relative border-l border-slate-700/80 ml-2 pt-1">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 pl-3 relative">
                  <span className="absolute -left-[17px] top-0.5 w-3.5 h-3.5 rounded-full bg-slate-800 border border-indigo-500 text-indigo-300 text-[9px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>

                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />

                  <div className="flex-1">
                    <p className="text-slate-300 text-[11px] leading-relaxed font-normal">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Data Source Verification Hash & Authority Certificate */}
          <div className="bg-slate-800/90 rounded-lg p-2.5 border border-slate-700/80 text-[10px] space-y-1.5">
            <div className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              <span>3. 数据源可信存证与审计 Hash：</span>
            </div>
            <div className="flex items-center justify-between bg-slate-900/90 p-2 rounded border border-slate-700/60 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[340px]">
                <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="text-slate-400">区块链存证 Hash:</span>
                <span className="text-amber-300 font-bold">{displayHash}</span>
              </div>
              <div className="text-emerald-400 font-sans text-[10px] font-medium bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60">
                {semanticInfo.sourceDept}
              </div>
            </div>
          </div>

          {sqlQuery && (
            <div className="text-[10px] text-slate-400 font-mono pt-1 flex items-center justify-between border-t border-slate-800/80">
              <span>关联数据 DSL 指令: 已生成标准化 SQL 关联表达式</span>
              <span className="text-indigo-400 font-medium">Semovix Security Gateway Verified</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

