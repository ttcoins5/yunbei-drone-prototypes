state.viewingTrainingId = "PX26061301";

const trainingRecords = DroneAdmin.data.trainingRecords = [
  {
    "id": "PX26061301",
    "contact": "陈先生",
    "course": "CAAC 执照培训",
    "phone": "138****6612",
    "appliedAt": "2026-06-13 10:26",
    "remark": "希望周末班，有飞行基础",
    "source": "小程序"
  },
  {
    "id": "PX26061216",
    "contact": "刘女士",
    "course": "无人机测绘实训",
    "phone": "186****2931",
    "appliedAt": "2026-06-12 16:02",
    "remark": "—",
    "source": "小程序"
  },
  {
    "id": "PX26061008",
    "contact": "四川航测公司",
    "course": "企业内训",
    "phone": "189****8807",
    "appliedAt": "2026-06-10 09:31",
    "remark": "约 15 人，需上门培训",
    "source": "小程序"
  },
  {
    "id": "PX26060904",
    "contact": "王先生",
    "course": "农业植保培训",
    "phone": "135****2208",
    "appliedAt": "2026-06-09 13:18",
    "remark": "—",
    "source": "小程序"
  },
  {
    "id": "PX26060802",
    "contact": "李女士",
    "course": "CAAC 执照培训",
    "phone": "139****7711",
    "appliedAt": "2026-06-08 15:44",
    "remark": "咨询价格与开班时间",
    "source": "小程序"
  },
  {
    "id": "PX26060706",
    "contact": "成都建工",
    "course": "企业内训",
    "phone": "028-55****90",
    "appliedAt": "2026-06-07 11:02",
    "remark": "需定制测绘方向课程",
    "source": "小程序"
  }
];

function activeTraining() {
  return trainingRecords.find(item => item.id === state.viewingTrainingId) || trainingRecords[0];
}

function trainingPage() {
  const rows = trainingRecords.map(item => [
    item.id, item.contact, item.course, item.phone, item.appliedAt,
    opRoute("查看详情", "training-detail", "", `data-training-id="${item.id}"`)
  ]);
  return panel("报名线索", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="联系人 / 手机号 / 课程">${button("查询","filter","primary")}
  </div>${paginatedTable("training", ["线索编号","联系人","课程意向","手机号","报名时间","操作"], rows)}`);
}

function trainingDetailPage() {
  const item = activeTraining();
  return panel("报名信息", detailGrid([
    ["线索编号", item.id], ["联系人", item.contact], ["课程意向", item.course],
    ["手机号", item.phone], ["报名时间", item.appliedAt],
    ["备注", item.remark || "—", true], ["来源", item.source || "小程序"]
  ]), routeButton("返回列表", "training", ""));
}

DroneAdmin.registerModule({
  id: "training",
  routes: [
  "training",
  "training-detail"
],
  titles: {
  "training": "培训报名线索",
  "training-detail": "培训报名详情"
},
  docs: {
  "training": {
    "summary": "展示小程序用户提交的培训报名表单，后台仅只读查看，无跟进或状态变更操作。",
    "operations": [
      "按联系人、手机号、课程筛选报名记录",
      "点击「查看详情」查看完整报名信息"
    ],
    "fields": [
      [
        "线索编号",
        "报名记录唯一编号"
      ],
      [
        "联系人",
        "报名人姓名或企业联系人"
      ],
      [
        "课程意向",
        "用户感兴趣的课程类型"
      ],
      [
        "手机号",
        "联系方式，脱敏展示"
      ],
      [
        "报名时间",
        "用户在小程序提交报名的时间"
      ],
      [
        "备注",
        "用户填写的补充说明"
      ],
      [
        "来源",
        "表单提交来源，默认小程序"
      ]
    ]
  },
  "training-detail": {
    "summary": "查看单条培训报名表的完整提交内容，只读展示。",
    "operations": [
      "展示用户在小程序填写的全部字段",
      "无编辑、跟进或状态变更功能"
    ],
    "fields": [
      [
        "线索编号",
        "报名记录唯一编号"
      ],
      [
        "联系人",
        "报名人姓名或企业联系人"
      ],
      [
        "课程意向",
        "用户感兴趣的课程类型"
      ],
      [
        "手机号",
        "联系方式，脱敏展示"
      ],
      [
        "报名时间",
        "提交时间"
      ],
      [
        "备注",
        "用户填写的补充说明"
      ],
      [
        "来源",
        "表单提交来源"
      ]
    ]
  }
},
  pages: {
    "training": trainingPage,
    "training-detail": trainingDetailPage
  },
  actions: {},
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.trainingId) state.viewingTrainingId = target.dataset.trainingId;
  },
  onClose: null
});
