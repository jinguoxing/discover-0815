import {
  PermissionRequestState,
  ExecutionSelection,
  ExecutionSelectionItem,
  ExecutionExcludedItem,
} from '../types';

export type OperationPermission = 'ALLOW' | 'REQUESTABLE' | 'DENY';

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
