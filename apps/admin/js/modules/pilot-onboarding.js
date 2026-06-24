state.viewingPilotAppId = "FS26061305";

const pilotApplications = DroneAdmin.data.pilotApplications = [
  {
    "id": "FS26061305",
    "applicant": "陈宇",
    "subject": "公司",
    "gender": "男",
    "phone": "138****2605",
    "city": "成都高新",
    "emergencyContact": "王女士 139****8821",
    "licenseStatus": "已持证",
    "licenseLevel": "CAAC 超视距驾驶员",
    "licenseNo": "CAAC-****-2605",
    "flightTypes": "巡检、测绘、吊运协作",
    "flightYears": "6 年",
    "hasOwnDevice": "是",
    "employmentIdentity": "合作飞手",
    "intro": "熟悉行业机巡检、测绘与吊运协作，长期服务成都高新区项目。",
    "company": {
      "name": "四川云航科技有限公司"
    },
    "appliedAt": "2026-06-13 15:28",
    "status": "待审核"
  },
  {
    "id": "FS26061302",
    "applicant": "刘洋",
    "subject": "个人",
    "gender": "男",
    "phone": "139****1102",
    "city": "成都双流",
    "emergencyContact": "刘女士 138****3315",
    "licenseStatus": "已持证",
    "licenseLevel": "CAAC 视距内驾驶员",
    "licenseNo": "CAAC-****-1102",
    "flightTypes": "航拍、园区巡检",
    "flightYears": "3 年",
    "hasOwnDevice": "是",
    "employmentIdentity": "兼职",
    "intro": "可承接成都双流及周边短时航拍、巡检任务。",
    "company": null,
    "appliedAt": "2026-06-13 10:16",
    "status": "待审核"
  },
  {
    "id": "FS26061208",
    "applicant": "李明",
    "subject": "公司",
    "gender": "男",
    "phone": "138****9036",
    "city": "成都高新",
    "emergencyContact": "张先生 137****1205",
    "licenseStatus": "已持证",
    "licenseLevel": "CAAC 超视距驾驶员",
    "licenseNo": "CAAC-****-9036",
    "flightTypes": "巡检、应急保障",
    "flightYears": "8 年",
    "hasOwnDevice": "否",
    "employmentIdentity": "全职",
    "intro": "具备园区巡检、低空保障和复杂空域协调经验。",
    "company": {
      "name": "成都低空服务有限公司"
    },
    "appliedAt": "2026-06-12 09:06",
    "status": "已通过"
  },
  {
    "id": "FS26061103",
    "applicant": "周航",
    "subject": "个人",
    "gender": "男",
    "phone": "137****7720",
    "city": "成都武侯",
    "emergencyContact": "周女士 136****7720",
    "licenseStatus": "培训中",
    "licenseLevel": "视距内培训中",
    "licenseNo": "—",
    "flightTypes": "航拍、培训辅助",
    "flightYears": "1 年",
    "hasOwnDevice": "否",
    "employmentIdentity": "兼职",
    "intro": "已有基础飞行经验，正在补充证书资料。",
    "company": null,
    "appliedAt": "2026-06-11 17:40",
    "status": "已驳回"
  },
  {
    "id": "FS26061001",
    "applicant": "赵宇",
    "subject": "个人",
    "gender": "男",
    "phone": "136****4412",
    "city": "成都锦江",
    "emergencyContact": "赵女士 139****4412",
    "licenseStatus": "已持证",
    "licenseLevel": "CAAC 视距内驾驶员",
    "licenseNo": "CAAC-****-4412",
    "flightTypes": "航拍、活动保障",
    "flightYears": "4 年",
    "hasOwnDevice": "是",
    "employmentIdentity": "合作飞手",
    "intro": "擅长活动航拍与商业拍摄，可配合现场导演执行机位。",
    "company": null,
    "appliedAt": "2026-06-10 08:55",
    "status": "待审核"
  }
];

function activePilotApplication() {
  return pilotApplications.find(item => item.id === state.viewingPilotAppId) || pilotApplications[0];
}

function pilotCompanyName(profile) {
  return profile.company?.name || "—";
}

function pilotAbilityPanel(profile, actions = "") {
  return panel("飞手能力信息", detailGrid([
    ["持证情况", profile.licenseStatus || "—"],
    ["所持证书等级", profile.licenseLevel || "—"],
    ["证书编号", profile.licenseNo || "—"],
    ["擅长飞行种类", profile.flightTypes || "—"],
    ["飞行实操年限", profile.flightYears || "—"],
    ["是否自有设备", profile.hasOwnDevice || "—"],
    ["入职身份", profile.employmentIdentity || "—"],
    ["个人简介", profile.intro || "—", true]
  ]), actions);
}

function pilotApplicationsPage() {
  const rows = pilotApplications.map(item => [
    item.id, item.applicant, item.gender || "—", item.phone, item.city || "—", item.subject, item.employmentIdentity || "—", item.appliedAt, tag(item.status),
    opRoute(item.status === "待审核" ? "审核" : "查看", "pilot-review", "", `data-pilot-app-id="${item.id}"`)
  ]);
  return panel("入驻申请", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="姓名 / 手机号 / 常驻城市"><select><option>全部主体</option><option>个人</option><option>公司</option></select><select><option>全部状态</option><option>待审核</option><option>已通过</option><option>已驳回</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("pilot-applications", ["申请编号","姓名","性别","手机号","常驻城市","主体","入职身份","申请时间","状态","操作"], rows)}`);
}

function pilotReviewPage() {
  const app = activePilotApplication();
  const readonly = app.status !== "待审核";
  const actions = readonly
    ? `<span class="tag green">已审核 · 只读查看</span>`
    : `${button("驳回申请","reject-pilot","danger")}${button("审核通过","approve-pilot","primary")}`;
  const applicationFields = [
    ["申请编号", app.id], ["姓名", app.applicant], ["性别", app.gender || "—"], ["手机号", app.phone],
    ["常驻城市", app.city || "—"], ["紧急联系人", app.emergencyContact || "—"], ["所属主体", app.subject]
  ];
  if (app.company?.name) {
    applicationFields.push(["公司名称", app.company.name]);
  }
  applicationFields.push(
    ["申请时间", app.appliedAt], ["当前状态", tag(app.status)]
  );
  return panel("申请信息", detailGrid(applicationFields), routeButton("返回申请列表","pilot-applications",""))
  + pilotAbilityPanel(app, actions);
}

DroneAdmin.registerModule({
  id: "pilot-onboarding",
  routes: [
  "pilot-applications",
  "pilot-review"
],
  titles: {
  "pilot-applications": "飞手入驻申请",
  "pilot-review": "飞手审核详情"
},
  docs: {
  "pilot-applications": {
    "summary": "审核飞手入驻申请，通过后进入已认证飞手池。",
    "operations": [
      "按申请人、手机号、主体类型、审核状态筛选",
      "点击「审核 / 查看」进入审核详情页",
      "待审核申请可执行通过或驳回"
    ],
    "fields": [
      [
        "申请编号",
        "入驻申请唯一编号"
      ],
      [
        "姓名",
        "飞手申请人姓名，与小程序申请字段一致"
      ],
      [
        "性别",
        "飞手申请人性别"
      ],
      [
        "手机号",
        "飞手联系手机号，脱敏展示"
      ],
      [
        "常驻城市",
        "飞手主要服务城市"
      ],
      [
        "紧急联系人",
        "飞手紧急联系信息"
      ],
      [
        "持证情况（必填）",
        "已持证、培训中或暂未持证"
      ],
      [
        "所持证书等级",
        "飞手当前证书等级"
      ],
      [
        "证书编号",
        "飞手证书编号"
      ],
      [
        "擅长飞行种类",
        "飞手擅长的任务类型或飞行场景"
      ],
      [
        "飞行实操年限",
        "飞手实际飞行经验年限"
      ],
      [
        "是否自有设备",
        "用于判断是否需要平台协调设备"
      ],
      [
        "入职身份",
        "全职、兼职或合作飞手"
      ],
      [
        "个人简介",
        "飞手经验、服务区域和能力补充说明"
      ],
      [
        "主体",
        "个人或公司，主体切换逻辑与小程序保持一致"
      ],
      [
        "公司名称",
        "主体为公司时填写"
      ],
      [
        "申请时间",
        "提交入驻申请的时间"
      ],
      [
        "状态",
        "待审核 / 已通过 / 已驳回"
      ],
      [
        "操作",
        "待审核记录进入审核页执行通过或驳回；已处理记录只读查看"
      ]
    ]
  },
  "pilot-review": {
    "summary": "查看飞手入驻资料并完成审核决策。",
    "operations": [
      "核对姓名、手机号、常驻城市、紧急联系人等基础信息",
      "核对持证情况、证书等级、飞行实操年限、自有设备与个人简介",
      "主体为公司时额外核对公司名称",
      "审核通过：飞手进入已认证列表，可参与派单",
      "驳回申请：需填写驳回原因，申请人可重新提交"
    ],
    "fields": [
      [
        "申请信息",
        "姓名、性别、手机号、常驻城市、紧急联系人、所属主体；主体为公司时在所属主体旁展示公司名称"
      ],
      [
        "飞手能力信息",
        "持证情况、证书等级、证书编号、擅长飞行种类、实操年限、自有设备、入职身份、个人简介"
      ],
      [
        "持证情况（必填）",
        "用于审核飞手是否具备对应作业资质"
      ],
      [
        "审核操作",
        "通过后进入已认证飞手；驳回时需填写驳回原因，供申请人重新提交"
      ]
    ]
  }
},
  pages: {
    "pilot-applications": pilotApplicationsPage,
    "pilot-review": pilotReviewPage
  },
  actions: {
    "approve-pilot": function (target) {
      modal("确认审核通过", `<p>确认该申请资料完整并通过飞手入驻审核？</p>`,
            `${button("取消","close-modal")}${button("确认通过","confirm-pilot","primary")}`);
    },
    "reject-pilot": function (target) {
      modal("驳回申请", `<div class="form-field"><label>驳回原因</label><textarea id="pilot-reject-reason" placeholder="请填写驳回原因"></textarea></div>`,
            `${button("取消","close-modal")}${button("确认驳回","confirm-reject-pilot","danger")}`);
    },
    "confirm-reject-pilot": function (target) {
      activePilotApplication().status = "已驳回";
          closeModal();
          render();
          toast("飞手申请已驳回");
    },
    "confirm-pilot": function (target) {
      activePilotApplication().status = "已通过";
          closeModal();
          render();
          toast("飞手申请已审核通过");
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.pilotAppId) state.viewingPilotAppId = target.dataset.pilotAppId;
  },
  onClose: null
});
