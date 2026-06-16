import { routes } from "./routes.js?v=pilot-default-2";
import { state } from "../state/appState.js?v=pilot-default-2";

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
