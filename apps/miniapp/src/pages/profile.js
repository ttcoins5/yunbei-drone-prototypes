import { orderStatuses, serviceModules } from "../data/catalog.js?v=profile-auto-role-1";
import { orderIcon, serviceIcon } from "../components/icons.js";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { state } from "../state/appState.js";

function isPilot() {
  return state.userProfile.role === "pilot";
}

function userRoleLabel() {
  return isPilot() ? "认证飞手" : "普通用户";
}

function profileAvatar(size = "") {
  return `<span class="profile-avatar-text ${size}">${state.userProfile.avatarText}</span>`;
}

export function profilePage() {
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
  const profile = state.userProfile;
  const fields = [
    ["头像", profileAvatar("large"), "微信授权"],
    ["昵称", profile.nickname, "微信授权"],
    ["手机号", profile.phone, "手机号授权"],
    ["性别", profile.gender, "微信授权"],
    ["生日", profile.birthday, "手动资料"],
    ["地区", profile.region, "微信授权"]
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
      <p class="profile-detail-tip">${isPilot() ? "飞手可进入任务大厅和飞行报备，并处理平台分配订单。" : "普通用户可正常下单、开票和联系客服；任务大厅和飞行报备需飞手申请通过后使用。"}</p>
    </section>
    <section class="profile-detail-card">
      <div class="profile-card-title"><h3>个人资料</h3><button data-action="wechat-profile-auth">微信授权更新</button></div>
      <div class="profile-field-list">
        ${fields.map(([label, value, source]) => `<div class="profile-field-row">
          <span><small>${label}</small><b>${value}</b></span>
          <em>${source}</em>
        </div>`).join("")}
      </div>
    </section>
  </div>`, { title: "个人资料", back: true, tab: "profile" });
}
