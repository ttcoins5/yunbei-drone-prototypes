function dashboardPage() {
  const todayOrderRows = orderRecords.map(item => [
    item.id, item.user, item.service, item.amount, item.needPilot ? "需要" : "不需要",
    orderStatusCell(item), orderListActions(item)
  ]);
  const pendingOrderRows = orderRecords.filter(item => item.status === "待派单").map((item, index) => [
    item.id, item.user, item.service, formatOrderAppointmentBrief(item), index ? "56min" : "2h 18min",
    orderListActions(item)
  ]);
  const pilotAppRows = pilotApplications.filter(item => item.status === "待审核").map(item => [
    item.id, item.applicant, item.subject, pilotCompanyName(item), item.appliedAt,
    opRoute("去审核", "pilot-review", "", `data-pilot-app-id="${item.id}"`)
  ]);
  const invoiceRows = invoiceRecords.filter(item => item.status === "待处理").map(item => [
    item.id, item.user, item.title, `${item.orderCount} 个`, item.amount,
    opRoute("去处理", "invoice-detail", "", `data-invoice-id="${item.id}"`)
  ]);
  const content = {
    "today-orders": panel("今日新增订单明细", paginatedTable(
      "dashboard-today-orders",
      ["订单号","用户","商品/服务","金额","需要飞手","状态","操作"],
      todayOrderRows
    )),
    "pending-orders": panel("待派单订单明细", paginatedTable(
      "dashboard-pending-orders",
      ["订单号","用户","商品/服务","预约时间","等待时长","操作"],
      pendingOrderRows
    )),
    "pilot-applications": panel("待审核飞手明细", paginatedTable(
      "dashboard-pilot-applications",
      ["申请编号","申请人","所属主体","公司","申请时间","操作"],
      pilotAppRows
    )),
    invoices: panel("待处理发票明细", paginatedTable(
      "dashboard-invoices",
      ["申请编号","申请用户","发票抬头","关联订单","申请金额","操作"],
      invoiceRows
    ))
  };
  return `<div class="metrics">
    <button class="metric ${state.dashboardMetric === "today-orders" ? "active" : ""}" data-action="dashboard-metric" data-key="today-orders"><span>今日新增订单</span><strong>26</strong><small>其中 7 单需要飞手</small></button>
    <button class="metric ${state.dashboardMetric === "pending-orders" ? "active" : ""}" data-action="dashboard-metric" data-key="pending-orders"><span>待派单订单</span><strong>9</strong><small>最长等待 2h 18min</small></button>
    <button class="metric ${state.dashboardMetric === "pilot-applications" ? "active" : ""}" data-action="dashboard-metric" data-key="pilot-applications"><span>待审核飞手</span><strong>12</strong><small>今日新增申请 5 人</small></button>
    <button class="metric ${state.dashboardMetric === "invoices" ? "active" : ""}" data-action="dashboard-metric" data-key="invoices"><span>待处理发票</span><strong>7</strong><small>合计 ¥48,620</small></button>
  </div>${content[state.dashboardMetric]}`;
}

DroneAdmin.registerModule({
  id: "dashboard",
  routes: [
  "dashboard"
],
  titles: {
  "dashboard": "工作台"
},
  docs: {
  "dashboard": {
    "summary": "运营工作台，汇总今日关键待办，点击指标卡片切换下方明细列表。",
    "operations": [
      "点击顶部指标卡片，切换查看对应明细列表",
      "明细列表中点击「查看详情 / 去派单 / 去审核 / 去处理」跳转至对应业务页",
      "顶部「复制页面链接」可分享当前页面地址"
    ],
    "fields": [
      [
        "今日新增订单",
        "当日 0 点至当前新生成的订单总数，含需飞手与无需飞手订单"
      ],
      [
        "待派单订单",
        "已付款且需要分配飞手的订单，按等待时长排序"
      ],
      [
        "待审核飞手",
        "飞手提交入驻申请后尚未审核的数量"
      ],
      [
        "待处理发票",
        "用户提交开票申请、尚未审核或上传发票的数量"
      ]
    ]
  }
},
  pages: {
    "dashboard": dashboardPage
  },
  actions: {
    "dashboard-metric": function (target) {
      state.dashboardMetric = target.dataset.key;
          render();
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: null,
  onClose: null
});
