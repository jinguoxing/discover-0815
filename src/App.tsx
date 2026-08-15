import React, { useState } from 'react';
import { Header } from './components/Header';
import { SessionList } from './components/SessionList';
import { ConversationWorkspace } from './components/ConversationWorkspace';
import { EvidenceSummary } from './components/EvidenceSummary';
import { EvidenceModal } from './components/EvidenceModal';
import { SemovixFindDataDemo } from './components/SemovixFindDataDemo';
import {
  INITIAL_SESSIONS,
  INITIAL_EVIDENCE,
  PRESET_CONVERSATION,
} from './data/mockData';
import { Session, ChatMessage, EvidenceState, SkillStatus } from './types';

export default function App() {
  // Workbench mode: 'find' (Find Data / 找数demo执行页) or 'ask' (Ask Data / 问数)
  const [viewMode, setViewMode] = useState<'find' | 'ask'>('find');
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('s1');
  const [messages, setMessages] = useState<ChatMessage[]>(PRESET_CONVERSATION);
  const [evidence, setEvidence] = useState<EvidenceState>(INITIAL_EVIDENCE);
  const [highlightEvidenceKey, setHighlightEvidenceKey] = useState<string | undefined>();
  const [isConfirmedSolution, setIsConfirmedSolution] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState<boolean>(false);
  const [skillStatus, setSkillStatus] = useState<SkillStatus>('Ready');
  const [isFramedView, setIsFramedView] = useState<boolean>(false);

  // Switch from Find Data to Ask Data with full Solution context
  const handleEnterAskDataFromFindData = (solutionContext?: any) => {
    setViewMode('ask');
    const systemPromptText = solutionContext?.plan === 'alternative'
      ? '已无缝承接【找数·数据方案】：使用【60岁以上人口数 + 行政区划 + 养老机构信息】构建街镇级数据比较。请问您需要优先关注哪个街镇的数据？'
      : '已无缝承接【Semovix AI 找数·数据方案】：基于【60岁以上人口数 + 行政区划 + 养老机构信息】与离散脱敏【人口基本信息视图】，已准备好为您开展闵行区老年人口与养老资源供需匹配问数研判。';

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-handoff-${Date.now()}`,
        sender: 'ai',
        text: systemPromptText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: 'text',
        thoughtSteps: [
          '接收语义找数输出的数据方案 (Data Solution Context)',
          '继承业务目标：老年人口规模 × 养老服务资源匹配',
          '通过 Semovix 数据共享总线安全校验可用资源权限',
          '进入实时交互式问数与深度研判模式',
        ],
        thoughtDuration: '0.9 秒',
      },
    ]);
  };

  // Switch session
  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    const selected = sessions.find((s) => s.id === id);

    if (id === 's1') {
      setMessages(PRESET_CONVERSATION);
      setEvidence(INITIAL_EVIDENCE);
      setIsConfirmedSolution(true);
    } else {
      // For other demo sessions, create context
      setMessages([
        {
          id: `msg-${Date.now()}-1`,
          sender: 'user',
          text: `我想了解关于“${selected?.title || '分析主题'}”的具体数据。`,
          timestamp: '11:00',
        },
        {
          id: `msg-${Date.now()}-2`,
          sender: 'ai',
          text: `已加载 Semovix 认证的【${selected?.title}】分析模型上下文。请输入您的具体分析维度。`,
          timestamp: '11:00',
          cardType: 'text',
        },
      ]);
    }
  };

  // Create new session
  const handleNewSession = () => {
    const newId = `s-${Date.now()}`;
    const newSess: Session = {
      id: newId,
      title: '新建语义分析',
      timeLabel: '刚刚',
      active: true,
    };
    setSessions([newSess, ...sessions.map((s) => ({ ...s, active: false }))]);
    setActiveSessionId(newId);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: '您好，我是 Xino（犀诺），您的智能数据助手。请通过自然语言提出您的业务分析问题，我将为您定位可信数据并完成多维研判。',
        timestamp: '刚刚',
      },
    ]);
  };

  // Handle user send custom query or prompt shortcut
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setSkillStatus('Analyzing');

    try {
      // Call backend /api/chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          context: { sessionTitle: '上海闵行区老年人口分析' },
        }),
      });

      const data = await res.json();

      let cardType: ChatMessage['cardType'] = data.insight ? 'insight' : 'text';
      let metricCatalogData = undefined;
      let gisAssetData = undefined;
      let lineageQualityData = undefined;
      let spatialGapData = undefined;
      let budgetForecastData = undefined;
      let apiAssetData = undefined;
      let healthCapacityData = undefined;
      let enterprisePolicyData = undefined;
      let trafficGovernanceData = undefined;
      let metadataMappingData = undefined;

      // Match realistic government prompt keywords to rich card types
      if (text.includes('API') || text.includes('接口') || text.includes('共享总线')) {
        cardType = 'api_asset';
        apiAssetData = {
          apiCode: 'API_GOV_ECO_BOOST_V2',
          apiName: '上海市政务数据共享交换总线 - 数字经济与产业扶持接口',
          department: '上海市发展和改革委员会 × 上海市大数据中心',
          protocol: 'RESTful / HTTPS',
          endpoint: 'https://gateway.shanghai.gov.cn/api/v2/gov/economic/industry_boost',
          rateLimit: '2,000 QPS (高并发政务网关 SLA)',
          securitySeal: 'C2级数据加密存证 (国密 SM4)',
          params: [
            { name: 'district_code', type: 'string', required: true, desc: '行政区划代码 (如 310112 闵行区)' },
            { name: 'industry_category', type: 'string', required: false, desc: '产业分类 (如 "数字经济", "高端装备")' },
            { name: 'stat_year', type: 'number', required: true, desc: '核算年度 (如 2026)' },
            { name: 'auth_token', type: 'string', required: true, desc: 'Semovix OAuth2 动态安全令牌' },
          ],
          sampleResponse: JSON.stringify({
            code: 200,
            msg: "success",
            data: {
              district: "上海市闵行区",
              total_subsidy_amt: "1.45亿元",
              beneficiary_companies: 186,
              verified_hash: "0x3c8f...92a1"
            }
          }, null, 2),
        };
      } else if (text.includes('医院') || text.includes('医疗') || text.includes('门诊') || text.includes('卫生')) {
        cardType = 'health_capacity';
        healthCapacityData = {
          title: '闵行区公共卫生与医疗机构门诊负荷预警分析',
          district: '闵行区',
          outpatientVolume: '4.25 万人次/日',
          bedOccupancyRate: '94.8%',
          healthCentersCount: 14,
          capacityLevel: '高压',
          hospitals: [
            { name: '复旦大学附属闵行医院 (三级)', grade: '三级乙等', bedRate: '98.2%', dailyOutpatient: '1.2万', status: '超负荷' },
            { name: '上海市第五人民医院 (三级)', grade: '三级乙等', bedRate: '96.5%', dailyOutpatient: '1.1万', status: '超负荷' },
            { name: '闵行区中医医院 (二级)', grade: '二级甲等', bedRate: '89.1%', dailyOutpatient: '0.65万', status: '高位运行' },
            { name: '莘庄社区卫生服务中心', grade: '社区医院', bedRate: '78.4%', dailyOutpatient: '0.42万', status: '正常' },
          ],
          emergencyAdvice: '建议启动高峰分级诊疗分流机制，引导轻症发热患者至社区卫生服务中心，并由 Semovix 调度平台动态调整三甲医院急诊绿色通道。',
        };
      } else if (text.includes('企业') || text.includes('专精特新') || text.includes('补贴') || text.includes('小巨人')) {
        cardType = 'enterprise_policy';
        enterprisePolicyData = {
          title: '闵行区专精特新“小巨人”企业财政扶持与产值效益评估',
          district: '闵行区',
          totalSubsidies: '1.45 亿元',
          companyCount: 186,
          avgRndRatio: '8.4%',
          outputGrowth: '+18.6%',
          topBeneficiaries: [
            { company: '上海拓璞数控科技股份有限公司', category: '高端数控装备', subsidy: '800 万元', taxContribution: '3,200 万元' },
            { company: '上海至纯洁净系统科技股份有限公司', category: '半导体泛半设备', subsidy: '650 万元', taxContribution: '2,850 万元' },
            { company: '上海奥特维科技发展有限公司', category: '智能新能源装备', subsidy: '500 万元', taxContribution: '2,100 万元' },
          ],
          evalSummary: '过去两年，每投入 1 元财政专项研发补贴，可拉动专精特新企业新增高新技术产值 4.2 元，地方税收贡献比达到 380%，资金投放绩效优秀。',
        };
      } else if (text.includes('交通') || text.includes('拥堵') || text.includes('路网') || text.includes('公交')) {
        cardType = 'traffic_governance';
        trafficGovernanceData = {
          title: '莘庄立交与申嘉湖高速周边交通拥堵指数及 15 分钟生活圈路网研判',
          corridor: '莘庄立交 - S32 申嘉湖高速 - 虹梅高架路',
          congestionIndex: '1.82 (中度拥堵)',
          peakSpeed: '28.5 km/h',
          transit500mCoverage: '84.2%',
          bottlenecks: [
            { location: '莘庄立交东向南匝道', issue: '合流瓶颈与变道交织', speed: '18.2 km/h', status: '严重拥堵' },
            { location: '沪闵高架路 (外环立交至莘庄)', issue: '潮汐车道通行压力大', speed: '22.4 km/h', status: '严重拥堵' },
            { location: '七莘路 (顾戴路 - 顾陈路)', issue: '商圈与轨交12号线换乘拥堵', speed: '25.8 km/h', status: '中度拥堵' },
          ],
          proposal: '建议优化莘庄立交匝道信号灯潮汐控流，同时增开 3 条连接 12/15 号线地铁站与大型居住社区的 500 米微循环短途定制公交。',
        };
      } else if (text.includes('元数据') || text.includes('办件') || text.includes('结构') || text.includes('字典')) {
        cardType = 'metadata_mapping';
        metadataMappingData = {
          tableName: 'ODS_GOV_SERVICE_ACCEPTANCE_ITEM',
          tableChineseName: '上海市“一网通办”政务服务事项办件统一明细表',
          ownerDept: '上海市民政局 × 上海市大数据中心',
          standardGb: 'GB/T 38637-2020 政务数据共享',
          recordCount: '1,280,450',
          fields: [
            { name: 'item_accept_id', label: '办件统一受理流水号', dataType: 'VARCHAR(64)', maskRule: '主键索引', primaryKey: true },
            { name: 'citizen_id_hash', label: '申办人身份证加密串', dataType: 'VARCHAR(128)', maskRule: 'SHA256 离散脱敏', primaryKey: false },
            { name: 'service_item_code', label: '政务事项标准编码', dataType: 'VARCHAR(32)', maskRule: '标准字典表', primaryKey: false },
            { name: 'dept_code', label: '承办审批部门代码', dataType: 'VARCHAR(16)', maskRule: '无', primaryKey: false },
            { name: 'process_status', label: '办理状态 (已结案/补正/审理)', dataType: 'VARCHAR(16)', maskRule: '枚举映射', primaryKey: false },
          ],
          complianceNotes: '已通过 C2 政务安全合规级别审计，敏感信息全链路加密存储。',
        };
      } else if (text.includes('护理补贴') || text.includes('标准指标') || text.includes('数据字典')) {
        cardType = 'metric_catalog';
        metricCatalogData = {
          code: 'M_CARE_SUBSIDY_002',
          name: '高龄与失能老人护理补贴发放在册额度',
          category: '公共服务 / 养老社会保障',
          department: '民政局社会福利处 / 卫健委老年健康处',
          formula: 'SUM(monthly_allowance) WHERE (age >= 80 OR disability_level IN ("B", "C")) AND residency_status = "PERMANENT"',
          rule: '年满 80 周岁及以上常住老人，或经卫健/民政联合评估为中度及以上失能人员，按月享受 300-600 元/人护理补贴',
          securityLevel: 'C2 政务内部共享 (加密脱敏)',
          updateFreq: '按月度增量同步 (每月 5 日)',
          qualityScore: '99.9%',
        };
      } else if (text.includes('空间') || text.includes('15分钟') || text.includes('设施')) {
        cardType = 'gis_asset';
        gisAssetData = {
          assetCode: 'v_senior_facility_gis',
          assetName: '闵行区养老与社区服务设施空间分布图层',
          totalPoints: 328,
          coverageRadius: '500m / 1000m 步览圈',
          syncFrequency: '每日 T+1 空间更新',
          auditPassRate: '100% 坐标匹配',
          layers: [
            '综合为老服务中心 (38处)',
            '长者社区食堂 (64处)',
            '日间照料中心/护理站 (126处)',
            '老年活动室/助餐点 (100处)',
          ],
          attributes: [
            { label: '空间坐标系', value: 'GCJ-02 (高德/政务电子地图)' },
            { label: '承载力字段', value: 'design_bed_capacity' },
            { label: '日均服务量', value: 'daily_served_visitors' },
            { label: '状态标识', value: 'status = "ACTIVE"' },
          ],
        };
      } else if (text.includes('血缘') || text.includes('凭证') || text.includes('质量')) {
        cardType = 'lineage_quality';
        lineageQualityData = {
          targetAsset: 'dw_shanghai.v_pop_senior_care_joint',
          nodes: [
            { step: 1, name: '公安户籍 (ODS_POLICE)', type: '数据源头' },
            { step: 2, name: '民政救助 (ODS_CIVIL)', type: '数据源头' },
            { step: 3, name: '卫健档案 (ODS_HEALTH)', type: '数据源头' },
            { step: 4, name: '公民身份宽表 (DWD_CITIZEN)', type: '明细清洗' },
            { step: 5, name: '空间重叠索引 (DWT_GIS_LINK)', type: '聚合主题' },
            { step: 6, name: '人口设施视图 (v_pop_senior)', type: '服务视图' },
          ],
          checks: [
            { name: '主键唯一约束 (ID)', score: '100%', pass: true },
            { name: '跨部门身份证一致性', score: '99.8%', pass: true },
            { name: '坐标异常值过滤', score: '100%', pass: true },
          ],
          hash: '0x8f2a...c4e9 (区块链不可篡改戳记)',
          certificateAuthority: '上海市政务数据治理统一认证中心',
        };
      } else if (text.includes('缺口') || text.includes('供需') || text.includes('对比')) {
        cardType = 'spatial_gap';
        spatialGapData = {
          title: '重点街镇高龄独居人群与养老设施空间供需缺口分析',
          summary: '莘庄镇与七宝镇的高龄独居老人密度极高，受老旧小区空间限制，长者食堂与照料床位 500 米步览覆盖率均低于 70%，处于供需高压状态。',
          rows: [
            { town: '莘庄镇', elderlySolo: '1.42万人', canteenCount: 12, careBeds: 480, coverage500m: '68.5%', gapLevel: '高压' },
            { town: '七宝镇', elderlySolo: '1.28万人', canteenCount: 9, careBeds: 360, coverage500m: '62.1%', gapLevel: '高压' },
            { town: '颛桥镇', elderlySolo: '0.95万人', canteenCount: 8, careBeds: 410, coverage500m: '79.2%', gapLevel: '中等' },
          ],
          keyFinding: '莘庄镇与七宝镇存在约 3,800 名 80 岁以上高龄独居老人超出 500 米服务半径，建议在老旧小区集中区域嵌入点阵式“微型社区助餐点”。',
        };
      } else if (text.includes('预算') || text.includes('3年') || text.includes('推演')) {
        cardType = 'budget_forecast';
        budgetForecastData = {
          title: '重点街镇高龄与失能护理补贴 2026-2028 年财政预算推演',
          cagr: '14.4%',
          years: [
            { year: '2026 年 (预算数)', xinzhuang: '0.78 亿元', qibao: '0.62 亿元', zhuanqiao: '0.42 亿元', total: '1.82 亿元' },
            { year: '2027 年 (预测数)', xinzhuang: '0.88 亿元', qibao: '0.70 亿元', zhuanqiao: '0.47 亿元', total: '2.05 亿元' },
            { year: '2028 年 (预测数)', xinzhuang: '1.02 亿元', qibao: '0.81 亿元', zhuanqiao: '0.55 亿元', total: '2.38 亿元' },
          ],
          allocations: [
            { area: '莘庄镇 & 七宝镇', ratio: '60%', purpose: '重点补贴嵌入式助餐点与高龄独居居家护理上门服务补建' },
            { area: '颛桥镇及周边', ratio: '40%', purpose: '用于综合为老服务中心数字化设备与日间照料床位扩容' },
          ],
          policySuggestion: '建议推行“财政补贴与服务质量凭证挂钩”机制，优先对 Semovix 质量评分 ≥99.5% 的社区服务机构发放精准政策转移支付，提升资金使用效率。',
        };
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || '已为您完成对该政务研判场景的数据定位与智能推理。',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType,
        metricCatalogData,
        gisAssetData,
        lineageQualityData,
        spatialGapData,
        budgetForecastData,
        apiAssetData,
        healthCapacityData,
        enterprisePolicyData,
        trafficGovernanceData,
        metadataMappingData,
        thoughtSteps: data.thoughtSteps || [
          `理解自然语言政务提问：“${text}”`,
          '调取 Semovix 数据共享总线与政务数据治理网关',
          '执行指标规则校验与 99.8% 安全脱敏审计',
          '生成标准化决策卡片与逻辑展现',
        ],
        thoughtDuration: data.thoughtDuration || '1.8 秒',
        insightData: data.insight
          ? {
              title: data.insight.title,
              priorities: [
                {
                  id: 1,
                  townName: data.insight.priorityArea || '莘庄镇 & 七宝镇',
                  reasonTag: '深层次交互结论',
                  reasonDetail: data.insight.recommendation,
                  population: '5.8万',
                  agingRate: '24.1%',
                },
              ],
              suggestion: '已为您将相关依赖同步更新至右侧 Evidence 可信凭证面板。',
            }
          : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Update highlight key on evidence
      if (data.evidence) {
        setHighlightEvidenceKey('sources');
      }
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback response
      const fallbackMsg: ChatMessage = {
        id: `msg-ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `基于 Semovix 数据语义治理平台分析，“${text}”的关联指标数据已同步调取完成。`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      setSkillStatus('Ready');
    }
  };

  // Actions from cards
  const handleUseSolution = () => {
    setIsConfirmedSolution(true);
    setHighlightEvidenceKey('sources');
    handleSendMessage('可以，就使用这个方案。');
  };

  const handleContinueAnalysis = () => {
    handleSendMessage('哪些街镇老年人口最多？');
  };

  const handleFollowUpFacility = () => {
    handleSendMessage('结合养老设施覆盖与 15 分钟社区生活圈进一步分析。');
  };

  const handleResetDemo = () => {
    setMessages(PRESET_CONVERSATION);
    setEvidence(INITIAL_EVIDENCE);
    setIsConfirmedSolution(true);
    setHighlightEvidenceKey(undefined);
  };

  return (
    <div className="w-full h-screen bg-slate-200/60 font-sans text-slate-800 flex flex-col items-center justify-center overflow-hidden antialiased select-none">
      {/* Container wrapper - Frame mode or full desktop screen */}
      <div
        className={`w-full h-full bg-white flex flex-col overflow-hidden transition-all duration-300 ${
          isFramedView
            ? 'max-w-[1920px] max-h-[1080px] my-auto rounded-2xl border border-slate-300 shadow-2xl ring-1 ring-slate-900/10'
            : ''
        }`}
      >
        {viewMode === 'find' ? (
          <SemovixFindDataDemo
            onEnterAskData={handleEnterAskDataFromFindData}
          />
        ) : (
          <>
            {/* Top Header */}
            <Header
              title="上海闵行区老年人口与养老服务匹配分析"
              skillName="Enterprise Data Advisor Skill"
              skillStatus={skillStatus}
              viewMode={viewMode}
              onSwitchViewMode={setViewMode}
              onNewAnalysis={handleNewSession}
              onSaveResult={() => alert('分析结果与可信凭证已成功保存至 Semovix 企业知识库！')}
              onContinue={() => handleSendMessage('下一步应该如何推进基础设施建设？')}
              isFullscreen={isFramedView}
              onToggleFullscreen={() => setIsFramedView(!isFramedView)}
            />

            {/* 3-Column Main Content Body */}
            <div className="flex-1 flex overflow-hidden w-full relative">
              {/* Left Session List (240px) */}
              <SessionList
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelectSession={handleSelectSession}
                onNewSession={handleNewSession}
              />

              {/* Middle AI Conversation Workspace (950px / flex-1) */}
              <ConversationWorkspace
                messages={messages}
                onSendMessage={handleSendMessage}
                onViewEvidenceKey={(key) => {
                  setHighlightEvidenceKey(key);
                  setTimeout(() => setHighlightEvidenceKey(undefined), 3000);
                }}
                onUseSolution={handleUseSolution}
                onContinueAnalysis={handleContinueAnalysis}
                onFollowUpFacility={handleFollowUpFacility}
                isConfirmedSolution={isConfirmedSolution}
                isLoading={isLoading}
                onResetDemo={handleResetDemo}
              />

              {/* Right Evidence Summary (380px) */}
              <EvidenceSummary
                evidence={evidence}
                highlightKey={highlightEvidenceKey}
                onOpenFullEvidence={() => setIsEvidenceModalOpen(true)}
              />
            </div>
          </>
        )}
      </div>

      {/* Full Evidence Drawer Modal */}
      <EvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        evidence={evidence}
      />
    </div>
  );
}
