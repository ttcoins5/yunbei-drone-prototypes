export function icon(item, large = false) {
  const col = item.icon % 4;
  const row = Math.floor(item.icon / 4);
  return `<i class="category-icon ${large ? "large" : ""}" style="--x:${col};--y:${row}"></i>`;
}

export function serviceIcon(item) {
  const col = item.icon % 4;
  const row = Math.floor(item.icon / 4);
  return `<i class="service-icon" style="--x:${col};--y:${row}"></i>`;
}

export function orderIcon(item) {
  return `<i class="order-icon" style="--x:${item.icon}"></i>`;
}
