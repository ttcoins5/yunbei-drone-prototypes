import { categories, homepageNavItems } from "../data/catalog.js?v=external-link-1";
import { caseStudies } from "../data/caseStudies.js?v=case-showcase-1";
import { icon } from "../components/icons.js";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { state } from "../state/appState.js?v=order-list-density-1";

function stripHtml(html = "") {
  return String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function caseCard(item) {
  return `<button class="case-card" data-action="case-open" data-id="${item.id}">
    <span class="case-card-image"><img src="${item.images?.[0] || ""}" alt="${item.title}"></span>
    <span class="case-card-copy">
      <small>案例展示</small>
      <b>${item.title}</b>
      <em>${item.summary || stripHtml(item.introHtml).slice(0, 48)}</em>
    </span>
  </button>`;
}

function selectedCase() {
  return caseStudies.find(item => item.id === state.selectedCaseId) || caseStudies[0];
}

export function homePage() {
  const largeEntries = homepageNavItems.filter(item => item.enabled && item.size === "large");
  const smallEntries = homepageNavItems.filter(item => item.enabled && item.size === "small");

  return shell(`
    <section class="hero">
      <div class="brand"><span class="brand-mark"><i></i><i></i><i></i></span><span><b>FENGFEIFEI</b><small>奉飞飞低空科技</small></span></div>
      <div class="hero-copy"><small>DRONE INDUSTRY SERVICE</small><h1>专业飞行服务<br>连接产业新场景</h1><p>设备、服务与专业飞手一站连接</p></div>
      <div class="hero-dots"><i></i><i class="active"></i><i></i></div>
    </section>
    <section class="home-nav-panel">
      <div class="home-nav-head">
        <span><small>CORE SERVICES</small><b>核心服务</b></span>
      </div>
      <div class="home-nav-grid">
        ${largeEntries.map((item, index) => `<button class="home-nav-large" data-action="homepage-nav-link" data-jump-type="${item.jumpType}" data-link="${item.link}">
          <img src="${item.image}" alt="${item.name}">
        </button>${index % 2 === 0 ? '<i class="home-nav-divider vertical"></i>' : ""}${index < 2 ? '<i class="home-nav-divider horizontal"></i>' : ""}`).join("")}
      </div>
      <div class="home-nav-small-row">
        ${smallEntries.map((item, index) => `<button class="home-nav-small" data-action="homepage-nav-link" data-jump-type="${item.jumpType}" data-link="${item.link}">
          <img src="${item.image}" alt="${item.name}">
        </button>${index < smallEntries.length - 1 ? '<i class="home-nav-small-divider"></i>' : ""}`).join("")}
      </div>
    </section>
    <section class="quick-grid">
      <button data-route="pilot"><i>飞</i><span><small>PILOT SERVICE</small><b>飞手加入</b><em>认证入驻 · 承接任务</em></span><strong>→</strong></button>
      <button data-route="report"><i>报</i><span><small>FLIGHT REPORT</small><b>飞行报备</b><em>材料提交 · 进度跟进</em></span><strong>→</strong></button>
    </section>
    <section class="task-entry-panel">
      <button data-route="tasks">
        <span class="task-entry-icon"><i></i><i></i><i></i></span>
        <span class="task-entry-copy"><small>TASK HALL</small><b>任务大厅</b><em>任务征集 · 分配订单 · 飞手报名</em></span>
        <span class="task-entry-meta"><strong>3</strong><small>进行中</small></span>
      </button>
    </section>
    <section class="products-section">
      <div class="section-title"><span><small>CASE SHOWCASE</small><h2>案例展示</h2></span><button data-route="cases">更多 →</button></div>
      <p class="section-tip">后台可新增案例，支持轮播图与富文本介绍</p>
      <div class="case-grid">${caseStudies.map(caseCard).join("")}</div>
    </section>`, { tab: "home" });
}

export function categoriesPage() {
  return shell(`<div class="list-page"><p class="page-lead">选择需要的商品或行业服务</p>${categories.filter(item => item.route !== "categories").map(item => `<button class="list-row" data-route="${item.route}">${icon(item)}<span><b>${item.name}</b><small>${item.desc || "查看相关服务与办理说明"}</small></span><i>›</i></button>`).join("")}</div>`, { title: "全部分类", back: true });
}

export function casesPage() {
  return shell(`<div class="list-page">
    <p class="page-lead">后台可新增案例，支持配置封面轮播图、标题和图文介绍。</p>
    <section class="case-list">${caseStudies.map(caseCard).join("")}</section>
  </div>`, { title: "案例展示", back: true });
}

export function caseDetailPage() {
  const item = selectedCase();
  const images = item.images?.length ? item.images : [""];

  return shell(`<div class="case-detail-page">
    <section class="product-visual case-visual">
      <img src="${images[0]}" alt="${item.title}">
      <span>1 / ${images.length}</span>
    </section>
    <section class="product-main">
      <div class="product-title-row case-title-row">
        <h2>${item.title}</h2>
      </div>
      <p>${item.summary}</p>
    </section>
    <section class="product-description case-richtext">
      <h3>案例介绍</h3>
      <div class="richtext-content">${item.introHtml}</div>
    </section>
  </div>`, { title: "案例详情", back: true });
}
