import {
  PermissionRequestState,
  ExecutionSelection,
  ExecutionSelectionItem,
  ExecutionExcludedItem,
} from '../types';

export type OperationPermission = 'ALLOW' | 'REQUESTABLE' | 'DENY';

export interface ResourceFieldDefinition {
  name: string;
  type: string;
  comment: string;
  isPrimaryKey?: boolean;
}

export interface MarketplaceResourceViewModel {
  resourceId: string;
  resourceName: string;
  resourceType: 'Metric' | 'Data Asset' | 'API Asset' | 'Spatial Dimension';
  typeDisplay: string;
  status: 'Published' | 'Draft' | 'Deprecated';
  roleTag: string;
  measureSubject: string; // 衡量/业务对象 (自然人 / 行政区域 / 养老机构 / 服务工单)
  granularity: string; // 记录粒度 (人级 / 街镇级 / 机构级 / 工单事件 / 指标聚合)
  timeSemantics: string; // 时间语义 (当前正式统计口径 / 现行行政区划 / 实时人库 / 2026备案)
  businessDomain: string;
  department: string;
  operations: {
    DISCOVER: OperationPermission;
    VIEW_METADATA: OperationPermission;
    QUERY: OperationPermission;
    EXPORT: OperationPermission;
  };
  requestState: PermissionRequestState;
  availabilityBadge: string;
  fields: ResourceFieldDefinition[];
  summaryOrFormula: string;
  complianceNotes: string;
  checkedAt: string;
  validUntil: string;
  isCoreForExecution: boolean;
}

export interface ResourceAvailabilityItem {
  resourceId: string;
  resourceName: string;
  resourceType: 'Data Asset' | 'Metric' | 'API Asset' | 'Spatial Dimension';
  operations: {
    DISCOVER: OperationPermission;
    VIEW_METADATA: OperationPermission;
    QUERY: OperationPermission;
    EXPORT: OperationPermission;
  };
  checkedAt: string;
  validUntil: string;
  requestState: PermissionRequestState;
  roleTag: string;
  isCoreForExecution: boolean; // whether this is immediately part of active execution
}

export interface AvailabilitySnapshotViewModel {
  scenario: 'scenario-a' | 'scenario-b' | 'scenario-c';
  timestamp: string;
  resources: ResourceAvailabilityItem[];
  // Dynamic metrics & counts
  totalCount: number;
  availableCount: number;
  requestPendingCount: number;
  requestableCount: number;
  deniedCount: number;
  summaryLabel: string;
  bottomSummaryText: string;
}

/**
 * Single Source of Truth for availability state across all components
 */
export function getAvailabilitySnapshot(
  scenario: 'scenario-a' | 'scenario-b' | 'scenario-c',
  permissionState: PermissionRequestState = 'NOT_REQUESTED'
): AvailabilitySnapshotViewModel {
  const isPersonInfoGranted = permissionState === 'AVAILABLE';

  const personInfoItem: ResourceAvailabilityItem = {
    resourceId: 'asset_person_basic',
    resourceName: '人口基本信息',
    resourceType: 'Data Asset',
    operations: {
      DISCOVER: 'ALLOW',
      VIEW_METADATA: 'ALLOW',
      QUERY: isPersonInfoGranted ? 'ALLOW' : 'REQUESTABLE',
      EXPORT: 'DENY',
    },
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: isPersonInfoGranted ? '2026-12-31' : '未授权',
    requestState: permissionState,
    roleTag: scenario === 'scenario-b' ? '人级诉求识别 (可选跨域)' : '可选增强 · 人级明细',
    isCoreForExecution: isPersonInfoGranted,
  };

  const adminDivisionItem: ResourceAvailabilityItem = {
    resourceId: 'asset_admin_division',
    resourceName: '行政区划',
    resourceType: 'Data Asset',
    operations: {
      DISCOVER: 'ALLOW',
      VIEW_METADATA: 'ALLOW',
      QUERY: 'ALLOW',
      EXPORT: 'ALLOW',
    },
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: '长期有效',
    requestState: 'AVAILABLE',
    roleTag: '关联维度 · 街镇代码',
    isCoreForExecution: true,
  };

  const pop60MetricItem: ResourceAvailabilityItem = {
    resourceId: 'metric_elderly_pop_60',
    resourceName: '60岁以上人口数',
    resourceType: 'Metric',
    operations: {
      DISCOVER: 'ALLOW',
      VIEW_METADATA: 'ALLOW',
      QUERY: 'ALLOW',
      EXPORT: 'ALLOW',
    },
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: '长期有效',
    requestState: 'AVAILABLE',
    roleTag: '核心指标 · 规模统计',
    isCoreForExecution: true,
  };

  const hotlineTicketItem: ResourceAvailabilityItem = {
    resourceId: 'asset_hotline_ticket',
    resourceName: '公共服务热线工单记录表',
    resourceType: 'Data Asset',
    operations: {
      DISCOVER: 'ALLOW',
      VIEW_METADATA: 'ALLOW',
      QUERY: 'ALLOW',
      EXPORT: 'ALLOW',
    },
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: '长期有效',
    requestState: 'AVAILABLE',
    roleTag: '工单事实 · 诉求记录',
    isCoreForExecution: true,
  };

  const nursingBasicItem: ResourceAvailabilityItem = {
    resourceId: 'asset_nursing_home_basic',
    resourceName: '养老机构基本信息',
    resourceType: 'Data Asset',
    operations: {
      DISCOVER: 'ALLOW',
      VIEW_METADATA: 'ALLOW',
      QUERY: 'ALLOW',
      EXPORT: 'ALLOW',
    },
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: '长期有效',
    requestState: 'AVAILABLE',
    roleTag: '供给资源 · 机构名录',
    isCoreForExecution: true,
  };

  const nursingCapacityItem: ResourceAvailabilityItem = {
    resourceId: 'asset_nursing_service_capacity',
    resourceName: '养老机构服务能力',
    resourceType: 'Data Asset',
    operations: {
      DISCOVER: 'ALLOW',
      VIEW_METADATA: 'ALLOW',
      QUERY: 'ALLOW',
      EXPORT: 'ALLOW',
    },
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: '长期有效',
    requestState: 'AVAILABLE',
    roleTag: '供给资源 · 床位能力',
    isCoreForExecution: true,
  };

  let resources: ResourceAvailabilityItem[] = [];

  if (scenario === 'scenario-a') {
    resources = [pop60MetricItem, adminDivisionItem, personInfoItem];
  } else if (scenario === 'scenario-b') {
    resources = [hotlineTicketItem, adminDivisionItem, pop60MetricItem, personInfoItem];
  } else {
    // scenario-c
    resources = [
      pop60MetricItem,
      adminDivisionItem,
      nursingBasicItem,
      nursingCapacityItem,
      personInfoItem,
    ];
  }

  // Calculate dynamic counts
  const totalCount = resources.length;
  const availableCount = resources.filter(
    (r) => r.operations.QUERY === 'ALLOW' || r.requestState === 'AVAILABLE'
  ).length;
  const requestPendingCount = resources.filter((r) => r.requestState === 'REQUEST_PENDING').length;
  const requestableCount = resources.filter(
    (r) => r.operations.QUERY === 'REQUESTABLE' && r.requestState === 'NOT_REQUESTED'
  ).length;
  const deniedCount = resources.filter((r) => r.requestState === 'DENIED').length;

  // Generate dynamic labels
  const parts: string[] = [`${availableCount} 项可用`];
  if (requestPendingCount > 0) {
    parts.push(`${requestPendingCount} 项申请中`);
  }
  if (requestableCount > 0) {
    parts.push(`${requestableCount} 项需申请`);
  }
  if (deniedCount > 0) {
    parts.push(`${deniedCount} 项已拒绝`);
  }
  const summaryLabel = parts.join(' · ');

  // Bottom summary text
  let bottomSummaryText = `${availableCount} 项当前执行`;
  if (requestPendingCount > 0) {
    bottomSummaryText += ` · ${requestPendingCount} 项申请中`;
  } else if (requestableCount > 0) {
    bottomSummaryText += ` · ${requestableCount} 项增强资源需申请`;
  }

  return {
    scenario,
    timestamp: '刚刚 (2026-08-15 14:32:00)',
    resources,
    totalCount,
    availableCount,
    requestPendingCount,
    requestableCount,
    deniedCount,
    summaryLabel,
    bottomSummaryText,
  };
}

/**
 * Single Source of Truth for detailed resource metadata (MarketplaceResourceViewModel)
 * Dynamically resolves by either resourceId or resourceName and binds current permission snapshot.
 */
export function getMarketplaceResourceViewModel(
  snapshot: AvailabilitySnapshotViewModel,
  resourceIdOrName: string = '60岁以上人口数'
): MarketplaceResourceViewModel {
  const matchedSnapshotItem = getResourceFromSnapshot(snapshot, resourceIdOrName);
  const effectiveRequestState = matchedSnapshotItem?.requestState || 'AVAILABLE';
  const effectiveOperations = matchedSnapshotItem?.operations || {
    DISCOVER: 'ALLOW',
    VIEW_METADATA: 'ALLOW',
    QUERY: 'ALLOW',
    EXPORT: 'ALLOW',
  };

  const isQueryAvailable = effectiveOperations.QUERY === 'ALLOW' || effectiveRequestState === 'AVAILABLE';

  // 1. 60 岁以上人口数
  if (
    resourceIdOrName === 'metric_elderly_pop_60' ||
    resourceIdOrName.includes('60岁以上人口数') ||
    resourceIdOrName.includes('60 岁以上人口数')
  ) {
    return {
      resourceId: 'metric_elderly_pop_60',
      resourceName: '60岁以上人口数',
      resourceType: 'Metric',
      typeDisplay: 'Metric · Published',
      status: 'Published',
      roleTag: 'PRIMARY · 人口规模',
      measureSubject: '自然人',
      granularity: '街镇聚合指标 (Metric Level)',
      timeSemantics: '当前正式统计口径 (2026年半年度)',
      businessDomain: '人口服务 · 常住人口统计',
      department: '上海市统计局 / 闵行区统计局',
      operations: effectiveOperations,
      requestState: effectiveRequestState,
      availabilityBadge: isQueryAvailable ? 'QUERY AVAILABLE' : 'QUERY REQUESTABLE',
      fields: [
        { name: 'district_code', type: 'STRING', comment: '行政区划代码 (310112 闵行区)' },
        { name: 'town_code', type: 'STRING', comment: '街镇代码 (14个街镇/工业区)', isPrimaryKey: true },
        { name: 'pop_60_plus', type: 'BIGINT', comment: '60岁及以上常住人口数' },
        { name: 'pop_total', type: 'BIGINT', comment: '常住人口总数' },
        { name: 'aging_ratio', type: 'DECIMAL(5,2)', comment: '老龄化率 (pop_60_plus / pop_total)' },
        { name: 'stat_period', type: 'VARCHAR(16)', comment: '统计周期 (2026H1)' },
      ],
      summaryOrFormula: 'SUM(常住居民 age >= 60) GROUP BY town_code (官方统一口径)',
      complianceNotes: '官方发布统计指标，直接作为核心统计事实源，无需下钻人级明细，全局安全共享。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: '长期有效',
      isCoreForExecution: true,
    };
  }

  // 2. 行政区划
  if (
    resourceIdOrName === 'asset_admin_division' ||
    resourceIdOrName.includes('行政区划')
  ) {
    return {
      resourceId: 'asset_admin_division',
      resourceName: '行政区划',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset / Reference',
      status: 'Published',
      roleTag: 'REFERENCE · 区域维度',
      measureSubject: '行政区域',
      granularity: '街镇/村居级 (Sub-district / Village Level)',
      timeSemantics: '现行行政区划代码 (2026版)',
      businessDomain: '空间基础 · 行政区划管理',
      department: '上海市民政局区划处',
      operations: effectiveOperations,
      requestState: effectiveRequestState,
      availabilityBadge: isQueryAvailable ? 'QUERY AVAILABLE' : 'QUERY REQUESTABLE',
      fields: [
        { name: 'district_code', type: 'STRING', comment: '区县编码 (310112)' },
        { name: 'district_name', type: 'STRING', comment: '区县名称 (上海市闵行区)' },
        { name: 'town_code', type: 'STRING', comment: '街镇代码 (统一维表主键)', isPrimaryKey: true },
        { name: 'town_name', type: 'STRING', comment: '街镇规范名称' },
        { name: 'admin_level', type: 'VARCHAR(16)', comment: '行政层级 (街道/镇/工业区)' },
        { name: 'boundary_geom', type: 'GEOMETRY', comment: '空间多边形矢量边界' },
      ],
      summaryOrFormula: '基础行政地理维度，用于统一全区各部门业务数据的行政归属与空间汇总。',
      complianceNotes: '基础公开参考维表，已建立全局数据共享语义链接。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: '长期有效',
      isCoreForExecution: true,
    };
  }

  // 3. 人口基本信息
  if (
    resourceIdOrName === 'asset_person_basic' ||
    resourceIdOrName.includes('人口基本信息')
  ) {
    const isGranted = effectiveRequestState === 'AVAILABLE';
    const isPending = effectiveRequestState === 'REQUEST_PENDING';
    return {
      resourceId: 'asset_person_basic',
      resourceName: '人口基本信息',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset · Table',
      status: 'Published',
      roleTag: 'OPTIONAL ENHANCEMENT · 人级补充',
      measureSubject: '自然人',
      granularity: '人级 (Individual Level)',
      timeSemantics: '实时/准实时自然人全量库',
      businessDomain: '人口基础 · 自然人档案',
      department: '上海市大数据中心 / 公安局人口办',
      operations: effectiveOperations,
      requestState: effectiveRequestState,
      availabilityBadge: isGranted
        ? 'QUERY AVAILABLE'
        : isPending
        ? 'QUERY REQUEST_PENDING'
        : 'QUERY REQUESTABLE',
      fields: [
        { name: 'person_id', type: 'VARCHAR(64)', comment: '自然人唯一匿名标识 (脱敏主键)', isPrimaryKey: true },
        { name: 'birth_date', type: 'DATE', comment: '出生日期 (支持精确计算周岁与高龄分段)' },
        { name: 'gender', type: 'VARCHAR(4)', comment: '性别代码 (1-男, 2-女)' },
        { name: 'resident_status', type: 'VARCHAR(16)', comment: '常住户籍状态 (常住/流动/境外)' },
        { name: 'region_code', type: 'VARCHAR(12)', comment: '所属街镇行政区划代码' },
      ],
      summaryOrFormula: '自然人微观明细表，支持精细年龄段分段（如80岁以上高龄老人）与个体属性筛选。',
      complianceNotes: '包含自然人微观数据，QUERY 操作需按合规流程发起权限审批；当前元数据公开可查。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: isGranted ? '2026-12-31' : '未授权',
      isCoreForExecution: isGranted,
    };
  }

  // 4. 养老机构基本信息
  if (
    resourceIdOrName === 'asset_nursing_home_basic' ||
    resourceIdOrName.includes('养老机构基本信息')
  ) {
    return {
      resourceId: 'asset_nursing_home_basic',
      resourceName: '养老机构基本信息',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset · Table',
      status: 'Published',
      roleTag: 'DOMAIN · 养老机构',
      measureSubject: '养老机构',
      granularity: '机构级 (Facility Level)',
      timeSemantics: '2026年二季度备案数据',
      businessDomain: '养老服务 · 设施与机构名录',
      department: '上海市民政局养老服务处',
      operations: effectiveOperations,
      requestState: effectiveRequestState,
      availabilityBadge: isQueryAvailable ? 'QUERY AVAILABLE' : 'QUERY REQUESTABLE',
      fields: [
        { name: 'org_id', type: 'VARCHAR(32)', comment: '机构唯一备案代码 (主键)', isPrimaryKey: true },
        { name: 'org_name', type: 'VARCHAR(128)', comment: '养老机构规范全称' },
        { name: 'town_code', type: 'VARCHAR(12)', comment: '所属街镇代码 (关联行政区划)' },
        { name: 'org_type', type: 'VARCHAR(32)', comment: '机构性质 (公办/公建民营/民办普惠)' },
        { name: 'address', type: 'VARCHAR(256)', comment: '经营场所备案地址' },
        { name: 'establish_date', type: 'DATE', comment: '正式成立/运营日期' },
      ],
      summaryOrFormula: '全区已备案养老服务机构全量清单，包含机构性质、街镇归属、运营状态及空间地址。',
      complianceNotes: '民政公开业务名录，具备企业内部可信共享权限，可直接参与跨表关联。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: '长期有效',
      isCoreForExecution: true,
    };
  }

  // 5. 养老机构服务能力
  if (
    resourceIdOrName === 'asset_nursing_service_capacity' ||
    resourceIdOrName.includes('养老机构服务能力')
  ) {
    return {
      resourceId: 'asset_nursing_service_capacity',
      resourceName: '养老机构服务能力',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset · Table',
      status: 'Published',
      roleTag: 'DOMAIN · 供给能力',
      measureSubject: '养老服务能力',
      granularity: '机构服务容量 (Capacity Level)',
      timeSemantics: '2026年最新动态报送',
      businessDomain: '养老服务 · 床位与护理能力',
      department: '上海市民政局养老服务处',
      operations: effectiveOperations,
      requestState: effectiveRequestState,
      availabilityBadge: isQueryAvailable ? 'QUERY AVAILABLE' : 'QUERY REQUESTABLE',
      fields: [
        { name: 'org_id', type: 'VARCHAR(32)', comment: '机构编码 (关联 basic 表)', isPrimaryKey: true },
        { name: 'total_beds', type: 'INT', comment: '核定规划床位总数' },
        { name: 'available_beds', type: 'INT', comment: '当前空余床位数' },
        { name: 'care_beds', type: 'INT', comment: '护理型床位数 (失能/失智专护)' },
        { name: 'nursing_staff_count', type: 'INT', comment: '专职执业护理员人数' },
        { name: 'occupancy_rate', type: 'DECIMAL(5,2)', comment: '床位入住饱和度' },
      ],
      summaryOrFormula: '养老机构供给侧能力明细，支持计算每千名老人床位数及护理床位缺口分布。',
      complianceNotes: '动态业务报表，已通过 Semovix 数据合规质量认证 (Pass 99.8%)。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: '长期有效',
      isCoreForExecution: true,
    };
  }

  // 6. 公共服务热线工单记录表
  if (
    resourceIdOrName === 'asset_hotline_ticket' ||
    resourceIdOrName.includes('热线') ||
    resourceIdOrName.includes('工单')
  ) {
    return {
      resourceId: 'asset_hotline_ticket',
      resourceName: '公共服务热线工单记录表',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset · Table',
      status: 'Published',
      roleTag: 'PRIMARY · 服务诉求事件',
      measureSubject: '服务工单',
      granularity: '工单事件 (Event Level)',
      timeSemantics: '2026年半年度工单归档',
      businessDomain: '公共诉求 · 12345市民热线',
      department: '上海市 12345 市民服务热线运行中心',
      operations: effectiveOperations,
      requestState: effectiveRequestState,
      availabilityBadge: isQueryAvailable ? 'QUERY AVAILABLE' : 'QUERY REQUESTABLE',
      fields: [
        { name: 'ticket_id', type: 'VARCHAR(32)', comment: '热线工单唯一流水号', isPrimaryKey: true },
        { name: 'call_time', type: 'DATETIME', comment: '市民呼叫来电时间' },
        { name: 'town_code', type: 'VARCHAR(12)', comment: '诉求所属街镇代码' },
        { name: 'appeal_category', type: 'VARCHAR(64)', comment: '诉求类型 (如: 养老照料/助餐配餐/助医)' },
        { name: 'appeal_content', type: 'TEXT', comment: '诉求描述摘要 (脱敏文本)' },
        { name: 'solve_status', type: 'VARCHAR(16)', comment: '处置闭环状态' },
      ],
      summaryOrFormula: '12345 市民热线涉及养老与公共民生服务的全量归档工单明细。',
      complianceNotes: '已完成脱敏处理，支持区域热点频次统计与诉求分类分析。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: '长期有效',
      isCoreForExecution: true,
    };
  }

  // 7. 人口年度统计 (Candidate: ALTERNATIVE)
  if (
    resourceIdOrName === 'asset_pop_annual_stat' ||
    resourceIdOrName.includes('人口年度统计')
  ) {
    return {
      resourceId: 'asset_pop_annual_stat',
      resourceName: '人口年度统计',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset · View (ALTERNATIVE)',
      status: 'Published',
      roleTag: 'ALTERNATIVE · 历史多年度宏观切片',
      measureSubject: '自然人',
      granularity: '年度大口径切片',
      timeSemantics: '历史 5 年常住人口时序切片',
      businessDomain: '人口宏观 · 历史统计趋势',
      department: '上海市统计局综合处',
      operations: effectiveOperations,
      requestState: 'AVAILABLE',
      availabilityBadge: 'QUERY AVAILABLE',
      fields: [
        { name: 'stat_year', type: 'INT', comment: '统计年份 (2021-2025)' },
        { name: 'district_code', type: 'STRING', comment: '区县编码' },
        { name: 'pop_60_plus_total', type: 'BIGINT', comment: '全区 60 岁以上老年人口汇总' },
        { name: 'aging_rate', type: 'DECIMAL(5,2)', comment: '老龄化率' },
      ],
      summaryOrFormula: '具备历史多年度宏观切片，可作为中长期趋势回溯与预测推演的备选替代资源。',
      complianceNotes: '宏观统计公开视图，可用但粒度偏粗，不直接用于街镇精准空间供需匹配。',
      checkedAt: matchedSnapshotItem?.checkedAt || '刚刚 (2026-08-15 14:32:00)',
      validUntil: '长期有效',
      isCoreForExecution: false,
    };
  }

  // 8. 自然人家庭关系 (Candidate: RELATED)
  if (
    resourceIdOrName === 'asset_person_family_relation' ||
    resourceIdOrName.includes('家庭关系')
  ) {
    return {
      resourceId: 'asset_person_family_relation',
      resourceName: '自然人家庭关系',
      resourceType: 'Data Asset',
      typeDisplay: 'Data Asset · Table (RELATED)',
      status: 'Published',
      roleTag: 'RELATED · 家庭画像延伸',
      measureSubject: '自然人 / 家庭户',
      granularity: '户级与成员关系 (Household Level)',
      timeSemantics: '实时户籍与常住申报',
      businessDomain: '人口基础 · 家庭户籍关系',
      department: '上海市公安局人口办',
      operations: {
        DISCOVER: 'ALLOW',
        VIEW_METADATA: 'ALLOW',
        QUERY: 'REQUESTABLE',
        EXPORT: 'DENY',
      },
      requestState: 'NOT_REQUESTED',
      availabilityBadge: 'QUERY REQUESTABLE',
      fields: [
        { name: 'household_id', type: 'VARCHAR(64)', comment: '家庭户唯一匿名标识' },
        { name: 'person_id', type: 'VARCHAR(64)', comment: '自然人成员ID' },
        { name: 'relation_type', type: 'VARCHAR(32)', comment: '与户主关系 (配偶/子女/父母/独居)' },
        { name: 'is_solo_elderly', type: 'BOOLEAN', comment: '是否独居高龄老人' },
      ],
      summaryOrFormula: '涵盖同户家庭成员结构与家庭赡养关系，适合延伸至独居老人关爱等深层专题分析。',
      complianceNotes: '涉及敏感家庭成员关系微观数据，需按专项审批流程申请使用。',
      checkedAt: '刚刚 (2026-08-15 14:32:00)',
      validUntil: '未授权',
      isCoreForExecution: false,
    };
  }

  // Fallback default
  return {
    resourceId: 'metric_elderly_pop_60',
    resourceName: '60岁以上人口数',
    resourceType: 'Metric',
    typeDisplay: 'Metric · Published',
    status: 'Published',
    roleTag: 'PRIMARY · 人口规模',
    measureSubject: '自然人',
    granularity: '街镇聚合指标 (Metric Level)',
    timeSemantics: '当前正式统计口径 (2026年半年度)',
    businessDomain: '人口服务 · 常住人口统计',
    department: '上海市统计局 / 闵行区统计局',
    operations: effectiveOperations,
    requestState: effectiveRequestState,
    availabilityBadge: isQueryAvailable ? 'QUERY AVAILABLE' : 'QUERY REQUESTABLE',
    fields: [
      { name: 'district_code', type: 'STRING', comment: '行政区划代码' },
      { name: 'town_code', type: 'STRING', comment: '街镇代码' },
      { name: 'pop_60_plus', type: 'BIGINT', comment: '60岁及以上常住人口数' },
    ],
    summaryOrFormula: 'SUM(常住居民 >= 60岁) 依街镇空间聚合',
    complianceNotes: '官方发布统计指标，直接作为核心统计事实源。',
    checkedAt: '刚刚 (2026-08-15 14:32:00)',
    validUntil: '长期有效',
    isCoreForExecution: true,
  };
}

/**
 * Helper to get a single resource's availability model
 */
export function getResourceFromSnapshot(
  snapshot: AvailabilitySnapshotViewModel,
  resourceIdOrName: string
): ResourceAvailabilityItem | undefined {
  return snapshot.resources.find(
    (r) => r.resourceId === resourceIdOrName || r.resourceName === resourceIdOrName
  );
}

/**
 * Helper for unified status badges styling & text
 */
export function getResourceStatusDisplay(resource: ResourceAvailabilityItem): {
  statusTag: string;
  badgeLabel: string;
  pillClasses: string;
  canApply: boolean;
  isPending: boolean;
  isAvailable: boolean;
} {
  if (resource.requestState === 'REQUEST_PENDING') {
    return {
      statusTag: 'REQUEST_PENDING',
      badgeLabel: 'REQUEST_PENDING · 申请处理中',
      pillClasses: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      canApply: true,
      isPending: true,
      isAvailable: false,
    };
  }

  if (resource.requestState === 'DENIED') {
    return {
      statusTag: 'DENIED',
      badgeLabel: 'DENIED · 已拒绝',
      pillClasses: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
      canApply: false,
      isPending: false,
      isAvailable: false,
    };
  }

  if (resource.operations.QUERY === 'REQUESTABLE' && resource.requestState === 'NOT_REQUESTED') {
    return {
      statusTag: 'REQUESTABLE',
      badgeLabel: 'REQUESTABLE · 需申请',
      pillClasses: 'bg-amber-50 text-amber-800 border-amber-200 font-bold',
      canApply: true,
      isPending: false,
      isAvailable: false,
    };
  }

  return {
    statusTag: 'AVAILABLE',
    badgeLabel: 'AVAILABLE',
    pillClasses: 'bg-emerald-50 text-[#16A36A] border-emerald-200 font-bold',
    canApply: false,
    isPending: false,
    isAvailable: true,
  };
}

/**
 * Constructs a true ExecutionSelection object based on the current AvailabilitySnapshot
 * Strict compliance with user selections: Excluded items (e.g. 人口基本信息) are never falsely included.
 */
export function createExecutionSelection(
  snapshot: AvailabilitySnapshotViewModel,
  customSolutionRevision: number = 2
): ExecutionSelection {
  const selectedItems: ExecutionSelectionItem[] = [];
  const excludedItems: ExecutionExcludedItem[] = [];

  snapshot.resources.forEach((res) => {
    const isAvailable = res.operations.QUERY === 'ALLOW' || res.requestState === 'AVAILABLE';
    if (isAvailable) {
      const ops = Object.entries(res.operations)
        .filter(([_, perm]) => perm === 'ALLOW')
        .map(([op]) => op);

      selectedItems.push({
        resourceId: res.resourceId,
        resourceName: res.resourceName,
        resourceType: res.resourceType,
        intendedOperations: ops.length > 0 ? ops : ['DISCOVER', 'VIEW_METADATA', 'QUERY', 'EXPORT'],
        roleTag: res.roleTag,
      });
    } else {
      let reason = 'QUERY REQUESTABLE';
      if (res.requestState === 'REQUEST_PENDING') {
        reason = 'QUERY REQUEST_PENDING · 申请审批中 (未授权前暂不纳入执行)';
      } else if (res.requestState === 'DENIED') {
        reason = 'QUERY DENIED · 申请已被拒绝';
      } else if (snapshot.scenario === 'scenario-b') {
        reason = 'QUERY REQUESTABLE · 跨域自然人身份关联待验证 (用户选择暂不使用)';
      } else if (snapshot.scenario === 'scenario-c') {
        reason = 'QUERY REQUESTABLE · 需申请使用权 (用户选择先不使用)';
      } else {
        reason = 'QUERY REQUESTABLE · 需申请授权';
      }

      excludedItems.push({
        resourceId: res.resourceId,
        resourceName: res.resourceName,
        reason,
        roleTag: res.roleTag,
      });
    }
  });

  if (snapshot.scenario === 'scenario-c') {
    return {
      selectionId: 'SEL-20260815-SC-04',
      solutionId: 'SOL-MINHANG-ELDERLY-CARE-03',
      solutionRevision: customSolutionRevision,
      scenario: 'scenario-c',
      title: '闵行区街镇级老年人口与养老机构供需匹配分析',
      selectedItems,
      excludedItems,
      scope: {
        geography: '上海市闵行区',
        grain: '14个街镇/工业区',
        timeRange: '2026年半年度 (最新)',
      },
      analysisModel: {
        name: '街镇级养老服务供需匹配度分析',
        metricFormula: '每千名老年人养老床位数 = (机构床位总数 / 60岁以上人口数) * 1000',
        summary: '通过行政区划关联 60 岁以上老年人口与养老机构床位总数，测算各街镇每千名老人床位供给率并定位供给薄弱区域。',
      },
      limitations: [
        '基于供给侧机构床位能力测算，不含实时人级入住与个体健康档案记录',
        excludedItems.some((e) => e.resourceName.includes('人口基本信息'))
          ? '排除人级明细表 (人口基本信息暂未申请 / 保持不可查询状态)'
          : '已启用离散脱敏人级视图进行深度研判',
      ],
      timestamp: snapshot.timestamp,
    };
  }

  if (snapshot.scenario === 'scenario-b') {
    return {
      selectionId: 'SEL-20260815-SB-02',
      solutionId: 'SOL-MINHANG-HOTLINE-CORR-02',
      solutionRevision: customSolutionRevision,
      scenario: 'scenario-b',
      title: '闵行区街镇级老年人口规模与公共服务热线诉求相关性对比',
      selectedItems,
      excludedItems,
      scope: {
        geography: '上海市闵行区',
        grain: '街镇级',
        timeRange: '2026年半年度 (最新)',
      },
      analysisModel: {
        name: '街镇级老年人口规模与热线诉求总量宏观相关性',
        metricFormula: '街镇热线工单总量 / 街镇60岁以上老年人口',
        summary: '比较各街镇人口规模与热线诉求总量、类型分布，揭示区域公共服务需求热点。',
      },
      limitations: [
        '不能识别实际老年诉求人，结果表现为各街镇人口规模与热线诉求总量的宏观关联',
        '工单记录未关联自然人身份明细 (人口基本信息暂未申请)',
      ],
      timestamp: snapshot.timestamp,
    };
  }

  return {
    selectionId: 'SEL-20260815-SA-01',
    solutionId: 'SOL-MINHANG-POPDEMO-01',
    solutionRevision: customSolutionRevision,
    scenario: 'scenario-a',
    title: '闵行区各街镇老年人口规模与空间分布统计',
    selectedItems,
    excludedItems,
    scope: {
      geography: '上海市闵行区',
      grain: '街镇级',
      timeRange: '2026年半年度 (最新)',
    },
    analysisModel: {
      name: '闵行区各街镇老年人口规模统计',
      metricFormula: 'SUM(pop_60_plus) GROUP BY town_name',
      summary: '各街镇 60 岁以上常住老年人口统计与占比分析。',
    },
    limitations: [
      '基于统计指标与行政区划进行宏观规模分析，不包含个体微观明细',
    ],
    timestamp: snapshot.timestamp,
  };
}
