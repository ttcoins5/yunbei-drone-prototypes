state.viewingFlightReportId = "FB26061401";

const flightReportRecords = DroneAdmin.data.flightReportRecords = [
  {
    "id": "FB26061401",
    "pilotName": "李明",
    "pilotPhone": "138****9036",
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****08",
    "uniqueId": "UAS-****1205",
    "flightArea": "成都高新区",
    "flightDate": "2026-06-14",
    "flightTime": "09:30-11:20",
    "sorties": 3,
    "duration": "1h 50min",
    "remark": "园区航拍测绘作业",
    "submittedAt": "2026-06-14 08:45",
    "source": "小程序",
    "status": "待确认"
  },
  {
    "id": "FB26061302",
    "pilotName": "王伟",
    "pilotPhone": "186****5520",
    "droneModel": "M350 RTK",
    "serialNo": "3X****22",
    "uniqueId": "UAS-****5520",
    "flightArea": "成都双流",
    "flightDate": "2026-06-13",
    "flightTime": "14:00-16:30",
    "sorties": 5,
    "duration": "2h 30min",
    "remark": "农田测绘巡检",
    "submittedAt": "2026-06-13 13:20",
    "source": "小程序",
    "status": "已确认"
  },
  {
    "id": "FB26061203",
    "pilotName": "陈宇",
    "pilotPhone": "138****2605",
    "droneModel": "M350 RTK",
    "serialNo": "3X****91",
    "uniqueId": "UAS-****8821",
    "flightArea": "成都天府新区",
    "flightDate": "2026-06-12",
    "flightTime": "08:00-10:15",
    "sorties": 2,
    "duration": "2h 15min",
    "remark": "—",
    "submittedAt": "2026-06-12 07:40",
    "source": "小程序",
    "status": "已确认"
  },
  {
    "id": "FB26061104",
    "pilotName": "周航",
    "pilotPhone": "137****7720",
    "droneModel": "M350 RTK",
    "serialNo": "3X****55",
    "uniqueId": "UAS-****7720",
    "flightArea": "成都武侯区",
    "flightDate": "2026-06-11",
    "flightTime": "10:00-11:40",
    "sorties": 4,
    "duration": "1h 40min",
    "remark": "电力线路初勘",
    "submittedAt": "2026-06-11 09:15",
    "source": "小程序",
    "status": "待确认"
  },
  {
    "id": "FB26061005",
    "pilotName": "赵宇",
    "pilotPhone": "136****4412",
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****19",
    "uniqueId": "UAS-****4412",
    "flightArea": "成都锦江区",
    "flightDate": "2026-06-10",
    "flightTime": "15:20-16:50",
    "sorties": 2,
    "duration": "1h 30min",
    "remark": "活动航拍 rehearsal",
    "submittedAt": "2026-06-10 14:55",
    "source": "小程序",
    "status": "已确认"
  },
  {
    "id": "FB26060906",
    "pilotName": "刘洋",
    "pilotPhone": "139****1102",
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****42",
    "uniqueId": "UAS-****3315",
    "flightArea": "成都双流",
    "flightDate": "2026-06-09",
    "flightTime": "07:30-09:00",
    "sorties": 3,
    "duration": "1h 30min",
    "remark": "—",
    "submittedAt": "2026-06-09 07:10",
    "source": "小程序",
    "status": "待确认"
  }
];

function activeFlightReport() {
  return flightReportRecords.find(item => item.id === state.viewingFlightReportId) || flightReportRecords[0];
}

function flightReportStatusTag(status) {
  return status === "已确认" ? tag("已确认") : tag("待确认");
}

function flightReportsPage() {
  const rows = flightReportRecords.map(item => [
    item.id, item.pilotName, item.droneModel, item.sorties, item.duration, item.submittedAt,
    flightReportStatusTag(item.status),
    opRoute("查看详情", "flight-report-detail", "", `data-flight-report-id="${item.id}"`)
  ]);
  return panel("飞行报备", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="报备编号 / 飞手 / 机型"><select><option>全部状态</option><option>待确认</option><option>已确认</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("flight-reports", ["报备编号","起飞飞手","机型","飞行架次","飞行时长","报备时间","状态","操作"], rows)}`);
}

function flightReportDetailPage() {
  const report = activeFlightReport();
  const actions = [
    report.status === "待确认" ? button("确认报备", "confirm-flight-report", "primary") : "",
    button("推送第三方", "push-flight-report-third-party")
  ].filter(Boolean).join("");
  return panel("报备信息", detailGrid([
    ["报备编号", report.id], ["起飞飞手", report.pilotName], ["联系电话", report.pilotPhone],
    ["飞行区域", report.flightArea], ["飞行日期", report.flightDate], ["飞行时段", report.flightTime],
    ["飞行架次", String(report.sorties)], ["飞行时长", report.duration],
    ["备注", report.remark || "—", true], ["报备时间", report.submittedAt],
    ["来源", report.source || "小程序"], ["状态", flightReportStatusTag(report.status)]
  ]), routeButton("返回列表", "flight-reports", ""))
  + panel("飞行器信息", detailGrid([
    ["机型选择", report.droneModel], ["序列号", report.serialNo], ["唯一识别码", report.uniqueId]
  ]), actions);
}

DroneAdmin.registerModule({
  id: "flight-reports",
  routes: [
  "flight-reports",
  "flight-report-detail"
],
  titles: {
  "flight-reports": "飞行报备管理",
  "flight-report-detail": "飞行报备详情"
},
  docs: {
  "flight-reports": {
    "summary": "管理飞手在小程序提交的飞行报备数据，支持查看与确认，并可推送至第三方（待对接）。",
    "operations": [
      "按报备编号、飞手姓名、机型、状态筛选",
      "点击「查看详情」查看完整报备信息与飞行器信息",
      "待确认报备可在详情页执行「确认报备」",
      "「推送第三方」为预留能力，点击仅提示待对接"
    ],
    "fields": [
      [
        "报备编号",
        "飞行报备唯一编号"
      ],
      [
        "起飞飞手",
        "提交报备的认证飞手姓名"
      ],
      [
        "机型",
        "执飞无人机型号"
      ],
      [
        "飞行架次",
        "本次报备的飞行架次"
      ],
      [
        "飞行时长",
        "累计飞行时长"
      ],
      [
        "报备时间",
        "飞手在小程序提交报备的时间"
      ],
      [
        "状态",
        "待确认或已确认"
      ]
    ]
  },
  "flight-report-detail": {
    "summary": "查看单条飞行报备的完整内容与飞行器信息，并完成确认或第三方推送操作。",
    "operations": [
      "展示飞手在小程序填写的飞行动态信息",
      "待确认时可点击「确认报备」标记为已确认",
      "「推送第三方」将飞手及报备信息推送外部系统（原型仅占位，待业务确认）"
    ],
    "fields": [
      [
        "报备编号",
        "飞行报备唯一编号"
      ],
      [
        "起飞飞手",
        "提交报备的认证飞手"
      ],
      [
        "联系电话",
        "飞手联系方式，脱敏展示"
      ],
      [
        "飞行区域",
        "计划或实际飞行区域"
      ],
      [
        "飞行日期",
        "飞行作业日期"
      ],
      [
        "飞行时段",
        "飞行起止时段"
      ],
      [
        "飞行架次",
        "本次飞行架次"
      ],
      [
        "飞行时长",
        "累计飞行时长"
      ],
      [
        "备注",
        "飞手填写的补充说明"
      ],
      [
        "报备时间",
        "小程序提交时间"
      ],
      [
        "来源",
        "默认小程序"
      ],
      [
        "状态",
        "待确认 / 已确认"
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
        "无人机唯一识别码"
      ]
    ]
  }
},
  pages: {
    "flight-reports": flightReportsPage,
    "flight-report-detail": flightReportDetailPage
  },
  actions: {
    "confirm-flight-report": function (target) {
      const report = activeFlightReport();
          if (report.status === "已确认") {
            toast("该报备已确认");
            return;
          }
          report.status = "已确认";
          render();
          toast("飞行报备已确认");
    },
    "push-flight-report-third-party": function (target) {
      toast("第三方推送能力待确认，当前为占位按钮");
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.flightReportId) state.viewingFlightReportId = target.dataset.flightReportId;
  },
  onClose: null
});
