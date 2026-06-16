const defaultRichToolbarKeys = ["bold", "italic", "through", "|", "bulletedList", "numberedList", "|", "insertLink", "undo", "redo"];

const aboutRichToolbarKeys = [
  "headerSelect", "fontSize", "fontFamily", "lineHeight", "|",
  "bold", "italic", "underline", "through", "|",
  "color", "bgColor", "|",
  "bulletedList", "numberedList", "|",
  "justifyLeft", "justifyCenter", "justifyRight", "|",
  "insertLink", "insertImage", "|",
  "undo", "redo"
];

function destroyRichEditor() {
  state.richEditorToolbar?.destroy?.();
  state.richEditor?.destroy?.();
  state.richEditorToolbar = null;
  state.richEditor = null;
  state.productToolbar = null;
  state.productEditor = null;
}

function destroyProductEditor() {
  destroyRichEditor();
}

function initRichEditor({
  toolbarId = "product-intro-toolbar",
  editorId = "product-intro-editor",
  html = "<p></p>",
  readOnly = false,
  placeholder = "请输入内容...",
  onChange,
  toolbarKeys = defaultRichToolbarKeys
} = {}) {
  destroyRichEditor();
  const toolbarEl = document.getElementById(toolbarId);
  const editorEl = document.getElementById(editorId);
  const { createEditor, createToolbar } = window.wangEditor || {};
  if (!editorEl || !createEditor) return;

  const editor = createEditor({
    selector: `#${editorId}`,
    html,
    config: {
      placeholder,
      readOnly,
      onChange: onChange || undefined
    },
    mode: "default"
  });

  if (!readOnly && toolbarEl && createToolbar) {
    const toolbar = createToolbar({
      editor,
      selector: `#${toolbarId}`,
      config: { toolbarKeys }
    });
    state.richEditorToolbar = toolbar;
    state.productToolbar = toolbar;
  }

  state.richEditor = editor;
  state.productEditor = editor;
}

function richEditorContainer({
  toolbarId = "product-intro-toolbar",
  editorId = "product-intro-editor",
  readOnly = false
} = {}) {
  return `<div class="element-rich-editor${readOnly ? " is-readonly" : ""}">
    <div class="element-rich-editor__toolbar" id="${toolbarId}"></div>
    <div class="element-rich-editor__editor" id="${editorId}"></div>
  </div>`;
}
