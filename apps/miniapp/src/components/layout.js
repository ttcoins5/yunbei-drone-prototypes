import { state } from "../state/appState.js?v=pilot-default-2";

function contactSheet() {
  if (!state.showContactSheet) return "";

  return `<div class="sheet-mask" data-action="contact-cancel">
    <section class="contact-sheet" role="dialog" aria-label="联系客服选项">
      <button data-action="contact-phone">电话客服</button>
      <button data-action="contact-wechat">微信客服</button>
      <button class="contact-sheet-cancel" data-action="contact-cancel">取消</button>
    </section>
  </div>`;
}

function pilotOnlyDialog() {
  if (!state.showPilotOnlyDialog) return "";

  return `<div class="dialog-mask">
    <section class="pilot-only-dialog" role="dialog" aria-label="飞手权限提示">
      <b>飞手权限未开通</b>
      <p>该功能仅认证飞手可使用。申请通过后，系统会根据手机号授权自动识别身份。</p>
      <button data-action="pilot-only-close">我知道了</button>
    </section>
  </div>`;
}

export function shell(content, options = {}) {
  const { title = "", back = false, tab = state.tab } = options;
  return `<div class="preview-shell">
    <div class="phone">
      <div class="status"><span>10:28</span><span>5G · 92%</span></div>
      ${title ? `<header class="page-head">${back ? `<button data-action="back">‹</button>` : `<span></span>`}<h1>${title}</h1><span>•••</span></header>` : ""}
      <div class="page-content">${content}</div>
      <nav class="tabbar">
        <button class="${tab === "home" ? "active" : ""}" data-route="home"><b>⌂</b>首页</button>
        <button class="${tab === "orders" ? "active" : ""}" data-route="orders"><b>≡</b>订单</button>
        <button class="${tab === "messages" ? "active" : ""}" data-route="messages"><b>✉</b>消息</button>
        <button class="${tab === "profile" ? "active" : ""}" data-route="profile"><b>♙</b>我的</button>
      </nav>
      ${contactSheet()}
      ${pilotOnlyDialog()}
    </div>
    <aside class="review-note"><span>FENGFEIFEI PROTOTYPE</span><h2>${title || "奉飞飞首页"}</h2><p>蓝绿冷静科技风 · Image 2 品牌头图 · HTML 可交互原型</p></aside>
  </div>`;
}
