import { categories, homepageNavItems, products } from "../data/catalog.js?v=profile-auto-role-1";
import { icon } from "../components/icons.js";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { productCard } from "../components/productCard.js";

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
    <section class="products-section">
      <div class="section-title"><span><small>POPULAR PRODUCTS</small><h2>热销商品</h2></span><button data-route="products">更多 →</button></div>
      <p class="section-tip">按平台销量由高到低展示</p>
      <div class="product-grid">${products.map((product, index) => productCard(product, index)).join("")}</div>
    </section>`, { tab: "home" });
}

export function categoriesPage() {
  return shell(`<div class="list-page"><p class="page-lead">选择需要的商品或行业服务</p>${categories.filter(item => item.route !== "categories").map(item => `<button class="list-row" data-route="${item.route}">${icon(item)}<span><b>${item.name}</b><small>${item.desc || "查看相关服务与办理说明"}</small></span><i>›</i></button>`).join("")}</div>`, { title: "全部分类", back: true });
}
