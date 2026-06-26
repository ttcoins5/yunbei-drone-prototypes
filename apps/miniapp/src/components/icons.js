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
  const files = [
    "pending-payment.svg",
    "pending-acceptance.svg",
    "pending-service.svg",
    "pending-review.svg",
    "completed.svg"
  ];
  const file = files[item.icon] || files[0];
  return `<img class="order-icon" src="../../shared/assets/order-status-icons/${file}" alt="" aria-hidden="true">`;
}
