function reqField(key, label, type = "text", required = false, extra = {}) {
  return {
    key,
    label,
    type,
    required,
    placeholder: extra.placeholder || (type === "image" ? `上传${label}` : `请输入${label}`),
    options: extra.options,
    sort: extra.sort || 1
  };
}

function productFields(list) {
  return list.map((field, index) => ({ ...field, sort: index + 1 }));
}

function productItem(id, name, category, fields, desc, price = "0", needPilot = true) {
  return {
    id,
    code: `SP${String(26000 + Number(id.replace("p", ""))).padStart(5, "0")}`,
    name,
    category,
    status: "已上架",
    orderCount: 0,
    properties: { onlinePay: false, needPilot },
    requirementFields: fields,
    specs: [{ name: "信息提交", price }],
    images: [],
    intro: `<p>${desc}</p>`,
    displayedReviewIds: []
  };
}

state.categories = [
  { id: "c1", name: "无人机服务", description: "巡检、物流、吊运、表演、托管等无人机服务", productCount: 5, sort: 1, enabled: true },
  { id: "c2", name: "无人机外卖配送", description: "外卖配送跳转入口", productCount: 1, sort: 2, enabled: true },
  { id: "c3", name: "培训教育与赛事举办", description: "无人机赛事、飞手培训、少儿培训信息填写", productCount: 3, sort: 3, enabled: true }
];

state.products = [
  productItem("p1", "无人机巡检服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("serviceType", "服务类型", "select", true, { options: ["楼宇巡检", "园区巡检", "航线巡检", "设备巡检"] }),
    reqField("inspectionArea", "巡检区域", "text", true),
    reqField("inspectionTime", "巡检时间", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "填写巡检区域、时间和需求说明，平台根据需求安排无人机巡检服务。"),
  productItem("p2", "无人机物流服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("customerType", "客户类型", "select", true, { options: ["个人", "企业", "医院/园区", "政府机构"] }),
    reqField("cargoType", "货物类型", "text", true),
    reqField("cargoWeight", "货物重量", "text", true),
    reqField("cargoVolume", "货物体积"),
    reqField("startPoint", "起运点", "text", true),
    reqField("startAddress", "详细地址", "text", true),
    reqField("destination", "目的地", "text", true),
    reqField("destinationAddress", "详细地址", "text", true),
    reqField("transportLimit", "运输时效", "select", true, { options: ["普通", "加急", "定时达"] }),
    reqField("expectedTime", "期望运输时间", "text", true),
    reqField("cargoPhoto", "货物照片", "image"),
    reqField("remark", "备注说明"),
    reqField("exampleImage", "例图", "image")
  ]), "填写货物、起运点、目的地和运输时效，平台确认后安排无人机物流服务。"),
  productItem("p3", "无人机吊运服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("itemName", "吊运物品", "text", true),
    reqField("weight", "物品重量（kg）", "text", true),
    reqField("workAddress", "作业地点", "text", true),
    reqField("height", "吊运高度（m）", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "填写吊运物品、重量、高度和作业地点，平台评估现场条件后安排服务。"),
  productItem("p4", "无人机表演服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("purpose", "表演目的", "text", true),
    reqField("date", "表演日期", "text", true),
    reqField("timeSlot", "表演时段", "text", true),
    reqField("backupDate", "是否备用雨天/延期日期"),
    reqField("scale", "表演规模", "select", true, { options: ["100 架以内", "100-300 架", "300 架以上", "待方案确认"] }),
    reqField("exampleImage", "例图", "image")
  ]), "填写表演目的、日期、时段和规模，平台根据活动需求制定无人机表演方案。"),
  productItem("p5", "无人机托管服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("droneModel", "无人机型号", "text", true),
    reqField("count", "托管数量", "text", true),
    reqField("duration", "托管时长", "select", true, { options: ["1 个月", "3 个月", "6 个月", "12 个月"] }),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "填写托管机型、数量和时长，平台提供设备托管与运维管理服务。", "0", false),
  productItem("p6", "无人机外卖配送", "无人机外卖配送", productFields([
    reqField("jumpTip", "跳转说明", "text", false, { placeholder: "点击任意地方即可跳转" })
  ]), "点击任意地方即可跳转到无人机外卖配送服务。", "0", false),
  productItem("p7", "无人机赛事", "培训教育与赛事举办", productFields([
    reqField("registerType", "注册类型", "select", true, { options: ["个人", "单位", "学校", "机构"] }),
    reqField("organization", "单位名称", "text", true),
    reqField("name", "姓名", "text", true),
    reqField("gender", "性别", "select", true, { options: ["男", "女"] }),
    reqField("idNo", "证件号", "text", true),
    reqField("group", "组别", "select", true, { options: ["成人组", "青少年组", "团体组"] }),
    reqField("phone", "联系电话", "text", true),
    reqField("email", "电子邮箱"),
    reqField("remark", "备注")
  ]), "填写赛事报名信息，适用于无人机赛事报名和资料登记。", "0", false),
  productItem("p8", "飞手培训", "培训教育与赛事举办", productFields([
    reqField("name", "姓名", "text", true),
    reqField("phone", "联系电话", "text", true),
    reqField("gender", "性别", "select", true, { options: ["男", "女"] }),
    reqField("birthday", "出生日期", "text", true),
    reqField("idNo", "身份证号", "text", true),
    reqField("examModel", "考试机型", "select", true, { options: ["多旋翼", "固定翼", "垂直起降固定翼"] }),
    reqField("licenseLevel", "证照级别", "select", true, { options: ["视距内", "超视距", "教员"] }),
    reqField("hasBase", "有无基础", "select", true, { options: ["有基础", "无基础"] }),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "填写飞手培训报名信息，平台根据考试机型和基础情况安排培训。", "0", false),
  productItem("p9", "少儿培训", "培训教育与赛事举办", productFields([
    reqField("name", "姓名", "text", true),
    reqField("gender", "性别", "select", true, { options: ["男", "女"] }),
    reqField("age", "年龄", "text", true),
    reqField("grade", "在读年级", "text", true),
    reqField("parentName", "家长姓名", "text", true),
    reqField("parentPhone", "家长手机号", "text", true),
    reqField("hasDroneBase", "有无无人机基础", "select", true, { options: ["有", "无"] }),
    reqField("interest", "感兴趣方向", "select", true, { options: ["飞行体验", "编程控制", "竞赛训练", "航拍创作"] }),
    reqField("classTime", "上课时间", "text", true),
    reqField("intent", "报名意向", "select", true, { options: ["试听", "短期课", "长期班"] })
  ]), "填写少儿培训报名信息，便于课程顾问匹配课程和上课时间。", "0", false)
];
state.editingProductId = null;
state.newProductDraft = null;
state.editingCategoryId = null;
state.reviewDraft = [];
state.reviewDraftProductId = null;
state.productEditor = null;
state.productToolbar = null;
state.deletingCategoryId = null;
state.deletingProductId = null;

const requirementFieldTypes = ["text", "select", "image"];

function defaultRequirementFields() {
  return [
    { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
    { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 }
  ];
}

function normalizeRequirementField(field, index) {
  const type = requirementFieldTypes.includes(field.type) ? field.type : "text";
  const locked = isLockedRequirementField(field, index);
  const normalized = {
    ...field,
    type,
    required: locked ? true : Boolean(field.required),
    sort: field.sort || index + 1
  };
  if (type === "select") {
    normalized.options = Array.isArray(field.options) ? field.options : [];
    delete normalized.unit;
  } else {
    delete normalized.options;
    delete normalized.unit;
  }
  return normalized;
}

function isLockedRequirementField(field, index) {
  return index < 2 || ["contactName", "contactPhone"].includes(field.key);
}

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
    "content": "整体满意，需求确认流程顺畅，外立面清洁效果明显。",
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
    "content": "高空作业很规范，现场管理到位，会再次下单。",
    "time": "2026-06-02 10:15"
  },
  {
    "id": "rv8",
    "productId": "p1",
    "orderNo": "YB26060105",
    "user": "成都建工",
    "rating": 4,
    "content": "清洗效率不错，就是服务时段希望再多一些选择。",
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
  if (props.onlinePay) parts.push("在线支付");
  else parts.push("不在线支付");
  if (props.needPilot) parts.push("需要飞手");
  else parts.push("无需飞手");
  return parts.join(" / ");
}

function ensureProductShape(product) {
  if (!product.properties) product.properties = { onlinePay: true, needPilot: false };
  if (!product.specs) product.specs = [{ name: "标准服务", price: "0" }];
  if (!product.images) product.images = [];
  if (!product.displayedReviewIds) product.displayedReviewIds = [];
  if (!product.requirementFields?.length) product.requirementFields = defaultRequirementFields();
  product.requirementFields = product.requirementFields.map(normalizeRequirementField);
  return product;
}

function createEmptyProduct() {
  const defaultCategory = state.categories.find(item => item.enabled)?.name || "无人机服务";
  return ensureProductShape({
    id: null,
    code: "",
    name: "",
    category: defaultCategory,
    status: "已下架",
    orderCount: 0,
    properties: { onlinePay: true, needPilot: false },
    requirementFields: defaultRequirementFields(),
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

function categoryActions(item, index, total) {
  return rowActions({ edit: "category-edit", moveAction: "move-category", deleteAction: "delete-category", id: item.id, index, total });
}

function categoriesPage() {
  const sorted = [...state.categories].sort((a, b) => a.sort - b.sort);
  const rows = sorted.map((item, index) => [
    item.sort,
    item.name,
    `<span class="category-desc">${item.description || "—"}</span>`,
    item.productCount,
    tag(item.enabled ? "启用" : "停用"),
    categoryActions(item, index, sorted.length)
  ]);
  return panel("商品分类", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="分类名称">${button("查询","filter","primary")}<span class="spacer"></span>${button("新增分类","category-edit","primary")}
  </div>${paginatedTable("categories", ["排序","分类名称","分类说明","商品数","状态","操作"], rows, "category-table")}`);
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
        <span class="review-head"><strong>${item.user}</strong><span class="review-stars">${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</span><span class="muted">星级：${item.rating}星</span></span>
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

function fieldTypeLabel(type) {
  const labels = {
    text: "文本",
    select: "下拉框",
    image: "图片"
  };
  return labels[type] || type;
}

function activeRequirementFields(product) {
  ensureProductShape(product);
  return product.requirementFields;
}

function requirementFieldValue(field, key, fallback = "") {
  const value = field[key];
  if (Array.isArray(value)) return value.join(" / ");
  return value === undefined || value === null ? fallback : value;
}

function requirementFieldRows(product) {
  const fields = activeRequirementFields(product)
    .map((field, index) => ({ ...field, sort: field.sort || index + 1 }))
    .sort((a, b) => a.sort - b.sort);
  return fields.map((field, index) => {
    const locked = isLockedRequirementField(field, index);
    return [
      `<span class="requirement-sort">${index + 1}</span>`,
      `<input data-field="requirement-label" data-index="${index}" value="${field.label}">`,
      `<div class="requirement-type-options">
        ${requirementFieldTypes.map(type => `<label class="${field.type === type ? "active" : ""}"><input type="radio" name="requirement-type-${index}" data-action="requirement-type-choice" data-field="requirement-type" data-index="${index}" value="${type}"${field.type === type ? " checked" : ""}>${fieldTypeLabel(type)}</label>`).join("")}
      </div>`,
      `<label class="requirement-required"><input type="checkbox" data-action="toggle-requirement-required" data-index="${index}"${(locked || field.required) ? " checked" : ""}${locked ? " disabled" : ""}> 必填</label>`,
      `<input data-field="requirement-placeholder" data-index="${index}" value="${requirementFieldValue(field, "placeholder")}" placeholder="请输入提示文案">`,
      field.type === "select"
        ? `<input data-field="requirement-extra" data-index="${index}" value="${requirementFieldValue(field, "options")}" placeholder="选项用 / 分隔">`
        : `<span class="requirement-option-empty">仅下拉框填写</span>`,
      `<div class="row-actions">
        ${button("上移", "move-requirement-field", "small", `data-index="${index}" data-dir="-1"${locked || index <= 2 ? " disabled" : ""}`)}
        ${button("下移", "move-requirement-field", "small", `data-index="${index}" data-dir="1"${locked || index === fields.length - 1 ? " disabled" : ""}`)}
        ${button("删除", "delete-requirement-field", "small danger", `data-index="${index}"${locked ? " disabled" : ""}`)}
      </div>`
    ];
  });
}

function setProductRequirementFields(product, fields) {
  product.requirementFields = fields.map((field, index) => normalizeRequirementField({ ...field, sort: index + 1 }, index));
}

function ensureCustomRequirementFields(product) {
  ensureProductShape(product);
}

function requirementFieldsPanel(product) {
  const rows = requirementFieldRows(product);
  return panel("需求采集字段", `<div class="requirement-config">
    <div class="requirement-main">
      <div class="requirement-template-bar">
        <span class="tag blue">当前商品独立字段</span>
        <span class="muted">订单生成时保存字段快照，后续改商品不影响历史订单。</span>
      </div>
      <div class="toolbar requirement-actions">
        ${button("新增字段", "add-requirement-field", "primary")}
      </div>
      <div class="table-scroll requirement-table-wrap">${table(["排序","字段名称","字段类型","必填","提示文案","下拉选项","操作"], rows, "requirement-table")}</div>
      <p class="muted requirement-help">字段由当前商品单独维护。首版字段类型仅支持文本、下拉框、图片；不支持字段联动和自动报价。</p>
    </div>
  </div>`);
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
    `${activeRequirementFields(item).length} 个字段`,
    formatProductAttrs(item),
    tag(item.status),
    productActions(item)
  ]);
  return panel("商品列表", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="商品名称 / 编号"><select><option>全部分类</option>${state.categories.map(item => `<option>${item.name}</option>`).join("")}</select>
    <select><option>全部状态</option><option>已上架</option><option>已下架</option></select>${button("查询","filter","primary")}
    <span class="spacer"></span>${button("创建商品","create-product","primary")}
  </div>${paginatedTable("products", ["商品图","商品编号","商品名称","分类","规格数","需求字段","业务属性","状态","操作"], rows, "products-table")}`);
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
  + requirementFieldsPanel(product)
  + panel("业务属性", `<div class="check-list">${propertyRow("是否在线支付","onlinePay",product)}${propertyRow("是否需要飞手服务","needPilot",product)}</div>
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
  ensureCustomRequirementFields(product);
  if (product.requirementFields?.length) {
    page.querySelectorAll('[data-field="requirement-label"]').forEach(input => {
      const index = Number(input.dataset.index);
      if (product.requirementFields[index]) product.requirementFields[index].label = input.value.trim();
    });
    page.querySelectorAll('[data-field="requirement-type"]:checked').forEach(input => {
      const index = Number(input.dataset.index);
      if (product.requirementFields[index]) product.requirementFields[index].type = input.value;
    });
    page.querySelectorAll('[data-field="requirement-placeholder"]').forEach(input => {
      const index = Number(input.dataset.index);
      if (product.requirementFields[index]) product.requirementFields[index].placeholder = input.value.trim();
    });
    page.querySelectorAll('[data-field="requirement-extra"]').forEach(input => {
      const index = Number(input.dataset.index);
      const field = product.requirementFields[index];
      if (!field) return;
      const value = input.value.trim();
      if (field.type === "select") {
        field.options = value.split("/").map(item => item.trim()).filter(Boolean);
      } else {
        delete field.options;
      }
    });
    product.requirementFields = product.requirementFields.map(normalizeRequirementField);
  }
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

  if (state.editingCategoryId) {
    const item = state.categories.find(entry => entry.id === state.editingCategoryId);
    if (item) {
      item.name = name;
      item.description = description;
      item.enabled = enabled;
    }
  } else {
    const maxSort = Math.max(0, ...state.categories.map(item => item.sort));
    state.categories.push({
      id: `c${Date.now()}`,
      name,
      description,
      productCount: 0,
      sort: maxSort + 1,
      enabled
    });
  }
  state.editingCategoryId = null;
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
	    "summary": "维护商品分类，控制分类名称、说明、状态与展示顺序。业务属性不在此配置。",
    "operations": [
	      "新增分类：填写名称、分类说明、设置启用状态",
	      "点击「编辑」：打开弹窗，修改名称、说明与状态",
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
        "在线支付 / 飞手需求等，与商品绑定"
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
    "summary": "创建或编辑商品，配置轮播图、富文本介绍、评价展示、规格价格、业务属性及需求采集字段。",
    "operations": [
      "上传 / 排序 / 删除轮播图，第一张为列表封面与详情首图",
      "商品介绍使用 Element Admin 常用的 WangEditor 富文本组件编辑",
      "评价管理：分页浏览订单评价列表，多选后随「保存商品」一并生效；默认全不展示",
      "添加 / 删除规格，每个规格独立定价",
      "业务属性通过勾选配置：在线支付、飞手服务；下单字段统一由需求采集字段配置",
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
          const draft = item || { name: "", description: "", sort: state.categories.length + 1, enabled: true };
          modal("商品分类", formGrid([
            { label: "分类名称", html: `<input id="category-name" value="${draft.name}" placeholder="请输入分类名称">` },
            { label: "分类状态", html: `<select id="category-enabled"><option${draft.enabled ? " selected" : ""}>启用</option><option${draft.enabled ? "" : " selected"}>停用</option></select>` },
            { label: "分类说明", wide: true, html: `<textarea id="category-description" placeholder="请输入分类说明，用于小程序分类页展示">${draft.description || ""}</textarea>` }
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
    "add-requirement-field": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          product.requirementFields.push({
            key: `field${Date.now()}`,
            label: "新字段",
            type: "text",
            required: false,
            placeholder: "请输入内容",
            sort: product.requirementFields.length + 1
          });
          render();
    },
    "delete-requirement-field": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          const index = Number(target.dataset.index);
          if (isLockedRequirementField(product.requirementFields[index], index)) {
            toast("联系人和联系电话为默认必填字段");
            return;
          }
          product.requirementFields.splice(index, 1);
          setProductRequirementFields(product, product.requirementFields);
          render();
    },
    "move-requirement-field": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          const index = Number(target.dataset.index);
          const next = index + Number(target.dataset.dir);
          if (isLockedRequirementField(product.requirementFields[index], index) || next < 2) {
            toast("联系人和联系电话固定在前两项");
            return;
          }
          if (next >= 0 && next < product.requirementFields.length) {
            [product.requirementFields[index], product.requirementFields[next]] = [product.requirementFields[next], product.requirementFields[index]];
            setProductRequirementFields(product, product.requirementFields);
            render();
          }
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
    },
    "toggle-requirement-required": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          const index = Number(event.target.dataset.index);
          const field = product.requirementFields[index];
          if (isLockedRequirementField(field, index)) {
            field.required = true;
            render();
            return;
          }
          if (field) field.required = event.target.checked;
          render();
          return;
    },
    "requirement-type-choice": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          const field = product.requirementFields[Number(event.target.dataset.index)];
          if (field) field.type = event.target.value;
          product.requirementFields = product.requirementFields.map(normalizeRequirementField);
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
  }
});
