import { products } from "../data/catalog.js?v=detail-page-icon-1";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { productCard } from "../components/productCard.js?v=all-products-1";
import { state } from "../state/appState.js?v=order-list-density-1";

export function currentProducts() {
  return products;
}

function currentSpec() {
  const product = state.selectedProduct;
  return product.specs?.[state.selectedSpecIndex] || {
    name: "标准套装",
    price: product.price,
    desc: product.desc
  };
}

function stars(rating = 5) {
  return `<span class="review-stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span><em class="review-rating">星级：${rating}星</em>`;
}

function productReviews(product) {
  return product.reviews || [
    { user: "林先生", rating: 5, content: "设备稳定，平台沟通及时，需求确认流程清晰。", time: "2026-06-12 15:20" }
  ];
}

function enabledSections(detailPage) {
  return [...(detailPage?.sections || [])]
    .filter(section => section.enabled !== false)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function detailHero(product, detailPage) {
  const hero = detailPage?.hero || {};
  const image = hero.bannerImage || product.image;
  const media = image
    ? `<img class="detail-template-image" src="${image}" alt="${hero.title || product.name}">`
    : `<span class="detail-template-icon">${(hero.title || product.name).slice(0, 1)}</span>`;
  return `<section class="detail-template-hero ${detailPage?.templateType || "service"}">
    ${media}
    <h2>${hero.title || product.name}</h2>
    <p>${hero.subtitle || product.desc || "填写信息后由平台确认服务方案"}</p>
  </section>`;
}

function sectionTitle(title) {
  return `<h3><i></i>${title}</h3>`;
}

function renderGridSection(section) {
  const items = section.items || [];
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <div class="detail-grid-items">${items.map((item, index) => `<span><b>${item.icon || ["⌃", "⚙", "⌂", "⚑"][index % 4]}</b><em>${item.title || item}</em></span>`).join("")}</div>
  </section>`;
}

function renderChecklistSection(section) {
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <ul class="detail-check-list">${(section.items || []).map(item => `<li>${item}</li>`).join("")}</ul>
  </section>`;
}

function renderFeeSection(section) {
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <div class="detail-fee-list">${(section.items || []).map(item => `<div><span>${item.name}</span><strong>${item.price}</strong></div>`).join("")}</div>
  </section>`;
}

function renderFeatureSection(section) {
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <div class="detail-feature-list">${(section.items || []).map(item => `<article><b>${item.title}</b><p>${item.content}</p></article>`).join("")}</div>
  </section>`;
}

function renderContactSection(section) {
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <div class="detail-contact-list">
      ${section.phone ? `<div><i>☎</i><span><small>联系电话</small><b>${section.phone}</b></span><button data-action="contact-phone">拨打</button></div>` : ""}
      ${section.backupPhone ? `<div><i>☎</i><span><small>咨询热线</small><b>${section.backupPhone}</b></span><button data-action="contact-phone">拨打</button></div>` : ""}
      ${section.address ? `<div><i>⌖</i><span><small>联系地址</small><b>${section.address}</b></span></div>` : ""}
    </div>
  </section>`;
}

function renderEventInfoSection(section) {
  const rows = [
    ["赛事时间", section.date],
    ["赛事地点", section.address],
    ["报名截止", section.deadline],
    ["赛事组别", (section.groups || []).join(" / ")]
  ].filter(([, value]) => value);
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <div class="detail-info-list">${rows.map(([label, value]) => `<div><small>${label}</small><b>${value}</b></div>`).join("")}</div>
  </section>`;
}

function renderDetailSection(section) {
  if (section.type === "grid") return renderGridSection(section);
  if (section.type === "checklist" || section.type === "condition") return renderChecklistSection(section);
  if (section.type === "fee") return renderFeeSection(section);
  if (section.type === "feature") return renderFeatureSection(section);
  if (section.type === "contact") return renderContactSection(section);
  if (section.type === "eventInfo") return renderEventInfoSection(section);
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <p>${section.content || "详情信息整理中，请联系客服了解更多。"}</p>
  </section>`;
}

function detailBottomBar(detailPage) {
  const cta = detailPage?.cta || { text: "立即下单", actionType: "order" };
  const attrs = cta.actionType === "external"
    ? `data-action="toast" data-message="已打开${cta.text || "外部服务"}"`
    : `data-route="orderConfirm"`;
  return `<div class="product-bottom-bar detail-template-bottom">
    <button data-action="contact-sheet">客服</button>
    <button data-action="contact-phone">电话</button>
    <button ${attrs}>${cta.text || "立即下单"}</button>
  </div>`;
}

export function selectedRequirementTemplate(product = state.selectedProduct) {
  const fields = product.requirementFields?.length ? product.requirementFields : [
    { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
    { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 }
  ];
  return {
    id: product.id || "product-fields",
    name: `${product.name || "商品"}需求字段`,
    serviceType: product.serviceType || product.category || "服务需求",
    fields: fields.map((field, index) => ({
      ...field,
      type: ["text", "select", "image"].includes(field.type) ? field.type : "text",
      sort: field.sort || index + 1
    }))
  };
}

function defaultRequirementValue(field, defaultAddress) {
  if (field.key === "contactName") return defaultAddress?.name || state.userProfile.nickname || "";
  if (field.key === "contactPhone") return defaultAddress?.phone || state.userProfile.phone || "";
  return "";
}

function requirementFieldInput(field, value) {
  const name = `requirement_${field.key}`;
  const required = field.required ? " required" : "";
  const placeholder = field.placeholder ? ` placeholder="${field.placeholder}"` : "";
  if (field.type === "select") {
    return `<select name="${name}"${required}>
      <option value="">请选择${field.label}</option>
      ${(field.options || []).map(option => `<option${option === value ? " selected" : ""}>${option}</option>`).join("")}
    </select>`;
  }
  if (field.type === "image") {
    return `<span class="requirement-upload"><input name="${name}" type="file" accept="image/*"${required}><em>${field.placeholder || "上传图片"}</em><small>支持 JPG / PNG</small></span>`;
  }
  return `<input name="${name}" type="text" value="${value}"${required}${placeholder}>`;
}

function requirementFormFields(template, defaultAddress) {
  const fields = [...template.fields].sort((a, b) => a.sort - b.sort);
  return fields.map(field => {
    const value = defaultRequirementValue(field, defaultAddress);
    return `<label class="requirement-field"><span class="requirement-field-head"><span>${field.label}${field.required ? `<i>*</i>` : ""}</span>${field.unit ? `<small>${field.unit}</small>` : ""}</span>
      ${requirementFieldInput(field, value)}
    </label>`;
  }).join("");
}

export function productsPage() {
  const visibleProducts = currentProducts();

  return shell(`<div class="list-page products-list-page">
    <section class="list-page-head">
      <span><small>ALL PRODUCTS</small><h2>全部商品</h2></span>
      <em>共 ${visibleProducts.length} 项</em>
    </section>
    <div class="product-grid">${visibleProducts.map((product, index) => productCard(product, index)).join("")}</div>
  </div>`, { title: "全部商品", back: true, tab: "products" });
}

export function productDetailPage() {
  const product = state.selectedProduct;
  const detailPage = product.detailPage || {
    templateType: "service",
    hero: { title: product.name, subtitle: product.desc },
    sections: [{ id: "intro", type: "intro", title: "服务介绍", content: product.detail, sort: 1 }],
    cta: { text: "立即下单", actionType: "order" }
  };

  return shell(`<div class="product-detail-page detail-template-page ${detailPage.templateType}">
    ${detailHero(product, detailPage)}
    <div class="detail-template-body">
      ${enabledSections(detailPage).map(renderDetailSection).join("")}
    </div>
    ${detailBottomBar(detailPage)}
  </div>`, { title: "商品详情", back: true, tab: "products" });
}

export function productReviewsPage() {
  const product = state.selectedProduct;
  const reviews = productReviews(product);
  const filters = ["全部", "5星", "4星"];
  const visibleReviews = state.productReviewFilter === "全部"
    ? reviews
    : reviews.filter(item => `${item.rating}星` === state.productReviewFilter);
  const average = reviews.length
    ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return shell(`<div class="product-reviews-page">
    <section class="review-summary-card">
      <span><small>综合评分</small><b>${average}</b></span>
      <div>${stars(Math.round(Number(average)))}<p>${product.name} · ${product.reviewCount || reviews.length} 条用户评价</p></div>
    </section>
    <div class="review-filter-row">${filters.map(filter => `<button class="${state.productReviewFilter === filter ? "active" : ""}" data-action="review-filter" data-filter="${filter}">${filter}</button>`).join("")}</div>
    <section class="review-list-page">
      ${visibleReviews.map(item => `<article class="review-card">
        <span class="review-avatar">${item.user.slice(0, 1)}</span>
        <div>
          <h3>${item.user}</h3>
          <div>${stars(item.rating)}</div>
          <p>${item.content}</p>
          <time>${item.time}</time>
        </div>
      </article>`).join("") || `<div class="order-empty"><b>暂无评价</b><p>当前星级筛选下暂无评价内容。</p></div>`}
    </section>
  </div>`, { title: "用户评价", back: true, tab: "products" });
}

export function orderConfirmPage() {
  const product = state.selectedProduct;
  const spec = currentSpec();
  const defaultAddress = state.addressBook.find(item => item.isDefault) || state.addressBook[0];
  const template = selectedRequirementTemplate(product);

  return shell(`<form class="order-confirm-page" data-form="product-order">
    <section class="confirm-card">
      <div class="confirm-title"><b>需求信息</b><small>${template.name} · 提交后保存快照</small></div>
      ${requirementFormFields(template, defaultAddress)}
    </section>
    <section class="confirm-card">
      <div class="confirm-title"><b>商品信息</b><small>提交后由平台联系确认</small></div>
      <div class="confirm-product">
        <img src="${product.image}" alt="${product.name}">
        <span><b>${product.name}</b><small>${spec.name} · ${spec.desc}</small></span>
      </div>
    </section>
    <div class="confirm-pay-bar">
      <button type="submit">提交需求</button>
    </div>
  </form>`, { title: "确认订单", back: true, tab: "products" });
}

export function paymentPage() {
  const order = state.pendingProductOrder;
  const product = state.selectedProduct;
  const spec = currentSpec();
  const orderNo = order?.orderNo || "ORD20260615001";

  return shell(`<div class="payment-page">
    <section class="payment-total-card">
      <small>当前订单无需在线支付</small>
      <b>提交成功</b>
      <p>${product.name} · ${order?.specName || spec.name}</p>
      <p>订单号：${orderNo}</p>
    </section>
    <p class="payment-notice">平台会根据需求信息、规格和服务地址安排后台接单与后续履约。</p>
    <div class="payment-pay-bar">
      <span><small>订单状态</small><b>待接单</b></span>
      <button data-route="orders">查看订单</button>
    </div>
  </div>`, { title: "订单提交", back: true, tab: "products" });
}

export function paymentResultPage() {
  const order = state.pendingProductOrder;
  const product = state.selectedProduct;
  const spec = currentSpec();

  return shell(`<div class="payment-result-page">
    <section class="payment-success">
      <i>✓</i>
      <h2>提交成功</h2>
      <p>订单已进入待接单状态，后台将根据服务需求处理接单并尽快与您联系。</p>
    </section>
    <section class="payment-order-card">
      <b>${order?.orderNo || "ORD20260615001"}</b>
      <p>${product.name} · ${spec.name}</p>
      <span>状态：待接单</span>
    </section>
    <div class="payment-actions">
      <button data-route="orders">查看订单</button>
      <button data-route="home">返回首页</button>
    </div>
  </div>`, { title: "支付结果", back: true, tab: "orders" });
}
