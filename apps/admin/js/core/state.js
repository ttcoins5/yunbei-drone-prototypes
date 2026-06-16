const menu = [
  { id: "dashboard", label: "工作台", icon: "台" },
  { id: "homepage", label: "首页配置", icon: "首", children: [
    { id: "carousel", label: "轮播图配置" },
    { id: "homepage-nav", label: "导航配置" }
  ]},
  { id: "users", label: "用户管理", icon: "用", children: [
    { id: "users", label: "用户列表" }
  ]},
  { id: "categories", label: "商品管理", icon: "商", children: [
    { id: "categories", label: "商品分类管理" },
    { id: "products", label: "商品列表" }
  ]},
  { id: "orders", label: "订单管理", icon: "单", children: [
    { id: "orders", label: "订单列表" }
  ]},
  { id: "training", label: "培训管理", icon: "培" },
  { id: "operator-applications", label: "运营管理", icon: "运", children: [
    { id: "operator-applications", label: "运营商申请" },
    { id: "feedbacks", label: "意见反馈" }
  ]},
  { id: "pilot-applications", label: "飞手管理", icon: "飞", children: [
    { id: "pilot-applications", label: "入驻申请" },
    { id: "pilots", label: "已认证飞手" },
    { id: "flight-reports", label: "飞行报备管理" },
    { id: "tasks", label: "任务需求与意愿" }
  ]},
  { id: "invoices", label: "发票中心", icon: "票" },
  { id: "about", label: "关于我们", icon: "企" }
];

const navRouteAlias = {
  "user-detail": "users",
  "product-edit": "products",
  "order-detail": "orders",
  "training-detail": "training",
  "operator-application-detail": "operator-applications",
  "feedback-detail": "feedbacks",
  "pilot-review": "pilot-applications",
  "pilot-detail": "pilots",
  "flight-report-detail": "flight-reports",
  "task-detail": "tasks",
  "invoice-detail": "invoices"
};

function navActiveRoute(page = state.page) {
  return navRouteAlias[page] || page;
}

const state = {
  "loggedIn": null,
  "page": null,
  "history": [],
  "dashboardMetric": "today-orders",
  "assignedPilots": [],
  "listPages": {},
  "docPanelOpen": null,
  "richEditor": null,
  "richEditorToolbar": null
};
state.loggedIn = sessionStorage.getItem("droneAdminLogin") === "1";
state.page = location.hash.replace("#/", "") || "dashboard";
state.docPanelOpen = localStorage.getItem("droneAdminDocPanel") !== "0";
