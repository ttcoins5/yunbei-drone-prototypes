import { routes } from "./routes.js?v=invoice-email-removed-1";
import { state } from "../state/appState.js?v=order-list-density-1";

export function render(preserveScroll = false) {
  if (!routes[state.page]) state.page = "home";
  const content = preserveScroll ? document.querySelector(".page-content") : null;
  const scrollTop = content?.scrollTop || 0;
  document.getElementById("app").innerHTML = routes[state.page]();
  if (preserveScroll) {
    const nextContent = document.querySelector(".page-content");
    if (nextContent) nextContent.scrollTop = scrollTop;
  }
}

export function navigate(page, remember = true) {
  if (remember && page !== state.page) state.history.push(state.page);
  state.page = page;
  location.hash = `#/${page}`;
  render();
}
