const permissionCatalog = DroneAdmin.data.permissionCatalog = [
  { id: "dashboard", group: "工作台", label: "工作台" },
  { id: "carousel", group: "小程序配置", label: "轮播图配置" },
  { id: "homepage-nav", group: "小程序配置", label: "导航配置" },
  { id: "case-showcase", group: "小程序配置", label: "案例展示配置" },
  { id: "users", group: "用户管理", label: "用户列表" },
  { id: "admin-users", group: "系统权限", label: "后台用户" },
  { id: "roles", group: "系统权限", label: "角色管理" },
  { id: "categories", group: "商品管理", label: "商品分类管理" },
  { id: "products", group: "商品管理", label: "商品列表" },
  { id: "orders", group: "订单管理", label: "订单列表" },
  { id: "operator-applications", group: "运营管理", label: "运营商申请" },
  { id: "feedbacks", group: "运营管理", label: "意见反馈" },
  { id: "pilot-applications", group: "飞手管理", label: "入驻申请" },
  { id: "pilots", group: "飞手管理", label: "已认证飞手" },
  { id: "flight-reports", group: "飞手管理", label: "飞行报备管理" },
  { id: "tasks", group: "任务大厅", label: "任务大厅" },
  { id: "invoices", group: "发票中心", label: "发票中心" },
  { id: "about", group: "关于我们", label: "关于我们" }
];

const adminRoles = DroneAdmin.data.adminRoles = [
  {
    id: "role-super-admin",
    name: "超级管理员",
    description: "拥有全部后台页面权限，可管理后台用户与角色。",
    permissions: permissionCatalog.map(item => item.id),
    locked: true
  },
  {
    id: "role-ops",
    name: "运营管理员",
    description: "负责商品、订单、首页和运营内容维护。",
    permissions: ["dashboard", "carousel", "homepage-nav", "case-showcase", "categories", "products", "orders", "operator-applications", "feedbacks", "invoices", "about"],
    locked: false
  },
  {
    id: "role-dispatch",
    name: "派单调度",
    description: "负责订单派单、飞手和任务大厅相关页面。",
    permissions: ["dashboard", "orders", "pilot-applications", "pilots", "flight-reports", "tasks"],
    locked: false
  },
  {
    id: "role-finance",
    name: "财务",
    description: "只查看订单与发票相关页面。",
    permissions: ["dashboard", "orders", "invoices"],
    locked: false
  }
];

const adminUsers = DroneAdmin.data.adminUsers = [
  { id: "admin-1", name: "平台管理员", account: "admin", phone: "138****0001", roleId: "role-super-admin", status: "启用", lastLogin: "2026-06-17 09:30" },
  { id: "admin-2", name: "运营小唐", account: "ops_tang", phone: "138****8821", roleId: "role-ops", status: "启用", lastLogin: "2026-06-16 18:12" },
  { id: "admin-3", name: "调度小林", account: "dispatch_lin", phone: "137****5528", roleId: "role-dispatch", status: "启用", lastLogin: "2026-06-17 08:45" },
  { id: "admin-4", name: "财务小周", account: "finance_zhou", phone: "136****1175", roleId: "role-finance", status: "停用", lastLogin: "2026-06-10 15:20" }
];

function currentAdminUser() {
  return adminUsers.find(item => item.id === state.currentAdminUserId) || adminUsers[0];
}

function currentAdminRole() {
  return adminRoles.find(item => item.id === currentAdminUser().roleId) || adminRoles[0];
}

function canAccessRoute(route) {
  const active = navActiveRoute(route);
  return currentAdminRole().permissions.includes(active);
}

function firstAllowedRoute() {
  return permissionCatalog.find(item => canAccessRoute(item.id))?.id || "dashboard";
}

function roleName(roleId) {
  return adminRoles.find(item => item.id === roleId)?.name || "未分配角色";
}

function permissionGroups() {
  return permissionCatalog.reduce((groups, item) => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
    return groups;
  }, {});
}

function adminUsersPage() {
  const rows = adminUsers.map(user => [
    user.name,
    user.account,
    user.phone,
    roleName(user.roleId),
    tag(user.status),
    user.lastLogin,
    `<div class="row-actions">${button("切换视角", "switch-admin-user", "small", `data-id="${user.id}"`)}${button("编辑", "admin-user-edit", "small", `data-id="${user.id}"`)}</div>`
  ]);
  return panel("后台用户", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="姓名 / 账号 / 手机号">${button("查询","filter","primary")}
    <span class="spacer"></span>${button("新增后台用户", "admin-user-edit", "primary")}
  </div>${paginatedTable("admin-users", ["姓名","账号","手机号","角色","状态","最近登录","操作"], rows)}
  <p class="muted" style="margin:12px 0 0">原型中「切换视角」用于模拟不同角色登录后可见菜单差异。</p>`);
}

function roleOptions(selected = "") {
  return adminRoles.map(role => `<option value="${role.id}"${role.id === selected ? " selected" : ""}>${role.name}</option>`).join("");
}

function openAdminUserModal(user = null) {
  const draft = user || { id: "", name: "", account: "", phone: "", roleId: "role-ops", status: "启用" };
  state.editingAdminUserId = user?.id || null;
  modal(user ? "编辑后台用户" : "新增后台用户", formGrid([
    { label: "姓名", html: `<input id="admin-user-name" value="${draft.name}" placeholder="请输入姓名">` },
    { label: "登录账号", html: `<input id="admin-user-account" value="${draft.account}" placeholder="请输入登录账号">` },
    { label: "手机号", html: `<input id="admin-user-phone" value="${draft.phone}" placeholder="请输入手机号">` },
    { label: "角色", html: `<select id="admin-user-role">${roleOptions(draft.roleId)}</select>` },
    { label: "状态", html: `<select id="admin-user-status"><option${draft.status === "启用" ? " selected" : ""}>启用</option><option${draft.status === "停用" ? " selected" : ""}>停用</option></select>` }
  ]), `${button("取消","close-modal")}${button("保存用户","save-admin-user","primary")}`, true);
}

function rolesPage() {
  const rows = adminRoles.map(role => [
    role.name,
    role.description,
    role.locked ? tag("系统内置") : tag("可编辑"),
    `<div class="row-actions">${button("编辑权限", "role-edit", "small", `data-id="${role.id}"`)}${role.locked ? "" : button("删除", "delete-role", "small danger", `data-id="${role.id}"`)}</div>`
  ]);
  return panel("角色管理", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="角色名称">${button("查询","filter","primary")}
    <span class="spacer"></span>${button("新增角色", "role-edit", "primary")}
  </div>${paginatedTable("roles", ["角色名称","角色说明","状态","操作"], rows)}
  <p class="muted" style="margin:12px 0 0">勾选权限后，该角色登录时左侧菜单只展示已授权页面；直接访问未授权路由会跳转到首个可见页面。</p>`);
}

function openRoleModal(role = null) {
  const draft = role || { id: "", name: "", description: "", permissions: ["dashboard"], locked: false };
  state.editingRoleId = role?.id || null;
  const groups = permissionGroups();
  const matrix = Object.entries(groups).map(([group, items]) => `<section class="permission-group">
    <h3>${group}</h3>
    <div class="permission-options">
      ${items.map(item => `<label><input type="checkbox" name="permission" value="${item.id}"${draft.permissions.includes(item.id) ? " checked" : ""}${draft.locked ? " disabled" : ""}>${item.label}</label>`).join("")}
    </div>
  </section>`).join("");
  modal(role ? "编辑角色权限" : "新增角色", formGrid([
    { label: "角色名称", html: `<input id="role-name" value="${draft.name}" placeholder="请输入角色名称"${draft.locked ? " disabled" : ""}>` },
    { label: "角色说明", wide: true, html: `<textarea id="role-description" placeholder="请输入角色说明"${draft.locked ? " disabled" : ""}>${draft.description}</textarea>` },
    { label: "页面权限", wide: true, html: `<div class="permission-matrix">${matrix}</div>` }
  ]).replace("form-grid", "form-grid role-form-grid"), `${button("取消","close-modal")}${draft.locked ? "" : button("保存角色","save-role","primary")}`, true);
}

function saveAdminUserFromModal() {
  const name = document.getElementById("admin-user-name")?.value.trim();
  const account = document.getElementById("admin-user-account")?.value.trim();
  if (!name || !account) {
    toast("请填写姓名和登录账号");
    return false;
  }
  const payload = {
    id: state.editingAdminUserId || `admin-${Date.now()}`,
    name,
    account,
    phone: document.getElementById("admin-user-phone")?.value.trim() || "—",
    roleId: document.getElementById("admin-user-role")?.value || "role-ops",
    status: document.getElementById("admin-user-status")?.value || "启用",
    lastLogin: state.editingAdminUserId ? (adminUsers.find(item => item.id === state.editingAdminUserId)?.lastLogin || "—") : "尚未登录"
  };
  if (state.editingAdminUserId) {
    const index = adminUsers.findIndex(item => item.id === state.editingAdminUserId);
    if (index >= 0) adminUsers[index] = payload;
  } else {
    adminUsers.unshift(payload);
  }
  return true;
}

function saveRoleFromModal() {
  const name = document.getElementById("role-name")?.value.trim();
  if (!name) {
    toast("请填写角色名称");
    return false;
  }
  const permissions = [...document.querySelectorAll("input[name='permission']:checked")].map(item => item.value);
  if (!permissions.length) {
    toast("请至少勾选一个页面权限");
    return false;
  }
  const payload = {
    id: state.editingRoleId || `role-${Date.now()}`,
    name,
    description: document.getElementById("role-description")?.value.trim() || "自定义后台角色",
    permissions,
    locked: false
  };
  if (state.editingRoleId) {
    const index = adminRoles.findIndex(item => item.id === state.editingRoleId);
    if (index >= 0) adminRoles[index] = payload;
  } else {
    adminRoles.push(payload);
  }
  return true;
}

DroneAdmin.registerModule({
  id: "access-control",
  routes: ["admin-users", "roles"],
  titles: {
    "admin-users": "后台用户",
    "roles": "角色管理"
  },
  docs: {
    "admin-users": {
      summary: "管理可登录后台的管理员账号，并为每个账号分配一个后台角色。",
      operations: [
        "新增或编辑后台用户，维护姓名、登录账号、手机号、角色和状态",
        "点击「切换视角」模拟该后台用户登录，左侧菜单按角色权限过滤",
        "停用状态在原型中只做展示，真实系统应禁止登录"
      ],
      fields: [["姓名","后台用户真实姓名"],["登录账号","后台登录账号"],["手机号","用于联系和二次验证"],["角色","决定该用户可见页面"],["状态","启用或停用"],["最近登录","最近一次登录后台的时间"]]
    },
    "roles": {
      summary: "维护后台角色与页面权限，不同角色登录后只能看到已授权页面。",
      operations: [
        "新增角色并勾选页面权限",
        "编辑已有角色权限，保存后对应后台用户立即按新权限展示菜单",
        "超级管理员为系统内置角色，不允许删除或修改权限"
      ],
      fields: [["角色名称","后台角色展示名称"],["角色说明","说明该角色职责范围"],["状态","系统内置或可编辑"],["操作","编辑该角色的页面权限或删除自定义角色"]]
    }
  },
  pages: {
    "admin-users": adminUsersPage,
    "roles": rolesPage
  },
  actions: {
    "switch-admin-user": function (target) {
      const user = adminUsers.find(item => item.id === target.dataset.id);
      if (!user) return;
      if (user.status !== "启用") {
        toast("该后台用户已停用");
        return;
      }
      state.currentAdminUserId = user.id;
      if (!canAccessRoute(state.page)) state.page = firstAllowedRoute();
      render();
      toast(`已切换为${user.name}视角`);
    },
    "admin-user-edit": function (target) {
      const user = adminUsers.find(item => item.id === target.dataset.id);
      openAdminUserModal(user || null);
    },
    "save-admin-user": function () {
      if (saveAdminUserFromModal()) {
        state.editingAdminUserId = null;
        closeModal();
        render();
        toast("后台用户已保存");
      }
    },
    "role-edit": function (target) {
      const role = adminRoles.find(item => item.id === target.dataset.id);
      openRoleModal(role || null);
    },
    "save-role": function () {
      if (saveRoleFromModal()) {
        state.editingRoleId = null;
        closeModal();
        render();
        toast("角色已保存");
      }
    },
    "delete-role": function (target) {
      const role = adminRoles.find(item => item.id === target.dataset.id);
      if (!role || role.locked) return;
      if (adminUsers.some(user => user.roleId === role.id)) {
        toast("已有后台用户使用该角色，不可删除");
        return;
      }
      const index = adminRoles.findIndex(item => item.id === role.id);
      if (index >= 0) adminRoles.splice(index, 1);
      render();
      toast("角色已删除");
    }
  },
  changeActions: {},
  afterRender: {},
  beforeNavigate: null,
  onClose: function () {
    state.editingAdminUserId = null;
    state.editingRoleId = null;
  }
});
