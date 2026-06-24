import { state } from "../state/appState.js?v=miniapp-live-20260624-task-detail-clean-1";

function contactSheet() {
  if (!state.showContactSheet) return "";

  return `<div class="dialog-mask">
    <button class="dialog-backdrop" type="button" aria-label="关闭弹窗" data-action="contact-cancel"></button>
    <section class="contact-confirm-dialog" role="dialog" aria-label="联系客服">
      <b>联系客服</b>
      <p>客服电话：0577-55558188<br>工作时间：工作日 9:00-18:00</p>
      <div class="contact-confirm-actions">
        <button type="button" data-action="contact-cancel">取消</button>
        <button type="button" data-action="contact-phone">拨打电话</button>
      </div>
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

function logoutDialog() {
  if (!state.showLogoutConfirm) return "";

  return `<div class="dialog-mask">
    <button class="dialog-backdrop" type="button" aria-label="关闭弹窗" data-action="logout-cancel"></button>
    <section class="contact-confirm-dialog logout-confirm-dialog" role="dialog" aria-label="退出登录">
      <b>退出登录</b>
      <p>退出后需要重新授权手机号，才能继续查看个人资料、订单和服务信息。</p>
      <div class="contact-confirm-actions">
        <button type="button" data-action="logout-cancel">取消</button>
        <button type="button" data-action="logout-submit">确认退出</button>
      </div>
    </section>
  </div>`;
}

function pilotCompletionProofDialog() {
  if (!state.showPilotCompletionProof) return "";

  return `<div class="dialog-mask">
    <button class="dialog-backdrop" type="button" aria-label="关闭弹窗" data-action="pilot-proof-cancel"></button>
    <section class="pilot-proof-dialog" role="dialog" aria-label="上传交付照片">
      <b>上传交付照片</b>
      <p>最多上传 3 张现场交付照片，并填写交付说明。照片仅进入后台订单详情留存，不在飞手端详情展示。</p>
      <label class="upload-field"><span>交付照片</span><span class="upload-control pilot-proof-upload">
        <input name="pilotProofPhotos" type="file" accept="image/*" multiple data-upload-label="添加交付照片">
        <b>+</b><em>添加交付照片</em><small>支持 JPG / PNG，最多 3 张</small>
      </span></label>
      <label><span>交付说明</span><textarea name="pilotProofRemark" placeholder="请输入交付说明">现场服务已完成，成果已交付客户确认。</textarea></label>
      <div class="pilot-proof-actions">
        <button type="button" data-action="pilot-proof-cancel">取消</button>
        <button type="button" data-action="pilot-proof-submit">确认完成</button>
      </div>
    </section>
  </div>`;
}

function taskDescriptionDialog() {
  if (!state.viewingTaskDescriptionId) return "";
  const task = state.pilotTasks.find(item => item.id === state.viewingTaskDescriptionId);
  if (!task) return "";

  return `<div class="dialog-mask">
    <button class="dialog-backdrop" type="button" aria-label="关闭弹窗" data-action="task-description-close"></button>
    <section class="task-description-dialog" role="dialog" aria-label="附文本说明">
      <span>附文本说明</span>
      <b>${task.title}</b>
      <div class="task-description-content">${task.description || "<p>暂无附文本说明。</p>"}</div>
      <button type="button" data-action="task-description-close">我知道了</button>
    </section>
  </div>`;
}

export function shell(content, options = {}) {
  const { title = "", back = false, tab = state.tab, hideTabbar = false } = options;
  return `<div class="preview-shell">
    <div class="phone">
      <div class="status"><span>10:28</span><span>5G · 92%</span></div>
      ${title ? `<header class="page-head">${back ? `<button data-action="back">‹</button>` : `<span></span>`}<h1>${title}</h1><span>•••</span></header>` : ""}
      <div class="page-content ${hideTabbar ? "no-tabbar" : ""}">${content}</div>
      ${hideTabbar ? "" : `<nav class="tabbar">
        <button class="${tab === "home" ? "active" : ""}" data-route="home"><b>⌂</b>首页</button>
        <button class="${tab === "orders" ? "active" : ""}" data-route="orders"><b>≡</b>订单</button>
        <button class="${tab === "messages" ? "active" : ""}" data-route="serviceNotifications"><b>✉</b>消息</button>
        <button class="${tab === "profile" ? "active" : ""}" data-route="profile"><b>♙</b>我的</button>
      </nav>`}
      ${contactSheet()}
      ${pilotOnlyDialog()}
      ${logoutDialog()}
      ${pilotCompletionProofDialog()}
      ${taskDescriptionDialog()}
    </div>
    <aside class="review-note"><span>FENGFEIFEI PROTOTYPE</span><h2>${title || "奉飞飞首页"}</h2><p>蓝绿冷静科技风 · Image 2 品牌头图 · HTML 可交互原型</p></aside>
  </div>`;
}
