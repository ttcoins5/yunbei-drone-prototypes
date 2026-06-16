function logo(size = "") {
  return `<span class="logo ${size}">
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="12" cy="13" r="6"></circle><circle cx="36" cy="13" r="6"></circle>
      <circle cx="12" cy="35" r="6"></circle><circle cx="36" cy="35" r="6"></circle>
      <path d="M16 16l5 5m11-5-5 5m-11 11 5-5m11 5-5-5M18 24h12"></path>
      <rect x="20" y="19" width="8" height="10" rx="3"></rect>
    </svg>
  </span>`;
}

function button(text, action, cls = "", attrs = "") {
  return `<button class="button ${cls}" data-action="${action}" ${attrs}>${text}</button>`;
}

function routeButton(text, route, cls = "") {
  return `<button class="button ${cls}" data-route="${route}">${text}</button>`;
}

function opButton(text, action, cls = "", attrs = "") {
  const styles = cls ? `small ${cls}` : "small";
  return `<div class="actions">${button(text, action, styles, attrs)}</div>`;
}

function opRoute(text, route, cls = "", attrs = "") {
  return `<div class="actions"><button class="button ${cls || "small"}" data-route="${route}" ${attrs}>${text}</button></div>`;
}

function tag(text) {
  const cls = /完成|通过|上架|转化|开票/.test(text) ? "green"
    : /待|审核|联系/.test(text) ? "amber"
    : /驳回|下架|关闭/.test(text) ? "red" : "blue";
  return `<span class="tag ${cls}">${text}</span>`;
}

function table(headers, rows, cls = "") {
  return `<table class="${cls}"><thead><tr>${headers.map(x => `<th>${x}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function panel(title, body, actions = "") {
  return `<section class="panel"><div class="panel-head"><h2>${title}</h2><div class="toolbar">${actions}</div></div><div class="panel-body">${body}</div></section>`;
}

function detailGrid(items) {
  return `<dl class="detail-grid">${items.map(([key, value, wide]) => `<div class="detail-item${wide ? " span-2" : ""}"><dt>${key}</dt><dd>${value}</dd></div>`).join("")}</dl>`;
}

function formGrid(fields) {
  return `<div class="form-grid">${fields.map(field => `<div class="form-field ${field.wide ? "span-2" : ""}">
    <label>${field.label}</label>${field.html}
  </div>`).join("")}</div>`;
}

function imageMissingIcon() {
  return `<svg class="img-missing-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
    <circle cx="8.5" cy="9.5" r="1.6"></circle>
    <path d="M21 16l-5-5-6 6-3-3-4 4"></path>
    <path class="img-missing-slash" d="M4 4l16 16"></path>
  </svg>`;
}

function thumb(hasImage, { title = "", size = "" } = {}) {
  const cls = `thumb ${size} ${hasImage ? "" : "thumb-missing"}`.trim();
  const inner = hasImage ? `<span class="thumb-img">图</span>` : imageMissingIcon();
  const attr = title ? ` title="${title}"` : "";
  return `<span class="${cls}"${attr}>${inner}</span>`;
}

function rowActions({ edit, moveAction, deleteAction, id, index, total }) {
  const editBtn = edit ? button("编辑", edit, "small", `data-id="${id}"`) : "";
  const up = button("上移", moveAction, "small", `data-id="${id}" data-dir="-1"${index === 0 ? " disabled" : ""}`);
  const down = button("下移", moveAction, "small", `data-id="${id}" data-dir="1"${index === total - 1 ? " disabled" : ""}`);
  return `<div class="row-actions">${editBtn}${up}${down}${button("删除", deleteAction, "small danger", `data-id="${id}"`)}</div>`;
}

function getListPage(key) {
  if (!state.listPages[key]) state.listPages[key] = { page: 1, pageSize: 5 };
  return state.listPages[key];
}

function paginateItems(items, key) {
  const config = getListPage(key);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / config.pageSize));
  if (config.page > totalPages) config.page = totalPages;
  const start = (config.page - 1) * config.pageSize;
  return {
    items: items.slice(start, start + config.pageSize),
    total,
    page: config.page,
    pageSize: config.pageSize
  };
}

function listPagination({ total, page, pageSize, key }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return `<div class="list-pagination">
    <span class="list-pagination-total">总数：<strong>${total}</strong></span>
    <div class="list-pagination-controls">
      ${button("‹", "list-page-prev", "small", `data-list-key="${key}"${page <= 1 ? " disabled" : ""}`)}
      <span class="list-pagination-current">${page}</span>
      ${button("›", "list-page-next", "small", `data-list-key="${key}"${page >= totalPages ? " disabled" : ""}`)}
    </div>
    <label class="list-pagination-size"><select data-action="list-page-size" data-list-key="${key}">
      ${[5, 10, 20].map(size => `<option value="${size}"${size === pageSize ? " selected" : ""}>${size}</option>`).join("")}
    </select> / 页</label>
  </div>`;
}

function paginatedTable(key, headers, rows, cls = "") {
  const { items, total, page, pageSize } = paginateItems(rows, key);
  const tableHtml = total ? table(headers, items, cls) : `<p class="empty">无数据</p>`;
  const pagination = total ? listPagination({ total, page, pageSize, key }) : "";
  return `${tableHtml}${pagination}`;
}

function toast(message) {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { node.hidden = true; }, 2200);
}

function modal(title, body, footer = "", wide = false) {
  document.getElementById("overlay").innerHTML = `<div class="overlay">
    <section class="modal ${wide ? "wide" : ""}">
      <div class="modal-head"><h2>${title}</h2><button class="close" data-action="close-modal">×</button></div>
      <div class="modal-body">${body}</div>
      ${footer ? `<div class="modal-foot">${footer}</div>` : ""}
    </section>
  </div>`;
}

function closeModal() {
  destroyRichEditor();
  document.getElementById("overlay").innerHTML = "";
}
