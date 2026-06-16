const homepageNavDefaults = {
  items: [
    { id: "nav-hoisting", title: "吊运", size: "large", image: "../shared/assets/home-nav/entry-hoisting-large.png", imageName: "entry-hoisting-large.png", jumpType: "internal", link: "/pages/services/hoisting/index", enabled: true },
    { id: "nav-agriculture", title: "农业", size: "large", image: "../shared/assets/home-nav/entry-agriculture-large.png", imageName: "entry-agriculture-large.png", jumpType: "internal", link: "/pages/services/agriculture/index", enabled: true },
    { id: "nav-cleaning", title: "高空清洗", size: "large", image: "../shared/assets/home-nav/entry-cleaning-large.png", imageName: "entry-cleaning-large.png", jumpType: "internal", link: "/pages/services/cleaning/index", enabled: true },
    { id: "nav-transport", title: "高空搬运", size: "large", image: "../shared/assets/home-nav/entry-transport-large.png", imageName: "entry-transport-large.png", jumpType: "internal", link: "/pages/services/transport/index", enabled: true },
    { id: "nav-sales", title: "无人机销售", size: "small", image: "../shared/assets/home-nav/entry-sales-small.png", imageName: "entry-sales-small.png", jumpType: "internal", link: "/pages/products/index?type=sales", enabled: true },
    { id: "nav-rental", title: "无人机租赁", size: "small", image: "../shared/assets/home-nav/entry-rental-small.png", imageName: "entry-rental-small.png", jumpType: "internal", link: "/pages/products/index?type=rental", enabled: true },
    { id: "nav-maintenance", title: "保养", size: "small", image: "../shared/assets/home-nav/entry-maintenance-small.png", imageName: "entry-maintenance-small.png", jumpType: "internal", link: "/pages/maintenance/index", enabled: true },
    { id: "nav-all", title: "全部分类", size: "small", image: "../shared/assets/home-nav/entry-all-small.png", imageName: "entry-all-small.png", jumpType: "internal", link: "/pages/categories/index", enabled: true }
  ]
};

function cloneHomepageNavDefaults() {
  return {
    items: homepageNavDefaults.items.map(item => ({ ...item }))
  };
}

state.homepageNav = cloneHomepageNavDefaults();
state.homepageNavImageUrls = [];

function homepageNavEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getHomepageNavItem(id) {
  return state.homepageNav.items.find(item => item.id === id);
}

function homepageNavImage(item, className = "") {
  if (!item.image) {
    return `<span class="homepage-nav-image homepage-nav-image--missing ${className}">${imageMissingIcon()}</span>`;
  }
  return `<span class="homepage-nav-image ${className}"><img src="${homepageNavEscape(item.image)}" alt="${homepageNavEscape(item.title)}"></span>`;
}

function homepageNavRows() {
  return state.homepageNav.items.map((item, index) => {
    const isLarge = item.size === "large";
    const typeLabel = isLarge ? "大图片入口" : "小图片入口";
    const group = state.homepageNav.items.filter(entry => entry.size === item.size);
    const groupIndex = group.findIndex(entry => entry.id === item.id);
    return [
      `<strong>${index + 1}</strong>`,
      `<div class="homepage-nav-entry">${homepageNavImage(item, isLarge ? "homepage-nav-image--large-entry" : "homepage-nav-image--small-entry")}</div>`,
      tag(typeLabel),
      `<div class="homepage-nav-fields">
        <select data-action="homepage-nav-field" data-homepage-field="jumpType" data-id="${item.id}">
          <option value="internal"${item.jumpType === "internal" ? " selected" : ""}>内链</option>
          <option value="external"${item.jumpType === "external" ? " selected" : ""}>外链</option>
        </select>
        <input data-homepage-field="link" data-id="${item.id}" value="${homepageNavEscape(item.link)}" placeholder="${item.jumpType === "external" ? "请输入 https:// 开头链接" : "请输入 / 开头小程序路径"}">
      </div>`,
      `<span class="muted">${homepageNavEscape(item.imageName || "未选择图片")}</span>`,
      `<label class="switch"><input type="checkbox" data-action="toggle-homepage-nav" data-id="${item.id}"${item.enabled ? " checked" : ""}> ${item.enabled ? "已启用" : "已停用"}</label>`,
      `<div class="row-actions">
        ${button("上移", "move-homepage-nav", "small", `data-id="${item.id}" data-dir="-1"${groupIndex === 0 ? " disabled" : ""}`)}
        ${button("下移", "move-homepage-nav", "small", `data-id="${item.id}" data-dir="1"${groupIndex === group.length - 1 ? " disabled" : ""}`)}
        ${button("选择图片", "pick-homepage-nav-image", "small", `data-id="${item.id}"`)}
      </div>`
    ];
  });
}

function homepageNavPage() {
  return panel("导航配置", `
    <div class="homepage-nav-template">
      <div><strong>固定 8 个首页导航入口</strong><span class="muted">图片已自带标题文案；序号 1-4 为大图片入口，5-8 为小图片入口；大图和小图可分别排序。</span></div>
      <div class="toolbar">${button("重置", "reset-homepage-nav")}${button("保存配置", "save-homepage-nav", "primary")}</div>
    </div>
    <div class="table-scroll">${table(["序号", "入口图片", "入口类型", "跳转配置", "图片文件", "状态", "排序 / 操作"], homepageNavRows(), "homepage-nav-table")}</div>
  `);
}

function validateHomepageNav() {
  for (let index = 0; index < state.homepageNav.items.length; index++) {
    const item = state.homepageNav.items[index];
    if (!item.link.trim()) return `请配置序号 ${index + 1} 的跳转链接`;
    if (item.jumpType === "internal" && !item.link.startsWith("/")) {
      return `序号 ${index + 1} 的内链需要以 / 开头`;
    }
    if (item.jumpType === "external" && !/^https?:\/\//i.test(item.link)) {
      return `序号 ${index + 1} 的外链需要以 http:// 或 https:// 开头`;
    }
  }
  return "";
}

function bindHomepageNavInputs() {
  document.querySelectorAll("[data-homepage-field]").forEach(input => {
    if (input.tagName === "SELECT") return;
    input.addEventListener("input", event => {
      const item = getHomepageNavItem(event.target.dataset.id);
      if (!item) return;
      item[event.target.dataset.homepageField] = event.target.value;
    });
  });
}

DroneAdmin.registerModule({
  id: "homepage-nav",
  routes: ["homepage-nav"],
  titles: {
    "homepage-nav": "导航配置"
  },
  docs: {
    "homepage-nav": {
      summary: "配置小程序首页 8 个固定导航入口，仅以后台列表形式维护，不展示手机可视化预览。",
      operations: [
        "固定展示 8 个入口，序号 1-4 为大图片入口，序号 5-8 为小图片入口",
        "图片自带入口标题文案，后台不再配置标题和副标题",
        "可维护跳转类型、跳转链接、图片、启用状态和组内排序",
        "点击选择图片可替换单个入口测试图",
        "保存前校验内链或外链格式；重置可恢复默认演示配置"
      ],
      fields: [
        ["序号", "固定 1-8，不在导航配置页调整入口数量"],
        ["入口类型", "1-4 固定为大图片入口，5-8 固定为小图片入口；排序仅在同类型内进行"],
        ["导航图片", "当前使用蓝绿色简约科技风样稿裁切图作为测试数据"],
        ["跳转类型", "仅支持内链和外链"],
        ["跳转链接", "内链填写小程序路径，外链填写 http:// 或 https:// 开头的链接"],
        ["启用状态", "关闭后小程序端不展示或置灰该入口"]
      ]
    }
  },
  pages: {
    "homepage-nav": homepageNavPage
  },
  actions: {
    "pick-homepage-nav-image": async function (target) {
      const item = getHomepageNavItem(target.dataset.id);
      if (!item) return;
      const files = await pickLocalFile({ accept: "image/*" });
      const file = files[0];
      if (!file) {
        toast("未选择图片");
        return;
      }
      if (item.image?.startsWith("blob:")) URL.revokeObjectURL(item.image);
      const url = URL.createObjectURL(file);
      state.homepageNavImageUrls.push(url);
      item.image = url;
      item.imageName = file.name;
      render();
      toast(`已选择图片：${file.name}`);
    },
    "move-homepage-nav": function (target) {
      moveHomepageNavItem(target.dataset.id, Number(target.dataset.dir));
      render();
      toast("导航排序已更新");
    },
    "save-homepage-nav": function () {
      const error = validateHomepageNav();
      if (error) {
        toast(error);
        return;
      }
      toast("首页导航配置已保存");
    },
    "reset-homepage-nav": function () {
      modal("重置首页导航", "<p>确认恢复默认的 8 个首页导航入口？当前修改将被清除。</p>",
        `${button("取消", "close-modal")}${button("确认重置", "confirm-reset-homepage-nav", "danger")}`);
    },
    "confirm-reset-homepage-nav": function () {
      state.homepageNavImageUrls.forEach(url => URL.revokeObjectURL(url));
      state.homepageNavImageUrls = [];
      state.homepageNav = cloneHomepageNavDefaults();
      closeModal();
      render();
      toast("已恢复默认首页导航");
    }
  },
  changeActions: {
    "homepage-nav-field": function (target) {
      const item = getHomepageNavItem(target.dataset.id);
      if (!item) return;
      const field = target.dataset.homepageField;
      item[field] = target.value;
      if (field === "jumpType") {
        item.link = target.value === "external" ? "https://example.com" : "/pages/services/index";
        render();
      }
    },
    "toggle-homepage-nav": function (target) {
      const item = getHomepageNavItem(target.dataset.id);
      if (!item) return;
      item.enabled = target.checked;
      render();
      toast(item.enabled ? "已启用该导航入口" : "已停用该导航入口");
    }
  },
  afterRender: {
    "homepage-nav": bindHomepageNavInputs
  },
  beforeNavigate: null,
  onClose: null
});

function moveHomepageNavItem(id, direction) {
  const item = getHomepageNavItem(id);
  if (!item) return;
  const group = state.homepageNav.items.filter(entry => entry.size === item.size);
  const groupIndex = group.findIndex(entry => entry.id === id);
  const nextGroupIndex = groupIndex + direction;
  if (nextGroupIndex < 0 || nextGroupIndex >= group.length) return;
  const currentIndex = state.homepageNav.items.findIndex(entry => entry.id === id);
  const nextIndex = state.homepageNav.items.findIndex(entry => entry.id === group[nextGroupIndex].id);
  [state.homepageNav.items[currentIndex], state.homepageNav.items[nextIndex]] = [state.homepageNav.items[nextIndex], state.homepageNav.items[currentIndex]];
}
