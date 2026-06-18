import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { state } from "../state/appState.js?v=product-order-fixtures-1";

const orderTabs = ["全部", "待付款", "待接单", "待服务", "待评价", "已取消"];

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
    hasSpec ? `规格：${order.spec}` : ""
  ].filter(Boolean);
  const paymentFoot = Number(order.paid) > 0
    ? `<div class="order-card-foot">
      <strong>实付款: ￥${order.paid}</strong>
    </div>`
    : "";

  return `<button class="order-card" data-action="order-open" data-id="${order.orderNo}">
    <div class="order-card-head">
      <span>
        <b>${order.orderNo}</b>
        <small>${order.time}</small>
      </span>
      <em>${order.status}</em>
    </div>
    <div class="order-card-body">
      <div class="order-thumb"></div>
      <div>
        <h3>${order.title}</h3>
        <div class="order-card-meta">
          ${metaRows.map(item => `<p>${item}</p>`).join("")}
        </div>
      </div>
    </div>
    ${paymentFoot}
  </button>`;
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
      <input name="keyword" placeholder="请输入订单号" value="${state.orderSearch}">
      <button type="submit">搜索</button>
    </form>
    <div class="order-tabs">${orderTabs.map(tab => `<button class="${state.orderFilter === tab ? "active" : ""}" data-action="order-filter" data-filter="${tab}">${tab}</button>`).join("")}</div>
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

  return shell(`<div class="order-detail-page">
    <section class="order-detail-hero ${order.tab === "已取消" ? "cancelled" : ""}">
      <small>${order.serviceType}</small>
      <h2>${order.status}</h2>
      <p>${order.orderNo}</p>
      <div class="order-detail-hero-meta">
        <span><small>下单时间</small><b>${order.time}</b></span>
        <span><small>实付款</small><b>￥${order.paid}</b></span>
      </div>
    </section>
    <section class="order-detail-card">
      <div class="order-detail-title"><b>服务信息</b><small>${order.title}</small></div>
      <div class="order-detail-product">
        <div class="order-thumb"></div>
        <span>
          <b>${order.title}</b>
          <small>规格：${order.spec}</small>
          <small>服务类型：${order.serviceType}</small>
        </span>
      </div>
    </section>
    ${requirementSnapshotGrid(requirementSnapshot)}
    <section class="order-detail-card">
      <div class="order-detail-title"><b>订单进度</b><small>${order.timeline.length} 条记录</small></div>
      <div class="order-progress">
        ${order.timeline.map((item, index) => `<article class="order-progress-item ${index === order.timeline.length - 1 ? "latest" : ""}">
          <i></i>
          <div>
            <b>${item.title}</b>
            <small>${item.time}</small>
            <p>${item.desc}</p>
          </div>
        </article>`).join("")}
      </div>
    </section>
  </div>`, { title: "订单详情", back: true, tab: "orders" });
}
