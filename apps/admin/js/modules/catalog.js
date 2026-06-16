state.categories = [
  {
    "id": "c1",
    "name": "上门服务",
    "description": "无人机上门清洗、测绘、巡检等现场服务",
    "icon": "../shared/assets/icons/category-onsite.png",
    "productCount": 12,
    "sort": 1,
    "enabled": true
  },
  {
    "id": "c2",
    "name": "维修保养",
    "description": "设备保养、故障检测与维修服务",
    "icon": "../shared/assets/icons/category-repair.png",
    "productCount": 6,
    "sort": 2,
    "enabled": true
  },
  {
    "id": "c3",
    "name": "代办服务",
    "description": "空域申请、资质代办等代理服务",
    "icon": "../shared/assets/icons/category-agency.png",
    "productCount": 4,
    "sort": 3,
    "enabled": true
  },
  {
    "id": "c4",
    "name": "企业服务",
    "description": "面向企业的定制化无人机解决方案",
    "icon": "../shared/assets/icons/category-enterprise.png",
    "productCount": 0,
    "sort": 4,
    "enabled": true
  }
];
state.products = [
  {
    "id": "p1",
    "code": "SP26001",
    "name": "高空清洗服务",
    "category": "上门服务",
    "status": "已上架",
    "orderCount": 5,
    "properties": {
      "needAppointment": true,
      "onlinePay": true,
      "needPilot": true
    },
    "specs": [
      {
        "name": "标准服务",
        "price": "899"
      },
      {
        "name": "企业增强服务",
        "price": "1599"
      }
    ],
    "images": [
      {
        "id": "pi1",
        "name": "清洗现场1.jpg"
      },
      {
        "id": "pi2",
        "name": "清洗现场2.jpg"
      },
      {
        "id": "pi3",
        "name": "设备作业.jpg"
      }
    ],
    "intro": "<p><strong>高空清洗服务</strong>适用于建筑外立面、光伏板等高空区域的无人机清洗。</p><ul><li>专业清洗设备，覆盖高空死角</li><li>持证飞手操作，安全合规</li><li>支持预约上门，在线支付</li></ul>",
    "displayedReviewIds": []
  },
  {
    "id": "p2",
    "code": "SP26002",
    "name": "无人机保养检测",
    "category": "维修保养",
    "status": "已上架",
    "orderCount": 2,
    "properties": {
      "needAppointment": true,
      "onlinePay": true,
      "needPilot": false
    },
    "specs": [
      {
        "name": "基础保养",
        "price": "899"
      },
      {
        "name": "深度检测",
        "price": "1299"
      }
    ],
    "images": [
      {
        "id": "pi4",
        "name": "保养检测1.jpg"
      }
    ],
    "intro": "<p>提供无人机全机保养与性能检测服务，含硬件检查、固件升级建议与检测报告。</p>",
    "displayedReviewIds": []
  },
  {
    "id": "p3",
    "code": "SP26003",
    "name": "空域代办服务",
    "category": "代办服务",
    "status": "已下架",
    "orderCount": 0,
    "properties": {
      "needAppointment": true,
      "onlinePay": false,
      "needPilot": false
    },
    "specs": [
      {
        "name": "标准代办",
        "price": "3600"
      }
    ],
    "images": [],
    "intro": "<p>空域申请、飞行计划报批等一站式代办，适用于企业航拍与工程测绘项目。</p>",
    "displayedReviewIds": []
  }
];
state.editingProductId = null;
state.newProductDraft = null;
state.editingCategoryId = null;
state.categoryIconDraft = null;
state.reviewDraft = [];
state.reviewDraftProductId = null;
state.productEditor = null;
state.productToolbar = null;
state.deletingCategoryId = null;
state.deletingProductId = null;

const productReviews = DroneAdmin.data.productReviews = [
  {
    "id": "rv1",
    "productId": "p1",
    "orderNo": "YB26060803",
    "user": "唐先生",
    "rating": 5,
    "content": "清洗很专业，高空死角也处理到位，飞手沟通及时，推荐。",
    "time": "2026-06-09 18:20"
  },
  {
    "id": "rv2",
    "productId": "p1",
    "orderNo": "YB26060512",
    "user": "华景物业",
    "rating": 4,
    "content": "整体满意，预约流程顺畅，外立面清洁效果明显。",
    "time": "2026-06-06 11:05"
  },
  {
    "id": "rv3",
    "productId": "p1",
    "orderNo": "YB26060308",
    "user": "云航科技",
    "rating": 5,
    "content": "第二次合作了，团队很专业，报告也详细。",
    "time": "2026-06-03 15:42"
  },
  {
    "id": "rv7",
    "productId": "p1",
    "orderNo": "YB26060218",
    "user": "张女士",
    "rating": 5,
    "content": "高空作业很规范，现场管理到位，会再次预约。",
    "time": "2026-06-02 10:15"
  },
  {
    "id": "rv8",
    "productId": "p1",
    "orderNo": "YB26060105",
    "user": "成都建工",
    "rating": 4,
    "content": "清洗效率不错，就是预约时段希望再多一些选择。",
    "time": "2026-06-01 16:40"
  },
  {
    "id": "rv9",
    "productId": "p1",
    "orderNo": "YB26052811",
    "user": "李先生",
    "rating": 5,
    "content": "光伏板清洗后发电效率明显提升，值得推荐。",
    "time": "2026-05-28 11:22"
  },
  {
    "id": "rv10",
    "productId": "p1",
    "orderNo": "YB26052507",
    "user": "四川航测",
    "rating": 5,
    "content": "团队响应快，作业前后都有详细说明和照片反馈。",
    "time": "2026-05-25 09:08"
  },
  {
    "id": "rv11",
    "productId": "p1",
    "orderNo": "YB26052003",
    "user": "王女士",
    "rating": 4,
    "content": "服务整体不错，个别边角还可以再细致一些。",
    "time": "2026-05-20 14:55"
  },
  {
    "id": "rv4",
    "productId": "p2",
    "orderNo": "YB26061309",
    "user": "赵女士",
    "rating": 5,
    "content": "保养检测很细致，问题点标注清楚，放心。",
    "time": "2026-06-13 09:40"
  },
  {
    "id": "rv5",
    "productId": "p2",
    "orderNo": "YB26061002",
    "user": "王伟",
    "rating": 4,
    "content": "检测速度快，师傅讲解耐心。",
    "time": "2026-06-10 14:18"
  },
  {
    "id": "rv6",
    "productId": "p3",
    "orderNo": "YB26060108",
    "user": "林先生",
    "rating": 5,
    "content": "空域代办效率很高，全程省心。",
    "time": "2026-06-02 16:18"
  }
];

function formatProductAttrs(product) {
  const props = product.properties || {};
  const parts = [];
  if (props.needAppointment) parts.push("预约");
  if (props.onlinePay) parts.push("在线支付");
  else parts.push("不在线支付");
  if (props.needPilot) parts.push("需要飞手");
  else parts.push("无需飞手");
  return parts.join(" / ");
}

function ensureProductShape(product) {
  if (!product.properties) product.properties = { needAppointment: true, onlinePay: true, needPilot: false };
  if (!product.specs) product.specs = [{ name: "标准服务", price: "0" }];
  if (!product.images) product.images = [];
  if (!product.displayedReviewIds) product.displayedReviewIds = [];
  return product;
}

function createEmptyProduct() {
  const defaultCategory = state.categories.find(item => item.enabled)?.name || "上门服务";
  return ensureProductShape({
    id: null,
    code: "",
    name: "",
    category: defaultCategory,
    status: "已下架",
    orderCount: 0,
    properties: { needAppointment: true, onlinePay: true, needPilot: false },
    specs: [{ name: "标准服务", price: "0" }],
    images: [],
    intro: "<p></p>",
    displayedReviewIds: []
  });
}

function isCreatingProduct() {
  return !state.editingProductId;
}

function activeProduct() {
  if (state.editingProductId) {
    const product = state.products.find(item => item.id === state.editingProductId);
    return ensureProductShape(product || state.products[0]);
  }
  if (!state.newProductDraft) state.newProductDraft = createEmptyProduct();
  return state.newProductDraft;
}

function categoryOptions(selected = "") {
  return state.categories
    .filter(item => item.enabled)
    .map(item => `<option${item.name === selected ? " selected" : ""}>${item.name}</option>`)
    .join("");
}

function isCategoryImage(icon) {
  return /\.(png|jpg|jpeg|svg|webp)$/i.test(icon) || String(icon).includes("/");
}

function categoryIcon(icon, name = "") {
  const label = name || "分类图标";
  const content = isCategoryImage(icon)
    ? `<img src="${icon}" alt="${label}">`
    : `<span class="category-icon-text">${icon}</span>`;
  return `<span class="category-icon">${content}</span>`;
}

function categoryActions(item, index, total) {
  return rowActions({ edit: "category-edit", moveAction: "move-category", deleteAction: "delete-category", id: item.id, index, total });
}

function categoriesPage() {
  const sorted = [...state.categories].sort((a, b) => a.sort - b.sort);
  const rows = sorted.map((item, index) => [
    item.sort,
    categoryIcon(item.icon, item.name),
    item.name,
    `<span class="category-desc">${item.description || "—"}</span>`,
    item.productCount,
    tag(item.enabled ? "启用" : "停用"),
    categoryActions(item, index, sorted.length)
  ]);
  return panel("商品分类", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="分类名称">${button("查询","filter","primary")}<span class="spacer"></span>${button("新增分类","category-edit","primary")}
  </div>${paginatedTable("categories", ["排序","图标","分类名称","分类说明","商品数","状态","操作"], rows, "category-table")}`);
}

function productThumb(product) {
  const first = product.images?.[0];
  return thumb(Boolean(first), { title: first ? first.name : "暂无图片" });
}

function initProductEditor() {
  const product = activeProduct();
  initRichEditor({
    html: product.intro || "<p></p>",
    placeholder: "请输入商品介绍...",
    onChange(ed) {
      product.intro = ed.getHtml();
    }
  });
}

function productImagesPanel(product) {
  const images = product.images || [];
  const rows = images.map((item, index) => `<div class="media-row media-row--sort">
    <div class="drag">☷</div>
    <div class="media-preview">图</div>
    <div class="media-meta"><strong>${item.name}</strong><span class="muted">${index === 0 ? "列表默认展示此图" : `轮播第 ${index + 1} 张`}</span></div>
    ${rowActions({ moveAction: "move-product-image", deleteAction: "delete-product-image", id: item.id, index, total: images.length })}
  </div>`).join("");
  return panel("轮播图管理", `<div class="toolbar" style="margin-bottom:14px">
    ${button("上传图片","add-product-image","primary")}
    <span class="muted">最多 9 张 · 第一张为列表封面与详情首图</span>
  </div><div class="media-list">${rows || `<p class="empty">暂无轮播图，请上传</p>`}</div>`);
}

function productDraftKey(product) {
  return product.id || "__new__";
}

function ensureReviewDraft(product) {
  const key = productDraftKey(product);
  if (state.reviewDraftProductId !== key) {
    state.reviewDraft = [...(product.displayedReviewIds || [])];
    state.reviewDraftProductId = key;
  }
  return state.reviewDraft;
}

function reviewListKey(product) {
  return `reviews:${productDraftKey(product)}`;
}

function reviewDraftDirty(product) {
  const saved = [...(product.displayedReviewIds || [])].sort().join(",");
  const draft = [...ensureReviewDraft(product)].sort().join(",");
  return saved !== draft;
}

function productReviewsPanel(product) {
  if (!product.id) {
    return panel("评价管理", `<p class="muted" style="margin:0">评价来自该商品的已完成订单。新建商品需先保存，保存后才可选择要展示的评价。</p>
      <p class="empty" style="margin-top:14px">暂无评价数据</p>`);
  }
  const reviews = productReviews.filter(item => item.productId === product.id);
  const listKey = reviewListKey(product);
  const { items: pageReviews, total, page, pageSize } = paginateItems(reviews, listKey);
  const draft = new Set(ensureReviewDraft(product));
  const saved = new Set(product.displayedReviewIds || []);
  const draftCount = reviews.filter(item => draft.has(item.id)).length;
  const savedCount = reviews.filter(item => saved.has(item.id)).length;
  const dirty = reviewDraftDirty(product);
  const allSelected = pageReviews.length > 0 && pageReviews.every(item => draft.has(item.id));
  const actions = reviews.length ? button(allSelected ? "取消全选" : "全选本页", "select-all-reviews") : "";
  const list = pageReviews.map(item => {
    const checked = draft.has(item.id);
    const published = saved.has(item.id);
    return `<label class="review-option${checked ? " is-on" : ""}">
      <input type="checkbox" data-action="toggle-product-review" data-id="${item.id}"${checked ? " checked" : ""}>
      <span class="review-main">
        <span class="review-head"><strong>${item.user}</strong><span class="review-stars">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</span></span>
        <p>${item.content}</p>
        <span class="muted">订单 ${item.orderNo} · ${item.time}</span>
      </span>
      <span class="review-status ${published ? "on" : "off"}">${published ? "展示中" : "未展示"}</span>
    </label>`;
  }).join("");
  const dirtyTip = dirty ? `<span class="tag amber">有未保存的勾选变更</span>` : "";
  const pagination = total ? listPagination({ total, page, pageSize, key: listKey }) : "";
  return panel("评价管理", `<p class="muted" style="margin:0 0 14px">评价均来自该商品的已完成订单。列表分页浏览，多选后点击顶部「保存商品」在小程序商品详情页生效。当前勾选 <strong>${draftCount}</strong> 条，已保存展示 <strong>${savedCount}</strong> 条。 ${dirtyTip}</p>
    <div class="review-list">${list || `<p class="empty">暂无来自订单的评价</p>`}</div>${pagination}`, actions);
}

function productActions(item) {
  return `<div class="row-actions"><button class="button small" data-route="product-edit" data-product-id="${item.id}">编辑</button>
    ${button("删除","delete-product","small danger",`data-id="${item.id}"`)}</div>`;
}

function productsPage() {
  const rows = state.products.map(item => [
    productThumb(item),
    item.code,
    item.name,
    item.category,
    item.specs.length,
    formatProductAttrs(item),
    tag(item.status),
    productActions(item)
  ]);
  return panel("商品列表", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="商品名称 / 编号"><select><option>全部分类</option>${state.categories.map(item => `<option>${item.name}</option>`).join("")}</select>
    <select><option>全部状态</option><option>已上架</option><option>已下架</option></select>${button("查询","filter","primary")}
    <span class="spacer"></span>${button("创建商品","create-product","primary")}
  </div>${paginatedTable("products", ["商品图","商品编号","商品名称","分类","规格数","业务属性","状态","操作"], rows, "products-table")}`);
}

function propertyRow(label, key, product) {
  const checked = product.properties?.[key];
  return `<label class="property-row"><span>${label}</span><input type="checkbox" data-action="toggle-product-property" data-key="${key}"${checked ? " checked" : ""}></label>`;
}

function productEditPage() {
  const product = activeProduct();
  const creating = isCreatingProduct();
  const specs = product.specs.map((spec, index) => [
    `<input data-field="spec-name" data-index="${index}" value="${spec.name}">`,
    `<input data-field="spec-price" data-index="${index}" value="${spec.price}">`,
    opButton("删除","remove-spec","danger",`data-index="${index}"`)
  ]);
  return panel(creating ? "创建商品" : "编辑商品", formGrid([
    { label: "商品名称", html: `<input data-field="product-name" value="${product.name}" placeholder="请输入商品名称">` },
    { label: "商品分类", html: `<select data-field="product-category">${categoryOptions(product.category)}</select>` },
    { label: "上架状态", html: `<select data-field="product-status"><option${product.status === "已上架" ? " selected" : ""}>已上架</option><option${product.status === "已下架" ? " selected" : ""}>已下架</option></select>` }
  ]), `${routeButton("返回商品列表","products","")}${button("保存商品","save-product","primary")}`)
  + productImagesPanel(product)
  + panel("商品介绍", richEditorContainer())
  + productReviewsPanel(product)
  + panel("多规格配置", `${table(["规格名称","价格（元）","操作"], specs)}<div style="margin-top:12px">${button("添加规格","add-spec")}</div>`)
  + panel("业务属性", `<div class="check-list">${propertyRow("是否需要预约","needAppointment",product)}${propertyRow("是否在线支付","onlinePay",product)}${propertyRow("是否需要飞手服务","needPilot",product)}</div>
    <p class="muted" style="margin:12px 0 0">业务属性与商品绑定。订单生成时保存最终属性快照，后续修改商品不会改变历史订单。</p>`);
}

async function handleAddProductImage() {
  const product = activeProduct();
  if (!product.images) product.images = [];
  if (product.images.length >= 9) {
    toast("轮播图最多上传 9 张");
    return;
  }
  const files = await pickLocalFile({ accept: "image/*", multiple: true });
  if (!files.length) return;
  const slots = 9 - product.images.length;
  files.slice(0, slots).forEach((file, index) => {
    product.images.push({ id: `pi${Date.now() + index}`, name: file.name });
  });
  render();
  if (files.length > slots) toast(`最多还可上传 ${slots} 张，已添加 ${slots} 张`);
  else toast(`已选择 ${Math.min(files.length, slots)} 张图片`);
}

async function handlePickCategoryIcon() {
  const files = await pickLocalFile({ accept: "image/*" });
  const file = files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  state.categoryIconDraft = { url, name: file.name };
  const preview = document.querySelector(".category-icon-field .preview");
  const nameEl = document.getElementById("category-icon-name");
  if (preview) preview.innerHTML = `<img src="${url}" alt="分类图标">`;
  if (nameEl) nameEl.textContent = file.name;
  toast(`已选择：${file.name}`);
}

function readProductFormFromPage() {
  const product = activeProduct();
  const page = document.querySelector(".page");
  if (!page) return product;
  product.name = page.querySelector('[data-field="product-name"]')?.value.trim() || product.name;
  product.category = page.querySelector('[data-field="product-category"]')?.value || product.category;
  product.status = page.querySelector('[data-field="product-status"]')?.value || product.status;
  page.querySelectorAll('[data-field="spec-name"]').forEach(input => {
    const index = Number(input.dataset.index);
    if (product.specs[index]) product.specs[index].name = input.value.trim();
  });
  page.querySelectorAll('[data-field="spec-price"]').forEach(input => {
    const index = Number(input.dataset.index);
    if (product.specs[index]) product.specs[index].price = input.value.trim();
  });
  return product;
}

function saveCategoryFromModal() {
  const overlay = document.getElementById("overlay");
  const name = overlay.querySelector("#category-name")?.value.trim();
  if (!name) {
    toast("请填写分类名称");
    return false;
  }
  const description = overlay.querySelector("#category-description")?.value.trim() || "";
  const enabled = overlay.querySelector("#category-enabled")?.value === "启用";
  const icon = state.categoryIconDraft?.url
    || (state.editingCategoryId && state.categories.find(item => item.id === state.editingCategoryId)?.icon)
    || "../shared/assets/icons/category-onsite.png";

  if (state.editingCategoryId) {
    const item = state.categories.find(entry => entry.id === state.editingCategoryId);
    if (item) {
      item.name = name;
      item.description = description;
      item.enabled = enabled;
      item.icon = icon;
    }
  } else {
    const maxSort = Math.max(0, ...state.categories.map(item => item.sort));
    state.categories.push({
      id: `c${Date.now()}`,
      name,
      description,
      icon,
      productCount: 0,
      sort: maxSort + 1,
      enabled
    });
  }
  state.editingCategoryId = null;
  state.categoryIconDraft = null;
  return true;
}

DroneAdmin.registerModule({
  id: "catalog",
  routes: [
  "categories",
  "products",
  "product-edit"
],
  titles: {
  "categories": "商品分类管理",
  "products": "商品列表",
  "product-edit": "创建 / 编辑商品"
},
  docs: {
  "categories": {
    "summary": "维护商品分类，控制小程序分类入口的名称、图标与展示顺序。业务属性不在此配置。",
    "operations": [
      "新增分类：填写名称、分类说明、上传图标、设置启用状态",
      "点击「编辑」：打开弹窗，修改名称、说明、图标与状态",
      "上移 / 下移：调整列表序号与小程序端分类展示顺序",
      "点击「删除」：仅当商品数为 0 时可删除，否则提示「该分类下还有商品，不可删除」",
      "删除前弹出确认框，确认后永久移除分类（原型模拟）"
    ],
    "fields": [
      [
        "排序",
        "列表序号，仅通过上移 / 下移调整，数字越小越靠前"
      ],
      [
        "图标",
        "分类入口展示图标，建议 128×128，列表中以较大尺寸预览"
      ],
      [
        "分类名称",
        "后台与小程序端展示名称"
      ],
      [
        "分类说明",
        "分类简介文案，用于小程序分类页展示"
      ],
      [
        "商品数",
        "该分类下已关联商品数量，大于 0 时不可删除"
      ],
      [
        "状态",
        "停用后小程序端不展示该分类入口"
      ]
    ]
  },
  "products": {
    "summary": "管理平台全部商品 / 服务，含上架状态与业务属性概览。",
    "operations": [
      "按名称、编号、分类、状态筛选商品",
      "列表默认展示轮播图第一张作为商品封面",
      "点击「创建商品」或列表「编辑」进入商品编辑页",
      "点击「删除」：仅当关联订单数为 0 时可删除，否则提示「该商品已有关联订单，不可删除」",
      "删除前弹出确认框，确认后永久移除商品（原型模拟）",
      "列表「业务属性」为商品级配置摘要，非分类默认值"
    ],
    "fields": [
      [
        "商品图",
        "轮播图第一张，无图时显示「暂无」"
      ],
      [
        "商品编号",
        "系统唯一编号"
      ],
      [
        "商品名称",
        "小程序端展示名称"
      ],
      [
        "分类",
        "所属商品分类"
      ],
      [
        "规格数",
        "该商品配置的规格数量"
      ],
      [
        "业务属性",
        "预约 / 在线支付 / 飞手需求等，与商品绑定"
      ],
      [
        "状态",
        "已上架可在小程序购买，已下架不可见"
      ],
      [
        "关联订单",
        "该商品产生的历史订单数；大于 0 时不允许删除商品"
      ]
    ]
  },
  "product-edit": {
    "summary": "创建或编辑商品，配置轮播图、富文本介绍、评价展示、规格价格及业务属性。",
    "operations": [
      "上传 / 排序 / 删除轮播图，第一张为列表封面与详情首图",
      "商品介绍使用 Element Admin 常用的 WangEditor 富文本组件编辑",
      "评价管理：分页浏览订单评价列表，多选后随「保存商品」一并生效；默认全不展示",
      "添加 / 删除规格，每个规格独立定价",
      "业务属性通过勾选配置：是否需要预约、在线支付、飞手服务",
      "保存后更新商品；历史订单保留下单时属性快照"
    ],
    "fields": [
      [
        "商品名称",
        "对外展示的服务名称"
      ],
      [
        "商品分类",
        "决定商品归属与小程序分类入口"
      ],
      [
        "轮播图",
        "商品详情顶部轮播，最多 9 张，顺序可调"
      ],
      [
        "商品介绍",
        "WangEditor 富文本详情，小程序详情页展示"
      ],
      [
        "评价管理",
        "来自已完成订单的用户评价列表，多选后随保存商品一并生效"
      ],
      [
        "规格名称 / 价格",
        "多规格 SKU，用户下单时选择"
      ],
      [
        "是否需要预约",
        "勾选表示下单需选择服务时间"
      ],
      [
        "是否在线支付",
        "勾选表示支持线上下单支付"
      ],
      [
        "是否需要飞手服务",
        "勾选表示订单需后台派单给飞手"
      ]
    ]
  }
},
  pages: {
    "categories": categoriesPage,
    "products": productsPage,
    "product-edit": productEditPage
  },
  actions: {
    "create-product": function (target) {
      state.editingProductId = null;
          state.newProductDraft = null;
          state.reviewDraftProductId = null;
          navigate("product-edit");
    },
    "category-edit": function (target) {
      const item = state.categories.find(x => x.id === target.dataset.id);
          state.editingCategoryId = item?.id || null;
          state.categoryIconDraft = null;
          const draft = item || { name: "", description: "", icon: "../shared/assets/icons/category-onsite.png", sort: state.categories.length + 1, enabled: true };
          const iconPreview = isCategoryImage(draft.icon)
            ? `<img src="${draft.icon}" alt="${draft.name || "分类图标"}">`
            : `<span class="category-icon-text">${draft.icon || "分类"}</span>`;
          modal("商品分类", formGrid([
            { label: "分类名称", html: `<input id="category-name" value="${draft.name}" placeholder="请输入分类名称">` },
            { label: "分类状态", html: `<select id="category-enabled"><option${draft.enabled ? " selected" : ""}>启用</option><option${draft.enabled ? "" : " selected"}>停用</option></select>` },
            { label: "分类说明", wide: true, html: `<textarea id="category-description" placeholder="请输入分类说明，用于小程序分类页展示">${draft.description || ""}</textarea>` },
            { label: "分类图标", wide: true, html: `<div class="category-icon-field"><span class="category-icon preview">${iconPreview}</span>${button("选择图片", "pick-category-icon")}<span class="muted category-icon-name" id="category-icon-name">${item ? "保留当前图标或重新选择" : "未选择"}</span><span class="muted">建议 128×128 或更大，用于小程序分类入口展示</span></div>` }
          ]), `${button("取消","close-modal")}${button("保存分类","save-category","primary")}`, true);
    },
    "save-category": function (target) {
      if (saveCategoryFromModal()) {
            closeModal();
            render();
            toast("分类已保存");
          }
    },
    "move-category": function (target) {
      const sorted = [...state.categories].sort((a, b) => a.sort - b.sort);
          const index = sorted.findIndex(x => x.id === target.dataset.id);
          const next = index + Number(target.dataset.dir);
          if (next >= 0 && next < sorted.length) {
            const current = sorted[index];
            const neighbor = sorted[next];
            [current.sort, neighbor.sort] = [neighbor.sort, current.sort];
            render();
            toast("分类排序已更新");
          }
    },
    "delete-category": function (target) {
      const item = state.categories.find(x => x.id === target.dataset.id);
          if (!item) return;
          if (item.productCount > 0) {
            toast("该分类下还有商品，不可删除");
            return;
          }
          state.deletingCategoryId = item.id;
          modal("确认删除", `<p>确认删除分类「${item.name}」？删除后不可恢复。</p>`,
            `${button("取消","close-modal")}${button("确认删除","confirm-delete-category","danger")}`);
    },
    "confirm-delete-category": function (target) {
      state.categories = state.categories.filter(x => x.id !== state.deletingCategoryId);
          state.deletingCategoryId = null;
          closeModal();
          render();
          toast("分类已删除");
    },
    "delete-product": function (target) {
      const item = state.products.find(x => x.id === target.dataset.id);
          if (!item) return;
          if (item.orderCount > 0) {
            toast("该商品已有关联订单，不可删除");
            return;
          }
          state.deletingProductId = item.id;
          modal("确认删除", `<p>确认删除商品「${item.name}」？删除后不可恢复。</p>`,
            `${button("取消","close-modal")}${button("确认删除","confirm-delete-product","danger")}`);
    },
    "confirm-delete-product": function (target) {
      state.products = state.products.filter(x => x.id !== state.deletingProductId);
          state.deletingProductId = null;
          closeModal();
          render();
          toast("商品已删除");
    },
    "add-spec": function (target) {
      activeProduct().specs.push({ name: "新规格", price: "0" });
          render();
    },
    "remove-spec": function (target) {
      activeProduct().specs.splice(Number(target.dataset.index), 1);
          render();
    },
    "save-product": function (target) {
      const product = readProductFormFromPage();
          if (state.richEditor) product.intro = state.richEditor.getHtml();
          if (!product.name.trim()) {
            toast("请填写商品名称");
            return;
          }
          product.displayedReviewIds = [...ensureReviewDraft(product)];
          if (isCreatingProduct()) {
            const id = `p${Date.now()}`;
            product.id = id;
            product.code = `SP${String(state.products.length + 1).padStart(5, "0")}`;
            state.products.push(product);
            state.editingProductId = id;
            state.newProductDraft = null;
            toast("商品已创建并保存");
          } else {
            toast("商品已保存");
          }
          render();
    },
    "add-product-image": function (target) {
      handleAddProductImage();
    },
    "delete-product-image": function (target) {
      const product = activeProduct();
          product.images = product.images.filter(item => item.id !== target.dataset.id);
          render();
          toast("轮播图已删除");
    },
    "move-product-image": function (target) {
      const product = activeProduct();
          const index = product.images.findIndex(item => item.id === target.dataset.id);
          const next = index + Number(target.dataset.dir);
          if (next >= 0 && next < product.images.length) {
            [product.images[index], product.images[next]] = [product.images[next], product.images[index]];
            render();
            toast("轮播图顺序已更新");
          }
    },
    "select-all-reviews": function (target) {
      const product = activeProduct();
          const reviews = productReviews.filter(item => item.productId === product.id);
          const { items: pageReviews } = paginateItems(reviews, reviewListKey(product));
          const draft = new Set(ensureReviewDraft(product));
          const allPageSelected = pageReviews.length > 0 && pageReviews.every(item => draft.has(item.id));
          pageReviews.forEach(item => {
            if (allPageSelected) draft.delete(item.id);
            else draft.add(item.id);
          });
          state.reviewDraft = [...draft];
          render();
    },
    "pick-category-icon": function (target) {
      handlePickCategoryIcon();
    }
  },
  changeActions: {
    "toggle-product-property": function (target) {
      const product = activeProduct();
          product.properties[event.target.dataset.key] = event.target.checked;
          render();
          return;
    },
    "toggle-product-review": function (target) {
      const draft = new Set(ensureReviewDraft(activeProduct()));
          if (event.target.checked) draft.add(event.target.dataset.id);
          else draft.delete(event.target.dataset.id);
          state.reviewDraft = [...draft];
          render();
          return;
    }
  },
  afterRender: {
    "product-edit": initProductEditor
  },
  beforeNavigate: function (target) {
    if (target.dataset.route === "product-edit") {
      if (target.dataset.productId) {
        state.editingProductId = target.dataset.productId;
        state.newProductDraft = null;
      } else {
        state.editingProductId = null;
        state.newProductDraft = null;
        state.reviewDraftProductId = null;
      }
    }
  },
  onClose: function () {
    state.deletingCategoryId = null;
    state.deletingProductId = null;
    state.editingCategoryId = null;
    state.categoryIconDraft = null;
  }
});
