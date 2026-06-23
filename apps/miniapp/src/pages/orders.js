import { shell } from "../components/layout.js?v=miniapp-live-20260623-8";
import { state } from "../state/appState.js?v=miniapp-live-20260623-8";

const orderTabs = ["全部", "待付款", "待接单", "待服务", "待评价", "已取消"];

function reviewStars(rating = 5) {
  return `<span class="review-stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span><em class="review-rating">${rating}星</em>`;
}

function selectedOrder() {
  return state.orders.find(order => order.orderNo === state.selectedOrderNo) || state.orders[0] || null;
}

function visibleOrders() {
  return state.orders.filter(order => {
    const matchTab = state.orderFilter === "全部" || order.tab === state.orderFilter;
    const keyword = state.orderSearch.trim();
    const matchKeyword = !keyword || order.orderNo.includes(keyword) || order.title.includes(keyword);
    return matchTab && matchKeyword;
  });
}

function notificationText(notification) {
  return `您的订单 ${notification.orderNo} 状态已更新为：${notification.toStatus}`;
}

function latestServiceNotification() {
  return state.serviceNotifications[0] || null;
}

function hasUnreadServiceNotification() {
  return state.serviceNotifications.some(item => !item.isRead);
}

function orderCard(order) {
  const hasSpec = order.spec && order.spec !== "信息提交";
  const metaRows = [
    order.contactName ? `联系人：${order.contactName}` : "",
    order.contactPhone ? `联系方式：${order.contactPhone}` : "",
    hasSpec ? `规格：${order.spec}` : "",
    order.count > 1 ? `数量：${order.count}` : ""
  ].filter(Boolean);
  const paymentFoot = Number(order.paid) > 0
    ? `<div class="order-card-foot">
      <strong>${order.status === "待付款" ? "待支付" : "实付款"}: ￥${order.paid}</strong>
    </div>`
    : "";

  return `<button class="order-card ${paymentFoot ? "has-payment" : ""}" data-action="order-open" data-id="${order.orderNo}">
    <div class="order-card-head">
      <span>
        <b>${order.orderNo}</b>
        <small>${order.time}</small>
      </span>
      <em>${order.status}</em>
    </div>
    <div class="order-card-body">
      <div>
        <h3>${order.title}</h3>
        <div class="order-card-meta">
          ${metaRows.map(item => `<p>${item}</p>`).join("")}
        </div>
      </div>
      ${paymentFoot}
    </div>
  </button>`;
}

function orderProductMeta(order) {
  const needsPayment = Number(order.paid) > 0 || Number(order.price) > 0;
  return [
    needsPayment && order.spec ? `<small>规格：${order.spec}</small>` : "",
    needsPayment ? `<small>数量：${order.count || 1}</small>` : "",
    `<small>服务类型：${order.serviceType}</small>`
  ].filter(Boolean).join("");
}

function orderFlow(order) {
  const steps = ["订单生成"];
  const onlinePay = order.status === "待付款" || Number(order.paid) > 0 || Number(order.price) > 0;
  const needPilot = order.needPilot ?? true;
  if (onlinePay) steps.push("待付款");
  if (needPilot) steps.push("待派单", "待服务");
  else steps.push("待交付");
  steps.push("待评价", "已完成");
  return steps;
}

function orderFlowStatus(order) {
  const map = {
    "订单提交": "订单生成",
    "待接单": "待派单",
    "待付款": "待付款",
    "待服务": "待服务",
    "待交付": "待交付",
    "待评价": "待评价",
    "已完成": "已完成"
  };
  return map[order.status] || map[order.timeline?.at(-1)?.title] || "订单生成";
}

function orderFlowDesc(title) {
  const descMap = {
    "订单生成": "用户已提交订单需求，系统已保存本次下单信息。",
    "待付款": "订单需在线支付，完成付款后进入后续服务安排。",
    "待派单": "后台确认需求后，为订单分配合适的飞手或服务人员。",
    "待服务": "服务人员已确认订单，按约定时间执行服务。",
    "待交付": "订单无需飞手派单，平台正在处理服务交付。",
    "待评价": "服务已完成，等待用户提交服务评价。",
    "已完成": "评价完成或订单流程结束，订单归档。"
  };
  return descMap[title] || "订单正在按流程推进。";
}

function orderProgressSteps(order) {
  const flow = orderFlow(order);
  const currentStatus = orderFlowStatus(order);
  const current = Math.max(0, flow.indexOf(currentStatus));
  return flow.map((title, index) => ({
    title,
    desc: orderFlowDesc(title),
    latest: index === current,
    done: index < current
  }));
}

function orderReviewEntry(order) {
  if (order.status === "待评价") {
    return `<section class="order-detail-card order-review-card">
      <div class="order-review-entry-head">
        <span>
          <b>服务评价</b>
          <small>服务已完成，可提交 1-5 星评价与文字反馈</small>
        </span>
        <button class="order-review-entry" data-action="order-review-open" data-id="${order.orderNo}">去评价</button>
      </div>
    </section>`;
  }
  if (!order.review) return "";
  return `<section class="order-detail-card order-review-card">
    <div class="order-detail-title"><b>服务评价</b><small>${order.review.time}</small></div>
    <div class="order-review-result">
      <div>${reviewStars(order.review.rating)}</div>
      <p>${order.review.content}</p>
    </div>
  </section>`;
}

function requirementSnapshotGrid(snapshot) {
  if (!snapshot?.fields?.length) return "";
  return `<section class="order-detail-card">
    <div class="order-detail-title"><b>需求信息</b><small>${snapshot.templateName || "下单快照"}</small></div>
    <div class="order-detail-grid">
      ${snapshot.fields.map(field => `<span class="${field.type === "textarea" || field.type === "image" || String(field.value).length > 18 ? "wide" : ""}">
        <small>${field.label}</small><b>${field.displayValue || field.value || "—"}${field.unit ? ` ${field.unit}` : ""}</b>
      </span>`).join("")}
    </div>
  </section>`;
}

function resolvedRequirementSnapshot(order) {
  if (order.requirementSnapshot?.fields?.length) {
    return order.requirementSnapshot;
  }

  return {
    templateName: "下单快照",
    fields: [
      { label: "登记联系人", type: "text", value: order.contactName || "—" },
      { label: "联系电话", type: "text", value: order.contactPhone || "—" },
      { label: "服务地址", type: "address", value: order.address || "—" },
      { label: "备注说明", type: "textarea", value: order.remark || "—" }
    ]
  };
}

export function ordersPage() {
  const list = visibleOrders();

  return shell(`<div class="orders-page">
    <form class="order-search" data-form="order-search">
      <input name="keyword" placeholder="订单号/商品名字" value="${state.orderSearch}">
      <button type="submit">搜索</button>
    </form>
    <div class="order-tabs">${orderTabs.map(tab => `<button type="button" class="${state.orderFilter === tab ? "active" : ""}" data-action="order-filter" data-filter="${tab}">${tab}</button>`).join("")}</div>
    <section class="order-list">
      ${list.map(orderCard).join("") || `<div class="order-empty"><b>暂无订单</b><p>换个订单号或状态试试</p></div>`}
    </section>
  </div>`, { title: "订单", tab: "orders" });
}

export function messagesPage() {
  const latestNotification = latestServiceNotification();
  const messages = [
    {
      route: "serviceNotifications",
      tone: "service",
      mark: "服",
      title: "服务通知",
      desc: latestNotification ? notificationText(latestNotification) : "订单状态变更会在这里提醒您",
      time: latestNotification?.time || "",
      unread: hasUnreadServiceNotification()
    },
    {
      route: "contactWechat",
      tone: "support",
      mark: "客",
      title: "在线客服",
      desc: "您好，有任何问题都可以联系我们",
      time: "昨天"
    }
  ];

  return shell(`<div class="message-center">
    <section class="message-list">
      ${messages.map(item => `<button class="message-card ${item.unread ? "unread" : ""}" data-route="${item.route}">
        <span class="message-mark ${item.tone}">${item.mark}</span>
        <span class="message-copy">
          <b>${item.title}</b>
          <small>${item.desc}</small>
        </span>
        <span class="message-meta">
          <time>${item.time || ""}</time>
          ${item.unread ? "<i></i>" : ""}
        </span>
      </button>`).join("")}
    </section>
  </div>`, { title: "消息中心", tab: "messages" });
}

export function serviceNotificationsPage() {
  return shell(`<div class="service-notifications-page">
    ${state.serviceNotifications.length ? state.serviceNotifications.map(item => `<button class="service-notification-card ${item.isRead ? "" : "unread"}" data-action="notification-open" data-id="${item.id}">
      <div class="service-notification-top">
        <span>订单状态更新</span>
        <time>${item.time}</time>
      </div>
      <p>${notificationText(item)}</p>
      ${item.isRead ? "" : '<i class="service-notification-dot"></i>'}
    </button>`).join("") : `<div class="order-empty"><b>暂无服务通知</b><p>订单状态变更会在这里提醒您</p></div>`}
  </div>`, { title: "消息", tab: "messages" });
}

export function orderDetailPage() {
  const order = selectedOrder();
  if (!order) {
    return shell(`<div class="order-detail-page"><div class="order-empty"><b>暂无订单详情</b><p>请先从订单列表中选择一笔订单。</p></div></div>`, { title: "订单详情", back: true, tab: "orders" });
  }
  const requirementSnapshot = resolvedRequirementSnapshot(order);
  const progressSteps = orderProgressSteps(order);

  return shell(`<div class="order-detail-page">
    <section class="order-detail-hero ${order.tab === "已取消" ? "cancelled" : ""}">
      <small>${order.serviceType}</small>
      <h2>${order.status}</h2>
      <p>${order.orderNo}</p>
      <div class="order-detail-hero-meta">
        <span><small>下单时间</small><b>${order.time}</b></span>
        <span><small>${order.status === "待付款" ? "待支付" : "实付款"}</small><b>￥${order.paid}</b></span>
      </div>
    </section>
    <section class="order-detail-card">
      <div class="order-detail-title"><b>服务信息</b><small>${order.title}</small></div>
      <div class="order-detail-product">
        <span>
          <b>${order.title}</b>
          ${orderProductMeta(order)}
        </span>
      </div>
    </section>
    ${requirementSnapshotGrid(requirementSnapshot)}
    <section class="order-detail-card">
      <div class="order-detail-title"><b>订单进度</b><small>${progressSteps.length} 个节点</small></div>
      <div class="order-progress">
        ${progressSteps.map(item => `<article class="order-progress-item ${item.latest ? "latest" : ""} ${item.done ? "done" : ""}">
          <i></i>
          <div>
            <b>${item.title}</b>
            <p>${item.desc}</p>
          </div>
        </article>`).join("")}
      </div>
    </section>
    ${orderReviewEntry(order)}
  </div>`, { title: "订单详情", back: true, tab: "orders" });
}

export function orderReviewPage() {
  const order = selectedOrder();
  if (!order) {
    return shell(`<div class="order-detail-page"><div class="order-empty"><b>暂无可评价订单</b><p>请先从订单列表中选择一笔订单。</p></div></div>`, { title: "评价订单", back: true, tab: "orders" });
  }
  const rating = Math.min(5, Math.max(1, Number(state.orderReviewDraft?.rating) || 5));
  const content = state.orderReviewDraft?.content || "";
  return shell(`<form class="order-review-page" data-form="order-review">
    <section class="order-detail-card order-review-summary">
      <div class="order-detail-title"><b>评价订单</b><small>${order.orderNo}</small></div>
      <div class="order-detail-product">
        <span>
          <b>${order.title}</b>
          <small>${order.contactName || "平台用户"} · ${order.time}</small>
        </span>
      </div>
    </section>
    <section class="order-detail-card order-review-form-card">
      <div class="order-detail-title"><b>服务星级</b><small>请选择 1-5 星</small></div>
      <div class="order-review-stars">
        ${[1, 2, 3, 4, 5].map(item => `<button type="button" class="${item <= rating ? "active" : ""}" data-action="order-review-rating" data-rating="${item}">★</button>`).join("")}
      </div>
      <div class="order-review-rating-text">${rating} 星评价</div>
      <label class="order-review-field">
        <span>评价内容</span>
        <textarea name="content" data-input="order-review-content" rows="5" placeholder="请填写本次服务体验，例如响应速度、服务质量、沟通情况等">${content}</textarea>
      </label>
    </section>
    <div class="confirm-pay-bar order-review-submit">
      <button type="submit">提交评价</button>
    </div>
  </form>`, { title: "评价订单", back: true, tab: "orders" });
}
