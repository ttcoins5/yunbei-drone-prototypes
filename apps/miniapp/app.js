import { products } from "./src/data/catalog.js";
import { state } from "./src/state/appState.js";
import { navigate, render } from "./src/router/navigation.js?v=profile-auto-role-1";
import { toast } from "./src/utils/toast.js";

function formatDateTime(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
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
  if (link.includes("/pages/products/index?type=sales")) return { type: "route", value: "products" };
  if (link.includes("/pages/products/index?type=rental")) return { type: "route", value: "rental" };
  if (link.includes("/pages/categories/index")) return { type: "route", value: "categories" };
  if (link.includes("/pages/maintenance/index")) return { type: "route", value: "booking" };
  if (link.includes("/pages/services/")) return { type: "route", value: "booking" };
  return { type: "route", value: "categories" };
}

function openHomepageNavLink(link, jumpType) {
  const target = resolveHomepageNavLink(link, jumpType);
  if (target.type === "external") {
    toast(`后台配置链接：${target.value}`);
    return;
  }
  navigate(target.value);
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
  render();
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
  toast("已提交报名意愿");
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

function selectProductSpec(index) {
  state.selectedSpecIndex = index;
  render();
}

function submitProductOrder(form) {
  const fields = Object.fromEntries(new FormData(form).entries());
  const spec = state.selectedProduct.specs?.[state.selectedSpecIndex] || state.selectedProduct;
  const orderNo = `ORD${Date.now()}`;
  state.pendingProductOrder = {
    orderNo,
    status: "待接单",
    productName: state.selectedProduct.name,
    specName: spec.name,
    amount: spec.price,
    time: fields.time,
    address: fields.address,
    phone: fields.phone,
    remark: fields.remark
  };
  state.orders = [
    {
      orderNo,
      status: "待接单",
      tab: "待接单",
      time: formatDateTime(),
      title: state.selectedProduct.name,
      spec: spec.name,
      price: spec.price,
      count: 1,
      paid: spec.price,
      serviceType: "预约服务",
      contactName: fields.phone.trim() ? "云北用户" : "",
      contactPhone: fields.phone.trim(),
      address: fields.address.trim(),
      remark: fields.remark.trim() || "暂无备注",
      timeline: [
        { time: formatDateTime(), title: "订单提交", desc: "已提交预约需求并完成支付" },
        { time: formatDateTime(), title: "待接单", desc: "订单已支付成功，等待平台接单" }
      ]
    },
    ...state.orders
  ];
  pushServiceNotification(orderNo, "待付款", "待接单");
  toast("支付成功，订单待接单");
  navigate("paymentResult");
}

function submitFlightReport(form) {
  const fields = Object.fromEntries(new FormData(form).entries());
  const report = {
    reportNo: `BB${Date.now()}`,
    pilot: fields.pilot.trim(),
    modelLicense: fields.modelLicense.trim(),
    sorties: Number(fields.sorties),
    duration: fields.duration.trim(),
    reportTime: fields.reportTime.trim(),
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
  render();
}

function setPilotCompanyMode(mode) {
  state.pilotCompanyMode = mode;
  render();
}

function togglePilotAgreement() {
  state.pilotAgreement = !state.pilotAgreement;
  render();
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

  if (action.dataset.action === "back") return navigate(state.history.pop() || "home", false);
  if (action.dataset.action === "toast") return toast(action.dataset.message);
  if (action.dataset.action === "contact-sheet") return showContactSheet();
  if (action.dataset.action === "contact-cancel") return closeContactSheet();
  if (action.dataset.action === "contact-phone") return chooseContact("phone");
  if (action.dataset.action === "contact-wechat") return chooseContact("wechat");
  if (action.dataset.action === "homepage-nav-link") return openHomepageNavLink(action.dataset.link, action.dataset.jumpType);
  if (action.dataset.action === "order-filter") return filterOrders(action.dataset.filter);
  if (action.dataset.action === "report-filter") return filterReports(action.dataset.filter);
  if (action.dataset.action === "task-hall-tab") return setTaskHallTab(action.dataset.tab);
  if (action.dataset.action === "pilot-task-join") return joinPilotTask(action.dataset.id);
  if (action.dataset.action === "pilot-order-open") return openAssignedPilotOrder(action.dataset.id);
  if (action.dataset.action === "pilot-order-complete") return completeAssignedPilotOrder(action.dataset.id);
  if (action.dataset.action === "product-spec") return selectProductSpec(Number(action.dataset.index));
  if (action.dataset.action === "invoice-tab") return setInvoiceTab(action.dataset.tab);
  if (action.dataset.action === "invoice-toggle") return toggleInvoiceOrder(action.dataset.id);
  if (action.dataset.action === "invoice-submit") return submitInvoice();
  if (action.dataset.action === "invoice-preview") return previewInvoice(action);
  if (action.dataset.action === "invoice-preview-close") { state.invoicePreview = null; return render(); }
  if (action.dataset.action === "pilot-type") return setPilotType(action.dataset.type);
  if (action.dataset.action === "pilot-company-mode") return setPilotCompanyMode(action.dataset.mode);
  if (action.dataset.action === "pilot-agreement") return togglePilotAgreement();
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
    state.selectedProduct = products[Number(action.dataset.index)];
    state.selectedSpecIndex = 0;
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
  if (event.target.dataset.form === "flight-report") return submitFlightReport(event.target);
  if (event.target.dataset.form === "pilot" && !state.pilotAgreement) {
    toast("请先勾选飞手入驻协议");
    return;
  }
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

window.addEventListener("hashchange", () => {
  const page = location.hash.replace("#/", "");
  if (page && page !== state.page) {
    state.page = page;
    if (!guardCurrentRoute()) return;
    render();
  }
});

if (guardCurrentRoute()) render();
