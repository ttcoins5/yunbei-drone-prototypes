state.viewingOrderId = "YB26061318";

const orderRecords = DroneAdmin.data.orderRecords = [
  {
    "id": "YB26061326",
    "user": "林先生",
    "service": "高空清洗服务",
    "amount": "¥1,599",
    "needPilot": true,
    "needAppointment": true,
    "status": "待派单",
    "onlinePay": true,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-14",
      "slot": "09:00-11:00",
      "phone": "139****5528",
      "address": "成都市武侯区某园区 3 号楼",
      "remark": "重点清洗北侧玻璃幕墙，现场有停车位。",
      "remarkPhoto": {
        "name": "北侧外立面.jpg"
      }
    }
  },
  {
    "id": "YB26061318",
    "user": "华景物业",
    "service": "园区航拍测绘",
    "amount": "¥3,600",
    "needPilot": true,
    "needAppointment": true,
    "status": "待派单",
    "onlinePay": true,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-15",
      "slot": "14:00-16:00",
      "phone": "138****6626",
      "address": "成都市高新区天府软件园",
      "remark": "需避开午间员工休息时间，从东门进入。",
      "remarkPhoto": {
        "name": "东门入口.jpg"
      }
    }
  },
  {
    "id": "YB26061309",
    "user": "赵女士",
    "service": "无人机保养检测",
    "amount": "¥899",
    "needPilot": false,
    "needAppointment": true,
    "status": "待交付",
    "onlinePay": true,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-16",
      "slot": "10:00-11:30",
      "phone": "136****1175",
      "address": "成都市双流区某维修点",
      "remark": "",
      "remarkPhoto": null
    }
  },
  {
    "id": "YB26061402",
    "user": "李先生",
    "service": "园区航拍测绘",
    "amount": "¥2,800",
    "needPilot": true,
    "needAppointment": true,
    "status": "待付款",
    "onlinePay": true,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-17",
      "slot": "09:00-11:00",
      "phone": "137****5520",
      "address": "成都市武侯区某园区",
      "remark": "需航拍正射影像。",
      "remarkPhoto": null
    }
  },
  {
    "id": "YB26061401",
    "user": "成都建工",
    "service": "高空清洗服务",
    "amount": "线下报价",
    "needPilot": true,
    "needAppointment": true,
    "status": "待派单",
    "onlinePay": false,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-18",
      "slot": "14:00-16:00",
      "phone": "028-55****90",
      "address": "成都市天府新区某工地",
      "remark": "需提前联系现场负责人。",
      "remarkPhoto": {
        "name": "工地入口.jpg"
      }
    }
  },
  {
    "id": "YB26060803",
    "user": "唐先生",
    "service": "空域代办服务",
    "amount": "线下报价",
    "needPilot": false,
    "needAppointment": false,
    "status": "已完成",
    "onlinePay": false,
    "assignedPilots": []
  },
  {
    "id": "YB26060711",
    "user": "云航科技",
    "service": "园区巡检服务",
    "amount": "¥6,400",
    "needPilot": true,
    "needAppointment": true,
    "status": "待评价",
    "onlinePay": true,
    "assignedPilots": [
      {
        "name": "王伟",
        "area": "成都双流",
        "device": "M350 RTK",
        "status": "已完成"
      }
    ],
    "appointment": {
      "date": "2026-06-07",
      "slot": "11:00-13:00",
      "phone": "189****3016",
      "address": "成都市天府新区科创园",
      "remark": "巡检完成后需提交 PDF 报告。",
      "remarkPhoto": {
        "name": "巡检范围.jpg"
      }
    }
  },
  {
    "id": "YB26060605",
    "user": "张女士",
    "service": "高空清洗服务",
    "amount": "¥899",
    "needPilot": true,
    "needAppointment": true,
    "status": "已完成",
    "onlinePay": true,
    "assignedPilots": [],
    "appointment": {
      "date": "2026-06-06",
      "slot": "09:30-11:30",
      "phone": "136****1175",
      "address": "绵阳市科创园 A 区",
      "remark": "已完成服务，客户无异议。",
      "remarkPhoto": null
    }
  }
];

function activeOrder() {
  return orderRecords.find(item => item.id === state.viewingOrderId) || orderRecords[0];
}

function formatOrderAppointmentBrief(order) {
  if (!order.needAppointment || !order.appointment) return "—";
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

function orderAppointmentPanel(order) {
  if (!order.needAppointment) return "";
  const appt = order.appointment || {};
  return panel("预约信息", detailGrid([
    ["预约日期", appt.date || "—"],
    ["预约时段", appt.slot || "—"],
    ["联系手机号", appt.phone || "—"],
    ["预约地址", appt.address || "—", true],
    ["信息备注", `<span class="order-remark-text">${appt.remark || "—"}</span>`, true],
    ["备注照片", orderRemarkPhoto(order), true]
  ]));
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
  const assign = order.needPilot && order.status === "待派单"
    ? button("去派单", "assign-pilots", "small primary", `data-order-id="${order.id}"`)
    : "";
  const detail = `<button class="button small" data-route="order-detail" data-order-id="${order.id}">查看详情</button>`;
  return `<div class="row-actions">${assign}${detail}</div>`;
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
  </div>${paginatedTable("orders", ["订单号","用户","商品/服务","金额","需要飞手","状态","操作"], rows)}`);
}

function orderDetailPage() {
  const order = activeOrder();
  const canAssignPilot = order.needPilot && ["待派单", "待服务"].includes(order.status);
  const pilotAction = canAssignPilot
    ? (order.status === "待派单" ? button("分配飞手", "assign-pilots", "primary") : button("调整飞手", "assign-pilots", "small"))
    : "";
  const pilots = order.assignedPilots.length
    ? table(["飞手","区域","设备","个人状态"], order.assignedPilots.map(p => [p.name, p.area, p.device, tag(p.status)]))
    : `<p class="empty">尚未分配飞手</p>`;
  const pilotPanel = order.needPilot
    ? panel("飞手分配与履约", pilots, pilotAction)
    : "";
  return panel("订单状态", `<div class="steps steps--flow">${orderSteps(order)}</div>
    <p class="muted order-flow-summary">本单流转：${orderFlowSummary(order)}</p>`, routeButton("返回订单列表","orders",""))
  + panel("订单信息快照", detailGrid([
    ["订单号", order.id], ["用户", order.user], ["商品/服务", order.service], ["订单金额", order.amount],
    ["在线支付", order.onlinePay ? "是（下单快照）" : "否（下单快照）"],
    ["需要飞手", order.needPilot ? "是（下单快照）" : "否（下单快照）"],
    ["需要预约", order.needAppointment ? "是（下单快照）" : "否（下单快照）"]
  ]))
  + orderAppointmentPanel(order)
  + pilotPanel;
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
      "点击「查看详情」进入订单详情，顶部步骤条展示动态流转进度",
      "待服务阶段在详情页「调整飞手」修改名单，状态不变"
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
        "订单应付金额，线下报价类显示文案"
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
        "需要预约",
        "不影响列表状态与步骤条，仅详情页展示「预约信息」面板"
      ]
    ]
  },
  "order-detail": {
    "summary": "查看单笔订单动态流转、信息快照、预约信息及飞手分配情况。",
    "operations": [
      "顶部步骤条按下单快照（在线支付 / 飞手服务）动态生成，非固定 5 步",
      "步骤条下方展示本单完整流转路径摘要",
      "「订单信息快照」展示金额与业务属性（下单时保存，不可改）",
      "商品需预约时展示「预约信息」面板；无需预约则不展示",
      "需飞手服务时展示「飞手分配与履约」面板：待派单显示「分配飞手」，待服务显示「调整飞手」",
      "列表「去派单」与详情「分配飞手」为同一指派弹窗；调整飞手仅改名单，不改变订单状态",
      "无需飞手时跳过派单节点，使用「待交付」并隐藏飞手面板"
    ],
    "fields": [
      [
        "订单状态步骤条",
        "按在线支付、飞手服务组合生成 4～6 个节点，高亮当前状态"
      ],
      [
        "订单信息快照",
        "订单号、用户、商品、金额、在线支付、飞手需求、预约需求（均为下单快照）"
      ],
      [
        "预约信息",
        "仅需要预约时展示；含日期、时段、联系手机号、地址、备注、备注照片（1 张）"
      ],
      [
        "待交付",
        "无需飞手时的履约节点，后台标记交付完成后进入待评价"
      ],
      [
        "飞手分配",
        "仅需要飞手时展示；已指派飞手及个人履约状态"
      ]
    ]
  }
},
  pages: {
    "orders": ordersPage,
    "order-detail": orderDetailPage
  },
  actions: {
    "assign-pilots": function (target) {
      if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
          const order = activeOrder();
          const modalTitle = order.status === "待服务" ? "调整飞手" : "分配飞手";
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
    "preview-order-remark-photo": function (target) {
      const order = orderRecords.find(item => item.id === target.dataset.orderId) || activeOrder();
          const photo = order.appointment?.remarkPhoto;
          if (!photo) return;
          modal("备注照片", `<div class="order-remark-preview">
            <span class="thumb order-remark-preview-img"><span class="thumb-img">备注图</span></span>
            <p class="muted">${photo.name}</p>
          </div>`, button("关闭", "close-modal"));
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: function (target) {
    if (target.dataset.orderId) state.viewingOrderId = target.dataset.orderId;
  },
  onClose: null
});
