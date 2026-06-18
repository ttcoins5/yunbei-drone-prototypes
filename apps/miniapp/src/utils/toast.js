export function toast(message, options = {}) {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.classList.toggle("center", options.placement === "center");
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    node.hidden = true;
    node.classList.remove("center");
  }, options.duration || 1800);
}
