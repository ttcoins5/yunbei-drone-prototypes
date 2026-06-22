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
      todayOrderRows,
      "orders-table"
    )),
    "pending-orders": panel("待派单订单明细", paginatedTable(
      "dashboard-pending-orders",
      ["订单号","用户","商品/服务","服务时间","等待时长","操作"],
      pendingOrderRows,
      "orders-table"
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
        "需要分配飞手且当前处于待派单的订单，按等待时长排序"
      ],
      [
        "开始等待",
        "订单进入「待派单」状态即开始计时：在线支付订单从支付成功进入待派单开始；非在线支付且需要飞手的订单从订单生成进入待派单开始"
      ],
      [
        "待审核飞手",
        "飞手提交入驻申请后尚未审核的数量"
      ],
      [
        "待处理发票",
        "用户提交开票申请、尚未审核或上传发票的数量"
      ],
      [
        "订单明细",
        "订单号、用户、商品/服务、金额、需要飞手、状态和操作入口"
      ],
      [
        "用户",
        "订单或申请对应的小程序用户、企业或联系人"
      ],
      [
        "商品/服务",
        "订单购买的商品或服务名称"
      ],
      [
        "金额",
        "订单金额、申请金额或待处理金额"
      ],
      [
        "需要飞手",
        "订单是否需要后台分配飞手"
      ],
      [
        "状态",
        "当前业务状态，用于判断下一步处理动作"
      ],
      [
        "待派单明细",
        "展示服务时间、等待时长和去派单入口，便于运营优先处理"
      ],
      [
        "服务时间",
        "订单或任务约定的服务日期与时段"
      ],
      [
        "等待时长",
        "当前时间减去订单进入待派单状态的时间；工作台取最大值展示为「最长等待」"
      ],
      [
        "飞手申请明细",
        "展示申请人、所属主体、公司、申请时间和审核入口"
      ],
      [
        "申请人",
        "提交入驻、发票或运营申请的联系人"
      ],
      [
        "所属主体",
        "飞手申请主体，个人或公司"
      ],
      [
        "公司",
        "公司主体申请时展示企业名称"
      ],
      [
        "申请时间",
        "用户提交申请的时间"
      ],
      [
        "发票明细",
        "展示申请用户、发票抬头、关联订单、申请金额和处理入口"
      ],
      [
        "申请用户",
        "提交发票申请的小程序用户"
      ],
      [
        "发票抬头",
        "个人或企业发票抬头"
      ],
      [
        "关联订单",
        "本次发票申请包含的订单数量或订单范围"
      ],
      [
        "申请金额",
        "本次发票申请的可开票金额合计"
      ],
      [
        "操作",
        "根据待办类型进入查看详情、去派单、去审核或去处理"
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
