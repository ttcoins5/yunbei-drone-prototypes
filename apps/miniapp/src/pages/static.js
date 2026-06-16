import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { state } from "../state/appState.js";

export function contactPage() {
  return shell(`<div class="about-page">
    <div class="about-brand"><span class="brand-mark"><i></i><i></i><i></i></span><h2>联系客服</h2><p>无人机销售、租赁、维修、飞行报备和合作入驻均可通过客服协助处理。</p></div>
    <div class="about-card"><b>客服热线</b><p>400-888-****<br>服务时间：09:00 - 18:00</p></div>
    <div class="about-card"><b>常见问题</b><p>订单进度、飞手分配、发票申请、运营商资料核对。</p></div>
    <button class="primary-action" data-action="contact-sheet">联系客服</button>
  </div>`, { title: "联系客服", back: true, tab: "profile" });
}

export function contactPhonePage() {
  return shell(`<div class="phone-call-page">
    <div class="call-top"><button data-action="back">‹</button><h2>通话</h2><span>⌾</span></div>
    <div class="call-actions">
      <button>新建联系人</button>
      <button>添加到联系人</button>
      <button>发起视频通话</button>
      <button>发送信息</button>
    </div>
    <section class="dial-card">
      <div class="dial-number">0574 8885 6956</div>
      <p>浙江宁波 · 奉飞飞电话客服</p>
      <div class="dial-grid">
        ${[
          ["1", ""], ["2", "ABC"], ["3", "DEF"],
          ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
          ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
          ["*", ","], ["0", "+"], ["#", ""]
        ].map(([num, letters]) => `<button><b>${num}</b><small>${letters}</small></button>`).join("")}
      </div>
      <button class="call-button" data-action="toast" data-message="正在呼叫奉飞飞电话客服">☎</button>
    </section>
  </div>`, { tab: "profile" });
}

export function contactWechatPage() {
  return shell(`<div class="wechat-service-page">
    <div class="wechat-head"><button data-action="back">‹</button><span><b>奉飞飞客服</b><small>宁波泰安宏业交通科技有限公司</small></span><i>•••</i></div>
    <div class="wechat-meta">6月10日 13:51</div>
    <div class="wechat-system">奉飞飞客服为你服务<br>当前为客服聊天，此次聊天不会将对方添加到通讯录了<br><em>了解更多</em></div>
    <div class="wechat-message"><span class="wechat-avatar">👤</span><p>你好，很高兴为你服务，请问有什么可以帮到你?</p></div>
    <div class="wechat-meta">21:29</div>
    <div class="wechat-system">奉飞飞客服为你服务</div>
    <div class="wechat-message"><span class="wechat-avatar">👤</span><p>你好，很高兴为你服务，请问有什么可以帮到你?</p></div>
    <div class="wechat-input"><b>◉</b><span></span><b>☺</b><b>＋</b></div>
  </div>`, { tab: "profile" });
}

export function tasksPage() {
  const isTaskTab = state.taskHallTab === "任务信息";

  return shell(`<div class="task-hall-page">
    <section class="task-hall-hero">
      <small>PILOT TASK CENTER</small>
      <h2>任务大厅</h2>
      <p>查看后台发布的任务征集，也可以处理平台已分配给你的订单。</p>
    </section>
    <div class="task-hall-tabs">
      ${["任务信息", "分配订单"].map(tab => `<button class="${state.taskHallTab === tab ? "active" : ""}" data-action="task-hall-tab" data-tab="${tab}">${tab}</button>`).join("")}
    </div>
    ${isTaskTab ? pilotTaskList() : assignedPilotOrderList()}
  </div>`, { title: "任务大厅", back: true, tab: "profile" });
}

function pilotTaskList() {
  return `<section class="pilot-task-list">
    ${state.pilotTasks.map(task => {
      const canJoin = task.status === "征集中" && !task.joined;
      return `<article class="pilot-task-card ${task.status === "已关闭" ? "closed" : ""}">
        <div class="pilot-task-head">
          <span>
            <small>需求编号</small>
            <b>${task.requirementNo}</b>
          </span>
          <em>${task.joined ? "已报名" : task.status}</em>
        </div>
        <div class="pilot-task-fields">
          <span><small>标题</small><b>${task.title}</b></span>
          <span><small>服务时间</small><b>${task.serviceTime}</b></span>
          <span><small>地址</small><b>${task.address}</b></span>
          <span><small>备注</small><b>${task.remark}</b></span>
          <span class="wide"><small>附文本说明</small><b>${task.description}</b></span>
        </div>
        <footer>
          <small>${task.intentionCount + (task.joined ? 1 : 0)} 人已提交意愿</small>
          <button data-action="pilot-task-join" data-id="${task.id}" ${canJoin ? "" : "disabled"}>${task.joined ? "已报名" : task.status === "已关闭" ? "已关闭" : "报名"}</button>
        </footer>
      </article>`;
    }).join("")}
  </section>`;
}

function assignedPilotOrderList() {
  return `<section class="assigned-order-list">
    ${state.assignedPilotOrders.map(order => `<button class="assigned-order-card ${order.status === "已完成" ? "completed" : ""}" data-action="pilot-order-open" data-id="${order.orderNo}">
      <div class="assigned-order-head">
        <span><small>订单号</small><b>${order.orderNo}</b></span>
        <em>${order.status}</em>
      </div>
      <div class="assigned-order-main">
        <span><small>商品/服务</small><b>${order.productName}</b></span>
        <span><small>用户</small><b>${order.user}</b></span>
        <span><small>预约时间</small><b>${order.bookingDate} ${order.bookingTime}</b></span>
        <span><small>订单金额</small><b>¥${order.amount.toLocaleString()}</b></span>
      </div>
      <p>${order.bookingAddress}</p>
    </button>`).join("")}
  </section>`;
}

function selectedAssignedOrder() {
  return state.assignedPilotOrders.find(order => order.orderNo === state.selectedAssignedOrderNo) || state.assignedPilotOrders[0] || null;
}

function pilotOrderInfoGrid(order) {
  const fields = [
    ["订单号", order.orderNo],
    ["用户", order.user],
    ["分类", order.category],
    ["商品", order.productName]
  ];

  return `<section class="pilot-order-table">
    ${fields.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
  </section>`;
}

export function pilotOrderDetailPage() {
  const order = selectedAssignedOrder();
  if (!order) {
    return shell(`<div class="pilot-order-detail-page"><div class="order-empty"><b>暂无分配订单</b><p>请先从任务大厅选择订单。</p></div></div>`, { title: "分配订单详情", back: true, tab: "profile" });
  }

  const completed = order.status === "已完成";

  return shell(`<div class="pilot-order-detail-page">
    <section class="pilot-order-hero ${completed ? "completed" : ""}">
      <small>ASSIGNED ORDER</small>
      <h2>${order.status}</h2>
      <p>${order.orderNo} · ${order.productName}</p>
      <div>
        <span><small>预约日期</small><b>${order.bookingDate}</b></span>
        <span><small>预约时段</small><b>${order.bookingTime}</b></span>
      </div>
    </section>
    <section class="pilot-order-card">
      <div class="pilot-order-title"><b>订单信息</b><small>后台分配订单</small></div>
      ${pilotOrderInfoGrid(order)}
    </section>
    <section class="pilot-order-card">
      <div class="pilot-order-title"><b>预约信息</b><small>按下单快照展示</small></div>
      <div class="pilot-order-fields">
        <span><small>联系手机号</small><b>${order.contactPhone}</b></span>
        <span><small>预约地址</small><b>${order.bookingAddress}</b></span>
        <span><small>信息备注</small><b>${order.infoRemark}</b></span>
      </div>
      <div class="pilot-photo-file"><i>图</i><span>${order.remarkPhoto}</span></div>
    </section>
    <section class="pilot-order-card">
      <div class="pilot-order-title"><b>订单进度</b><small>${order.progress.length} 条记录</small></div>
      <div class="order-progress">
        ${order.progress.map((item, index) => `<article class="order-progress-item ${index === order.progress.length - 1 ? "latest" : ""}">
          <i></i>
          <div>
            <b>${item.title}</b>
            <small>${item.time}</small>
            <p>${item.desc}</p>
          </div>
        </article>`).join("")}
      </div>
    </section>
    <div class="pilot-order-actions">
      <button data-action="contact-sheet">联系客服</button>
      <button data-action="pilot-order-complete" data-id="${order.orderNo}" ${completed ? "disabled" : ""}>${completed ? "已完成" : "完成订单"}</button>
    </div>
  </div>`, { title: "分配订单详情", back: true, tab: "profile" });
}

export function aboutPage() {
  return shell(`<div class="about-company-page">
    <section class="company-intro">
      <span class="brand-mark"><i></i><i></i><i></i></span>
      <small>ABOUT FENGFEIFEI</small>
      <h2>宁波泰安宏业交通科技有限公司</h2>
      <p>公司围绕低空经济与交通科技场景，提供无人机设备、飞行服务、行业作业与运营支持，为企业客户打造更高效、更可靠的一站式服务体验。</p>
    </section>
    <section class="company-story">
      <img src="../shared/assets/hero-image2.png" alt="宁波泰安宏业交通科技有限公司服务场景">
      <div>
        <b>连接设备、飞手与行业需求</b>
        <p>平台以标准化服务流程承接巡检、测绘、农业植保、物资吊运等低空作业需求，帮助客户从需求提交、方案确认到服务交付形成清晰闭环。</p>
      </div>
    </section>
  </div>`, { title: "关于我们", back: true, tab: "profile" });
}
