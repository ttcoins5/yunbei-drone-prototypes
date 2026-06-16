state.viewingPilotId = "P001";

const pilotRecords = DroneAdmin.data.pilotRecords = [
  {
    "id": "P001",
    "name": "李明",
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
    "certifiedAt": "2026-05-22"
  },
  {
    "id": "P002",
    "name": "王伟",
    "subject": "个人",
    "phone": "186****5520",
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
    "phone": "137****7720",
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
    "certifiedAt": "2026-05-08"
  },
  {
    "id": "P006",
    "name": "刘洋",
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
    "certifiedAt": "2026-05-05"
  }
];

function activePilot() {
  return pilotRecords.find(item => item.id === state.viewingPilotId) || pilotRecords[0];
}

function pilotsPage() {
  const rows = pilotRecords.map(item => [
    item.name, item.subject, pilotCompanyName(item), item.area, item.droneModel,
    opRoute("查看详情", "pilot-detail", "", `data-pilot-id="${item.id}"`)
  ]);
  return panel("已认证飞手", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="姓名 / 手机号 / 公司"><select><option>全部主体</option><option>个人</option><option>公司</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("pilots", ["飞手","主体","所属公司","服务区域","设备","操作"], rows)}`);
}

function pilotDetailPage() {
  const pilot = activePilot();
  return panel("飞手资料", detailGrid([
    ["姓名", pilot.name], ["所属主体", pilot.subject], ["联系电话", pilot.phone],
    ["出生年月", pilot.birthday], ["所在区域", pilot.area], ["认证时间", pilot.certifiedAt]
  ]), routeButton("返回飞手列表","pilots",""))
  + pilotCompanyPanel(pilot.company)
  + pilotQualificationPanel(pilot)
  + panel("分配订单及个人完成状态", table(["订单号","服务","预约时间","订单状态","个人状态"], [
    ["YB26061318","园区航拍测绘",formatOrderAppointmentBrief(orderRecords.find(item => item.id === "YB26061318")),statusTag("待服务"),tag("服务中")],
    ["YB26060809","园区巡检","—",statusTag("已完成"),tag("已完成")]
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
        "飞手",
        "认证飞手姓名"
      ],
      [
        "主体",
        "个人或公司"
      ],
      [
        "所属公司",
        "公司飞手关联企业"
      ],
      [
        "服务区域",
        "主要接单区域"
      ],
      [
        "设备",
        "主要执飞机型"
      ]
    ]
  },
  "pilot-detail": {
    "summary": "查看单个飞手的完整资料与订单履约记录。",
    "operations": [
      "查看飞手认证信息、资质上传与设备信息",
      "主体为公司时查看公司信息与水印执照",
      "下方列表展示已分配订单；个人状态为订单维度，表示该飞手在该单下是否接单及履约进度"
    ],
    "fields": [
      [
        "飞手资料",
        "申请人、所属主体、联系电话、出生年月、所在区域、认证时间"
      ],
      [
        "公司信息",
        "主体为公司时：公司名称、联系电话、所在区域、地址、水印执照"
      ],
      [
        "资质资料",
        "身份证、操作执照、无人机照片上传记录"
      ],
      [
        "设备信息",
        "机型选择、序列号、唯一识别码"
      ],
      [
        "分配订单",
        "与该飞手关联的订单及各自订单状态"
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
