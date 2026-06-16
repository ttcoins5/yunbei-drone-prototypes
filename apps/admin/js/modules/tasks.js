state.viewingTaskId = "RW26061301";

const taskRecords = DroneAdmin.data.taskRecords = [
  {
    "id": "RW26061301",
    "title": "成都园区航拍需求",
    "serviceTime": "2026-06-18 09:00-12:00",
    "address": "成都市高新区天府软件园 B 区",
    "remark": "需携带 RTK 设备，现场有门禁",
    "description": "<p>独立发布需求并收集飞手参与意愿，不关联商品订单。</p><ul><li>航拍范围约 2 平方公里</li><li>需提交初步成果样片</li><li>作业高度不超过 120 米</li></ul>",
    "status": "征集中",
    "interest": 6
  },
  {
    "id": "RW26061003",
    "title": "农田植保飞防协作",
    "serviceTime": "2026-06-20 07:00-11:30",
    "address": "眉山市东坡区某农业示范园",
    "remark": "提供统一药剂，飞手自备植保机",
    "description": "<p>协助当地合作社完成<strong>300 亩</strong>水稻飞防作业。</p><p>要求飞手具备植保作业经验，服从现场调度。</p>",
    "status": "征集中",
    "interest": 12
  },
  {
    "id": "RW26060508",
    "title": "活动现场航拍",
    "serviceTime": "2026-06-08 14:00-18:00",
    "address": "成都市锦江区春熙路商圈",
    "remark": "—",
    "description": "<p>商业活动开幕航拍，需 1 名飞手配合地面导演完成指定机位拍摄。</p>",
    "status": "已关闭",
    "interest": 4
  },
  {
    "id": "RW26060402",
    "title": "桥梁巡检协助",
    "serviceTime": "2026-06-22 08:30-12:00",
    "address": "成都市双流区跨江大桥南段",
    "remark": "需超视距执照，风力大于 5 级暂停作业",
    "description": "<p>协助工程单位采集桥梁底部与墩柱影像资料。</p><ul><li>重点拍摄 3 处疑似裂缝位置</li><li>成果需按模板整理</li></ul>",
    "status": "征集中",
    "interest": 8
  },
  {
    "id": "RW26060305",
    "title": "电力线路初勘",
    "serviceTime": "2026-06-25 06:30-10:30",
    "address": "德阳市旌阳区 110kV 线路走廊",
    "remark": "需提前报备飞行计划",
    "description": "<p>对新建线路走廊进行航拍初勘，输出正射与视频素材。</p>",
    "status": "征集中",
    "interest": 5
  },
  {
    "id": "RW26060201",
    "title": "景区宣传拍摄",
    "serviceTime": "2026-06-05 15:00-17:30",
    "address": "乐山市市中区某景区入口",
    "remark": "—",
    "description": "<p>景区夏季宣传短片航拍素材采集，需配合景区开放时间作业。</p>",
    "status": "已关闭",
    "interest": 3
  }
];

function activeTask() {
  return taskRecords.find(item => item.id === state.viewingTaskId) || taskRecords[0];
}

function initTaskDescriptionViewer() {
  const task = activeTask();
  initRichEditor({
    toolbarId: "task-description-toolbar",
    editorId: "task-description-editor",
    html: task.description || "<p>—</p>",
    readOnly: true,
    placeholder: "暂无附文本说明"
  });
}

function tasksPage() {
  const rows = taskRecords.map(item => [
    item.id, item.title, item.serviceTime, item.address, tag(item.status), item.interest,
    taskListActions(item)
  ]);
  return panel("任务需求", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="需求标题 / 地址"><select><option>全部状态</option><option>征集中</option><option>已关闭</option></select>${button("查询","filter","primary")}
    <span class="spacer"></span>${button("发布任务需求","publish-task","primary")}
  </div>${paginatedTable("tasks", ["需求编号","标题","服务时间","地址","状态","意愿人数","操作"], rows)}
  <p class="muted" style="margin:14px 0 0">任务需求仅收集飞手参与意愿，不关联商品订单，也不改变商品订单状态。</p>`);
}

function taskListActions(task) {
  const detail = `<button class="button small" data-route="task-detail" data-task-id="${task.id}">查看详情</button>`;
  const interest = button("查看意愿", "task-interest", "small");
  return `<div class="row-actions">${detail}${interest}</div>`;
}

function taskDetailPage() {
  const task = activeTask();
  return panel("任务信息", detailGrid([
    ["需求编号", task.id], ["标题", task.title], ["服务时间", task.serviceTime],
    ["地址", task.address, true], ["备注", task.remark || "—", true], ["状态", tag(task.status)]
  ]), routeButton("返回列表", "tasks", ""))
  + panel("附文本说明", richEditorContainer({
    toolbarId: "task-description-toolbar",
    editorId: "task-description-editor",
    readOnly: true
  }));
}

DroneAdmin.registerModule({
  id: "tasks",
  routes: [
  "tasks",
  "task-detail"
],
  titles: {
  "tasks": "任务需求与意愿",
  "task-detail": "任务详情"
},
  docs: {
  "tasks": {
    "summary": "发布独立任务需求，收集飞手参与意愿，不关联商品订单。",
    "operations": [
      "点击「发布任务需求」填写标题、服务时间、地址、备注与附文本说明",
      "点击「查看详情」查看任务完整展示内容",
      "点击「查看意愿」查看已提交参与的飞手名单",
      "任务可关闭征集；关闭后不再接受新意愿"
    ],
    "fields": [
      [
        "需求编号",
        "任务唯一编号"
      ],
      [
        "标题",
        "任务名称，面向飞手展示"
      ],
      [
        "服务时间",
        "计划服务日期与时段"
      ],
      [
        "地址",
        "任务执行地址"
      ],
      [
        "备注",
        "补充说明，如设备或现场要求"
      ],
      [
        "附文本说明",
        "富文本任务详情，面向飞手展示"
      ],
      [
        "状态",
        "征集中或已关闭"
      ],
      [
        "意愿人数",
        "已表达参与意向的飞手数量"
      ]
    ]
  },
  "task-detail": {
    "summary": "查看单个任务需求的完整展示内容。",
    "operations": [
      "展示标题、服务时间、地址、备注与附文本说明",
      "附文本说明以富文本形式只读展示",
      "点击「返回列表」回到任务需求列表"
    ],
    "fields": [
      [
        "需求编号",
        "任务唯一编号"
      ],
      [
        "标题",
        "任务名称"
      ],
      [
        "服务时间",
        "计划服务日期与时段"
      ],
      [
        "地址",
        "任务执行地址"
      ],
      [
        "备注",
        "补充说明"
      ],
      [
        "附文本说明",
        "富文本任务详情"
      ],
      [
        "状态",
        "征集中或已关闭"
      ]
    ]
  }
},
  pages: {
    "tasks": tasksPage,
    "task-detail": taskDetailPage
  },
  actions: {
    "publish-task": function (target) {
      modal("发布独立任务需求", `${formGrid([
            { label: "标题", wide: true, html: `<input value="成都园区航拍需求">` },
            { label: "服务时间", html: `<input value="2026-06-18 09:00-12:00" placeholder="如 2026-06-18 09:00-12:00">` },
            { label: "地址", wide: true, html: `<input value="成都市高新区天府软件园 B 区">` },
            { label: "备注", wide: true, html: `<textarea placeholder="补充说明，如设备或现场要求">需携带 RTK 设备，现场有门禁</textarea>` }
          ])}<div class="form-field span-2"><label>附文本说明</label>${richEditorContainer({
            toolbarId: "task-publish-toolbar",
            editorId: "task-publish-editor"
          })}</div>`, `${button("取消","close-modal")}${button("发布需求","save-modal","primary")}`, true);
          requestAnimationFrame(() => initRichEditor({
            toolbarId: "task-publish-toolbar",
            editorId: "task-publish-editor",
            html: "<p>独立发布需求并收集飞手参与意愿，不关联商品订单。</p>",
            placeholder: "请输入附文本说明..."
          }));
    },
    "task-interest": function (target) {
      modal("飞手参与意愿名单", table(["飞手","主体","区域","设备","提交时间"], [
            ["李明","公司","成都高新","Mavic 3E","2026-06-13 16:20"],
            ["王伟","个人","成都双流","M350 RTK","2026-06-13 15:48"],
            ["赵宇","个人","成都武侯","Mavic 3E","2026-06-13 13:06"]
          ]), button("关闭","close-modal"));
    },
    "save-modal": function (target) {
      closeModal();
          toast("操作已保存（模拟）");
    }
  },
  changeActions: {},
  afterRender: {
    "task-detail": initTaskDescriptionViewer
  },
  beforeNavigate: function (target) {
    if (target.dataset.taskId) state.viewingTaskId = target.dataset.taskId;
  },
  onClose: null
});
