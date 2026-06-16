import { products } from "../data/catalog.js";
import { shell } from "../components/layout.js?v=profile-auto-role-1";
import { productCard } from "../components/productCard.js";
import { state } from "../state/appState.js";

function currentSpec() {
  const product = state.selectedProduct;
  return product.specs?.[state.selectedSpecIndex] || {
    name: "标准套装",
    price: product.price,
    desc: product.desc
  };
}

export function productsPage() {
  return shell(`<div class="list-page"><div class="filter-row"><button class="active">销量优先</button><button data-action="toast" data-message="已切换为价格筛选">价格</button><button data-action="toast" data-message="已打开商品筛选">筛选</button></div><div class="product-grid">${products.map((product, index) => productCard(product, index)).join("")}</div></div>`, { title: "热销商品", back: true, tab: "products" });
}

export function productDetailPage() {
  const product = state.selectedProduct;
  const spec = currentSpec();
  const specs = product.specs || [spec];

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
      <p>已售 ${product.sales} · 四川成都</p>
    </section>
    <section class="product-spec-panel">
      <h3>选择规格</h3>
      <div class="product-specs">
        ${specs.map((item, index) => `<button class="${index === state.selectedSpecIndex ? "active" : ""}" data-action="product-spec" data-index="${index}">${item.name}</button>`).join("")}
      </div>
      <p>${spec.desc}</p>
    </section>
    <section class="product-review">
      <div><b>用户评价（38）</b><button data-action="toast" data-message="已打开全部评价">查看全部 ›</button></div>
      <p><span></span><b>林先生</b><small>设备稳定，平台沟通及时，预约流程清晰。</small></p>
    </section>
    <section class="product-description">
      <h3>商品详情</h3>
      <p>适用于工程测绘、城市巡检等专业场景。下单后填写预约时间与服务地址，平台确认订单后进入接单与履约流程。</p>
    </section>
    <div class="product-bottom-bar">
      <button data-action="contact-sheet">客服</button>
      <button data-action="contact-phone">电话</button>
      <button data-route="orderConfirm">立即预约</button>
    </div>
  </div>`, { title: "商品详情", back: true, tab: "products" });
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
