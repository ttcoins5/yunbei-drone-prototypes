state.viewingOperatorApplicationId = "OP26061501";
state.viewingFeedbackId = "FB26061503";

const operatorApplications = DroneAdmin.data.operatorApplications = [
  {
    id: "OP26061501",
    organization: "成都低空智联科技有限公司",
    applicant: "周航",
    phone: "138****7621",
    area: "四川省成都市高新区",
    idCardFront: "身份证人像面.jpg",
    idCardBack: "身份证国徽面.jpg",
    businessLicense: "营业执照.jpg",
    agreement: true,
    submittedAt: "2026-06-15 09:42",
    source: "小程序"
  },
  {
    id: "OP26061405",
    organization: "宁波云巡低空服务中心",
    applicant: "陈女士",
    phone: "186****5108",
    area: "浙江省宁波市鄞州区",
    idCardFront: "法人身份证人像面.png",
    idCardBack: "法人身份证国徽面.png",
    businessLicense: "统一社会信用代码证.png",
    agreement: true,
    submittedAt: "2026-06-14 16:18",
    source: "小程序"
  },
  {
    id: "OP26061302",
    organization: "杭州湾空域服务站",
    applicant: "李先生",
    phone: "139****8826",
    area: "浙江省宁波市前湾新区",
    idCardFront: "身份证正面.jpg",
    idCardBack: "身份证反面.jpg",
    businessLicense: "营业执照副本.jpg",
    agreement: true,
    submittedAt: "2026-06-13 11:05",
    source: "小程序"
  }
];

const feedbackRecords = DroneAdmin.data.feedbackRecords = [
  {
    id: "FB26061503",
    user: "唐先生",
    phone: "138****9031",
    content: "首页服务分类很好找，但希望飞行报备入口能更明显一些。",
    images: ["反馈截图-1.png", "反馈截图-2.png"],
    submittedAt: "2026-06-15 10:26",
    source: "小程序"
  },
  {
    id: "FB26061408",
    user: "云航科技",
    phone: "028-55****90",
    content: "预约服务提交后希望展示预计响应时间，方便内部安排。",
    images: ["订单截图.png"],
    submittedAt: "2026-06-14 18:12",
    source: "小程序"
  },
  {
    id: "FB26061311",
    user: "刘女士",
    phone: "186****2931",
    content: "培训报名页面建议增加课程价格说明。",
    images: [],
    submittedAt: "2026-06-13 15:37",
    source: "小程序"
  }
];

function activeOperatorApplication() {
  return operatorApplications.find(item => item.id === state.viewingOperatorApplicationId) || operatorApplications[0];
}

function activeFeedback() {
  return feedbackRecords.find(item => item.id === state.viewingFeedbackId) || feedbackRecords[0];
}

function submittedFileChip(name) {
  return `<span class="submitted-file">${thumb(false, { title: name })}<span>${name}</span></span>`;
}

function submittedImageGrid(files) {
  if (!files.length) return `<p class="empty">未上传图片</p>`;
  return `<div class="submitted-image-grid">${files.map(submittedFileChip).join("")}</div>`;
}

function operatorApplicationsPage() {
  const rows = operatorApplications.map(item => [
    item.id,
    item.organization,
    item.applicant,
    item.phone,
    item.area,
    item.submittedAt,
    opRoute("查看详情", "operator-application-detail", "", `data-operator-app-id="${item.id}"`)
  ]);
  return panel("运营商申请", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="机构名称 / 申请人 / 联系电话 / 区域">${button("查询","filter","primary")}
  </div>${paginatedTable("operator-applications", ["申请编号","机构名称","申请人","联系电话","申请区域","提交时间","操作"], rows)}`);
}

function operatorApplicationDetailPage() {
  const item = activeOperatorApplication();
  return panel("申请信息", detailGrid([
    ["申请编号", item.id], ["机构名称", item.organization],
    ["申请人", item.applicant], ["联系电话", item.phone],
    ["申请区域", item.area], ["提交时间", item.submittedAt],
    ["入驻协议", item.agreement ? tag("已勾选") : tag("未勾选")], ["来源", item.source || "小程序"]
  ]), routeButton("返回申请列表", "operator-applications", ""))
  + panel("上传资料", detailGrid([
    ["身份证人像面", submittedFileChip(item.idCardFront)],
    ["身份证国徽面", submittedFileChip(item.idCardBack)],
    ["营业执照", submittedFileChip(item.businessLicense), true]
  ]));
}

function feedbacksPage() {
  const rows = feedbackRecords.map(item => [
    item.id,
    item.user,
    item.phone,
    `<span class="feedback-brief">${item.content}</span>`,
    item.submittedAt,
    opRoute("查看详情", "feedback-detail", "", `data-feedback-id="${item.id}"`)
  ]);
  return panel("意见反馈", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="反馈编号 / 用户 / 反馈内容">${button("查询","filter","primary")}
  </div>${paginatedTable("feedbacks", ["反馈编号","用户","联系电话","反馈内容","提交时间","操作"], rows)}`);
}

function feedbackDetailPage() {
  const item = activeFeedback();
  return panel("反馈信息", detailGrid([
    ["反馈编号", item.id], ["反馈用户", item.user],
    ["联系电话", item.phone], ["提交时间", item.submittedAt],
    ["来源", item.source || "小程序"], ["提交方式", "意见反馈表单"],
    ["图片数量", `${item.images.length}/6`],
    ["反馈内容", `<span class="order-remark-text">${item.content}</span>`, true]
  ]), routeButton("返回反馈列表", "feedbacks", ""))
  + panel("反馈图片", submittedImageGrid(item.images));
}

DroneAdmin.registerModule({
  id: "operations",
  routes: [
    "operator-applications",
    "operator-application-detail",
    "feedbacks",
    "feedback-detail"
  ],
  titles: {
    "operator-applications": "运营商申请",
    "operator-application-detail": "运营商申请详情",
    "feedbacks": "意见反馈",
    "feedback-detail": "意见反馈详情"
  },
  docs: {
    "operator-applications": {
      summary: "接收小程序提交的城市运营商入驻申请，后台仅做信息查看和归档展示。",
      operations: [
        "按机构名称、申请人、联系电话或申请区域筛选",
        "点击「查看详情」查看申请字段、上传资料和协议勾选状态",
        "不提供审核、驳回、编辑或删除操作"
      ],
      fields: [
        ["机构名称", "申请成为城市运营商的机构或公司名称"],
        ["申请人", "提交申请的联系人姓名"],
        ["联系电话", "申请人联系电话，列表脱敏展示"],
        ["申请区域", "申请运营的城市或区域范围"],
        ["身份证正反面", "申请人上传的人像面和国徽面资料"],
        ["营业执照", "申请机构上传的营业执照"],
        ["入驻协议", "是否勾选城市运营商入驻协议"],
        ["提交时间", "小程序提交申请的时间"]
      ]
    },
    "operator-application-detail": {
      summary: "查看单条城市运营商申请的完整信息，只读展示。",
      operations: [
        "展示机构、申请人、联系电话、申请区域和提交时间",
        "展示身份证正反面、营业执照和协议勾选状态",
        "无审核或状态流转"
      ],
      fields: [
        ["申请信息", "机构名称、申请人、联系电话、申请区域、提交时间、来源"],
        ["上传资料", "身份证人像面、身份证国徽面、营业执照"],
        ["入驻协议", "用户提交前必须勾选的协议确认结果"]
      ]
    },
    "feedbacks": {
      summary: "接收用户在小程序提交的意见反馈，后台仅做信息查看。",
      operations: [
        "按反馈编号、用户或反馈内容筛选",
        "点击「查看详情」查看完整反馈内容和上传图片",
        "不提供回复、处理状态或删除操作"
      ],
      fields: [
        ["反馈内容", "用户填写的文字反馈"],
        ["反馈图片", "最多上传 6 张，列表不展示图片数量列，详情页集中查看"],
        ["提交时间", "用户提交反馈的时间"],
        ["来源", "默认来自小程序"]
      ]
    },
    "feedback-detail": {
      summary: "查看单条意见反馈的完整资料。",
      operations: [
        "展示反馈用户、联系电话、反馈内容、提交时间、来源和图片数量",
        "展示用户上传的反馈图片占位"
      ],
      fields: [
        ["反馈内容", "用户提交的完整反馈文本"],
        ["反馈图片", "用户上传的图片，最多 6 张"],
        ["提交信息", "反馈编号、用户、联系电话、提交时间、来源"]
      ]
    }
  },
  pages: {
    "operator-applications": operatorApplicationsPage,
    "operator-application-detail": operatorApplicationDetailPage,
    "feedbacks": feedbacksPage,
    "feedback-detail": feedbackDetailPage
  },
  actions: {},
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.operatorAppId) state.viewingOperatorApplicationId = target.dataset.operatorAppId;
    if (target.dataset.feedbackId) state.viewingFeedbackId = target.dataset.feedbackId;
  },
  onClose: null
});
