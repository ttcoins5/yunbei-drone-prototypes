import { routes } from "./routes.js?v=profile-auto-role-1";
import { state } from "../state/appState.js";

export function render() {
  if (!routes[state.page]) state.page = "home";
  document.getElementById("app").innerHTML = routes[state.page]();
}

export function navigate(page, remember = true) {
  if (remember && page !== state.page) state.history.push(state.page);
  state.page = page;
  location.hash = `#/${page}`;
  render();
}
