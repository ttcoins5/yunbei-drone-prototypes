state.viewingOrderId = "YB26061701";

function orderField(label, type, value, extra = {}) {
  return { label, type, value, ...extra };
}

function orderSnapshot(productName, fields) {
  return {
    templateName: `${productName}需求字段`,
    fields
  };
}

const orderRecords = DroneAdmin.data.orderRecords = [
  {
    "id": "YB26061701",
    "user": "云航科技",
    "service": "无人机巡检服务",
    "amount": "线下报价",
    "needPilot": true,
    "status": "待派单",
    "onlinePay": false,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-19",
      "slot": "09:00-11:00",
      "phone": "189****3016",
      "address": "成都市天府新区科创园",
      "remark": "巡检屋面设备、排水沟和西侧幕墙，完成后需提交 PDF 报告。",
      "remarkPhoto": {
        "name": "巡检范围示意.jpg"
      }
    },
    "requirementSnapshot": orderSnapshot("无人机巡检服务", [
      orderField("登记联系人", "text", "云航科技"),
      orderField("联系电话", "text", "189****3016"),
      orderField("服务类型", "select", "园区巡检"),
      orderField("巡检区域", "text", "成都市天府新区科创园"),
      orderField("巡检时间", "text", "2026-06-19 09:00-11:00"),
      orderField("需求说明", "text", "巡检屋面设备、排水沟和西侧幕墙，完成后需提交 PDF 报告。"),
      orderField("例图", "image", "巡检范围示意.jpg")
    ])
  },
  {
    "id": "YB26061702",
    "user": "华景医院",
    "service": "无人机物流服务",
    "amount": "线下报价",
    "needPilot": true,
    "status": "待派单",
    "onlinePay": false,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-18",
      "slot": "15:00-17:00",
      "phone": "138****6626",
      "address": "成都市高新区华景医院",
      "remark": "医疗样本需冷链运输，期望 2 小时内送达。",
      "remarkPhoto": {
        "name": "冷链箱照片.jpg"
      }
    },
    "requirementSnapshot": orderSnapshot("无人机物流服务", [
      orderField("登记联系人", "text", "华景医院"),
      orderField("联系电话", "text", "138****6626"),
      orderField("客户类型", "select", "医院/园区"),
      orderField("货物类型", "text", "医疗样本"),
      orderField("货物重量", "text", "8kg"),
      orderField("货物体积", "text", "40cm x 30cm x 30cm"),
      orderField("起运点", "text", "华景医院检验科"),
      orderField("详细地址", "text", "成都市高新区华景医院 2 号楼"),
      orderField("目的地", "text", "天府软件园医学中心"),
      orderField("详细地址", "text", "成都市高新区天府软件园 C 区"),
      orderField("运输时效", "select", "加急"),
      orderField("期望运输时间", "text", "2026-06-18 15:00"),
      orderField("货物照片", "image", "冷链箱照片.jpg"),
      orderField("备注说明", "text", "医疗样本需冷链运输，期望 2 小时内送达。"),
      orderField("例图", "image", "起降点示意.jpg")
    ])
  },
  {
    "id": "YB26061703",
    "user": "成都建工",
    "service": "无人机吊运服务",
    "amount": "¥2,320",
    "unitPrice": "¥1,160",
    "quantity": 2,
    "spec": "标准吊运（20-50kg）",
    "paymentStatus": "已支付",
    "paidAt": "2026-06-15 09:32",
    "needPilot": true,
    "status": "待服务",
    "onlinePay": true,
    "assignedPilots": [
      {
        "name": "王伟",
        "area": "成都双流",
        "device": "M350 RTK",
        "status": "待服务"
      }
    ],
    "appointment": {
      "date": "2026-06-18",
      "slot": "14:00-16:00",
      "phone": "028-55****90",
      "address": "成都市天府新区某工地",
      "remark": "空调外机需吊运至 18 层平台，现场有安全员对接。",
      "remarkPhoto": {
        "name": "工地入口.jpg"
      }
    },
    "requirementSnapshot": orderSnapshot("无人机吊运服务", [
      orderField("登记联系人", "text", "成都建工"),
      orderField("联系电话", "text", "028-55****90"),
      orderField("服务规格", "select", "标准吊运（20-50kg）"),
      orderField("下单数量", "text", "2"),
      orderField("吊运物品", "text", "空调外机"),
      orderField("物品重量（kg）", "text", "35"),
      orderField("作业地点", "text", "成都市天府新区某工地"),
      orderField("吊运高度（m）", "text", "54"),
      orderField("需求说明", "text", "空调外机需吊运至 18 层平台，现场有安全员对接。"),
      orderField("例图", "image", "工地入口.jpg")
    ])
  },
  {
    "id": "YB26061704",
    "user": "文旅集团",
    "service": "无人机表演服务",
    "amount": "线下报价",
    "needPilot": true,
    "status": "待派单",
    "onlinePay": false,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-07-01",
      "slot": "19:30-20:00",
      "phone": "139****8801",
      "address": "成都市锦江区音乐广场",
      "remark": "开幕式表演，需预留雨天延期方案。",
      "remarkPhoto": null
    },
    "requirementSnapshot": orderSnapshot("无人机表演服务", [
      orderField("登记联系人", "text", "文旅集团"),
      orderField("联系电话", "text", "139****8801"),
      orderField("表演目的", "text", "开幕式"),
      orderField("表演日期", "text", "2026-07-01"),
      orderField("表演时段", "text", "19:30-20:00"),
      orderField("是否备用雨天/延期日期", "text", "2026-07-02"),
      orderField("表演规模", "select", "300 架以上"),
      orderField("例图", "image", "表演图案参考.jpg")
    ])
  },
  {
    "id": "YB26061710",
    "user": "天府物业",
    "service": "无人机巡检服务",
    "amount": "¥1,680",
    "needPilot": true,
    "status": "已完成",
    "onlinePay": false,
    "assignedPilots": [
      {
        "name": "李明",
        "area": "成都高新",
        "device": "Mavic 3E",
        "status": "已完成",
        "proofs": [
          {
            "photos": ["园区屋面全景.jpg", "排水沟巡检结果.jpg", "设备点位照片.jpg"],
            "time": "2026-06-14 11:28",
            "remark": "园区屋面、排水沟和设备点位已巡检完成，现场照片已回传。"
          }
        ]
      }
    ],
    "appointment": {
      "date": "2026-06-14",
      "slot": "09:00-11:00",
      "phone": "138****2109",
      "address": "成都市高新区云谷园区",
      "remark": "重点查看屋面排水和空调外机区域。",
      "remarkPhoto": {
        "name": "园区点位图.jpg"
      }
    },
    "requirementSnapshot": orderSnapshot("无人机巡检服务", [
      orderField("登记联系人", "text", "天府物业"),
      orderField("联系电话", "text", "138****2109"),
      orderField("服务类型", "select", "园区巡检"),
      orderField("巡检区域", "text", "成都市高新区云谷园区"),
      orderField("巡检时间", "text", "2026-06-14 09:00-11:00"),
      orderField("需求说明", "text", "重点查看屋面排水和空调外机区域。"),
      orderField("例图", "image", "园区点位图.jpg")
    ])
  },
  {
    "id": "YB26061711",
    "user": "青城农业",
    "service": "农田植保飞防",
    "amount": "¥3,600",
    "needPilot": true,
    "status": "已完成",
    "onlinePay": false,
    "assignedPilots": [
      {
        "name": "王伟",
        "area": "成都双流",
        "device": "M350 RTK",
        "status": "已完成",
        "proofs": [
          {
            "photos": ["飞防作业前.jpg", "飞防作业中.jpg"],
            "time": "2026-06-16 10:52",
            "remark": "已完成 120 亩农田飞防作业，现场与客户完成交接。"
          }
        ]
      },
      {
        "name": "赵宇",
        "area": "成都武侯",
        "device": "Mavic 3E",
        "status": "已完成",
        "proofs": [
          {
            "photos": ["作业边界复核.jpg"],
            "time": "2026-06-16 11:05",
            "remark": "已完成作业边界复核和成果照片补充。"
          }
        ]
      }
    ],
    "appointment": {
      "date": "2026-06-16",
      "slot": "07:30-11:00",
      "phone": "139****6708",
      "address": "都江堰市青城镇农业示范田",
      "remark": "需两名飞手协作完成植保飞防。",
      "remarkPhoto": null
    },
    "requirementSnapshot": orderSnapshot("农田植保飞防", [
      orderField("登记联系人", "text", "青城农业"),
      orderField("联系电话", "text", "139****6708"),
      orderField("作业面积", "text", "120 亩"),
      orderField("作业地点", "text", "都江堰市青城镇农业示范田"),
      orderField("服务时间", "text", "2026-06-16 07:30-11:00"),
      orderField("需求说明", "text", "需两名飞手协作完成植保飞防。")
    ])
  },
  {
    "id": "YB26061712",
    "user": "滨江城投",
    "service": "桥梁巡检服务",
    "amount": "线下报价",
    "needPilot": true,
    "status": "已完成",
    "onlinePay": false,
    "assignedPilots": [
      {
        "name": "周航",
        "area": "成都双流",
        "device": "M350 RTK",
        "status": "已完成",
        "proofs": [
          {
            "photos": ["桥面巡检完成.jpg", "墩柱照片.jpg", "裂缝点位复核.jpg"],
            "time": "2026-06-18 12:18",
            "remark": "桥面、墩柱和疑似裂缝点位已完成拍摄，原始素材已交付。"
          }
        ]
      }
    ],
    "appointment": {
      "date": "2026-06-18",
      "slot": "08:30-12:00",
      "phone": "028-66****18",
      "address": "成都市双流区滨江大桥",
      "remark": "重点采集桥梁底部与墩柱影像。",
      "remarkPhoto": {
        "name": "桥梁巡检范围.jpg"
      }
    },
    "requirementSnapshot": orderSnapshot("桥梁巡检服务", [
      orderField("登记联系人", "text", "滨江城投"),
      orderField("联系电话", "text", "028-66****18"),
      orderField("巡检对象", "text", "滨江大桥"),
      orderField("作业地点", "text", "成都市双流区滨江大桥"),
      orderField("服务时间", "text", "2026-06-18 08:30-12:00"),
      orderField("需求说明", "text", "重点采集桥梁底部与墩柱影像。"),
      orderField("例图", "image", "桥梁巡检范围.jpg")
    ])
  },
  {
    "id": "YB26061705",
    "user": "赵女士",
    "service": "无人机托管服务",
    "amount": "线下报价",
    "priceChangeLogs": [],
    "needPilot": false,
    "status": "待交付",
    "onlinePay": false,
    "assignedPilots": [],
    "deliveryProofs": [],
    "appointment": {
      "date": "2026-06-20",
      "slot": "10:00-11:30",
      "phone": "136****1175",
      "address": "成都市双流区低空服务中心",
      "remark": "两台行业机托管 3 个月，需要定期电池保养。",
      "remarkPhoto": null
    },
    "requirementSnapshot": orderSnapshot("无人机托管服务", [
      orderField("登记联系人", "text", "赵女士"),
      orderField("联系电话", "text", "136****1175"),
      orderField("无人机型号", "text", "M30T"),
      orderField("托管数量", "text", "2 台"),
      orderField("托管时长", "select", "3 个月"),
      orderField("需求说明", "text", "两台行业机托管 3 个月，需要定期电池保养。"),
      orderField("例图", "image", "设备照片.jpg")
    ])
  },
  {
    "id": "YB26061706",
    "user": "周老师",
    "service": "无人机租赁",
    "amount": "线下报价",
    "needPilot": false,
    "status": "待交付",
    "onlinePay": false,
    "assignedPilots": [],
    "deliveryProofs": [],
    "appointment": {
      "date": "2026-06-21",
      "slot": "09:30-10:30",
      "phone": "137****5520",
      "address": "苏州市吴江区东太湖路 88 号",
      "remark": "研学活动租赁 1 周，需附带双电池与充电器。",
      "remarkPhoto": {
        "name": "活动场地.jpg"
      }
    },
    "requirementSnapshot": orderSnapshot("无人机租赁", [
      orderField("登记联系人", "text", "周老师"),
      orderField("联系电话", "text", "137****5520"),
      orderField("租赁机型", "select", "行业巡检机"),
      orderField("租赁周期", "select", "1 周"),
      orderField("使用场景", "text", "研学活动飞行展示"),
      orderField("期望开始日期", "text", "2026-06-21"),
      orderField("需求说明", "text", "需附带双电池与充电器。"),
      orderField("例图", "image", "活动场地.jpg")
    ])
  },
  {
    "id": "YB26061707",
    "user": "成都航协",
    "service": "无人机赛事",
    "amount": "线下报价",
    "needPilot": false,
    "status": "待评价",
    "onlinePay": false,
    "assignedPilots": [],
    "deliveryProofs": [
      {
        "type": "后台交付凭证",
        "name": "赛事资料交付确认单.pdf",
        "operator": "平台管理员",
        "time": "2026-06-17 16:20",
        "remark": "参赛资料与确认名单已交付客户确认"
      }
    ],
    "requirementSnapshot": orderSnapshot("无人机赛事", [
      orderField("注册类型", "select", "单位"),
      orderField("单位名称", "text", "成都航协"),
      orderField("姓名", "text", "唐先生"),
      orderField("性别", "select", "男"),
      orderField("证件号", "text", "5101**********26"),
      orderField("组别", "select", "团体组"),
      orderField("联系电话", "text", "138****2198"),
      orderField("电子邮箱", "text", "event@example.com"),
      orderField("备注", "text", "团队报名 6 人，需确认参赛资料。")
    ])
  },
  {
    "id": "YB26061708",
    "user": "李同学",
    "service": "飞手培训",
    "amount": "线下报价",
    "needPilot": false,
    "status": "已完成",
    "onlinePay": false,
    "assignedPilots": [],
    "deliveryProofs": [
      {
        "type": "后台交付凭证",
        "name": "培训排课确认截图.png",
        "operator": "平台管理员",
        "time": "2026-06-12 15:30",
        "remark": "课程安排和学习资料已发送"
      }
    ],
    "requirementSnapshot": orderSnapshot("飞手培训", [
      orderField("姓名", "text", "李同学"),
      orderField("联系电话", "text", "135****8910"),
      orderField("性别", "select", "男"),
      orderField("出生日期", "text", "2001-08-18"),
      orderField("身份证号", "text", "5101**********18"),
      orderField("考试机型", "select", "多旋翼"),
      orderField("证照级别", "select", "视距内"),
      orderField("有无基础", "select", "无基础"),
      orderField("需求说明", "text", "周末班，期望 7 月开课。"),
      orderField("例图", "image", "证件照.jpg")
    ])
  },
  {
    "id": "YB26061709",
    "user": "王女士",
    "service": "少儿培训",
    "amount": "线下报价",
    "needPilot": false,
    "status": "已完成",
    "onlinePay": false,
    "assignedPilots": [],
    "deliveryProofs": [
      {
        "type": "后台交付凭证",
        "name": "试听课确认单.pdf",
        "operator": "平台管理员",
        "time": "2026-06-10 17:10",
        "remark": "试听安排已完成并回访确认"
      }
    ],
    "requirementSnapshot": orderSnapshot("少儿培训", [
      orderField("姓名", "text", "王小雨"),
      orderField("性别", "select", "女"),
      orderField("年龄", "text", "10"),
      orderField("在读年级", "text", "四年级"),
      orderField("家长姓名", "text", "王女士"),
      orderField("家长手机号", "text", "136****1175"),
      orderField("有无无人机基础", "select", "无"),
      orderField("感兴趣方向", "select", "飞行体验"),
      orderField("上课时间", "text", "周六上午"),
      orderField("报名意向", "select", "试听")
    ])
  }
];

function activeOrder() {
  return orderRecords.find(item => item.id === state.viewingOrderId) || orderRecords[0];
}

function formatOrderAppointmentBrief(order) {
  if (!order.appointment) return "—";
  const { date, slot } = order.appointment;
  return [date, slot].filter(Boolean).join(" ");
}

function orderRemarkPhoto(order) {
  const photo = order.appointment?.remarkPhoto;
  if (!photo) return `<span class="muted">无</span>`;
  return `<button type="button" class="order-remark-photo" data-action="preview-order-remark-photo" data-order-id="${order.id}">
    <span class="thumb lg"><span class="thumb-img">图</span></span>
    <span class="muted">${photo.name}</span>
  </button>`;
}

function orderRequirementPanel(order) {
  const snapshot = order.requirementSnapshot;
  if (!snapshot?.fields?.length) return "";
  return panel("需求信息快照", `<p class="muted" style="margin:0 0 12px">模板：${snapshot.templateName || "未命名模板"}。以下内容为下单时保存的 JSON 快照，商品字段后续修改不影响本单。</p>${detailGrid(
    snapshot.fields.map(field => [
      field.label,
      `${field.value || "—"}${field.unit ? ` ${field.unit}` : ""}`,
      field.type === "textarea" || field.type === "image" || String(field.value || "").length > 18
    ])
  )}`);
}

function orderProofRows(order) {
  const proofFileNames = item => item.photos?.length ? item.photos.join("、") : item.name || "—";
  const deliveryRows = (order.deliveryProofs || []).map(item => [
    item.type || "后台交付凭证",
    proofFileNames(item),
    item.operator || "平台管理员",
    item.time || "—",
    item.remark || "—"
  ]);
  const pilotRows = (order.assignedPilots || []).flatMap(pilot => (pilot.proofs || []).map(item => [
    `飞手完成凭证（${pilot.name}）`,
    proofFileNames(item),
    pilot.name,
    item.time || "—",
    item.remark || "—"
  ]));
  return [...deliveryRows, ...pilotRows];
}

function pilotStatusCell(order, pilot) {
  const proofCount = pilot.proofs?.length || 0;
  const detail = pilot.status === "已完成" && proofCount
    ? button("完成详情", "pilot-proof-detail", "small", `data-order-id="${order.id}" data-pilot-name="${pilot.name}"`)
    : "";
  return `<div class="row-actions" style="justify-content:flex-start">${tag(pilot.status)}${detail}</div>`;
}

function pilotAssignmentPanel(order, pilots, action) {
  return panel("飞手分配与履约", pilots, action);
}

function shouldShowOrderProofPanel(order) {
  return !order.needPilot && (orderProofRows(order).length > 0 || ["待交付", "待评价", "已完成"].includes(order.status));
}

function orderProofPanel(order) {
  const rows = orderProofRows(order);
  const content = rows.length
    ? table(["凭证类型","照片/文件","提交人","提交时间","交付说明"], rows)
    : `<p class="empty">暂无交付或飞手完成凭证。待交付订单需后台上传交付凭证，飞手完成服务需上传 1-3 张交付照片；凭证仅在后台订单详情查看。</p>`;
  return panel("交付/完成凭证", content);
}

function getOrderFlow(order) {
  const steps = ["订单生成"];
  if (order.onlinePay) steps.push("待付款");
  if (order.needPilot) steps.push("待派单", "待服务");
  else steps.push("待交付");
  steps.push("待评价", "已完成");
  return steps;
}

function orderFlowSummary(order) {
  return getOrderFlow(order).join(" → ");
}

function statusTag(text) {
  const map = {
    "待付款": "amber",
    "待派单": "red",
    "待服务": "blue",
    "待交付": "blue",
    "待评价": "amber",
    "已完成": "green"
  };
  if (map[text]) return `<span class="tag ${map[text]}">${text}</span>`;
  return tag(text);
}

function orderStatusTag(order) {
  return statusTag(order.status);
}

function orderStatusCell(order) {
  return `<span title="本单流转：${orderFlowSummary(order)}">${statusTag(order.status)}</span>`;
}

function orderListActions(order) {
  const canEditPrice = order.amount === "线下报价" || order.onlinePay === false;
  const canAssign = canReassignOrderPilot(order);
  const price = button("改价", "edit-order-price", "small", `data-order-id="${order.id}"${canEditPrice ? "" : " disabled"}`);
  const assignText = order.assignedPilots?.length ? "调飞手" : "去派单";
  const middle = order.status === "待交付"
    ? button("交付", "deliver-order", "small primary", `data-order-id="${order.id}"`)
    : button(assignText, "assign-pilots", "small primary", `data-order-id="${order.id}"${canAssign ? "" : " disabled"}`);
  const detail = `<button class="button small" data-route="order-detail" data-order-id="${order.id}">查看详情</button>`;
  return `<div class="row-actions order-row-actions">
    <span class="row-action-slot">${price}</span>
    <span class="row-action-slot">${middle}</span>
    <span class="row-action-slot">${detail}</span>
  </div>`;
}

function canReassignOrderPilot(order) {
  return order.needPilot && order.status !== "已完成";
}

function orderSteps(order) {
  const flow = getOrderFlow(order);
  const current = Math.max(0, flow.indexOf(order.status));
  return flow.map((label, index) => {
    let cls = "step";
    if (index < current) cls += " done";
    else if (index === current) cls += " active";
    return `<div class="${cls}">${label}</div>`;
  }).join("");
}

function ordersPage() {
  const rows = orderRecords.map(item => [
    item.id, item.user, item.service, item.amount, item.needPilot ? "需要" : "不需要",
    orderStatusCell(item), orderListActions(item)
  ]);
  return panel("订单列表", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="订单号 / 用户 / 商品"><select><option>全部状态</option><option>待付款</option><option>待派单</option><option>待服务</option><option>待交付</option><option>待评价</option><option>已完成</option></select>
    <select><option>是否需要飞手</option><option>需要</option><option>不需要</option></select>${button("查询","filter","primary")}
  </div>${paginatedTable("orders", ["订单号","用户","商品/服务","金额","需要飞手","状态","操作"], rows, "orders-table")}`);
}

function orderDetailPage() {
  const order = activeOrder();
  const canEditPrice = order.amount === "线下报价" || order.onlinePay === false;
  const canAssignPilot = canReassignOrderPilot(order);
  const priceAction = canEditPrice ? button("修改金额", "edit-order-price", "small primary", `data-order-id="${order.id}"`) : "";
  const deliveryAction = order.status === "待交付" ? button("交付", "deliver-order", "small primary", `data-order-id="${order.id}"`) : "";
  const pilotAction = canAssignPilot
    ? (order.assignedPilots?.length ? button("重新指派", "assign-pilots", "small") : button("分配飞手", "assign-pilots", "primary"))
    : "";
  const pilots = order.assignedPilots.length
    ? table(["飞手","区域","设备","个人状态"], order.assignedPilots.map(p => [p.name, p.area, p.device, pilotStatusCell(order, p)]))
    : `<p class="empty">尚未分配飞手</p>`;
  const pilotPanel = order.needPilot
    ? pilotAssignmentPanel(order, pilots, pilotAction)
    : "";
  const logs = order.priceChangeLogs?.length
    ? table(["操作时间","操作人","原金额","新金额","改价原因"], order.priceChangeLogs.map(item => [item.time, item.operator || "平台管理员", item.oldAmount, item.newAmount, item.reason]))
    : `<p class="empty">暂无改价记录。线下报价订单确认金额后会在这里留痕。</p>`;
  const paymentPanel = order.onlinePay
    ? panel("支付信息快照", detailGrid([
        ["支付方式", "在线支付"],
        ["支付状态", order.paymentStatus || "待付款"],
        ["规格", order.spec || "—"],
        ["单价", order.unitPrice || order.amount],
        ["数量", order.quantity || 1],
        ["支付时间", order.paidAt || "未支付"]
      ]))
    : "";
  const proofPanel = shouldShowOrderProofPanel(order) ? orderProofPanel(order) : "";
  return panel("订单状态", `<div class="steps steps--flow">${orderSteps(order)}</div>
    <p class="muted order-flow-summary">本单流转：${orderFlowSummary(order)}</p>`, routeButton("返回订单列表","orders","") + deliveryAction)
  + panel("订单信息快照", detailGrid([
    ["订单号", order.id], ["用户", order.user], ["商品/服务", order.service], ["订单金额", order.amount],
    ["在线支付", order.onlinePay ? "是（下单快照）" : "否（下单快照）"],
    ["需要飞手", order.needPilot ? "是（下单快照）" : "否（下单快照）"]
  ]), priceAction)
  + paymentPanel
  + orderRequirementPanel(order)
  + pilotPanel
  + proofPanel
  + panel("改价记录", logs);
}

DroneAdmin.registerModule({
  id: "orders",
  routes: [
  "orders",
  "order-detail"
],
  titles: {
  "orders": "订单列表",
  "order-detail": "订单详情与派单"
},
  docs: {
  "orders": {
    "summary": "查看与管理全部商品订单。列表「状态」为当前节点；完整流转路径因下单快照（在线支付 / 飞手服务）不同而不同。",
    "operations": [
      "按订单号、用户、商品、状态、是否需要飞手筛选",
      "列表状态列 hover 可查看该单完整流转路径",
      "状态颜色：待付款/待评价=橙色，待派单=红色（需管理员操作），待服务/待交付=蓝色，已完成=绿色",
      "需飞手且待派单的订单，列表显示「去派单」，点击直接弹窗指派飞手（与详情「分配飞手」同一逻辑）",
      "无需飞手且状态为待交付的订单，列表显示「交付」；上传交付凭证后进入待评价",
      "线下报价订单显示「改价」，填写金额和原因后形成改价记录",
      "点击「查看详情」进入订单详情，顶部步骤条展示动态流转进度",
      "待服务阶段在详情页「调整飞手」修改名单，状态不变",
      "不需要飞手的订单在「交付/完成凭证」面板展示后台交付凭证；需要飞手的订单在「飞手分配与履约」中，于已完成状态旁点击「完成详情」查看交付照片和交付说明"
    ],
    "fields": [
      [
        "订单号",
        "系统唯一订单编号"
      ],
      [
        "用户",
        "下单用户昵称或企业名"
      ],
      [
        "商品/服务",
        "所购商品名称"
      ],
      [
        "金额",
        "订单应付金额；线下报价订单可改价，线上已支付订单不可改"
      ],
      [
        "需要飞手",
        "下单时快照，表示是否需分配飞手"
      ],
      [
        "状态",
        "当前流转节点；待派单为红色待办；合法值因快照组合而异，见订单详情说明"
      ],
      [
        "操作",
        "线下报价订单可改价；待交付订单可交付并上传凭证；需飞手且订单未完成前可派单或重新指派；所有订单均可查看详情"
      ],
      [
        "流转路径（在线支付+飞手）",
        "订单生成 → 待付款 → 待派单 → 待服务 → 待评价 → 已完成"
      ],
      [
        "流转路径（在线支付+无飞手）",
        "订单生成 → 待付款 → 待交付 → 待评价 → 已完成"
      ],
      [
        "流转路径（非在线支付+飞手）",
        "订单生成 → 待派单 → 待服务 → 待评价 → 已完成"
      ],
      [
        "流转路径（非在线支付+无飞手）",
        "订单生成 → 待交付 → 待评价 → 已完成"
      ],
      [
        "需求信息快照",
        "用户下单时按后台表单配置提交的联系人、联系方式和服务需求字段"
      ]
    ]
  },
  "order-detail": {
    "summary": "查看单笔订单动态流转、信息快照、需求信息快照及飞手分配情况。",
    "operations": [
      "顶部步骤条按下单快照（在线支付 / 飞手服务）动态生成，非固定 5 步",
      "步骤条下方展示本单完整流转路径摘要",
      "「订单信息快照」展示金额与业务属性（下单时保存，不可改）",
      "线下报价订单详情可点击「修改金额」，需填写新金额和改价原因，保存后生成留痕记录",
      "订单详情展示「需求信息快照」，字段来自下单时的商品表单配置",
      "需飞手服务时只展示「飞手分配与履约」面板：待派单显示「分配飞手」，待服务显示「调整飞手」，已完成状态旁显示「完成详情」弹窗入口",
      "列表「去派单」与详情「分配飞手」为同一指派弹窗；调整飞手仅改名单，不改变订单状态",
      "无需飞手时跳过派单节点，使用「待交付」并隐藏飞手面板",
      "待交付订单点击「交付」上传交付凭证，确认后进入待评价",
      "飞手端完成服务前需上传 1-3 张交付照片并填写交付说明；照片和说明只通过后台「完成详情」弹窗查看，用户端和飞手端详情不展示凭证列表"
    ],
    "fields": [
      [
        "订单状态步骤条",
        "按在线支付、飞手服务组合生成 4～6 个节点，高亮当前状态"
      ],
      [
        "订单信息快照",
        "订单号、用户、商品、金额、在线支付、飞手需求（均为下单快照）"
      ],
      [
        "改价记录",
        "记录改价操作时间、操作人、原金额、新金额和改价原因"
      ],
      [
        "原金额",
        "改价前的订单金额，线下报价订单可为「线下报价」"
      ],
      [
        "新金额",
        "本次改价后的订单金额"
      ],
      [
        "改价原因",
        "后台改价时必填，解释价格调整原因"
      ],
      [
        "需求信息快照",
        "默认包含联系人、联系方式；其他字段由后台商品表单配置决定"
      ],
      [
        "待交付",
        "无需飞手时的履约节点，后台上传交付凭证后进入待评价"
      ],
      [
        "交付/完成凭证",
        "仅不需要飞手的订单单独展示该面板；需要飞手的订单通过飞手状态旁「完成详情」弹窗查看照片和说明"
      ],
      [
        "飞手分配",
        "仅需要飞手时展示；已指派飞手、个人履约状态，以及已完成状态旁的完成详情弹窗入口"
      ],
      [
        "区域",
        "已指派飞手的主要服务区域"
      ],
      [
        "设备",
        "已指派飞手的执飞机型或设备"
      ],
      [
        "个人状态",
        "该飞手在当前订单下的接单或履约状态"
      ],
      [
        "重新指派",
        "订单未完成前可调整飞手名单；调整名单不改变当前订单状态"
      ],
      [
        "操作人",
        "改价记录中的后台操作账号，随原金额、新金额和原因一并留痕"
      ]
    ]
  }
},
  pages: {
    "orders": ordersPage,
    "order-detail": orderDetailPage
  },
  actions: {
    "edit-order-price": function (target) {
      if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
      const order = activeOrder();
      if (!(order.amount === "线下报价" || order.onlinePay === false)) {
        toast("仅线下报价订单可改价");
        return;
      }
      modal("订单改价", `<div class="price-change-form el-form">
        <label><span>订单号</span><input value="${order.id}" readonly></label>
        <label><span>当前金额</span><input value="${order.amount}" readonly></label>
        <label><span>新金额</span><input name="newAmount" value="${order.amount.replace(/[^\d.]/g, "") || ""}" placeholder="请输入新金额"></label>
        <label><span>改价原因</span><textarea name="priceReason" placeholder="请输入改价原因">客户需求变更，重新核算服务报价</textarea></label>
      </div><p class="price-change-tip">仅线下报价订单可改价，保存后自动记录时间、操作人、原金额、新金额和原因。</p>`,
      `${button("取消","close-modal")}${button("确认改价","confirm-price-change","primary")}`, true);
    },
    "confirm-price-change": function (target) {
      const order = activeOrder();
      if (!(order.amount === "线下报价" || order.onlinePay === false)) {
        toast("仅线下报价订单可改价");
        return;
      }
      const newAmountInput = document.querySelector("input[name='newAmount']");
      const reasonInput = document.querySelector("textarea[name='priceReason']");
      const numeric = Number(newAmountInput?.value);
      if (!Number.isFinite(numeric) || numeric <= 0) {
        toast("请输入有效的新金额");
        return;
      }
      const oldAmount = order.amount;
      const newAmount = `¥${numeric.toLocaleString()}`;
      order.amount = newAmount;
      order.priceChangeLogs = [
        {
          time: new Date().toLocaleString("zh-CN", { hour12: false }),
          operator: "平台管理员",
          oldAmount,
          newAmount,
          reason: reasonInput?.value?.trim() || "未填写"
        },
        ...(order.priceChangeLogs || [])
      ];
      closeModal();
      render();
      toast("订单金额已修改并留痕");
    },
    "assign-pilots": function (target) {
      if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
          const order = activeOrder();
          const modalTitle = order.assignedPilots?.length ? "重新指派飞手" : "分配飞手";
          const pilots = [
            ["李明","成都高新 · Mavic 3E","空闲",true],["王伟","成都双流 · M350 RTK","空闲",true],
            ["周航","成都双流 · M350 RTK","服务中",false],["赵宇","成都武侯 · Mavic 3E","空闲",false]
          ];
          modal(modalTitle, `<p class="muted">可选择一个或多个审核通过的飞手。确认后立即生效，无需飞手再次确认。</p>
            ${pilots.map(p => `<label class="pilot-option"><input type="checkbox" name="pilot" value="${p[0]}" ${p[3] ? "checked" : ""}>
              <span><strong>${p[0]}</strong><br><span class="muted">${p[1]}</span></span>${tag(p[2])}</label>`).join("")}`,
            `${button("取消","close-modal")}${button("确认分配","confirm-assignment","primary")}`, true);
    },
    "confirm-assignment": function (target) {
      const order = activeOrder();
          if (!order.needPilot) return;
          const selected = [...document.querySelectorAll("input[name='pilot']:checked")].map(x => x.value);
          if (!selected.length) {
            toast("请至少选择一名飞手");
            return;
          }
          const wasPending = order.status === "待派单";
          order.assignedPilots = selected.map((name, index) => ({
            name, area: index ? "成都双流" : "成都高新", device: index ? "M350 RTK" : "Mavic 3E", status: "待服务"
          }));
          if (wasPending) order.status = "待服务";
          closeModal();
          render();
          toast(wasPending ? `已分配 ${selected.length} 名飞手，订单进入待服务` : `已更新飞手名单（${selected.length} 名）`);
    },
    "deliver-order": function (target) {
      if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
      const order = activeOrder();
      if (order.status !== "待交付") {
        toast("仅待交付订单可执行交付");
        return;
      }
      modal("订单交付", `<div class="price-change-form el-form">
        <label><span>交付凭证</span><input name="deliveryProofFile" type="file"></label>
        <label><span>交付说明</span><textarea name="deliveryRemark" placeholder="请输入交付说明">已按订单需求完成交付，凭证仅在后台订单详情留存。</textarea></label>
      </div><p class="price-change-tip">待交付订单需上传交付凭证后才能进入待评价；凭证不在用户端或飞手端展示。</p>`,
      `${button("取消","close-modal")}${button("确认交付","confirm-order-delivery","primary")}`, true);
    },
    "confirm-order-delivery": function (target) {
      const order = activeOrder();
      if (order.status !== "待交付") {
        toast("仅待交付订单可执行交付");
        return;
      }
      const fileInput = document.querySelector("input[name='deliveryProofFile']");
      const remarkInput = document.querySelector("textarea[name='deliveryRemark']");
      const fileName = fileInput?.files?.[0]?.name;
      if (!fileName) {
        toast("请上传交付凭证");
        return;
      }
      order.deliveryProofs = [
        {
          type: "后台交付凭证",
          name: fileName,
          operator: "平台管理员",
          time: new Date().toLocaleString("zh-CN", { hour12: false }),
          remark: remarkInput?.value?.trim() || "已完成交付"
        },
        ...(order.deliveryProofs || [])
      ];
      order.status = "待评价";
      closeModal();
      render();
      toast("交付凭证已保存，订单进入待评价");
    },
    "preview-order-remark-photo": function (target) {
      const order = orderRecords.find(item => item.id === target.dataset.orderId) || activeOrder();
          const photo = order.appointment?.remarkPhoto;
          if (!photo) return;
          modal("备注照片", `<div class="order-remark-preview">
            <span class="thumb order-remark-preview-img"><span class="thumb-img">备注图</span></span>
            <p class="muted">${photo.name}</p>
          </div>`, button("关闭", "close-modal"));
    },
    "pilot-proof-detail": function (target) {
      if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
      const order = activeOrder();
      const pilot = (order.assignedPilots || []).find(item => item.name === target.dataset.pilotName);
      const proofs = pilot?.proofs || [];
      if (!pilot || !proofs.length) {
        toast("暂无完成详情");
        return;
      }
      const rows = proofs.map(item => [
        item.photos?.length ? item.photos.join("、") : item.name || "—",
        item.time || "—",
        item.remark || "—"
      ]);
      modal(`${pilot.name}完成详情`, table(["交付照片","提交时间","交付说明"], rows), button("关闭", "close-modal"));
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
  },
  onClose: null
});
