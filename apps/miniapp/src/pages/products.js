import { products } from "../data/catalog.js?v=miniapp-live-20260624-task-detail-clean-1";
import { shell } from "../components/layout.js?v=miniapp-live-20260624-task-detail-clean-1";
import { productCard } from "../components/productCard.js?v=miniapp-live-20260624-task-detail-clean-1";
import { state } from "../state/appState.js?v=miniapp-live-20260624-task-detail-clean-1";

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

function specPrice(spec) {
  const value = Number(spec?.price);
  return Number.isFinite(value) ? value : 0;
}

function currentQuantity() {
  const value = Number(state.orderQuantity);
  return Number.isFinite(value) && value > 0 ? Math.min(99, Math.floor(value)) : 1;
}

function orderAmount(spec = currentSpec(), quantity = currentQuantity()) {
  return specPrice(spec) * quantity;
}

function stars(rating = 5) {
  return `<span class="review-stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span><em class="review-rating">星级：${rating}星</em>`;
}

function productReviews(product) {
  return product.reviews || [
    { user: "林先生", rating: 5, content: "设备稳定，平台沟通及时，需求确认流程清晰。", time: "2026-06-12 15:20" }
  ];
}

function displayedProductReviews(product) {
  const reviews = productReviews(product);
  const displayedIds = product.displayedReviewIds || [];
  if (!displayedIds.length) return [];
  const displayed = new Set(displayedIds);
  return reviews.filter(item => displayed.has(item.id));
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
    <div class="detail-grid-items">${items.map((item, index) => `<button type="button" class="detail-grid-item"><b>${item.icon || ["⌃", "⚙", "⌂", "⚑"][index % 4]}</b><em>${item.title || item}</em></button>`).join("")}</div>
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
      ${section.phone ? `<div class="detail-contact-row compact"><i>☎</i><span><small>联系电话</small><b>${section.phone}</b></span><button data-action="contact-phone">拨打</button></div>` : ""}
      ${section.address ? `<div class="detail-contact-row"><i>⌖</i><span><small>联系地址</small><b>${section.address}</b></span></div>` : ""}
    </div>
  </section>`;
}

function renderSelectedReviewSection(product) {
  const reviews = displayedProductReviews(product);
  if (!reviews.length) return "";
  return `<section class="detail-template-card detail-selected-reviews">
    <div class="detail-review-title">${sectionTitle("用户评价")}<small>已展示 ${reviews.length} 条</small></div>
    <div class="detail-review-list">
      ${reviews.map(item => `<article class="detail-review-item">
        <span class="review-avatar">${item.user.slice(0, 1)}</span>
        <div>
          <header><b>${item.user}</b>${stars(item.rating)}</header>
          <p>${item.content}</p>
          <time>${item.time}</time>
        </div>
      </article>`).join("")}
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

function renderImageSection(section) {
  const image = section.imageUrl || section.content;
  if (!image) return "";
  return `<section class="detail-template-card">${sectionTitle(section.title)}
    <img class="detail-section-image" src="${image}" alt="${section.title}">
  </section>`;
}

function renderDetailSection(section) {
  if (section.type === "grid") return renderGridSection(section);
  if (section.type === "checklist" || section.type === "condition") return renderChecklistSection(section);
  if (section.type === "fee") return renderFeeSection(section);
  if (section.type === "feature") return renderFeatureSection(section);
  if (section.type === "contact") return renderContactSection(section);
  if (section.type === "eventInfo") return renderEventInfoSection(section);
  if (section.type === "image") return renderImageSection(section);
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
  if (field.key === "name" || field.key === "parentName" || field.key === "applicant") return state.userProfile.nickname || "";
  if (field.key === "phone" || field.key === "parentPhone") return state.userProfile.phone || "";
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

function rentalFormFields(defaultAddress) {
  const name = defaultAddress?.name || state.userProfile.nickname || "";
  const phone = defaultAddress?.phone || state.userProfile.phone || "";
  return `<label class="requirement-field"><span class="requirement-field-head"><span>主体选择<i>*</i></span></span>
      <select name="rentalSubject" data-rental-subject required>
        <option value="">请选择主体</option>
        <option>个人主体</option>
        <option>企业/单位主体</option>
      </select>
    </label>
    <div class="rental-subject-fields" data-rental-fields="个人主体" hidden>
      <label class="requirement-field"><span class="requirement-field-head"><span>登记联系人<i>*</i></span></span><input name="personContactName" type="text" value="${name}" placeholder="请输入登记联系人" data-rental-control data-rental-required></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>联系电话<i>*</i></span></span><input name="personContactPhone" type="text" value="${phone}" placeholder="请输入联系电话" data-rental-control data-rental-required></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>收货/自提点<i>*</i></span></span><input name="pickupPoint" type="text" placeholder="请输入收货/自提点" data-rental-control data-rental-required></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>紧急联系人<i>*</i></span></span><input name="emergencyName" type="text" value="${name}" placeholder="请输入紧急联系人" data-rental-control data-rental-required></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>电话<i>*</i></span></span><input name="emergencyPhone" type="text" value="${phone}" placeholder="请输入电话" data-rental-control data-rental-required></label>
    </div>
    <div class="rental-subject-fields" data-rental-fields="企业/单位主体" hidden>
      <label class="requirement-field"><span class="requirement-field-head"><span>公司全称<i>*</i></span></span><input name="companyName" type="text" placeholder="请输入公司全称" data-rental-control data-rental-required></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>统一社会信用代码<i>*</i></span></span><input name="socialCreditCode" type="text" placeholder="请输入统一社会信用代码" data-rental-control data-rental-required></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>营业执照上传<i>*</i></span></span><span class="requirement-upload"><input name="businessLicense" type="file" accept="image/*" data-rental-control data-rental-required><em>上传营业执照</em><small>支持 JPG / PNG</small></span></label>
      <label class="requirement-field"><span class="requirement-field-head"><span>单位通讯地址<i>*</i></span></span><input name="companyAddress" type="text" placeholder="请输入单位通讯地址" data-rental-control data-rental-required></label>
    </div>`;
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
      ${renderSelectedReviewSection(product)}
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
  const quantity = currentQuantity();
  const hasPaidSpecs = (product.specs || []).some(item => specPrice(item) > 0);
  const totalAmount = orderAmount(spec, quantity);
  const onlinePay = hasPaidSpecs && specPrice(spec) > 0;
  const defaultAddress = state.addressBook.find(item => item.isDefault) || state.addressBook[0];
  const template = selectedRequirementTemplate(product);
  const paidConfig = hasPaidSpecs ? `
      <div class="confirm-spec-list">
        ${(product.specs || []).map((item, index) => `<button type="button" class="${state.selectedSpecIndex === index ? "active" : ""}" data-action="product-spec" data-index="${index}">
          <span><b>${item.name}</b><small>${item.desc || "选择服务规格"}</small></span>
          <strong>${specPrice(item) > 0 ? `￥${specPrice(item)}` : "线下确认"}</strong>
        </button>`).join("")}
      </div>
      <div class="confirm-quantity-row">
        <span><b>数量</b><small>按次计价，提交时保存快照</small></span>
        <div class="quantity-stepper">
          <button type="button" data-action="order-quantity" data-dir="-1">-</button>
          <input name="quantity" type="number" min="1" max="99" value="${quantity}" data-input="order-quantity-input" data-order-quantity>
          <button type="button" data-action="order-quantity" data-dir="1">+</button>
        </div>
      </div>
      <div class="confirm-amount-row">
        <span><small>费用计算</small><b data-order-unit-line>${specPrice(spec) > 0 ? `￥${specPrice(spec)} x ${quantity}` : "线下确认"}</b></span>
        <strong data-order-total>${totalAmount > 0 ? `￥${totalAmount}` : "线下确认"}</strong>
      </div>` : "";

  return shell(`<form class="order-confirm-page" data-form="product-order">
    <section class="confirm-card">
      <div class="confirm-title"><b>需求信息</b><small>${template.name} · 提交后保存快照</small></div>
      ${product.id === "rental" ? rentalFormFields(defaultAddress) : requirementFormFields(template, defaultAddress)}
    </section>
    <section class="confirm-card">
      <div class="confirm-title"><b>商品信息</b><small>提交后由平台联系确认</small></div>
      <div class="confirm-product">
        <img src="${product.image}" alt="${product.name}">
        <span><b>${product.name}</b><small data-order-summary>${spec.name} · ${spec.desc}</small></span>
      </div>
      ${paidConfig}
    </section>
    <div class="confirm-pay-bar ${onlinePay ? "paid" : "plain"}">
      ${onlinePay ? `<span><small>需在线支付</small><b data-order-pay-total>${totalAmount > 0 ? `￥${totalAmount}` : "线下确认"}</b></span>` : ""}
      <button type="submit">${onlinePay ? "提交并支付" : "提交需求"}</button>
    </div>
  </form>`, { title: "确认订单", back: true, tab: "products" });
}

export function paymentPage() {
  const order = state.pendingProductOrder;
  const product = state.selectedProduct;
  const spec = currentSpec();
  const orderNo = order?.orderNo || "ORD20260615001";
  const amount = Number(order?.amount ?? specPrice(spec));
  const quantity = Number(order?.quantity || currentQuantity());
  const totalAmount = Number(order?.paid ?? amount * quantity);

  return shell(`<div class="payment-page">
    <section class="payment-total-card">
      <small>微信支付模拟</small>
      <b>￥${totalAmount}</b>
      <p>${product.name} · ${order?.specName || spec.name} · x${quantity}</p>
      <p>订单号：${orderNo}</p>
    </section>
    <div class="payment-methods">
      <label class="payment-method"><i>微</i><span><b>微信支付</b><small>原型模拟支付成功后进入待接单</small></span><em>✓</em></label>
    </div>
    <p class="payment-notice">支付成功后订单进入待接单，后台根据需求快照安排飞手和履约。</p>
    <div class="payment-pay-bar">
      <span><small>需支付</small><b>￥${totalAmount}</b></span>
      <button data-action="mock-pay-order">确认支付</button>
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
      <p>${order?.paid ? "支付成功，订单已进入待接单状态。" : "订单已提交，后台将根据服务需求处理接单并尽快与您联系。"}</p>
    </section>
    <section class="payment-order-card">
      <b>${order?.orderNo || "ORD20260615001"}</b>
      <p>${product.name} · ${order?.specName || spec.name} · x${order?.quantity || currentQuantity()}</p>
      ${order?.paid ? `<strong>实付款：￥${order.paid}</strong>` : ""}
      <span>状态：${order?.status || "待接单"}</span>
    </section>
    <div class="payment-actions">
      <button data-route="orders">查看订单</button>
      <button data-route="home">返回首页</button>
    </div>
  </div>`, { title: "支付结果", back: true, tab: "orders" });
}
