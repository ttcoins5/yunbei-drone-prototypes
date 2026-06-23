import { shell } from "../components/layout.js?v=miniapp-live-20260623-8";
import { state } from "../state/appState.js?v=miniapp-live-20260623-8";

const defaultAboutConfig = {
  name: "四川奉飞飞无人机科技有限公司",
  phone: "028-8888 6626",
  address: "四川省成都市高新区天府软件园",
  intro: "<p><strong>四川奉飞飞无人机科技有限公司</strong>专注于无人机行业服务、飞手协作、技术培训与企业解决方案。</p><ul><li>低空经济综合服务</li><li>飞手协作与任务派发</li><li>企业级无人机应用解决方案</li></ul>"
};

function aboutConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem("droneAboutConfig") || "null");
    return saved && typeof saved === "object" ? { ...defaultAboutConfig, ...saved } : defaultAboutConfig;
  } catch (error) {
    return defaultAboutConfig;
  }
}

function plainTextFromRich(html) {
  return String(html || "")
    .replace(/<li>/gi, " · ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

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
  const isTaskTab = state.taskHallTab === "任务征集";

  return shell(`<div class="task-hall-page">
    <section class="task-hall-hero">
      <small>PILOT TASK CENTER</small>
      <h2>任务大厅</h2>
      <p>仅展示后台自建的飞手征集任务；用户订单被平台指派后，会进入我的服务统一查看。</p>
    </section>
    <div class="task-hall-tabs">
      ${["任务征集", "我的服务"].map(tab => `<button type="button" class="${state.taskHallTab === tab ? "active" : ""}" data-action="task-hall-tab" data-tab="${tab}">${tab}</button>`).join("")}
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
    ${state.assignedPilotOrders.map(order => {
      return `<button class="assigned-order-card ${order.status === "已完成" ? "completed" : ""}" data-action="pilot-order-open" data-id="${order.orderNo}">
      <div class="assigned-order-head">
        <span><small>订单号</small><b>${order.orderNo}</b></span>
        <em>${order.status}</em>
      </div>
      <div class="assigned-order-main">
        <span><small>${order.sourceType === "backendTask" ? "任务标题" : "商品/服务"}</small><b>${order.productName}</b></span>
        <span><small>${order.sourceType === "backendTask" ? "任务联系人" : "下单用户"}</small><b>${order.user}</b></span>
        <span><small>服务时间</small><b>${order.bookingDate} ${order.bookingTime}</b></span>
        <span><small>指派时间</small><b>${order.assignedTime}</b></span>
      </div>
      <p>${order.bookingAddress}</p>
    </button>`;
    }).join("")}
  </section>`;
}

function selectedAssignedOrder() {
  return state.assignedPilotOrders.find(order => order.orderNo === state.selectedAssignedOrderNo) || state.assignedPilotOrders[0] || null;
}

function pilotOrderInfoGrid(order) {
  const sourceLabel = order.sourceType === "backendTask" ? "后台自建任务" : "用户下单订单";
  const fields = [
    ["订单号", order.orderNo],
    ["来源", sourceLabel],
    [order.sourceType === "backendTask" ? "任务联系人" : "下单用户", order.user],
    ["商品", order.productName]
  ];

  return `<section class="pilot-order-table">
    ${fields.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
  </section>`;
}

function pilotRequirementFields(order) {
  const fields = order.requirementSnapshot?.fields;
  if (!fields?.length) {
    return `<div class="pilot-order-fields">
      <span><small>联系手机号</small><b>${order.contactPhone}</b></span>
      <span><small>服务地址</small><b>${order.bookingAddress}</b></span>
      <span><small>信息备注</small><b>${order.infoRemark}</b></span>
    </div>
    <div class="pilot-photo-file"><i>图</i><span>${order.remarkPhoto}</span></div>`;
  }
  return `<div class="pilot-order-fields">
    ${fields.map(field => `<span><small>${field.label}</small><b>${field.displayValue || field.value || "—"}${field.unit ? ` ${field.unit}` : ""}</b></span>`).join("")}
  </div>`;
}

export function pilotOrderDetailPage() {
  const order = selectedAssignedOrder();
  if (!order) {
    return shell(`<div class="pilot-order-detail-page"><div class="order-empty"><b>暂无服务订单</b><p>请先从我的服务中选择一笔订单。</p></div></div>`, { title: "服务详情", back: true, tab: "profile" });
  }

  const completed = order.status === "已完成";

  return shell(`<div class="pilot-order-detail-page">
    <section class="pilot-order-hero ${completed ? "completed" : ""}">
      <small>ASSIGNED ORDER</small>
      <h2>${order.status}</h2>
      <p>${order.orderNo} · ${order.productName}</p>
    </section>
    <section class="pilot-order-card">
      <div class="pilot-order-title"><b>订单信息</b><small>${order.sourceType === "backendTask" ? "后台任务转指派" : "用户订单转指派"}</small></div>
      ${pilotOrderInfoGrid(order)}
    </section>
    <section class="pilot-order-card">
      <div class="pilot-order-title"><b>${order.sourceType === "backendTask" ? "后台任务信息" : "用户需求信息"}</b><small>${order.requirementSnapshot?.templateName || "按来源字段展示"}</small></div>
      ${pilotRequirementFields(order)}
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
  </div>`, { title: "服务详情", back: true, tab: "profile" });
}

export function aboutPage() {
  const about = aboutConfig();
  const introText = plainTextFromRich(about.intro);
  const name = escapeHtml(about.name);
  const phone = escapeHtml(about.phone || "—");
  const address = escapeHtml(about.address || "—");
  return shell(`<div class="about-company-page">
    <section class="company-intro">
      <span class="brand-mark"><i></i><i></i><i></i></span>
      <small>ABOUT FENGFEIFEI</small>
      <h2>${name}</h2>
      <p>${escapeHtml(introText || "公司围绕低空经济场景，提供无人机设备、飞行服务、行业作业与运营支持。")}</p>
    </section>
    <section class="company-story">
      <img src="../../shared/assets/hero-image2.png" alt="${name}服务场景">
      <div>
        <b>连接设备、飞手与行业需求</b>
        <p>平台以标准化服务流程承接巡检、测绘、农业植保、物资吊运等低空作业需求，帮助客户从需求提交、方案确认到服务交付形成清晰闭环。</p>
      </div>
    </section>
    <section class="company-contact">
      <b>联系方式</b>
      <p><i>☎</i><span><small>联系电话</small><strong>${phone}</strong></span></p>
      <p><i>⌖</i><span><small>联系地址</small><strong>${address}</strong></span></p>
    </section>
  </div>`, { title: "关于我们", back: true, tab: "profile" });
}
