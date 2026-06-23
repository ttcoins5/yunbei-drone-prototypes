import { orderStatuses, serviceModules } from "../data/catalog.js?v=orders-list-refresh-1";
import { orderIcon, serviceIcon } from "../components/icons.js";
import { shell } from "../components/layout.js?v=orders-list-refresh-1";
import { state } from "../state/appState.js?v=orders-list-refresh-1";

function isPilot() {
  return state.userProfile.role === "pilot";
}

function userRoleLabel() {
  return isPilot() ? "认证飞手" : "普通用户";
}

function profileAvatar(size = "") {
  return `<span class="profile-avatar-text ${size}">${state.userProfile.avatarText}</span>`;
}

function pilotStatusMeta(status) {
  if (status === "已通过") {
    return {
      className: "approved",
      title: "审核已通过",
      desc: "飞手权限已开通，可进入任务大厅、飞行报备和我的服务。",
      tag: "已通过"
    };
  }
  if (status === "已驳回") {
    return {
      className: "rejected",
      title: "申请已驳回",
      desc: "请根据驳回原因修改资料后重新提交申请。",
      tag: "已驳回"
    };
  }
  return {
    className: "pending",
    title: "申请审核中",
    desc: "平台正在核验身份、执照和设备信息，审核结果会通过服务通知同步。",
    tag: "待审核"
  };
}

export function profilePage() {
  if (!state.isLoggedIn) return loginPage();

  return shell(`<div class="profile-page">
    <button class="profile-hero" data-route="profileDetail">
      <div class="profile-avatar">${profileAvatar()}</div>
      <div><h2>${state.userProfile.nickname}</h2><p>${userRoleLabel()} · 点击查看个人资料</p></div>
      <i>›</i>
    </button>
    <section class="profile-card">
      <div class="profile-card-title"><h3>我的订单</h3><button data-route="orders">查看全部 ›</button></div>
      <div class="order-status-grid">${orderStatuses.map(item => `<button data-route="${item.route}">${orderIcon(item)}<span>${item.name}</span></button>`).join("")}</div>
    </section>
    <section class="profile-card">
      <div class="profile-card-title"><h3>更多服务</h3></div>
      <div class="service-module-grid">${serviceModules.map(item => {
        const action = item.route === "contact" ? `data-action="contact-sheet"` : `data-route="${item.route}"`;
        return `<button ${action}>${serviceIcon(item)}<span>${item.name}</span></button>`;
      }).join("")}</div>
    </section>
  </div>`, { title: "个人中心", tab: "profile" });
}

export function profileDetailPage() {
  if (!state.isLoggedIn) return loginPage();

  const profile = state.userProfile;
  const fields = [
    ["头像", profileAvatar("large")],
    ["昵称", profile.nickname],
    ["手机号", profile.phone],
    ["性别", profile.gender],
    ["生日", profile.birthday],
    ["地区", profile.region]
  ];

  return shell(`<div class="profile-detail-page">
    <section class="profile-detail-hero">
      <div class="profile-detail-avatar">${profileAvatar("large")}</div>
      <div>
        <small>${profile.wechatAuthorized ? "WECHAT AUTHORIZED" : "PROFILE"}</small>
        <h2>${profile.nickname}</h2>
        <p>${userRoleLabel()} · ${profile.region}</p>
      </div>
    </section>
    <section class="profile-detail-card">
      <div class="profile-card-title"><h3>身份类型</h3></div>
      <div class="profile-identity-status">
        <span><b>${userRoleLabel()}</b><small>通过手机号授权自动识别</small></span>
        <em>${isPilot() ? "飞手权限已开通" : "未开通飞手权限"}</em>
      </div>
      <p class="profile-detail-tip">${isPilot() ? "飞手可进入任务大厅查看征集任务，并在我的服务处理已指派订单。" : "普通用户可正常下单、开票和联系客服；任务大厅和飞行报备需飞手申请通过后使用。"}</p>
    </section>
    <section class="profile-detail-card">
      <div class="profile-card-title"><h3>个人资料</h3></div>
      <div class="profile-field-list">
        ${fields.map(([label, value]) => `<div class="profile-field-row">
          <span><small>${label}</small><b>${value}</b></span>
        </div>`).join("")}
      </div>
    </section>
    <button class="profile-logout-button" data-action="logout-confirm">退出登录</button>
  </div>`, { title: "个人资料", back: true, tab: "profile" });
}

export function loginPage() {
  return shell(`<div class="login-page">
    <div class="login-mini-nav">
      <button type="button" data-route="home">‹</button>
      <span><i>•••</i><b></b></span>
    </div>
    <section class="login-brand">
      <span class="brand-mark login-logo" aria-label="奉飞飞图标"><i></i><i></i><i></i></span>
      <small>FENGFEIFEI</small>
      <h2>宁波泰安科技有限公司</h2>
    </section>
    <button class="login-phone-button" data-action="phone-auth-open">手机号快捷登录</button>
    <label class="login-agreement">
      <button type="button" class="${state.loginAgreement ? "checked" : ""}" data-action="login-agreement" aria-pressed="${state.loginAgreement}"></button>
      <span>我已阅读并同意 <b>《奉飞飞用户协议》</b> 和 <b>《隐私政策》</b><br>，并同意本机号码登录</span>
    </label>
    ${state.showPhoneAuthSheet ? `<div class="phone-auth-layer">
      <button class="phone-auth-backdrop" type="button" data-action="phone-auth-close" aria-label="关闭手机号授权"></button>
      <section class="phone-auth-sheet" role="dialog" aria-label="手机号授权">
        <div class="phone-auth-app"><span class="brand-mark phone-auth-logo"><i></i><i></i><i></i></span><b>奉飞飞</b><em>i</em></div>
        <h3>申请获取并验证你的手机号</h3>
        <div class="phone-auth-options">
          <button type="button" data-action="phone-auth-login" data-phone="173****2698"><b>173****2698</b><small>上次提供</small></button>
          <button type="button" data-action="phone-auth-login" data-phone="177****8837"><b>177****8837</b></button>
        </div>
        <button class="phone-auth-deny" type="button" data-action="phone-auth-close">不允许</button>
        <button class="phone-auth-manage" type="button" data-action="toast" data-message="原型中不配置管理号码">管理号码</button>
      </section>
    </div>` : ""}
  </div>`, { hideTabbar: true });
}

export function pilotStatusPage() {
  const app = state.pilotApplication;
  if (!app) {
    return shell(`<div class="pilot-status-page">
      <section class="pilot-status-empty">
        <b>还没有飞手申请</b>
        <p>提交飞手资料后，可在这里查看审核中、已通过或已驳回的结果。</p>
        <button data-route="pilot">去申请</button>
      </section>
    </div>`, { title: "飞手申请", back: true, tab: "profile" });
  }

  const meta = pilotStatusMeta(app.status);
  const rejectBlock = app.status === "已驳回"
    ? `<section class="pilot-status-card reject-reason">
        <div class="profile-card-title"><h3>审核结果</h3><small>${app.reviewedAt || "后台审核"}</small></div>
        <div class="pilot-reject-status">
          <span><small>当前状态</small><b>审核驳回</b></span>
          <span><small>驳回原因</small><b>${app.rejectReason || "资料不完整，请补充后重新提交。"}</b></span>
        </div>
        <button data-action="pilot-reapply">修改资料，重新申请</button>
      </section>`
    : "";
  const approvedAction = app.status === "已通过"
    ? `<button data-route="tasks">进入任务大厅</button>`
    : "";
  const pendingTip = app.status === "待审核"
    ? `<p class="pilot-status-tip">审核完成前暂不可重复提交。如资料被驳回，这里会显示原因和重新申请入口。</p>`
    : "";

  return shell(`<div class="pilot-status-page">
    <section class="pilot-status-hero ${meta.className}">
      <small>PILOT APPLICATION</small>
      <h2>${meta.title}</h2>
      <p>${meta.desc}</p>
      <em>${meta.tag}</em>
    </section>
    <section class="pilot-status-card">
      <div class="profile-card-title"><h3>申请信息</h3><small>${app.id}</small></div>
      <div class="pilot-status-grid">
        <span><small>申请人</small><b>${app.applicant}</b></span>
        <span><small>联系电话</small><b>${app.phone}</b></span>
        ${app.birthday ? `<span><small>出生年月</small><b>${app.birthday}</b></span>` : ""}
        <span><small>所属主体</small><b>${app.subject}</b></span>
        ${app.companyName ? `<span><small>公司名称</small><b>${app.companyName}</b></span>` : ""}
        <span><small>所在区域</small><b>${app.area}</b></span>
        <span><small>无人机机型</small><b>${app.droneModel}</b></span>
        ${app.serialNo ? `<span><small>序列号</small><b>${app.serialNo}</b></span>` : ""}
        ${app.uniqueId ? `<span><small>唯一识别码</small><b>${app.uniqueId}</b></span>` : ""}
        <span><small>提交时间</small><b>${app.appliedAt}</b></span>
        <span><small>审核时间</small><b>${app.reviewedAt || "待审核"}</b></span>
      </div>
    </section>
    ${rejectBlock}
    ${pendingTip}
    ${approvedAction ? `<div class="pilot-status-actions">${approvedAction}</div>` : ""}
  </div>`, { title: "飞手申请", back: true, tab: "profile" });
}
