state.viewingFlightReportId = "BB20260612001";

const flightReportRecords = DroneAdmin.data.flightReportRecords = [
  {
    "id": "BB20260612001",
    "pilotName": "苏炜",
    "pilotPhone": "18356570510",
    "entrustedSubject": "宁波市自然资源和规划局奉化分局",
    "droneModel": "DJI Mavic 3E",
    "serialNo": "1581F5FHD23CF00D5",
    "uniqueId": "UAS-****1205",
    "flightPlan": "2026 年 6 月 12 日 12:00-14:00",
    "flightArea": "萧王庙街道云溪村",
    "flightDate": "2026-06-12",
    "flightTime": "12:00-14:00",
    "flightAltitude": "120 米",
    "taskNature": "测绘",
    "sorties": 1,
    "duration": "2h 00min",
    "remark": "特此报备",
    "submittedAt": "2026-06-12 11:33",
    "source": "小程序",
    "status": "待确认"
  },
  {
    "id": "BB20260613001",
    "pilotName": "王伟",
    "pilotPhone": "186****5520",
    "entrustedSubject": "眉山市东坡区农业合作社",
    "droneModel": "M350 RTK",
    "serialNo": "3X****22",
    "uniqueId": "UAS-****5520",
    "flightPlan": "2026-06-13 14:00-16:30",
    "flightArea": "成都双流",
    "flightDate": "2026-06-13",
    "flightTime": "14:00-16:30",
    "flightAltitude": "80 米",
    "taskNature": "农田巡检",
    "sorties": 5,
    "duration": "2h 30min",
    "remark": "农田测绘巡检",
    "submittedAt": "2026-06-13 13:20",
    "source": "小程序",
    "status": "已确认"
  },
  {
    "id": "BB20260612002",
    "pilotName": "陈宇",
    "pilotPhone": "138****2605",
    "entrustedSubject": "成都天府新区产业园",
    "droneModel": "M350 RTK",
    "serialNo": "3X****91",
    "uniqueId": "UAS-****8821",
    "flightPlan": "2026-06-12 08:00-10:15",
    "flightArea": "成都天府新区",
    "flightDate": "2026-06-12",
    "flightTime": "08:00-10:15",
    "flightAltitude": "100 米",
    "taskNature": "园区巡检",
    "sorties": 2,
    "duration": "2h 15min",
    "remark": "—",
    "submittedAt": "2026-06-12 07:40",
    "source": "小程序",
    "status": "已确认"
  },
  {
    "id": "BB20260611001",
    "pilotName": "周航",
    "pilotPhone": "137****7720",
    "entrustedSubject": "成都电力线路项目部",
    "droneModel": "M350 RTK",
    "serialNo": "3X****55",
    "uniqueId": "UAS-****7720",
    "flightPlan": "2026-06-11 10:00-11:40",
    "flightArea": "成都武侯区",
    "flightDate": "2026-06-11",
    "flightTime": "10:00-11:40",
    "flightAltitude": "110 米",
    "taskNature": "电力初勘",
    "sorties": 4,
    "duration": "1h 40min",
    "remark": "电力线路初勘",
    "submittedAt": "2026-06-11 09:15",
    "source": "小程序",
    "status": "待确认"
  },
  {
    "id": "BB20260610001",
    "pilotName": "赵宇",
    "pilotPhone": "136****4412",
    "entrustedSubject": "成都锦江区活动主办方",
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****19",
    "uniqueId": "UAS-****4412",
    "flightPlan": "2026-06-10 15:20-16:50",
    "flightArea": "成都锦江区",
    "flightDate": "2026-06-10",
    "flightTime": "15:20-16:50",
    "flightAltitude": "90 米",
    "taskNature": "活动航拍",
    "sorties": 2,
    "duration": "1h 30min",
    "remark": "活动航拍 rehearsal",
    "submittedAt": "2026-06-10 14:55",
    "source": "小程序",
    "status": "已确认"
  },
  {
    "id": "BB20260609001",
    "pilotName": "刘洋",
    "pilotPhone": "139****1102",
    "entrustedSubject": "成都双流区施工项目部",
    "droneModel": "Mavic 3E",
    "serialNo": "1Z****42",
    "uniqueId": "UAS-****3315",
    "flightPlan": "2026-06-09 07:30-09:00",
    "flightArea": "成都双流",
    "flightDate": "2026-06-09",
    "flightTime": "07:30-09:00",
    "flightAltitude": "70 米",
    "taskNature": "施工巡检",
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
    item.id, item.entrustedSubject || "—", `${item.pilotName}（${item.pilotPhone}）`, item.droneModel, item.flightPlan || `${item.flightDate} ${item.flightTime}`, item.flightArea, item.submittedAt,
    flightReportStatusTag(item.status),
    opRoute("查看详情", "flight-report-detail", "", `data-flight-report-id="${item.id}"`)
  ]);
  return panel("飞行报备", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="报备编号 / 飞手 / 机型"><select><option>全部状态</option><option>待确认</option><option>已确认</option></select>${button("查询","filter","primary")}
  </div><div class="module-note" style="margin-bottom:14px"><b>字段口径：</b>后台飞行报备读取小程序提交的同一组字段；详情按「委托/飞手/设备」和「飞行计划」两大块展示。报备编号提交后由系统生成，格式为 <code>BB + YYYYMMDD + 3位当日流水</code>。</div>${paginatedTable("flight-reports", ["报备编号","委托主体","飞手信息","机型","飞行计划","区域/地点","报备时间","状态","操作"], rows)}`);
}

function flightReportDetailPage() {
  const report = activeFlightReport();
  const actions = [
    report.status === "待确认" ? button("确认报备", "confirm-flight-report", "primary") : "",
    button("推送第三方", "push-flight-report-third-party")
  ].filter(Boolean).join("");
  const flightPlan = report.flightPlan || `${report.flightDate || "—"} ${report.flightTime || ""}`.trim();
  return panel("报备信息", detailGrid([
    ["报备编号", report.id],
    ["委托主体", report.entrustedSubject || "—", true],
    ["飞手信息", `${report.pilotName}（联系方式 ${report.pilotPhone}）`, true],
    ["设备信息", `无人机型号 ${report.droneModel || "—"}、序列号 ${report.serialNo || "—"}`, true],
    ["报备时间", report.submittedAt],
    ["来源", report.source || "小程序"],
    ["状态", flightReportStatusTag(report.status)]
  ]), routeButton("返回列表", "flight-reports", ""))
  + panel("飞行计划", detailGrid([
    ["时间", flightPlan, true],
    ["区域/具体地点", report.flightArea, true],
    ["高度", report.flightAltitude || "—"],
    ["任务性质", report.taskNature || "—"],
    ["报备说明", report.remark || "特此报备", true]
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
    "summary": "管理飞手在小程序提交的飞行报备数据，字段与小程序新增报备保持一致，详情按报备信息和飞行计划两大块查看与确认。",
    "operations": [
      "按报备编号、飞手姓名、机型、状态筛选",
      "点击「查看详情」按报备信息、飞行计划两块查看完整内容",
      "待确认报备可在详情页执行「确认报备」",
      "「推送第三方」为预留能力，点击仅提示待对接"
    ],
    "fields": [
      [
      "报备编号",
      "系统提交后自动生成，格式 BB + YYYYMMDD + 3位当日流水；小程序填写时不展示"
      ],
      [
        "委托主体",
        "本次飞行作业的委托单位或委托人"
      ],
      [
        "飞手信息",
        "提交报备的认证飞手姓名和联系方式"
      ],
      [
        "机型",
        "执飞无人机型号"
      ],
      [
        "飞行计划",
        "小程序填写的飞行日期和起止时间"
      ],
      [
        "区域/地点",
        "飞行具体地点，支持填写村、厂区或地标附近等具体位置"
      ],
      [
        "报备时间",
        "飞手在小程序提交报备的时间"
      ],
      [
        "状态",
        "待确认或已确认"
      ],
      [
        "操作",
        "查看报备详情；待确认记录进入详情后可确认报备"
      ]
    ]
  },
  "flight-report-detail": {
    "summary": "查看单条飞行报备的完整内容，并完成确认或第三方推送操作；详情分为报备信息和飞行计划两大块。",
    "operations": [
      "报备信息展示委托主体、飞手信息、设备信息、报备时间、来源和状态",
      "飞行计划展示时间、区域/具体地点、高度、任务性质和报备说明",
      "待确认时可点击「确认报备」标记为已确认",
      "「推送第三方」将飞手及报备信息推送外部系统（原型仅占位，待业务确认）"
    ],
    "fields": [
      [
        "报备编号",
        "系统提交后自动生成，格式 BB + YYYYMMDD + 3位当日流水；小程序填写时不展示"
      ],
      [
        "委托主体",
        "本次报备对应的委托单位或委托人"
      ],
      [
        "飞手信息",
        "提交报备的飞手姓名及联系方式"
      ],
      [
        "设备信息",
        "无人机型号和序列号，和小程序填写口径一致"
      ],
      [
        "飞行计划",
        "飞行日期与起止时间"
      ],
      [
        "区域/具体地点",
        "飞行具体位置，不仅到街道"
      ],
      [
        "高度",
        "计划最大飞行高度，如 120 米"
      ],
      [
        "任务性质",
        "测绘、巡检、航拍等任务类型"
      ],
      [
        "报备说明",
        "固定或补充说明，如“特此报备”"
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
