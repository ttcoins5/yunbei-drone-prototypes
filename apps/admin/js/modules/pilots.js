state.viewingPilotId = "P001";

const pilotRecords = DroneAdmin.data.pilotRecords = [
  {
    "id": "P001",
    "name": "李明",
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
    "certifiedAt": "2026-05-22"
  },
  {
    "id": "P002",
    "name": "王伟",
    "subject": "个人",
    "gender": "男",
    "phone": "186****5520",
    "city": "成都双流",
    "emergencyContact": "王女士 139****5520",
    "licenseStatus": "已持证",
    "licenseLevel": "CAAC 视距内驾驶员",
    "licenseNo": "CAAC-****-5520",
    "flightTypes": "植保飞防、园区巡检",
    "flightYears": "5 年",
    "hasOwnDevice": "是",
    "employmentIdentity": "合作飞手",
    "intro": "熟悉植保飞防和低空园区巡检，可参与多飞手协作任务。",
    "birthday": "1991-04",
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
    "droneModel": "M350 RTK",
    "serialNo": "3X****22",
    "uniqueId": "UAS-****5520",
    "company": null,
    "certifiedAt": "2026-05-18"
  },
  {
    "id": "P003",
    "name": "陈宇",
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
    "droneModel": "M350 RTK",
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
    "certifiedAt": "2026-05-15"
  },
  {
    "id": "P004",
    "name": "周航",
    "subject": "个人",
    "gender": "男",
    "phone": "137****7720",
    "city": "成都武侯",
    "emergencyContact": "周女士 136****7720",
    "licenseStatus": "已持证",
    "licenseLevel": "CAAC 超视距驾驶员",
    "licenseNo": "CAAC-****-7720",
    "flightTypes": "桥梁巡检、测绘",
    "flightYears": "7 年",
    "hasOwnDevice": "否",
    "employmentIdentity": "全职",
    "intro": "擅长桥梁、河道及市政设施巡检任务。",
    "birthday": "1990-06",
    "area": "成都武侯",
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
    "droneModel": "M350 RTK",
    "serialNo": "3X****55",
    "uniqueId": "UAS-****7720",
    "company": null,
    "certifiedAt": "2026-05-10"
  },
  {
    "id": "P005",
    "name": "赵宇",
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
    "certifiedAt": "2026-05-08"
  },
  {
    "id": "P006",
    "name": "刘洋",
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
    "certifiedAt": "2026-05-05"
  }
];

function activePilot() {
  return pilotRecords.find(item => item.id === state.viewingPilotId) || pilotRecords[0];
}

function pilotsPage() {
  const rows = pilotRecords.map(item => [
    item.name, item.gender || "—", item.phone, item.city || item.area, item.subject, item.employmentIdentity || "—",
    opRoute("查看详情", "pilot-detail", "", `data-pilot-id="${item.id}"`)
  ]);
  return panel("已认证飞手", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="姓名 / 手机号 / 常驻城市"><select><option>全部主体</option><option>个人</option><option>公司</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("pilots", ["姓名","性别","手机号","常驻城市","主体","入职身份","操作"], rows)}`);
}

function pilotDetailPage() {
  const pilot = activePilot();
  return panel("飞手资料", detailGrid([
    ["姓名", pilot.name], ["性别", pilot.gender || "—"], ["手机号", pilot.phone],
    ["常驻城市", pilot.city || pilot.area || "—"], ["紧急联系人", pilot.emergencyContact || "—"],
    ["所属主体", pilot.subject], ["认证时间", pilot.certifiedAt]
  ]), routeButton("返回飞手列表","pilots",""))
  + pilotCompanyPanel(pilot.company)
  + pilotAbilityPanel(pilot)
  + panel("分配订单及个人完成状态", table(["订单号","服务","服务时间","订单状态","个人状态"], [
    ["YB26061703","无人机吊运服务",formatOrderAppointmentBrief(orderRecords.find(item => item.id === "YB26061703")),statusTag("待服务"),tag("服务中")],
    ["YB26061701","无人机巡检服务",formatOrderAppointmentBrief(orderRecords.find(item => item.id === "YB26061701")),statusTag("待派单"),tag("待确认")]
  ]));
}

DroneAdmin.registerModule({
  id: "pilots",
  routes: [
  "pilots",
  "pilot-detail"
],
  titles: {
  "pilots": "已认证飞手",
  "pilot-detail": "飞手详情"
},
  docs: {
  "pilots": {
    "summary": "查看已通过审核的飞手列表及认证资料。",
    "operations": [
      "按姓名、手机号、主体筛选飞手",
      "点击「查看详情」查看飞手完整资料与关联订单"
    ],
    "fields": [
      [
        "姓名",
        "认证飞手姓名"
      ],
      [
        "性别",
        "飞手性别"
      ],
      [
        "手机号",
        "飞手联系手机号"
      ],
      [
        "常驻城市",
        "主要接单城市"
      ],
      [
        "入职身份",
        "全职、兼职或合作飞手"
      ],
      [
        "操作",
        "查看飞手资料、能力信息和关联订单履约记录"
      ]
    ]
  },
  "pilot-detail": {
    "summary": "查看单个飞手的完整资料与订单履约记录。",
    "operations": [
      "查看飞手基础信息、持证情况与能力信息",
      "主体为公司时查看公司信息",
      "下方列表展示已分配订单；个人状态为订单维度，表示该飞手在该单下是否接单及履约进度"
    ],
    "fields": [
      [
        "飞手资料",
        "姓名、性别、手机号、常驻城市、紧急联系人、所属主体、认证时间"
      ],
      [
        "公司信息",
        "主体为公司时：公司名称、联系电话"
      ],
      [
        "飞手能力信息",
        "持证情况、证书等级、证书编号、擅长飞行种类、实操年限、自有设备、入职身份、个人简介"
      ],
      [
        "分配订单",
        "与该飞手关联的订单及各自订单状态"
      ],
      [
        "服务",
        "飞手参与履约的订单商品或服务名称"
      ],
      [
        "服务时间",
        "订单约定的服务日期与时段"
      ],
      [
        "订单状态",
        "该订单当前业务流转状态"
      ],
      [
        "个人状态",
        "订单维度：该飞手在该订单下是否接单及履约进度，非飞手全局字段"
      ]
    ]
  }
},
  pages: {
    "pilots": pilotsPage,
    "pilot-detail": pilotDetailPage
  },
  actions: {},
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.pilotId) state.viewingPilotId = target.dataset.pilotId;
  },
  onClose: null
});
