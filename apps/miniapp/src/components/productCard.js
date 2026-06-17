export function productCard(product, index) {
  const summary = Number(product.price) > 0 ? `¥${product.price.toLocaleString()}` : "查看详情";
  const meta = product.sales ? `已售 ${product.sales}` : (product.category || "服务商品");
  return `<button class="product-card" data-action="product" data-index="${index}">
    <span class="product-image"><img src="${product.image}" alt="${product.name}"><em>热销 ${index + 1}</em></span>
    <span class="product-info"><small class="product-category">${product.category || "服务商品"}</small><b>${product.name}</b><small>${product.desc}</small><span><strong>${summary}</strong><i>${meta}</i></span></span>
  </button>`;
}
