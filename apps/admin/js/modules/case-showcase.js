const caseShowcaseDefaults = {
  items: [
    {
      id: "case-hospital-hoisting",
      title: "医院应急吊运案例",
      summary: "夜间应急调度医疗冷链箱，完成院区楼间高效吊运交接。",
      images: [
        "./assets/icons/home-nav/entry-hoisting-large.png",
        "./assets/icons/home-nav/entry-transport-large.png",
        "./assets/icons/home-nav/entry-cleaning-large.png"
      ],
      intro: "<p><strong>项目背景：</strong>上海某医院夜间需要在两栋楼之间转运医疗冷链箱，传统地面转运路径长、交接慢。</p><p><strong>执行方案：</strong>平台根据后台模板快速收集吊运物品、重量、作业地点和现场照片，确认起降条件后安排飞手执行。</p><ul><li>吊运物品：医疗冷链箱</li><li>执行时段：夜间加急</li><li>交付方式：院区西门定点交接</li></ul><p><strong>交付结果：</strong>现场在短时间内完成吊运与交接，减少了院区内部周转时间。</p>"
    },
    {
      id: "case-farm-inspection",
      title: "农业巡检案例",
      summary: "针对大面积农田进行周期巡检，输出病虫害和灌溉观察结果。",
      images: [
        "./assets/icons/home-nav/entry-agriculture-large.png",
        "./assets/icons/home-nav/entry-transport-large.png",
        "./assets/icons/home-nav/entry-hoisting-large.png"
      ],
      intro: "<p><strong>项目背景：</strong>客户需要对连片农田进行阶段性巡检，快速掌握作物长势与灌溉状态。</p><p><strong>执行方案：</strong>后台按案例配置维护巡检案例封面、标题和介绍，前端展示为案例卡片供客户查看落地效果。</p><ul><li>巡检范围：连片农田示范区</li><li>交付内容：巡检影像、异常点标注</li><li>执行方式：分区域低空航线巡检</li></ul><p><strong>交付结果：</strong>客户可通过巡检结果快速定位重点区域，便于后续处置。</p>"
    },
    {
      id: "case-building-cleaning",
      title: "园区高空清洗案例",
      summary: "面向产业园外立面清洗场景，展示高空作业流程和执行成果。",
      images: [
        "./assets/icons/home-nav/entry-cleaning-large.png",
        "./assets/icons/home-nav/entry-hoisting-large.png",
        "./assets/icons/home-nav/entry-agriculture-large.png"
      ],
      intro: "<p><strong>项目背景：</strong>某园区需要完成高层外立面清洗，重点关注北侧玻璃幕墙与连廊区域。</p><p><strong>执行方案：</strong>平台通过后台案例管理沉淀清洗过程、作业图片和服务介绍，首页统一按案例形式展示。</p><ul><li>作业区域：园区外立面北侧</li><li>服务方式：无人机搭载清洗设备</li><li>现场要求：固定交接点、提前确认天气</li></ul><p><strong>交付结果：</strong>案例页面可直观呈现服务过程，便于销售和客户沟通。</p>"
    }
  ]
};

function cloneCaseShowcaseDefaults() {
  return {
    items: caseShowcaseDefaults.items.map(item => ({ ...item, images: [...item.images] }))
  };
}

state.caseShowcase = cloneCaseShowcaseDefaults();
state.caseShowcaseObjectUrls = [];
state.editingCaseId = null;

function caseShowcaseEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getCaseItem(id) {
  return state.caseShowcase.items.find(item => item.id === id);
}

function caseRows() {
  return state.caseShowcase.items.map((item, index) => [
    `<strong>${index + 1}</strong>`,
    `<div class="case-showcase-cover">${item.images?.[0] ? `<img src="${caseShowcaseEscape(item.images[0])}" alt="${caseShowcaseEscape(item.title)}">` : imageMissingIcon()}</div>`,
    `<div><strong>${caseShowcaseEscape(item.title)}</strong><small class="muted">${caseShowcaseEscape(item.summary)}</small></div>`,
    `${item.images?.length || 0} 张`,
    `<span class="muted">${item.intro ? "已配置富文本介绍" : "未配置"}</span>`,
    rowActions({ edit: "edit-case-showcase", moveAction: "move-case-showcase", deleteAction: "delete-case-showcase", id: item.id, index, total: state.caseShowcase.items.length })
  ]);
}

function caseShowcasePage() {
  return panel("案例展示配置", `
    <div class="toolbar" style="margin-bottom:14px">
      <span class="muted">首页「案例展示」由后台维护，字段包含标题、轮播图和富文本介绍。</span>
      <span class="spacer"></span>${button("恢复默认", "reset-case-showcase")}${button("新增案例", "new-case-showcase", "primary")}
    </div>
    ${paginatedTable("case-showcase", ["序号","封面","标题 / 摘要","轮播图","案例介绍","操作"], caseRows(), "case-showcase-table")}
  `);
}

function caseShowcaseEditPage() {
  const item = getCaseItem(state.editingCaseId) || { title: "", summary: "", images: ["", "", ""], intro: "<p></p>" };
  const images = [...(item.images || [])];
  while (images.length < 3) images.push("");

  return panel("案例基础信息", formGrid([
    { label: "案例标题", wide: true, html: `<input data-field="case-title" value="${caseShowcaseEscape(item.title)}" placeholder="请输入案例标题">` },
    { label: "案例摘要", wide: true, html: `<textarea data-field="case-summary" placeholder="请输入案例摘要">${caseShowcaseEscape(item.summary)}</textarea>` },
    ...images.map((image, index) => ({
      label: `轮播图 ${index + 1}`,
      wide: true,
      html: `<div class="case-showcase-image-field">
        <div class="case-showcase-cover case-showcase-cover--large">${image ? `<img src="${caseShowcaseEscape(image)}" alt="轮播图 ${index + 1}">` : imageMissingIcon()}</div>
        <div class="case-showcase-image-meta">
          <input data-field="case-image" data-index="${index}" value="${caseShowcaseEscape(image)}" placeholder="图片地址或本地预览地址">
          <div class="toolbar">${button("选择图片", "pick-case-image", "small", `data-index="${index}"`)}${button("清空", "clear-case-image", "small", `data-index="${index}"`)}</div>
        </div>
      </div>`
    }))
  ]), `${button("返回列表", "back-case-showcase")}${button("保存案例", "save-case-showcase", "primary")}`)
  + panel("案例介绍", richEditorContainer({ toolbarId: "case-showcase-toolbar", editorId: "case-showcase-editor" }));
}

function readCaseShowcaseForm() {
  const page = document.querySelector(".page");
  const current = getCaseItem(state.editingCaseId);
  if (!current || !page) return null;
  current.title = page.querySelector('[data-field="case-title"]')?.value.trim() || "";
  current.summary = page.querySelector('[data-field="case-summary"]')?.value.trim() || "";
  current.images = [...page.querySelectorAll('[data-field="case-image"]')].map(input => input.value.trim()).filter(Boolean);
  if (state.richEditor) current.intro = state.richEditor.getHtml();
  return current;
}

function initCaseShowcaseEditor() {
  const item = getCaseItem(state.editingCaseId);
  if (!item) return;
  initRichEditor({
    toolbarId: "case-showcase-toolbar",
    editorId: "case-showcase-editor",
    html: item.intro || "<p></p>",
    placeholder: "请输入案例介绍，支持图文排版..."
  });
}

DroneAdmin.registerModule({
  id: "case-showcase",
  routes: ["case-showcase", "case-showcase-edit"],
  titles: {
    "case-showcase": "案例展示配置",
    "case-showcase-edit": "编辑案例"
  },
  docs: {
    "case-showcase": {
      summary: "配置小程序首页案例展示区，支持后台新增案例并维护轮播图、标题和富文本介绍。",
      operations: [
        "新增案例并填写标题、摘要、轮播图和富文本介绍",
        "列表支持编辑、删除、排序",
        "轮播图可通过本地文件选择替换演示图",
        "保存后作为首页案例展示的数据来源"
      ],
      fields: [
        ["案例标题", "首页卡片标题与详情页主标题"],
        ["轮播图", "案例详情页轮播图，首页取首图作为封面"],
        ["案例摘要", "首页卡片简要说明"],
        ["案例介绍", "富文本内容，用于案例详情页展示"]
      ]
    }
  },
  pages: {
    "case-showcase": caseShowcasePage,
    "case-showcase-edit": caseShowcaseEditPage
  },
  actions: {
    "new-case-showcase": function () {
      const id = `case-${Date.now()}`;
      state.caseShowcase.items.unshift({ id, title: "未命名案例", summary: "", images: [], intro: "<p></p>" });
      state.editingCaseId = id;
      navigate("case-showcase-edit");
    },
    "edit-case-showcase": function (target) {
      state.editingCaseId = target.dataset.id;
      navigate("case-showcase-edit");
    },
    "back-case-showcase": function () {
      navigate("case-showcase");
    },
    "move-case-showcase": function (target) {
      const index = state.caseShowcase.items.findIndex(item => item.id === target.dataset.id);
      const next = index + Number(target.dataset.dir);
      if (index < 0 || next < 0 || next >= state.caseShowcase.items.length) return;
      [state.caseShowcase.items[index], state.caseShowcase.items[next]] = [state.caseShowcase.items[next], state.caseShowcase.items[index]];
      render();
    },
    "delete-case-showcase": function (target) {
      state.caseShowcase.items = state.caseShowcase.items.filter(item => item.id !== target.dataset.id);
      render();
      toast("案例已删除");
    },
    "reset-case-showcase": function () {
      state.caseShowcaseObjectUrls.forEach(url => URL.revokeObjectURL(url));
      state.caseShowcaseObjectUrls = [];
      state.caseShowcase = cloneCaseShowcaseDefaults();
      render();
      toast("已恢复默认案例");
    },
    "save-case-showcase": function () {
      const item = readCaseShowcaseForm();
      if (!item?.title) return toast("请填写案例标题");
      if (!item.images?.length) return toast("请至少配置 1 张轮播图");
      navigate("case-showcase");
      toast("案例配置已保存");
    },
    "pick-case-image": async function (target) {
      const files = await pickLocalFile({ accept: "image/*" });
      const file = files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      state.caseShowcaseObjectUrls.push(url);
      const input = document.querySelector(`[data-field="case-image"][data-index="${target.dataset.index}"]`);
      if (input) input.value = url;
      readCaseShowcaseForm();
      render();
      toast(`已选择图片：${file.name}`);
    },
    "clear-case-image": function (target) {
      const input = document.querySelector(`[data-field="case-image"][data-index="${target.dataset.index}"]`);
      if (input) input.value = "";
      readCaseShowcaseForm();
      render();
    }
  },
  afterRender: {
    "case-showcase-edit": initCaseShowcaseEditor
  }
});
