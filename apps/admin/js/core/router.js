const titles = DroneAdmin.titles;
const pageDocs = DroneAdmin.docs;

function docPanel() {
  const doc = pageDocs[state.page] || pageDocs.dashboard;
  const open = state.docPanelOpen;
  const fieldRows = doc.fields.map(([name, desc]) => `<div class="doc-field"><dt>${name}</dt><dd>${desc}</dd></div>`).join("");
  if (!open) {
    return `<aside class="doc-panel collapsed"><button class="doc-tab" data-action="toggle-doc-panel">说明</button></aside>`;
  }
  return `<aside class="doc-panel">
    <div class="doc-panel-body">
      <div class="doc-panel-head">
        <div><strong>页面说明</strong><span class="muted">${titles[state.page] || "工作台"}</span></div>
        <button class="button small" data-action="toggle-doc-panel">收起</button>
      </div>
      <div class="doc-panel-content">
        <section class="doc-block"><h3>页面概述</h3><p>${doc.summary}</p></section>
        <section class="doc-block"><h3>操作逻辑</h3><ol>${doc.operations.map(item => `<li>${item}</li>`).join("")}</ol></section>
        <section class="doc-block"><h3>字段说明</h3><dl class="doc-fields">${fieldRows}</dl></section>
      </div>
    </div>
  </aside>`;
}

function loginPage() {
  return `<main class="login-page"><section class="login-card">
    <div class="login-intro">
      <div>
        <div class="login-brand">${logo("large")}<h1>奉飞飞无人机平台</h1></div>
        <p>后台管理交互原型<br>用于确认页面结构、功能范围与核心业务流程。</p>
      </div>
      <small>Prototype V1 · 静态演示数据</small>
    </div>
    <form class="login-form" id="loginForm">
      <h2>管理员登录</h2><p>请输入后台账号和密码</p>
      <div class="form-field"><label>账号</label><input name="account" value="admin" required></div>
      <div class="form-field"><label>密码</label><input name="password" type="password" value="123456" required></div>
      <label class="switch"><input type="checkbox" checked> 记住账号</label>
      <button class="login-button" type="submit">登录后台</button>
      <div class="login-tip">原型演示：输入任意非空账号和密码即可登录</div>
    </form>
  </section></main>`;
}

function sidebar() {
  const activeRoute = navActiveRoute();
  return `<aside class="sidebar">
    <div class="brand">${logo()}<div><strong>奉飞飞无人机平台</strong><small>后台管理原型</small></div></div>
    <nav class="nav">${menu.map(item => {
      const children = item.children || [];
      const parentActive = !children.length
        ? activeRoute === item.id
        : children.some(child => child.id === activeRoute);
      return `<div class="nav-group">
        <button class="nav-parent${parentActive ? " active" : ""}" data-route="${children[0]?.id || item.id}"><span>${item.icon}</span>${item.label}${children.length ? `<span class="arrow">⌄</span>` : ""}</button>
        ${children.length ? `<div class="nav-children">${children.map(child => `<button class="nav-child ${activeRoute === child.id ? "active" : ""}" data-route="${child.id}">${child.label}</button>`).join("")}</div>` : ""}
      </div>`;
    }).join("")}</nav>
    <div class="sidebar-foot"><div class="admin-chip"><span class="avatar">管</span><span>平台管理员<br><small>单一管理员视角</small></span></div></div>
  </aside>`;
}

function topbar() {
  return `<header class="topbar">
    <div><div class="crumb">奉飞飞无人机后台 / ${titles[state.page] || "工作台"}</div><h1>${titles[state.page] || "工作台"}</h1></div>
    <div class="top-actions"><span class="tag">低保真 V1</span>${button("复制页面链接", "copy-link")}${button("退出", "logout")}</div>
  </header>`;
}

function pageContent() {
  const page = DroneAdmin.pages[state.page] || DroneAdmin.pages.dashboard;
  return page ? page() : "";
}

function render() {
  const app = document.getElementById("app");
  if (!state.loggedIn) {
    destroyProductEditor();
    app.innerHTML = loginPage();
    document.getElementById("loginForm").addEventListener("submit", event => {
      event.preventDefault();
      state.loggedIn = true;
      sessionStorage.setItem("droneAdminLogin", "1");
      render();
    });
    return;
  }
  destroyRichEditor();
  app.innerHTML = `<div class="shell">${sidebar()}<main class="main">${topbar()}<div class="page-layout"><div class="page">${pageContent()}</div>${docPanel()}</div></main></div>`;
  const afterRender = DroneAdmin.afterRender[state.page];
  if (afterRender) requestAnimationFrame(afterRender);
}

function navigate(route) {
  if (route === state.page) return;
  state.history.push(state.page);
  state.page = route;
  location.hash = `#/${route}`;
  render();
}
