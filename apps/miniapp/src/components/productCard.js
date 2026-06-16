export function productCard(product, index) {
  return `<button class="product-card" data-action="product" data-index="${index}">
    <span class="product-image"><img src="${product.image}" alt="${product.name}"><em>热销 ${index + 1}</em></span>
    <span class="product-info"><b>${product.name}</b><small>${product.desc}</small><span><strong>¥${product.price.toLocaleString()}</strong><i>已售 ${product.sales}</i></span></span>
  </button>`;
}
