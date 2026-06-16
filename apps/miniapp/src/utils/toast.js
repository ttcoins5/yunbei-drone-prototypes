export function toast(message) {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.hidden = true, 1800);
}
