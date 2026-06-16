function dispatchAction(target, collection) {
  if (!target || target.disabled) return false;
  const handler = collection[target.dataset.action];
  if (!handler) return false;
  handler(target);
  return true;
}

document.addEventListener("click", event => {
  const route = event.target.closest("[data-route]");
  if (route) {
    DroneAdmin.beforeNavigate.forEach(handler => handler(route));
    navigate(route.dataset.route);
    return;
  }

  const target = event.target.closest("[data-action]");
  if (!target || target.disabled) return;
  const action = target.dataset.action;

  if (action === "logout") {
    state.loggedIn = false;
    sessionStorage.removeItem("droneAdminLogin");
    render();
  } else if (action === "copy-link") {
    navigator.clipboard?.writeText(location.href);
    toast("当前页面链接已复制");
  } else if (action === "toggle-doc-panel") {
    state.docPanelOpen = !state.docPanelOpen;
    localStorage.setItem("droneAdminDocPanel", state.docPanelOpen ? "1" : "0");
    render();
  } else if (action === "filter") {
    toast("已按当前条件筛选（模拟）");
  } else if (action === "close-modal") {
    DroneAdmin.closeHooks.forEach(handler => handler());
    closeModal();
  } else if (action === "list-page-prev") {
    const pg = getListPage(target.dataset.listKey);
    if (pg.page > 1) {
      pg.page--;
      render();
    }
  } else if (action === "list-page-next") {
    const pg = getListPage(target.dataset.listKey);
    pg.page++;
    render();
  } else {
    dispatchAction(target, DroneAdmin.actions);
  }
});

document.addEventListener("change", event => {
  const target = event.target;
  if (target.dataset.action === "list-page-size") {
    const pg = getListPage(target.dataset.listKey);
    pg.pageSize = Number(target.value);
    pg.page = 1;
    render();
    return;
  }
  dispatchAction(target, DroneAdmin.changeActions);
});

window.addEventListener("hashchange", () => {
  const route = location.hash.replace("#/", "");
  if (route && route !== state.page) {
    state.page = route;
    render();
  }
});
