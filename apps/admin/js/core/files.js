function pickLocalFile({ accept = "", multiple = false } = {}) {
  return new Promise(resolve => {
    const input = document.createElement("input");
    input.type = "file";
    if (accept) input.accept = accept;
    input.multiple = multiple;
    input.hidden = true;
    document.body.appendChild(input);

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      const files = [...(input.files || [])];
      input.remove();
      window.removeEventListener("focus", onFocus);
      resolve(files);
    };

    const onFocus = () => setTimeout(done, 300);

    input.addEventListener("change", done, { once: true });
    window.addEventListener("focus", onFocus, { once: true });
    input.click();
  });
}
