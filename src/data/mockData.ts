import { Session, ChatMessage, EvidenceState } from '../types';

export const INITIAL_SESSIONS: Session[] = [
  {
    id: 's1',
    title: '上海闵行区老年人口与养老服务规划分析',
    timeLabel: '今天',
    isFavorite: true,
    active: true,
  },
  {
    id: 's2',
    title: '【找数】政务数据字典与全链路血缘看板',
    timeLabel: '昨天',
    isFavorite: true,
    active: false,
  },
  {
    id: 's3',
    title: '【问数】公共卫生与医疗资源门诊负荷预警',
    timeLabel: '昨天',
    isFavorite: false,
    active: false,
  },
  {
    id: 's4',
    title: '【问数】专精特新企业研发补贴与产值效益评估',
    timeLabel: '上周',
    isFavorite: true,
    active: false,
  },
  {
    id: 's5',
    title: '【问数】城市交通拥堵指数与15分钟生活圈路网研判',
    timeLabel: '上周',
    isFavorite: false,
    active: false,
  },
];

export const INITIAL_EVIDENCE: EvidenceState = {
  sources: [
    {
      id: 'src-1',
      name: '人口主题分析视图',
      type: '业务分析资产',
      code: 'v_pop_demographics_theme',
      qualityScore: '99.8%',
      lastUpdated: '2026-08-01 04:00',
      verifiedBySemovix: true,
    },
    {
      id: 'src-2',
      name: '行政区划维表',
      type: '基础维度资产',
      code: 'dim_administrative_district',
      qualityScore: '100%',
      lastUpdated: '2026-07-15 12:00',
      verifiedBySemovix: true,
    },
  ],
  metricDef: {
    name: '老年人口数量',
    formula: 'SUM(population) WHERE age >= 60 AND residency_status = "PERMANENT"',
    rule: '年龄 ≥ 60岁，包含本市户籍与居住满半年的常住人口',
    owner: '民政数据运营部 / 语义治理小组',
    domain: '公共服务 / 养老规划',
  },
  conditions: [
    { label: '区域', value: '上海市闵行区' },
    { label: '维度', value: '街镇 (Sub-district)' },
    { label: '统计时间', value: '2026年半年度数据' },
  ],
  dataQualityPassRate: '99.8%',
  lineagePath: 'ODS_POLICE_POP -> DWD_CITIZEN_INFO -> DWT_POP_THEME -> v_pop_demographics_theme',
  securityLevel: 'C2 企业内部可信共享',
  semanticCertified: true,
};

// Initial full multi-turn conversation matching user prompt specification exactly
export const PRESET_CONVERSATION: ChatMessage[] = [
  // User Turn 1
  {
    id: 'msg-1',
    sender: 'user',
    text: '我想分析一下上海闵行区老年人口情况，看看养老服务资源应该怎么规划。',
    timestamp: '10:24',
  },
  // AI Turn 1
  {
    id: 'msg-2',
    sender: 'ai',
    text: '我理解你的目标是分析闵行区老年人口规模和空间分布，用于养老服务资源规划。',
    timestamp: '10:24',
    cardType: 'understanding',
    understandingData: {
      object: '老年人口',
      region: '闵行区',
      target: '养老服务规划',
      direction: '规模 + 空间分布',
    },
    highlightEvidenceKey: 'conditions',
    thoughtSteps: [
      '解析自然语言意图：提取分析主体【老年人口】与目标【养老服务规划】',
      '绑定空间地理范围：定位至上海市【闵行区】及所属街镇层级',
      '定义分析方向：确立【人口规模 + 空间密度分布】双向研判路线',
    ],
    thoughtDuration: '1.2 秒',
  },
  // AI Turn 1 Part B - Data Solution Card
  {
    id: 'msg-3',
    sender: 'ai',
    text: '我找到了一套适合这个分析的问题数据方案。',
    timestamp: '10:25',
    cardType: 'data_solution',
    solutionData: {
      title: '推荐分析方案',
      mainAsset: {
        name: '人口主题分析视图',
        type: '业务分析资产',
        coverage: ['人口规模', '年龄结构', '街镇分布'],
      },
      relationAsset: '行政区划维表',
      metric: {
        name: '老年人口数量',
        definition: '年龄 ≥60岁',
      },
      reasons: [
        '业务语义匹配',
        '指标口径清晰',
        '支持空间分析',
      ],
    },
    highlightEvidenceKey: 'sources',
    thoughtSteps: [
      '检索 Semovix 语义指标库，检索匹配度 >95% 的资产视图',
      '锁定主资产【v_pop_demographics_theme】与关联维度表【dim_administrative_district】',
      '核验数据血缘关系：ODS_POLICE_POP -> DWD_CITIZEN_INFO -> DWT_POP_THEME',
    ],
    thoughtDuration: '1.8 秒',
  },
  // User Turn 2
  {
    id: 'msg-4',
    sender: 'user',
    text: '可以，就使用这个方案。',
    timestamp: '10:26',
  },
  // AI Turn 2 - Confirmed Context
  {
    id: 'msg-5',
    sender: 'ai',
    text: '好的，我已经基于该方案开始分析。',
    timestamp: '10:26',
    cardType: 'confirmed_context',
    confirmedData: {
      dataset: '人口主题分析视图',
      metric: '老年人口数量',
      scope: '闵行区',
      dimension: '街镇',
      statusText: '分析上下文已建立',
    },
    highlightEvidenceKey: 'metric',
    thoughtSteps: [
      '加载规则：确认排除临时流动人口与未落户短期居住人员',
      '建立分析上下文会话锁：锁定变量【闵行区】+【街镇维度】+【2026-H1】',
    ],
    thoughtDuration: '0.9 秒',
  },
  // User Turn 3
  {
    id: 'msg-6',
    sender: 'user',
    text: '闵行区目前有多少老年人口？',
    timestamp: '10:27',
  },
  // AI Turn 3 - Result Card
  {
    id: 'msg-7',
    sender: 'ai',
    text: '根据最新 Semovix 认证的人口主题视图，闵行区常住老年人口统计结果如下：',
    timestamp: '10:27',
    cardType: 'result',
    resultData: {
      title: '闵行区老年人口统计',
      coreValue: '48.6',
      coreUnit: '万人',
      supplementLabel: '占比',
      supplementValue: '22.4%',
      scope: '上海闵行区',
      metricName: '老年人口数量',
    },
    highlightEvidenceKey: 'metric',
    sqlQuery: `SELECT SUM(pop_60_plus) AS core_val,
       ROUND(SUM(pop_60_plus) / SUM(total_pop) * 100, 1) AS ratio
FROM dw_shanghai.v_pop_demographics_theme
WHERE district = '闵行区' AND stat_period = '2026-H1';`,
    followUpChips: ['哪些街镇老年人口最多？', '比较近3年老龄化增速', '查看语义来源核验'],
    thoughtSteps: [
      '根据设定的【老年人口数量】语义定义，解析计算逻辑 SUM(pop_60_plus)',
      '构建 DW SQL 查询，应用筛选条件 WHERE district = "闵行区" AND stat_period = "2026-H1"',
      '执行汇总统计，算得常住老年人口 48.6 万，常住人口占比 22.4%',
      '通过 99.8% 数据质量与语义合法性校验，生成研判卡片',
    ],
    thoughtDuration: '1.5 秒',
  },
  // User Turn 4
  {
    id: 'msg-8',
    sender: 'user',
    text: '哪些街镇老年人口最多？',
    timestamp: '10:28',
  },
  // AI Turn 4 - Analysis Result Card with Table & Chart
  {
    id: 'msg-9',
    sender: 'ai',
    text: '分析结果显示：老年人口主要集中在莘庄镇、七宝镇和颛桥镇。',
    timestamp: '10:28',
    cardType: 'analysis_result',
    analysisData: {
      summary: '老年人口主要集中在莘庄镇、七宝镇和颛桥镇。',
      tableData: [
        { town: '莘庄镇', population: '5.8万', popNum: 5.8, ratio: '11.9%' },
        { town: '七宝镇', population: '5.2万', popNum: 5.2, ratio: '10.7%' },
        { town: '颛桥镇', population: '4.9万', popNum: 4.9, ratio: '10.1%' },
        { town: '虹桥镇', population: '4.1万', popNum: 4.1, ratio: '8.4%' },
        { town: '梅陇镇', population: '3.8万', popNum: 3.8, ratio: '7.8%' },
      ],
      chartTitle: '街镇老年人口分布',
    },
    highlightEvidenceKey: 'conditions',
    sqlQuery: `SELECT town_name,
       SUM(pop_60_plus) AS pop_60,
       ROUND(SUM(pop_60_plus) / (SELECT SUM(pop_60_plus) FROM dw_shanghai.v_pop_demographics_theme WHERE district='闵行区') * 100, 1) AS pop_ratio
FROM dw_shanghai.v_pop_demographics_theme
WHERE district = '闵行区'
GROUP BY town_name
ORDER BY pop_60 DESC LIMIT 5;`,
    followUpChips: ['养老服务资源应该优先布局在哪里？', '导出 5 大街镇数据明细', '按老龄化率%重新排序'],
    thoughtSteps: [
      '钻取分组维度：按 town_name 下钻计算 GROUP BY town_name',
      '降序排序 ORDER BY pop_60 DESC 并截取 Top 5 重点街镇',
      '计算莘庄镇 (5.8万)、七宝镇 (5.2万) 与颛桥镇 (4.9万) 的全区占比',
      '联动 Recharts 柱状图组件进行直观可视化渲染',
    ],
    thoughtDuration: '2.1 秒',
  },
  // User Turn 5
  {
    id: 'msg-10',
    sender: 'user',
    text: '养老服务资源应该优先布局在哪里？',
    timestamp: '10:29',
  },
  // AI Turn 5 - Insight Card
  {
    id: 'msg-11',
    sender: 'ai',
    text: '基于空间分布与老龄化密集程度，我们得出以下资源配置建议：',
    timestamp: '10:29',
    cardType: 'insight',
    insightData: {
      title: '养老服务资源布局建议',
      priorities: [
        {
          id: 1,
          townName: '莘庄镇',
          reasonTag: '人口规模最大',
          reasonDetail: '常住老年人口 5.8 万人，老龄化率达 24.1%，现有社区养老设施承载压能较大',
          population: '5.8万',
          agingRate: '24.1%',
        },
        {
          id: 2,
          townName: '七宝镇',
          reasonTag: '老龄人口集中',
          reasonDetail: '老龄人口密度高 (5.2万人)，高龄与独居老人比例较高，急需增加日间照料中心',
          population: '5.2万',
          agingRate: '22.8%',
        },
        {
          id: 3,
          townName: '颛桥镇',
          reasonTag: '需求潜力较高',
          reasonDetail: '老龄人口 4.9 万人，近年增速较快，周边医疗与养老配套资源相对薄弱',
          population: '4.9万',
          agingRate: '21.5%',
        },
      ],
      suggestion: '结合养老设施覆盖继续分析。',
    },
    highlightEvidenceKey: 'sources',
    sqlQuery: `SELECT town_name, elderly_density_rank, care_facility_gap_index
FROM dw_shanghai.v_senior_care_spatial_plan
WHERE district = '闵行区'
ORDER BY priority_rank ASC LIMIT 3;`,
    followUpChips: ['结合养老设施覆盖与 15 分钟生活圈分析', '生成 PPT 决策简报', '重置对话场景'],
    thoughtSteps: [
      '交叉分析【老年人口绝对规模】与【老龄化率%】双因子决策矩阵',
      '调取空间设施视图 v_senior_care_spatial_plan 计算承载力缺口指数',
      '推演优先级顺序：1.莘庄镇 (规模最大) -> 2.七宝镇 (高龄独居密集) -> 3.颛桥镇 (增长较快)',
      '生成面向决策层的规划与建议卡片，并自动同步到右侧 Evidence 面板',
    ],
    thoughtDuration: '2.4 秒',
  },

  // ===================== 【找数 - 场景 1】语义指标与标准字典查找 =====================
  {
    id: 'msg-12',
    sender: 'user',
    text: '【找数】帮我找一下政务数据标准库里关于“高龄与失能老人护理补贴”的语义指标定义、统计口径和管理责任单位。',
    timestamp: '10:30',
  },
  {
    id: 'msg-13',
    sender: 'ai',
    text: '已在 Semovix 政务数据标准资产库中定位到认证指标【高龄与失能老人护理发放在册额度】：',
    timestamp: '10:30',
    cardType: 'metric_catalog',
    metricCatalogData: {
      code: 'M_CARE_SUBSIDY_002',
      name: '高龄与失能老人护理补贴发放在册额度',
      category: '公共服务 / 养老社会保障',
      department: '民政局社会福利处 / 卫健委老年健康处',
      formula: 'SUM(monthly_allowance) WHERE (age >= 80 OR disability_level IN ("B", "C")) AND residency_status = "PERMANENT"',
      rule: '年满 80 周岁及以上常住老人，或经卫健/民政联合评估为中度及以上失能人员，按月享受 300-600 元/人护理补贴',
      securityLevel: 'C2 政务内部共享 (加密脱敏)',
      updateFreq: '按月度增量同步 (每月 5 日)',
      qualityScore: '99.9%',
    },
    highlightEvidenceKey: 'metricDef',
    sqlQuery: `SELECT metric_code, metric_name, formula_desc, owner_dept, quality_score
FROM metadata_catalog.v_semovix_gov_metrics
WHERE metric_code = 'M_CARE_SUBSIDY_002';`,
    thoughtSteps: [
      '检索 Semovix 统一数据字典，匹配【护理补贴】与【高龄失能】关键词',
      '定位权威指标代码 M_CARE_SUBSIDY_002，调取民政局与卫健委联合会签判定口径',
      '校验合规脱敏等级 C2 级，确认为月度增量同步资产',
    ],
    thoughtDuration: '1.4 秒',
  },

  // ===================== 【找数 - 场景 2】空间地理与设施数据资产搜索 =====================
  {
    id: 'msg-14',
    sender: 'user',
    text: '【找数】检索一下闵行区现有的“15分钟社区生活圈”和养老设施（长者食堂、综合为老服务中心）的空间地理数据资产。',
    timestamp: '10:31',
  },
  {
    id: 'msg-15',
    sender: 'ai',
    text: '已成功检索并匹配闵行区空间地理要素主题资产【v_senior_facility_gis】：',
    timestamp: '10:31',
    cardType: 'gis_asset',
    gisAssetData: {
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
    },
    highlightEvidenceKey: 'sources',
    sqlQuery: `SELECT facility_id, facility_name, facility_type, ST_AsText(geom) AS point_wkt, design_capacity
FROM dw_spatial.v_senior_facility_gis
WHERE district = '闵行区' AND status = 'ACTIVE';`,
    thoughtSteps: [
      '对齐 GIS 空间地理主题库，定位图层视图 v_senior_facility_gis',
      '关联 328 处核验空间坐标点（包含 38 处为老中心、64 处长者食堂）',
      '校验空间属性映射关系：包括 500m/1000m 社区服务圈层及设计承载人次',
    ],
    thoughtDuration: '1.6 秒',
  },

  // ===================== 【找数 - 场景 3】数据血缘与质量凭证追溯 =====================
  {
    id: 'msg-16',
    sender: 'user',
    text: '【找数】追溯一下“人口与养老设施综合视图”的数据血缘链路，确认数据来源合规性与 Semovix 质量凭证。',
    timestamp: '10:32',
  },
  {
    id: 'msg-17',
    sender: 'ai',
    text: '已生成 Semovix 可信区块链数据血缘链路与全流程质量稽核凭证：',
    timestamp: '10:32',
    cardType: 'lineage_quality',
    lineageQualityData: {
      targetAsset: 'dw_shanghai.v_pop_senior_care_joint',
      nodes: [
        { step: 1, name: '公安户籍与居住证 (ODS_POLICE)', type: '数据源头' },
        { step: 2, name: '民政救助与补贴 (ODS_CIVIL)', type: '数据源头' },
        { step: 3, name: '卫健高龄体检档案 (ODS_HEALTH)', type: '数据源头' },
        { step: 4, name: '统一公民身份主表 (DWD_CITIZEN)', type: '明细清洗' },
        { step: 5, name: '空间地理重叠索引 (DWT_GIS_LINK)', type: '聚合主题' },
        { step: 6, name: '人口与设施综合视图 (v_pop_senior)', type: '服务视图' },
      ],
      checks: [
        { name: '主键唯一约束 (ID)', score: '100%', pass: true },
        { name: '跨部门身份证一致性', score: '99.8%', pass: true },
        { name: '空间坐标异常值过滤', score: '100%', pass: true },
      ],
      hash: '0x8f2a...c4e9 (区块链不可篡改戳记)',
      certificateAuthority: '上海市政务数据治理统一认证中心',
    },
    highlightEvidenceKey: 'lineagePath',
    thoughtSteps: [
      '解析跨部门数据集成节点：公安 (户籍) + 民政 (补贴) + 卫健 (体检档案)',
      '追踪 ODS -> DWD -> DWT -> 业务视图的全链路血缘映射图示',
      '校验 Semovix 自动质量规则，确认获得 99.8% 区块链存证凭证签名',
    ],
    thoughtDuration: '2.0 秒',
  },

  // ===================== 【问数 - 场景 4】空间供需缺口交叉对比 =====================
  {
    id: 'msg-18',
    sender: 'user',
    text: '【问数】对比莘庄镇、七宝镇和颛桥镇，80岁以上高龄独居老人的“长者食堂”和“日间照料中心”服务覆盖率与供需缺口是多少？',
    timestamp: '10:33',
  },
  {
    id: 'msg-19',
    sender: 'ai',
    text: '通过将 80 岁以上高龄独居人口坐标与 500 米生活圈设施图层进行空间缓冲区 (Buffer) 重叠分析，得到如下供需缺口结果：',
    timestamp: '10:33',
    cardType: 'spatial_gap',
    spatialGapData: {
      title: '重点街镇高龄独居人群与养老设施空间供需缺口分析',
      summary: '莘庄镇与七宝镇的高龄独居老人密度极高，受老旧小区空间限制，长者食堂与照料床位 500 米步览覆盖率均低于 70%，处于供需高压状态。',
      rows: [
        {
          town: '莘庄镇',
          elderlySolo: '1.42万人',
          canteenCount: 12,
          careBeds: 480,
          coverage500m: '68.5%',
          gapLevel: '高压',
        },
        {
          town: '七宝镇',
          elderlySolo: '1.28万人',
          canteenCount: 9,
          careBeds: 360,
          coverage500m: '62.1%',
          gapLevel: '高压',
        },
        {
          town: '颛桥镇',
          elderlySolo: '0.95万人',
          canteenCount: 8,
          careBeds: 410,
          coverage500m: '79.2%',
          gapLevel: '中等',
        },
      ],
      keyFinding: '莘庄镇与七宝镇存在约 3,800 名 80 岁以上高龄独居老人超出 500 米服务半径，建议在老旧小区集中区域嵌入点阵式“微型社区助餐点”。',
    },
    highlightEvidenceKey: 'conditions',
    sqlQuery: `SELECT town_name,
       COUNT(DISTINCT citizen_id) AS elderly_solo_cnt,
       COUNT(DISTINCT canteen_id) AS canteen_cnt,
       ROUND(SUM(CASE WHEN dist_to_nearest_facility <= 500 THEN 1 ELSE 0 END) / COUNT(*) * 100, 1) AS cov_500m_ratio
FROM dw_shanghai.v_pop_senior_care_joint
WHERE district = '闵行区' AND age >= 80 AND solo_living_flag = 1
GROUP BY town_name HAVING town_name IN ('莘庄镇', '七宝镇', '颛桥镇');`,
    thoughtSteps: [
      '建立空间 Buffer 分析模型：以 328 个服务设施为圆心建立 500 米缓冲区',
      '筛选 80 岁以上独居老人标签 (solo_living_flag = 1)',
      '计算莘庄镇 (覆盖率 68.5%)、七宝镇 (62.1%)、颛桥镇 (79.2%) 的缺口指数',
      '得出研判结论：莘庄与七宝高龄助餐缺口最突出',
    ],
    thoughtDuration: '2.3 秒',
  },

  // ===================== 【问数 - 场景 5】财政补贴与未来 3 年预算推演 =====================
  {
    id: 'msg-20',
    sender: 'user',
    text: '【问数】按这三个重点街镇推演未来3年高龄与失能护理补贴的财政预算需求，并给出资金精准投放与配套政策建议。',
    timestamp: '10:34',
  },
  {
    id: 'msg-21',
    sender: 'ai',
    text: '基于 Semovix 人口老龄化推演算法与护理补贴发放在册趋势，测算得未来 3 年财政预算需求与资金精准配置方案如下：',
    timestamp: '10:34',
    cardType: 'budget_forecast',
    budgetForecastData: {
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
    },
    highlightEvidenceKey: 'conditions',
    sqlQuery: `SELECT forecast_year,
       SUM(xinzhuang_budget) AS xinzhuang,
       SUM(qibao_budget) AS qibao,
       SUM(zhuanqiao_budget) AS zhuanqiao,
       SUM(total_budget) AS total
FROM dw_finance.v_senior_subsidy_forecast_3y
GROUP BY forecast_year ORDER BY forecast_year ASC;`,
    followUpChips: ['导出政务决策简报 PDF', '推送至民政与财政审批流程', '重置对话场景'],
    thoughtSteps: [
      '结合人口自然增长率与失能概率矩阵，构建 3 年预算推演模型',
      '计算三镇总预算：2026 年 1.82 亿 -> 2027 年 2.05 亿 -> 2028 年 2.38 亿 (CAGR 14.4%)',
      '制定资金倾斜比重：60% 投向高压区莘庄与七宝，40% 投向发展区颛桥',
      '自动生成配套决策政策建议并更新可信存证状态',
    ],
    thoughtDuration: '2.5 秒',
  },
];

export const QUICK_PROMPTS = [
  '找数: 护理补贴标准指标',
  '找数: 养老设施空间资产',
  '找数: 共享数据总线 API 接口',
  '找数: 数据血缘与区块链凭证',
  '找数: 一网通办办件表元数据',
  '问数: 重点街镇供需缺口对比',
  '问数: 医院门诊负荷与医疗预警',
  '问数: 专精特新补贴产值拉动',
  '问数: 交通拥堵与 500m 公交覆盖',
  '问数: 3年财政预算推演',
];
