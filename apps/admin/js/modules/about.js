state.aboutConfig = {
  "name": "四川奉飞飞无人机科技有限公司",
  "logoName": "fengfeifei-logo.png",
  "intro": "<p><strong>四川奉飞飞无人机科技有限公司</strong>专注于无人机行业服务、飞手协作、技术培训与企业解决方案。</p><ul><li>低空经济综合服务</li><li>飞手协作与任务派发</li><li>企业级无人机应用解决方案</li></ul><p><strong>联系电话：</strong>028-8888 6626</p><p><strong>地址：</strong>四川省成都市高新区天府软件园</p>"
};



function initAboutEditor() {
  initRichEditor({
    toolbarId: "about-intro-toolbar",
    editorId: "about-intro-editor",
    html: state.aboutConfig.intro || "<p></p>",
    placeholder: "请输入企业介绍，支持字体、字号、排版与图文...",
    toolbarKeys: aboutRichToolbarKeys,
    onChange(ed) {
      state.aboutConfig.intro = ed.getHtml();
    }
  });
}

function aboutLogoPreview(about) {
  return `<span class="about-logo-preview">${thumb(Boolean(about.logoName), { title: about.logoName || "企业 Logo" })}<span class="muted">${about.logoName || "—"}</span></span>`;
}

function aboutPage() {
  const about = state.aboutConfig;
  return panel("基础信息", detailGrid([
    ["企业名称", about.name],
    ["企业 Logo", aboutLogoPreview(about)]
  ]))
  + panel("企业介绍", richEditorContainer({
    toolbarId: "about-intro-toolbar",
    editorId: "about-intro-editor"
  }), `${button("预览", "preview-about")}${button("保存配置", "save-about", "primary")}`);
}

DroneAdmin.registerModule({
  id: "about",
  routes: [
  "about"
],
  titles: {
  "about": "关于我们"
},
  docs: {
  "about": {
    "summary": "配置「关于我们」页面内容，同步至小程序企业介绍模块。",
    "operations": [
      "企业名称与企业 Logo 只读展示，来源于企业主体资料",
      "企业介绍使用富文本编辑器，支持字体、字号、排版与图文",
      "电话、地址等信息可在企业介绍正文中自行编排",
      "点击「预览」查看小程序端展示效果",
      "保存后更新线上展示内容"
    ],
    "fields": [
      [
        "企业名称",
        "只读展示，小程序关于页标题"
      ],
      [
        "企业 Logo",
        "只读展示，品牌标识"
      ],
      [
        "企业介绍",
        "富文本正文，支持字体排版、字号与图文"
      ]
    ]
  }
},
  pages: {
    "about": aboutPage
  },
  actions: {
    "preview-about": function (target) {
      const about = state.aboutConfig;
          if (state.richEditor) about.intro = state.richEditor.getHtml();
          modal("小程序展示预览", `<div class="preview-card">${aboutLogoPreview(about)}<h2>${about.name}</h2>
            <div class="preview-rich">${about.intro || "<p>—</p>"}</div></div>`, button("关闭", "close-modal"));
    },
    "save-about": function (target) {
      if (state.richEditor) state.aboutConfig.intro = state.richEditor.getHtml();
          toast("企业介绍配置已保存（模拟）");
    }
  },
  changeActions: {},
  afterRender: {
    "about": initAboutEditor
  },
  beforeNavigate: null,
  onClose: null
});
