state.viewingPilotAppId = "FS26061305";

const pilotApplications = DroneAdmin.data.pilotApplications = [
  {
    "id": "FS26061305",
    "applicant": "陈宇",
    "subject": "公司",
    "phone": "138****2605",
    "birthday": "1992-08",
    "area": "成都高新",
    "idCard": {
      "uploaded": true,
      "preview": "身份证正反面.jpg"
    },
    "license": {
      "uploaded": true,
      "preview": "CAAC 超视距驾驶员.pdf"
    },
    "dronePhoto": {
      "uploaded": true,
      "preview": "设备实拍.jpg"
    },
    "droneModel": "DJI M350 RTK",
    "serialNo": "3X****91",
    "uniqueId": "UAS-****8821",
    "company": {
      "name": "四川云航科技有限公司",
      "phone": "028-88****26",
      "area": "成都高新",
      "address": "成都市高新区天府大道中段 88 号",
      "watermarkedLicense": {
        "uploaded": true,
        "preview": "营业执照（水印）.jpg"
      }
    },
    "appliedAt": "2026-06-13 15:28",
    "status": "待审核"
  },
  {
    "id": "FS26061302",
    "applicant": "刘洋",
    "subject": "个人",
    "phone": "139****1102",
    "birthday": "1995-03",
    "area": "成都双流",
    "idCard": {
      "uploaded": true,
      "preview": "身份证正反面.jpg"
    },
    "license": {
      "uploaded": true,
      "preview": "CAAC 视距内驾驶员.pdf"
    },
    "dronePhoto": {
      "uploaded": true,
      "preview": "设备实拍.jpg"
    },
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****42",
    "uniqueId": "UAS-****3315",
    "company": null,
    "appliedAt": "2026-06-13 10:16",
    "status": "待审核"
  },
  {
    "id": "FS26061208",
    "applicant": "李明",
    "subject": "公司",
    "phone": "138****9036",
    "birthday": "1988-11",
    "area": "成都高新",
    "idCard": {
      "uploaded": true,
      "preview": "身份证正反面.jpg"
    },
    "license": {
      "uploaded": true,
      "preview": "CAAC 超视距驾驶员.pdf"
    },
    "dronePhoto": {
      "uploaded": true,
      "preview": "设备实拍.jpg"
    },
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****08",
    "uniqueId": "UAS-****1205",
    "company": {
      "name": "成都低空服务有限公司",
      "phone": "028-66****18",
      "area": "成都高新",
      "address": "成都市高新区益州大道北段 168 号",
      "watermarkedLicense": {
        "uploaded": true,
        "preview": "营业执照（水印）.jpg"
      }
    },
    "appliedAt": "2026-06-12 09:06",
    "status": "已通过"
  },
  {
    "id": "FS26061103",
    "applicant": "周航",
    "subject": "个人",
    "phone": "137****7720",
    "birthday": "1990-06",
    "area": "成都武侯",
    "idCard": {
      "uploaded": true,
      "preview": "身份证正反面.jpg"
    },
    "license": {
      "uploaded": false,
      "preview": "—"
    },
    "dronePhoto": {
      "uploaded": true,
      "preview": "设备实拍.jpg"
    },
    "droneModel": "M350 RTK",
    "serialNo": "3X****55",
    "uniqueId": "UAS-****7720",
    "company": null,
    "appliedAt": "2026-06-11 17:40",
    "status": "已驳回"
  },
  {
    "id": "FS26061001",
    "applicant": "赵宇",
    "subject": "个人",
    "phone": "136****4412",
    "birthday": "1993-12",
    "area": "成都锦江",
    "idCard": {
      "uploaded": true,
      "preview": "身份证正反面.jpg"
    },
    "license": {
      "uploaded": true,
      "preview": "CAAC 视距内驾驶员.pdf"
    },
    "dronePhoto": {
      "uploaded": true,
      "preview": "设备实拍.jpg"
    },
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****19",
    "uniqueId": "UAS-****4412",
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

function pilotUploadStatus(file) {
  return file?.uploaded ? tag("已上传") : tag("未上传");
}

function pilotUploadRow(label, file) {
  return [label, file?.preview || "—", pilotUploadStatus(file)];
}

function pilotCompanyPanel(company) {
  if (!company) return "";
  return panel("公司信息", detailGrid([
    ["公司名称", company.name],
    ["联系电话", company.phone],
    ["所在区域", company.area],
    ["地址", company.address, true],
    ["水印执照", `${pilotUploadStatus(company.watermarkedLicense)}${company.watermarkedLicense?.preview ? `<span class="muted"> ${company.watermarkedLicense.preview}</span>` : ""}`]
  ]));
}

function pilotQualificationPanel(profile, actions = "") {
  return panel("资质与设备资料", `${table(["资料类型", "资料内容", "状态"], [
    pilotUploadRow("身份证正反面", profile.idCard),
    pilotUploadRow("无人机操作执照", profile.license),
    pilotUploadRow("无人机照片", profile.dronePhoto)
  ])}<div style="margin-top:16px">${detailGrid([
    ["机型选择", profile.droneModel || "—"],
    ["序列号", profile.serialNo || "—"],
    ["唯一识别码", profile.uniqueId || "—"]
  ])}</div>`, actions);
}

function pilotApplicationsPage() {
  const rows = pilotApplications.map(item => [
    item.id, item.applicant, item.subject, pilotCompanyName(item), item.appliedAt, tag(item.status),
    opRoute(item.status === "待审核" ? "审核" : "查看", "pilot-review", "", `data-pilot-app-id="${item.id}"`)
  ]);
  return panel("入驻申请", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="申请人 / 手机号 / 公司"><select><option>全部主体</option><option>个人</option><option>公司</option></select><select><option>全部状态</option><option>待审核</option><option>已通过</option><option>已驳回</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("pilot-applications", ["申请编号","申请人","主体","所属公司","申请时间","状态","操作"], rows)}`);
}

function pilotReviewPage() {
  const app = activePilotApplication();
  const readonly = app.status !== "待审核";
  const actions = readonly
    ? `<span class="tag green">已审核 · 只读查看</span>`
    : `${button("驳回申请","reject-pilot","danger")}${button("审核通过","approve-pilot","primary")}`;
  return panel("申请信息", detailGrid([
    ["申请编号", app.id], ["申请人", app.applicant], ["所属主体", app.subject], ["联系电话", app.phone],
    ["出生年月", app.birthday], ["所在区域", app.area], ["申请时间", app.appliedAt], ["当前状态", tag(app.status)]
  ]), routeButton("返回申请列表","pilot-applications",""))
  + pilotCompanyPanel(app.company)
  + pilotQualificationPanel(app, actions);
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
        "申请人",
        "飞手姓名"
      ],
      [
        "所属主体",
        "个人或公司"
      ],
      [
        "联系电话",
        "申请人手机号，脱敏展示"
      ],
      [
        "出生年月",
        "申请人出生年月"
      ],
      [
        "所在区域",
        "申请人主要服务区域"
      ],
      [
        "身份证正反面",
        "小程序上传的身份证影像"
      ],
      [
        "无人机操作执照",
        "小程序上传的操作执照"
      ],
      [
        "无人机照片",
        "小程序上传的设备实拍图"
      ],
      [
        "机型选择",
        "执飞无人机型号"
      ],
      [
        "序列号",
        "无人机机身序列号"
      ],
      [
        "唯一识别码",
        "无人机唯一识别码（UAS）"
      ],
      [
        "公司名称",
        "主体为公司时填写"
      ],
      [
        "公司联系电话",
        "主体为公司时填写"
      ],
      [
        "公司所在区域",
        "主体为公司时填写"
      ],
      [
        "公司地址",
        "主体为公司时填写"
      ],
      [
        "水印执照",
        "主体为公司时上传的营业执照（含水印）"
      ],
      [
        "申请时间",
        "提交入驻申请的时间"
      ],
      [
        "状态",
        "待审核 / 已通过 / 已驳回"
      ]
    ]
  },
  "pilot-review": {
    "summary": "查看飞手入驻资料并完成审核决策。",
    "operations": [
      "核对申请人信息、资质上传与设备信息",
      "主体为公司时额外核对公司信息与水印执照",
      "审核通过：飞手进入已认证列表，可参与派单",
      "驳回申请：需填写驳回原因，申请人可重新提交"
    ],
    "fields": [
      [
        "申请信息",
        "申请人、所属主体、联系电话、出生年月、所在区域"
      ],
      [
        "公司信息",
        "主体为公司时展示：公司名称、联系电话、所在区域、地址、水印执照"
      ],
      [
        "资质资料",
        "身份证正反面、无人机操作执照、无人机照片上传状态"
      ],
      [
        "设备信息",
        "机型选择、序列号、唯一识别码"
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
