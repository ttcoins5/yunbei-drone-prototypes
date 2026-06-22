import { hoistingProducts } from "./src/data/catalog.js?v=orders-list-refresh-1";
import { caseStudies } from "./src/data/caseStudies.js?v=orders-list-refresh-1";
import { state } from "./src/state/appState.js?v=orders-list-refresh-1";
import { navigate, render } from "./src/router/navigation.js?v=orders-list-refresh-1";
import { toast } from "./src/utils/toast.js?v=orders-list-refresh-1";
import { currentProducts, selectedRequirementTemplate } from "./src/pages/products.js?v=orders-list-refresh-1";

function formatDateTime(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function generateFlightReportNo(date = new Date()) {
  const dateKey = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const sameDayCount = state.flightReports.filter(item => item.reportNo?.startsWith(`BB${dateKey}`)).length;
  return `BB${dateKey}${String(sameDayCount + 1).padStart(3, "0")}`;
}

function pushServiceNotification(orderNo, fromStatus, toStatus, time = formatDateTime()) {
  state.serviceNotifications = [
    {
      id: `service-notice-${Date.now()}`,
      orderNo,
      fromStatus,
      toStatus,
      time,
      isRead: false
    },
    ...state.serviceNotifications
  ];
}

function resolveHomepageNavLink(link, jumpType) {
  if (jumpType === "external") return { type: "external", value: link };
  const serviceMap = {
    "/pages/services/inspection/index": "inspection",
    "/pages/services/logistics/index": "logistics",
    "/pages/services/hoisting/index": "hoisting",
    "/pages/services/performance/index": "performance",
    "/pages/services/hosting/index": "hosting",
    "/pages/services/takeout/index": "takeout",
    "/pages/services/rental/index": "rental",
    "/pages/training/competition/index": "competition",
    "/pages/training/children/index": "child-training",
    "/pages/training/index": "pilot-training",
    "/pages/categories/index": "categories"
  };
  const productId = serviceMap[link];
  if (productId === "categories") return { type: "categories" };
  if (productId) return { type: "product-list", productId };
  return { type: "disabled" };
}

function openHomepageNavLink(link, jumpType) {
  const target = resolveHomepageNavLink(link, jumpType);
  if (target.type === "external") {
    const win = window.open(target.value, "_blank", "noopener");
    if (!win) location.href = target.value;
    return;
  }
  if (target.type === "product-list") {
    state.productListMode = "hoisting";
    state.selectedProduct = hoistingProducts.find(item => item.id === target.productId) || hoistingProducts[0];
    state.selectedSpecIndex = 0;
    state.productReviewFilter = "全部";
    navigate("product");
    return;
  }
  if (target.type === "categories") {
    navigate("categories");
    return;
  }
  toast("暂未开通");
}

function isPilotUser() {
  return state.userProfile.role === "pilot";
}

function isPilotOnlyRoute(routeName) {
  return routeName === "tasks" || routeName === "report";
}

function denyPilotOnlyRoute() {
  state.showPilotOnlyDialog = true;
  render();
}

function guardedNavigate(routeName) {
  if (isPilotOnlyRoute(routeName) && !isPilotUser()) {
    denyPilotOnlyRoute();
    return;
  }
  navigate(routeName);
}

function guardCurrentRoute() {
  if (!isPilotOnlyRoute(state.page) || isPilotUser()) return true;
  state.page = "home";
  location.hash = "#/home";
  state.showPilotOnlyDialog = true;
  render();
  return false;
}

function closePilotOnlyDialog() {
  state.showPilotOnlyDialog = false;
  render();
}

function updateWechatProfile() {
  state.userProfile = {
    ...state.userProfile,
    nickname: "云北用户",
    gender: "男",
    region: "浙江省 宁波市",
    wechatAuthorized: true,
    phoneAuthorized: true
  };
  toast("已同步微信授权资料");
  render();
}

function openNotification(id) {
  const notification = state.serviceNotifications.find(item => item.id === id);
  if (!notification) return;

  state.serviceNotifications = state.serviceNotifications.map(item => (
    item.id === id ? { ...item, isRead: true } : item
  ));
  state.selectedOrderNo = notification.orderNo;
  state.orderSearch = notification.orderNo;
  state.orderFilter = "全部";
  navigate("orderDetail");
}

function openOrder(orderNo) {
  state.selectedOrderNo = orderNo;
  navigate("orderDetail");
}

function openOrderReview(orderNo) {
  const order = state.orders.find(item => item.orderNo === orderNo);
  if (!order) return;
  if (order.status !== "待评价") return toast("当前订单暂无评价入口");
  state.selectedOrderNo = orderNo;
  state.orderReviewDraft = {
    rating: order.review?.rating || 5,
    content: order.review?.content || ""
  };
  navigate("orderReview");
}

function openCase(caseId) {
  state.selectedCaseId = caseStudies.find(item => item.id === caseId)?.id || caseStudies[0]?.id || "";
  navigate("caseDetail");
}

function updateAddressDefault(id) {
  state.addressBook = state.addressBook.map(address => ({
    ...address,
    isDefault: address.id === id
  }));
  toast("默认地址已更新");
  render();
}

function editAddress(id) {
  state.editingAddressId = id;
  state.showAddressForm = true;
  render();
}

function deleteAddress(id) {
  state.addressBook = state.addressBook.filter(address => address.id !== id);
  if (!state.addressBook.some(address => address.isDefault) && state.addressBook[0]) {
    state.addressBook[0].isDefault = true;
  }
  state.editingAddressId = null;
  state.showAddressForm = false;
  toast("地址已删除");
  render();
}

function showNewAddressForm() {
  state.editingAddressId = null;
  state.showAddressForm = true;
  render();
}

function closeAddressForm() {
  state.editingAddressId = null;
  state.showAddressForm = false;
  render();
}

function showContactSheet() {
  state.showContactSheet = true;
  render();
}

function closeContactSheet() {
  state.showContactSheet = false;
  render();
}

function chooseContact(type) {
  state.showContactSheet = false;
  navigate(type === "phone" ? "contactPhone" : "contactWechat");
}

function filterOrders(filter) {
  state.orderFilter = filter;
  render();
}

function filterReports(filter) {
  state.reportFilter = filter;
  render(true);
}

function openFlightReport(reportNo) {
  const report = state.flightReports.find(item => item.reportNo === reportNo);
  if (!report) return toast("未找到报备记录");
  state.selectedFlightReportNo = report.reportNo;
  navigate("reportDetail");
}

function filterProductReviews(filter) {
  state.productReviewFilter = filter;
  render();
}

function setOrderReviewRating(rating) {
  state.orderReviewDraft = {
    ...state.orderReviewDraft,
    rating: Math.min(5, Math.max(1, Number(rating) || 5))
  };
  render();
}

function syncOrderReviewContent(value) {
  state.orderReviewDraft = {
    ...state.orderReviewDraft,
    content: String(value || "")
  };
}

function appendProductReview(order, rating, content, time) {
  const product = hoistingProducts.find(item => item.id === order.productId);
  if (!product) return;
  const newReview = {
    user: order.contactName || state.userProfile.nickname || "平台用户",
    rating,
    content,
    time
  };
  product.reviews = [newReview, ...(product.reviews || [])];
  const baseCount = Number(product.reviewCount) || Math.max((product.reviews?.length || 1) - 1, 0);
  product.reviewCount = baseCount + 1;
}

function submitOrderReview(form) {
  const order = state.orders.find(item => item.orderNo === state.selectedOrderNo);
  if (!order) return toast("未找到待评价订单");
  const rating = Math.min(5, Math.max(1, Number(state.orderReviewDraft?.rating) || 5));
  const content = String(new FormData(form).get("content") || "").trim();
  if (!content) return toast("请填写评价内容");

  const time = formatDateTime();
  state.orders = state.orders.map(item => (
    item.orderNo === order.orderNo
      ? {
          ...item,
          status: "已完成",
          tab: "已完成",
          review: {
            rating,
            content,
            time
          },
          timeline: [
            ...item.timeline,
            { time, title: "评价完成", desc: `用户已提交 ${rating} 星评价` }
          ]
        }
      : item
  ));
  appendProductReview(order, rating, content, time);
  state.orderReviewDraft = {
    rating: 5,
    content: ""
  };
  state.orderFilter = "全部";
  state.orderSearch = "";
  toast("评价提交成功");
  navigate("orders");
}

function setTaskHallTab(tab) {
  state.taskHallTab = tab;
  render();
}

function joinPilotTask(id) {
  const task = state.pilotTasks.find(item => item.id === id);
  if (!task) return;
  if (task.status === "已关闭") return toast("该任务已关闭，暂不能报名");
  if (task.joined) return toast("您已提交报名意愿");

  state.selectedTaskId = id;
  state.pilotTasks = state.pilotTasks.map(item => (
    item.id === id ? { ...item, joined: true } : item
  ));
  toast("您已提交报名意愿", { placement: "center" });
  render();
}

function openAssignedPilotOrder(orderNo) {
  state.selectedAssignedOrderNo = orderNo;
  navigate("pilotOrderDetail");
}

function completeAssignedPilotOrder(orderNo) {
  const order = state.assignedPilotOrders.find(item => item.orderNo === orderNo);
  if (!order) return;
  if (order.status === "已完成") return toast("该订单已完成");

  const time = formatDateTime();
  state.assignedPilotOrders = state.assignedPilotOrders.map(item => (
    item.orderNo === orderNo
      ? {
          ...item,
          status: "已完成",
          progress: [
            ...item.progress,
            { time, title: "订单完成", desc: "飞手已确认完成现场服务" }
          ]
        }
      : item
  ));
  toast("订单已完成");
  render();
}

function orderUnitPrice(spec) {
  const value = Number(spec?.price);
  return Number.isFinite(value) ? value : 0;
}

function currentOrderSpec() {
  return state.selectedProduct.specs?.[state.selectedSpecIndex] || state.selectedProduct;
}

function currentOrderQuantity() {
  const value = Number(state.orderQuantity);
  return Number.isFinite(value) && value > 0 ? Math.min(99, Math.floor(value)) : 1;
}

function refreshOrderPriceDom() {
  if (state.page !== "orderConfirm") return;
  const spec = currentOrderSpec();
  const quantity = currentOrderQuantity();
  const unitPrice = orderUnitPrice(spec);
  const total = unitPrice * quantity;

  document.querySelectorAll(".confirm-spec-list button").forEach((button, index) => {
    button.classList.toggle("active", index === state.selectedSpecIndex);
  });
  const summary = document.querySelector("[data-order-summary]");
  if (summary) summary.textContent = `${spec.name || "信息提交"} · ${spec.desc || ""}`;
  const quantityInput = document.querySelector("[data-order-quantity]");
  if (quantityInput) quantityInput.value = String(quantity);
  const unitLine = document.querySelector("[data-order-unit-line]");
  if (unitLine) unitLine.textContent = unitPrice > 0 ? `￥${unitPrice} x ${quantity}` : "线下确认";
  const totalText = total > 0 ? `￥${total}` : "线下确认";
  const totalNode = document.querySelector("[data-order-total]");
  if (totalNode) totalNode.textContent = totalText;
  const payTotal = document.querySelector("[data-order-pay-total]");
  if (payTotal) payTotal.textContent = totalText;
}

function selectProductSpec(index) {
  state.selectedSpecIndex = index;
  refreshOrderPriceDom();
}

function adjustOrderQuantity(dir) {
  const current = Number(state.orderQuantity) || 1;
  state.orderQuantity = Math.min(99, Math.max(1, current + Number(dir || 0)));
  refreshOrderPriceDom();
}

function syncOrderQuantity(value) {
  const next = Number(value);
  if (!Number.isFinite(next)) return;
  state.orderQuantity = Math.min(99, Math.max(1, Math.floor(next)));
  refreshOrderPriceDom();
}

function submitProductOrder(form) {
  const formData = new FormData(form);
  const spec = state.selectedProduct.specs?.[state.selectedSpecIndex] || state.selectedProduct;
  const unitPrice = Number(spec.price) || 0;
  const quantityValue = Number(formData.get("quantity") || state.orderQuantity || 1);
  const quantity = Number.isFinite(quantityValue) ? Math.min(99, Math.max(1, Math.floor(quantityValue))) : 1;
  const totalAmount = unitPrice * quantity;
  const onlinePay = totalAmount > 0;
  const initialStatus = onlinePay ? "待付款" : "待接单";
  const orderNo = `ORD${Date.now()}`;
  const template = selectedRequirementTemplate(state.selectedProduct);
  const requirementFields = [...template.fields].sort((a, b) => a.sort - b.sort).map(field => {
    const raw = formData.get(`requirement_${field.key}`);
    const isFile = field.type === "image";
    const value = isFile ? (raw?.name || "") : String(raw || "").trim();
    return {
      key: field.key,
      label: field.label,
      type: field.type,
      value,
      displayValue: value,
      unit: field.unit || "",
      required: Boolean(field.required)
    };
  });
  const missing = requirementFields.find(field => field.required && !field.value);
  if (missing) {
    toast(`请填写${missing.label}`);
    return;
  }
  const findValue = (...keys) => requirementFields.find(field => keys.includes(field.key))?.value || "";
  const contactName = findValue("contactName") || state.userProfile.nickname;
  const contactPhone = findValue("contactPhone") || state.userProfile.phone;
  const address = findValue("workAddress", "area", "startAddress", "endAddress") || "";
  const remark = findValue("remark") || "暂无备注";
  state.pendingProductOrder = {
    orderNo,
    status: initialStatus,
    productName: state.selectedProduct.name,
    specName: spec.name,
    amount: unitPrice,
    quantity,
    paid: totalAmount,
    onlinePay,
    contactName,
    contactPhone,
    address,
    remark,
    requirementSnapshot: {
      templateId: template.id,
      templateName: template.name,
      serviceType: template.serviceType,
      fields: requirementFields
    }
  };
  const order = state.pendingProductOrder;
  state.orders = [
    {
      orderNo: order.orderNo,
      status: initialStatus,
      tab: initialStatus,
      time: formatDateTime(),
      title: order.productName,
      spec: order.specName,
      price: order.amount,
      count: order.quantity,
      paid: order.paid,
      onlinePay: order.onlinePay,
      serviceType: order.requirementSnapshot?.serviceType || "需求服务",
      contactName: order.contactName,
      contactPhone: order.contactPhone,
      address: order.address,
      remark: order.remark,
      requirementSnapshot: order.requirementSnapshot,
      timeline: [
        { time: formatDateTime(), title: "订单提交", desc: onlinePay ? "已提交服务需求，等待用户完成支付" : "已提交服务需求，等待平台接单" },
        { time: formatDateTime(), title: initialStatus, desc: onlinePay ? "需完成在线支付后进入后台接单" : "后台正在确认需求信息并安排后续服务" }
      ]
    },
    ...state.orders
  ];
  pushServiceNotification(order.orderNo, "提交成功", initialStatus);
  toast(onlinePay ? "订单已提交，请完成支付" : "提交成功，订单待接单");
  navigate(onlinePay ? "payment" : "paymentResult");
}

function payPendingProductOrder() {
  const order = state.pendingProductOrder;
  if (!order) return toast("暂无待支付订单");
  const target = state.orders.find(item => item.orderNo === order.orderNo);
  const time = formatDateTime();
  if (target) {
    target.status = "待接单";
    target.tab = "待接单";
    target.timeline = [
      ...target.timeline,
      { time, title: "支付成功", desc: `已支付 ￥${target.paid}，订单进入后台接单` },
      { time, title: "待接单", desc: "后台正在确认需求信息并安排飞手服务" }
    ];
  }
  state.pendingProductOrder = {
    ...order,
    status: "待接单",
    paidAt: time
  };
  pushServiceNotification(order.orderNo, "待付款", "待接单", time);
  toast("支付成功，订单待接单");
  navigate("paymentResult");
}

function submitFlightReport(form) {
  const fields = Object.fromEntries(new FormData(form).entries());
  const now = new Date();
  const report = {
    reportNo: generateFlightReportNo(now),
    entrustedSubject: fields.entrustedSubject.trim(),
    pilot: fields.pilot.trim(),
    pilotPhone: fields.pilotPhone.trim(),
    droneModel: fields.droneModel.trim(),
    serialNo: fields.serialNo.trim(),
    modelLicense: `${fields.droneModel.trim()} / ${fields.serialNo.trim()}`,
    flightPlan: fields.flightPlan.trim(),
    flightArea: fields.flightArea.trim(),
    flightAltitude: fields.flightAltitude.trim(),
    taskNature: fields.taskNature.trim(),
    reportStatement: fields.reportStatement.trim(),
    sorties: 1,
    duration: fields.flightPlan.trim(),
    reportTime: formatDateTime(now),
    status: "待确认"
  };
  state.flightReports = [report, ...state.flightReports];
  toast("飞行报备已提交，等待确认");
  render();
}

function setInvoiceTab(tab) {
  state.invoiceTab = tab;
  state.invoicePreview = null;
  render();
}

function toggleInvoiceOrder(id) {
  if (state.selectedInvoiceOrders.includes(id)) {
    state.selectedInvoiceOrders = state.selectedInvoiceOrders.filter(item => item !== id);
  } else {
    state.selectedInvoiceOrders = [...state.selectedInvoiceOrders, id];
  }
  render();
}

function submitInvoice() {
  if (state.selectedInvoiceOrders.length === 0) return toast("请先选择需要开票的订单");
  toast("开票申请已提交");
  state.invoiceTab = "records";
  render();
}

function previewInvoice(action) {
  state.invoicePreview = {
    id: action.dataset.id,
    file: action.dataset.file
  };
  render();
}

function setPilotType(type) {
  state.pilotJoinType = type;
  if (type === "company") state.pilotCompanyMode = "existing";
  state.pilotAgreement = false;
  render(true);
}

function setPilotCompanyMode(mode) {
  state.pilotCompanyMode = mode;
  render(true);
}

function togglePilotAgreement() {
  state.pilotAgreement = !state.pilotAgreement;
  render(true);
}

function generatePilotApplicationId(date = new Date()) {
  const dateKey = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `FS${dateKey}001`;
}

function submitPilotApplication(form) {
  const now = formatDateTime();
  const isCompany = state.pilotJoinType === "company";
  const fields = Object.fromEntries(new FormData(form).entries());
  const previous = state.pilotApplication;
  const history = previous?.status === "已驳回"
    ? [
        { time: previous.reviewedAt || previous.appliedAt, status: "已驳回", reason: previous.rejectReason || "资料不完整，请补充后重新提交。" },
        ...(previous.history || [])
      ]
    : (previous?.history || []);

  state.pilotApplication = {
    id: previous?.id || generatePilotApplicationId(),
    status: "待审核",
    applicant: fields.applicant?.trim() || state.userProfile.nickname,
    subject: isCompany ? "公司主体" : "个人主体",
    phone: fields.phone?.trim() || state.userProfile.phone,
    birthday: fields.birthday || "",
    area: fields.area?.trim() || state.userProfile.region,
    companyName: isCompany ? (fields.companyName?.trim() || "宁波低空服务有限公司") : "",
    droneModel: fields.droneModel?.trim() || "DJI Mavic 3E",
    serialNo: fields.serialNo?.trim() || "",
    uniqueId: fields.uniqueId?.trim() || "",
    appliedAt: now,
    reviewedAt: "",
    rejectReason: "",
    progress: [
      { time: now, title: "提交申请", desc: "已提交飞手入驻资料，等待后台审核" },
      { time: "待更新", title: "平台审核", desc: "运营人员将核验身份、执照和设备资料" }
    ],
    history
  };
  state.pilotAgreement = false;
  toast("飞手申请已提交");
  navigate("pilotStatus");
}

function reapplyPilotApplication() {
  state.pilotJoinType = state.pilotApplication?.subject === "公司主体" ? "company" : "personal";
  state.pilotAgreement = false;
  navigate("pilot");
}

function toggleOperatorAgreement() {
  state.operatorAgreement = !state.operatorAgreement;
  render();
}

function saveAddress(form) {
  const fields = Object.fromEntries(new FormData(form).entries());
  const id = Number(fields.id) || Date.now();
  const payload = {
    id,
    name: fields.name.trim(),
    phone: fields.phone.trim(),
    region: fields.region.trim(),
    detail: fields.detail.trim(),
    isDefault: state.addressBook.length === 0
  };

  if (fields.id) {
    state.addressBook = state.addressBook.map(address => (
      address.id === id ? { ...payload, isDefault: address.isDefault } : address
    ));
    toast("地址已保存");
  } else {
    state.addressBook = [payload, ...state.addressBook];
    toast("新地址已添加");
  }

  state.editingAddressId = null;
  state.showAddressForm = false;
  render();
}

document.addEventListener("click", (event) => {
  const route = event.target.closest("[data-route]");
  if (route) return guardedNavigate(route.dataset.route);

  const action = event.target.closest("[data-action]");
  if (!action) return;
  event.preventDefault();

  if (action.dataset.action === "back") return navigate(state.history.pop() || "home", false);
  if (action.dataset.action === "toast") return toast(action.dataset.message);
  if (action.dataset.action === "contact-sheet") return showContactSheet();
  if (action.dataset.action === "contact-cancel") return closeContactSheet();
  if (action.dataset.action === "contact-phone") return chooseContact("phone");
  if (action.dataset.action === "contact-wechat") return chooseContact("wechat");
  if (action.dataset.action === "homepage-nav-link") return openHomepageNavLink(action.dataset.link, action.dataset.jumpType);
  if (action.dataset.action === "case-open") return openCase(action.dataset.id);
  if (action.dataset.action === "order-filter") return filterOrders(action.dataset.filter);
  if (action.dataset.action === "report-filter") return filterReports(action.dataset.filter);
  if (action.dataset.action === "flight-report-open") return openFlightReport(action.dataset.id);
  if (action.dataset.action === "review-filter") return filterProductReviews(action.dataset.filter);
  if (action.dataset.action === "order-review-open") return openOrderReview(action.dataset.id);
  if (action.dataset.action === "order-review-rating") return setOrderReviewRating(action.dataset.rating);
  if (action.dataset.action === "task-hall-tab") return setTaskHallTab(action.dataset.tab);
  if (action.dataset.action === "pilot-task-join") return joinPilotTask(action.dataset.id);
  if (action.dataset.action === "pilot-order-open") return openAssignedPilotOrder(action.dataset.id);
  if (action.dataset.action === "pilot-order-complete") return completeAssignedPilotOrder(action.dataset.id);
  if (action.dataset.action === "product-spec") return selectProductSpec(Number(action.dataset.index));
  if (action.dataset.action === "order-quantity") return adjustOrderQuantity(action.dataset.dir);
  if (action.dataset.action === "mock-pay-order") return payPendingProductOrder();
  if (action.dataset.action === "invoice-tab") return setInvoiceTab(action.dataset.tab);
  if (action.dataset.action === "invoice-toggle") return toggleInvoiceOrder(action.dataset.id);
  if (action.dataset.action === "invoice-submit") return submitInvoice();
  if (action.dataset.action === "invoice-preview") return previewInvoice(action);
  if (action.dataset.action === "invoice-preview-close") { state.invoicePreview = null; return render(); }
  if (action.dataset.action === "pilot-type") return setPilotType(action.dataset.type);
  if (action.dataset.action === "pilot-company-mode") return setPilotCompanyMode(action.dataset.mode);
  if (action.dataset.action === "pilot-agreement") return togglePilotAgreement();
  if (action.dataset.action === "pilot-reapply") return reapplyPilotApplication();
  if (action.dataset.action === "operator-agreement") return toggleOperatorAgreement();
  if (action.dataset.action === "pilot-only-close") return closePilotOnlyDialog();
  if (action.dataset.action === "wechat-profile-auth") return updateWechatProfile();
  if (action.dataset.action === "address-new") return showNewAddressForm();
  if (action.dataset.action === "address-cancel") return closeAddressForm();
  if (action.dataset.action === "address-default") return updateAddressDefault(Number(action.dataset.id));
  if (action.dataset.action === "address-edit") return editAddress(Number(action.dataset.id));
  if (action.dataset.action === "address-delete") return deleteAddress(Number(action.dataset.id));
  if (action.dataset.action === "notification-open") return openNotification(action.dataset.id);
  if (action.dataset.action === "order-open") return openOrder(action.dataset.id);
  if (action.dataset.action === "product") {
    const list = currentProducts();
    state.selectedProduct = list.find(item => item.id === action.dataset.productId) || list[Number(action.dataset.index)];
    state.selectedSpecIndex = 0;
    state.orderQuantity = 1;
    state.productReviewFilter = "全部";
    navigate("product");
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.dataset.form === "order-search") {
    state.orderSearch = new FormData(event.target).get("keyword").trim();
    render();
    return;
  }
  if (event.target.dataset.form === "address") return saveAddress(event.target);
  if (event.target.dataset.form === "product-order") return submitProductOrder(event.target);
  if (event.target.dataset.form === "order-review") return submitOrderReview(event.target);
  if (event.target.dataset.form === "flight-report") return submitFlightReport(event.target);
  if (event.target.dataset.form === "pilot" && !state.pilotAgreement) {
    toast("请先勾选飞手入驻协议");
    return;
  }
  if (event.target.dataset.form === "pilot") return submitPilotApplication(event.target);
  if (event.target.dataset.form === "operator" && !state.operatorAgreement) {
    toast("请先勾选城市运营商入驻协议");
    return;
  }
  toast("申请已提交，奉飞飞顾问将尽快联系您");
  setTimeout(() => navigate("home"), 900);
});

document.addEventListener("change", (event) => {
  const upload = event.target.closest("input[type='file'][data-upload-label]");
  if (!upload) return;

  const control = upload.closest(".upload-control");
  const fileName = upload.files?.[0]?.name;
  control.classList.toggle("has-file", Boolean(fileName));
  control.querySelector("em").textContent = fileName || upload.dataset.uploadLabel;
  control.querySelector("small").textContent = fileName ? "图片已选择，可重新点击更换" : "支持 JPG / PNG 图片";
});

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-input]");
  if (!input) return;
  if (input.dataset.input === "order-review-content") return syncOrderReviewContent(input.value);
  if (input.dataset.input === "order-quantity-input") return syncOrderQuantity(input.value);
});

window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#/", "");
  if (page && page !== state.page) {
    state.page = page;
    if (!guardCurrentRoute()) return;
    render();
  }
});

if (guardCurrentRoute()) render();
