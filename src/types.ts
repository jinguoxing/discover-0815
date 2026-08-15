export type SkillStatus = 'Ready' | 'Analyzing' | 'SearchingData' | 'GeneratingInsight';

export interface Session {
  id: string;
  title: string;
  timeLabel: string; // e.g., '今天', '昨天', '上周'
  isFavorite?: boolean;
  active?: boolean;
}

export type MessageType = 'user' | 'ai';

export type CardType = 
  | 'text'
  | 'understanding'
  | 'data_solution'
  | 'confirmed_context'
  | 'result'
  | 'analysis_result'
  | 'insight'
  | 'metric_catalog'
  | 'gis_asset'
  | 'lineage_quality'
  | 'spatial_gap'
  | 'budget_forecast'
  | 'api_asset'
  | 'health_capacity'
  | 'enterprise_policy'
  | 'traffic_governance'
  | 'metadata_mapping';

export interface UnderstandingData {
  object: string;       // 分析对象
  region: string;       // 区域
  target: string;       // 目标
  direction: string;    // 分析方向
}

export interface DataSolutionData {
  title: string;
  mainAsset: {
    name: string;
    type: string;
    coverage: string[];
  };
  relationAsset: string;
  metric: {
    name: string;
    definition: string;
  };
  reasons: string[];
}

export interface ConfirmedContextData {
  dataset: string;
  metric: string;
  scope: string;
  dimension: string;
  statusText: string;
}

export interface ResultData {
  title: string;
  coreValue: string;
  coreUnit: string;
  supplementLabel: string;
  supplementValue: string;
  scope: string;
  metricName: string;
}

export interface TableRowData {
  town: string;
  population: string;
  popNum: number;
  ratio: string;
}

export interface AnalysisResultData {
  summary: string;
  tableData: TableRowData[];
  chartTitle: string;
}

export interface PriorityItem {
  id: number;
  townName: string;
  reasonTag: string;
  reasonDetail: string;
  population: string;
  agingRate: string;
}

export interface InsightData {
  title: string;
  priorities: PriorityItem[];
  suggestion: string;
}

// 找数 1: 语义指标卡片
export interface MetricCatalogData {
  code: string;
  name: string;
  category: string;
  department: string;
  formula: string;
  rule: string;
  securityLevel: string;
  updateFreq: string;
  qualityScore: string;
}

// 找数 2: 空间地理资产卡片
export interface GisAssetData {
  assetCode: string;
  assetName: string;
  totalPoints: number;
  layers: string[];
  attributes: { label: string; value: string }[];
  coverageRadius: string;
  syncFrequency: string;
  auditPassRate: string;
}

// 找数 3: 数据血缘与凭证卡片
export interface LineageQualityData {
  targetAsset: string;
  nodes: { step: number; name: string; type: string }[];
  checks: { name: string; score: string; pass: boolean }[];
  hash: string;
  certificateAuthority: string;
}

// 问数 4: 空间供需缺口卡片
export interface SpatialGapRow {
  town: string;
  elderlySolo: string;
  canteenCount: number;
  careBeds: number;
  coverage500m: string;
  gapLevel: '高压' | '中等' | '适度';
}

export interface SpatialGapData {
  title: string;
  summary: string;
  rows: SpatialGapRow[];
  keyFinding: string;
}

// 问数 5: 财政补贴与预算推演卡片
export interface BudgetYearItem {
  year: string;
  xinzhuang: string;
  qibao: string;
  zhuanqiao: string;
  total: string;
}

export interface BudgetForecastData {
  title: string;
  cagr: string;
  years: BudgetYearItem[];
  allocations: { area: string; ratio: string; purpose: string }[];
  policySuggestion: string;
}

// 找数 6: 政务数据 API 与接口卡片
export interface ApiAssetData {
  apiCode: string;
  apiName: string;
  department: string;
  protocol: string;
  endpoint: string;
  rateLimit: string;
  securitySeal: string;
  params: { name: string; type: string; required: boolean; desc: string }[];
  sampleResponse: string;
}

// 问数 7: 公共卫生与医疗资源预警卡片
export interface HealthCapacityData {
  title: string;
  district: string;
  outpatientVolume: string;
  bedOccupancyRate: string;
  healthCentersCount: number;
  capacityLevel: '高压' | '警戒' | '平稳';
  hospitals: { name: string; grade: string; bedRate: string; dailyOutpatient: string; status: string }[];
  emergencyAdvice: string;
}

// 问数 8: 专精特新企业与扶持效益卡片
export interface EnterprisePolicyData {
  title: string;
  district: string;
  totalSubsidies: string;
  companyCount: number;
  avgRndRatio: string;
  outputGrowth: string;
  topBeneficiaries: { company: string; category: string; subsidy: string; taxContribution: string }[];
  evalSummary: string;
}

// 问数 9: 城市交通与路网拥堵治理卡片
export interface TrafficGovernanceData {
  title: string;
  corridor: string;
  congestionIndex: string;
  peakSpeed: string;
  transit500mCoverage: string;
  bottlenecks: { location: string; issue: string; speed: string; status: string }[];
  proposal: string;
}

// 找数 10: 政务元数据与结构字典卡片
export interface MetadataMappingData {
  tableName: string;
  tableChineseName: string;
  ownerDept: string;
  standardGb: string;
  recordCount: string;
  fields: { name: string; label: string; dataType: string; maskRule: string; primaryKey?: boolean }[];
  complianceNotes: string;
}

export interface ChatMessage {
  id: string;
  sender: MessageType;
  text?: string;
  timestamp?: string;
  cardType?: CardType;
  understandingData?: UnderstandingData;
  solutionData?: DataSolutionData;
  confirmedData?: ConfirmedContextData;
  resultData?: ResultData;
  analysisData?: AnalysisResultData;
  insightData?: InsightData;
  metricCatalogData?: MetricCatalogData;
  gisAssetData?: GisAssetData;
  lineageQualityData?: LineageQualityData;
  spatialGapData?: SpatialGapData;
  budgetForecastData?: BudgetForecastData;
  apiAssetData?: ApiAssetData;
  healthCapacityData?: HealthCapacityData;
  enterprisePolicyData?: EnterprisePolicyData;
  trafficGovernanceData?: TrafficGovernanceData;
  metadataMappingData?: MetadataMappingData;
  highlightEvidenceKey?: string;
  sqlQuery?: string;
  followUpChips?: string[];
  thoughtSteps?: string[];
  thoughtDuration?: string;
}

export interface EvidenceSource {
  id: string;
  name: string;
  type: string;
  code: string;
  qualityScore: string;
  lastUpdated: string;
  verifiedBySemovix: boolean;
}

export interface MetricDefinition {
  name: string;
  formula: string;
  rule: string;
  owner: string;
  domain: string;
}

export interface AnalysisCondition {
  label: string;
  value: string;
}

export interface EvidenceState {
  sources: EvidenceSource[];
  metricDef: MetricDefinition;
  conditions: AnalysisCondition[];
  dataQualityPassRate: string;
  lineagePath: string;
  securityLevel: string;
  semanticCertified: boolean;
}
