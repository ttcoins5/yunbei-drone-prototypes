import { hoistingProducts, products } from "../data/catalog.js";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { productCard } from "../components/productCard.js";
import { state } from "../state/appState.js?v=pilot-default-2";

export function currentProducts() {
  return state.productListMode === "hoisting" ? hoistingProducts : products;
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
    { user: "林先生", rating: 5, content: "设备稳定，平台沟通及时，预约流程清晰。", time: "2026-06-12 15:20" }
  ];
}

export function productsPage() {
  const visibleProducts = currentProducts();
  const title = state.productListMode === "hoisting" ? "吊运服务" : "热销商品";

  return shell(`<div class="list-page"><div class="filter-row"><button class="active">销量优先</button><button data-action="toast" data-message="已切换为价格筛选">价格</button><button data-action="toast" data-message="已打开商品筛选">筛选</button></div><div class="product-grid">${visibleProducts.map((product, index) => productCard(product, index)).join("")}</div></div>`, { title, back: true, tab: "products" });
}

export function productDetailPage() {
  const product = state.selectedProduct;
  const spec = currentSpec();
  const specs = product.specs || [spec];
  const reviews = productReviews(product);
  const firstReview = reviews[0];

  return shell(`<div class="product-detail-page">
    <section class="product-visual">
      <img src="${product.image}" alt="${product.name}">
      <span>1 / 4</span>
    </section>
    <section class="product-main">
      <div class="product-price-row">
        <strong>¥${spec.price.toLocaleString()}</strong>
        <em>支持预约</em>
      </div>
      <div class="product-title-row">
        <h2>${product.name}</h2>
        <button data-action="toast" data-message="已生成分享卡片">分享 ↗</button>
      </div>
      <p>已售 ${product.sales} · ${product.location || "四川成都"}</p>
    </section>
    <section class="product-spec-panel">
      <h3>选择规格</h3>
      <div class="product-specs">
        ${specs.map((item, index) => `<button class="${index === state.selectedSpecIndex ? "active" : ""}" data-action="product-spec" data-index="${index}">${item.name}</button>`).join("")}
      </div>
      <p>${spec.desc}</p>
    </section>
    <section class="product-review">
      <div><b>用户评价（${product.reviewCount || reviews.length}）</b><button data-route="productReviews">查看全部 ›</button></div>
      <article class="product-review-item">
        <span class="review-avatar">${firstReview.user.slice(0, 1)}</span>
        <b>${firstReview.user}</b>
        <i>${stars(firstReview.rating)}</i>
        <small>${firstReview.content}</small>
      </article>
    </section>
    <section class="product-description">
      <h3>${state.productListMode === "hoisting" ? "吊运信息" : "商品详情"}</h3>
      <p>${product.detail || "适用于工程测绘、城市巡检等专业场景。下单后填写预约时间与服务地址，平台确认订单后进入接单与履约流程。"}</p>
    </section>
    <div class="product-bottom-bar">
      <button data-action="contact-sheet">客服</button>
      <button data-action="contact-phone">电话</button>
      <button data-route="orderConfirm">立即下单</button>
    </div>
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

  return shell(`<form class="order-confirm-page" data-form="product-order">
    <section class="confirm-card">
      <div class="confirm-title"><b>预约信息</b><small>提交后生成待付款订单</small></div>
      <label>预约时间<input name="time" required value="2026-06-18 09:00"></label>
      <label>服务地址<input name="address" required value="${defaultAddress ? `${defaultAddress.region} ${defaultAddress.detail}` : ""}"></label>
      <label>联系电话<input name="phone" required value="13888888821"></label>
      <label>备注说明<textarea name="remark" placeholder="可补充作业需求、现场条件或图片说明"></textarea></label>
    </section>
    <section class="confirm-card">
      <div class="confirm-title"><b>商品信息</b><small>支持在线支付</small></div>
      <div class="confirm-product">
        <img src="${product.image}" alt="${product.name}">
        <span><b>${product.name}</b><small>${spec.name} · ${spec.desc}</small></span>
        <strong>¥${spec.price.toLocaleString()}</strong>
      </div>
    </section>
    <div class="confirm-pay-bar">
      <span><small>实付款</small><b>¥${spec.price.toLocaleString()}</b></span>
      <button type="submit">提交并支付</button>
    </div>
  </form>`, { title: "确认订单", back: true, tab: "products" });
}

export function paymentPage() {
  const order = state.pendingProductOrder;
  const product = state.selectedProduct;
  const spec = currentSpec();
  const amount = order?.amount || spec.price;
  const orderNo = order?.orderNo || "ORD20260615001";

  return shell(`<div class="payment-page">
    <section class="payment-total-card">
      <small>需支付金额</small>
      <b>¥${amount.toLocaleString()}</b>
      <p>${product.name} · ${order?.specName || spec.name}</p>
      <p>订单号：${orderNo}</p>
    </section>
    <section class="payment-methods">
      <button class="payment-method active" data-action="toast" data-message="已选择微信支付">
        <i>微</i>
        <span><b>微信支付</b></span>
        <em>✓</em>
      </button>
    </section>
    <p class="payment-notice">支付成功后订单进入待接单，平台会根据吊运信息、规格和服务地址安排后台接单与飞手履约。</p>
    <div class="payment-pay-bar">
      <span><small>合计支付</small><b>¥${amount.toLocaleString()}</b></span>
      <button data-action="pay-product-order">确认支付</button>
    </div>
  </div>`, { title: "支付", back: true, tab: "products" });
}

export function paymentResultPage() {
  const order = state.pendingProductOrder;
  const product = state.selectedProduct;
  const spec = currentSpec();

  return shell(`<div class="payment-result-page">
    <section class="payment-success">
      <i>✓</i>
      <h2>支付成功</h2>
      <p>订单已进入待接单状态，后台将根据服务需求处理接单并派单。</p>
    </section>
    <section class="payment-order-card">
      <b>${order?.orderNo || "ORD20260615001"}</b>
      <p>${product.name} · ${spec.name}</p>
      <strong>¥${spec.price.toLocaleString()}</strong>
      <span>状态：待接单</span>
    </section>
    <div class="payment-actions">
      <button data-route="orders">查看订单</button>
      <button data-route="home">返回首页</button>
    </div>
  </div>`, { title: "支付结果", back: true, tab: "orders" });
}
