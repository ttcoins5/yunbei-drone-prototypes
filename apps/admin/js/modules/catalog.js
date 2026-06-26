function reqField(key, label, type = "text", required = false, extra = {}) {
  return {
    key,
    label,
    type,
    required,
    placeholder: extra.placeholder || (type === "image" ? `上传${label}` : `请输入${label}`),
    options: extra.options,
    visibleWhen: extra.visibleWhen,
    subForms: extra.subForms,
    sort: extra.sort || 1
  };
}

function productFields(list) {
  return list.map((field, index) => ({ ...field, sort: index + 1 }));
}

function catalogEscape(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function productIcon(name) {
  return `../../shared/assets/product-icons/${name}?v=product-line-icons-1`;
}

function displayAssetName(name = "") {
  return String(name || "").split("?")[0] || "商品图标";
}

function detailSection(id, type, title, extra = {}) {
  return { id, type, title, enabled: true, sort: extra.sort || 1, ...extra };
}

function detailContactSection(sort = 99) {
  return detailSection("contact", "contact", "联系方式", {
    phone: "0577-55558188",
    backupPhone: "0577-88360168",
    address: "浙江省宁波市鄞州区低空经济产业园",
    sort
  });
}

const serviceDetailDefaults = {
  p1: {
    subtitle: "智能巡检 · 精准采集 · 高效交付",
    intro: "提供专业无人机巡检服务，适用于园区、楼宇、航线、设备等场景。",
    items: ["楼宇巡检", "园区巡检", "航线巡检", "设备巡检"],
    advantages: ["航线规划清晰", "高清影像采集", "问题点位标注", "巡检报告交付"]
  },
  p2: {
    subtitle: "快速配送 · 安全可靠 · 覆盖全城",
    intro: "无人机物流服务利用先进的无人机技术，为城市和偏远地区提供快速、高效的物资配送服务。",
    items: ["城市配送", "紧急物资", "医疗运输", "特殊货物"],
    advantages: ["2小时快速响应", "全程GPS跟踪", "专业团队操作", "全程保险覆盖"]
  },
  p3: {
    subtitle: "高空作业 · 精准操控 · 安全高效",
    intro: "提供专业的无人机吊运服务，适用于高空作业、建筑施工、设备安装等场景。",
    items: ["高空吊运", "设备安装", "建筑施工", "特殊作业"],
    advantages: ["专业吊运设备", "精准操控技术", "严格安全规范", "经验丰富团队"]
  },
  p4: {
    subtitle: "创意编队 · 活动传播 · 视觉震撼",
    intro: "提供无人机编队表演方案设计、航线编排、现场执行和安全保障服务。",
    items: ["方案策划", "图案编排", "现场执行", "安全保障"],
    advantages: ["定制化创意方案", "多规模机群支持", "活动传播效果强", "现场执行经验丰富"]
  },
  p5: {
    subtitle: "设备托管 · 运维保养 · 资产管理",
    intro: "为企业和个人无人机提供托管、检测、保养、维修协调和飞行资产管理服务。",
    items: ["设备托管", "定期检测", "维护保养", "资产管理"],
    advantages: ["标准化仓储管理", "定期健康检查", "维修保养协同", "设备档案清晰"]
  },
  p6: {
    subtitle: "灵活租赁 · 设备保障 · 按需使用",
    intro: "提供多型号无人机短租、长租和项目制租赁服务，适用于临时作业、培训演示、活动保障等场景。",
    items: ["短期租赁", "项目租赁", "设备交付", "基础保障"],
    advantages: ["租期灵活匹配", "设备状态可追溯", "交付前检测", "支持押金与档期确认"]
  }
};

function serviceDetailPage(id, name) {
  const config = serviceDetailDefaults[id] || serviceDetailDefaults.p3;
  return {
    templateType: "service",
    hero: { title: name, subtitle: config.subtitle, icon: id },
    sections: [
      detailSection("intro", "intro", "服务介绍", { content: config.intro, sort: 1 }),
      detailSection("items", "grid", "服务项目", { items: config.items.map(title => ({ title })), sort: 2 }),
      detailSection("advantages", "checklist", "服务优势", { items: config.advantages, sort: 3 }),
      detailContactSection(4)
    ],
    cta: { text: "立即下单", actionType: "order" }
  };
}

function trainingDetailPage(id, name) {
  const isChild = id === "p9";
  return {
    templateType: "training",
    hero: { title: name, subtitle: isChild ? "兴趣启蒙 · 实操体验 · 竞赛培养" : "专业培训 · 证书认证 · 实操教学" },
    sections: [
      detailSection("conditions", "condition", isChild ? "适合对象" : "报名条件", {
        items: isChild ? ["6-16 岁青少年", "对无人机或科技课程感兴趣", "家长同意报名并配合安全要求"] : ["中华人民共和国公民", "年满16周岁以上，70周岁以下", "初中以上文化程度", "身体健康，具备无人机操控所需能力"],
        sort: 1
      }),
      detailSection("fees", "fee", isChild ? "课程费用" : "培训费用", {
        items: isChild ? [{ name: "无人机启蒙体验课", price: "199元/次" }, { name: "少儿无人机系统课", price: "3980元/期" }] : [{ name: "小型无人机-多旋翼-视距内", price: "7800元/人" }, { name: "小型无人机-多旋翼-超视距", price: "11800元/人" }],
        sort: 2
      }),
      detailSection("features", "feature", "教学特色", { items: [{ title: "权威认证", content: "围绕执照考试要求组织课程和实操训练。" }, { title: "全面课程", content: "覆盖基础知识、飞行操作、维护保养和法规。" }], sort: 3 }),
      detailContactSection(4)
    ],
    cta: { text: "立即报名", actionType: "signup" }
  };
}

function eventDetailPage(name) {
  return {
    templateType: "event",
    hero: { title: name, subtitle: "赛事报名 · 规则透明 · 专业组织", icon: "competition" },
    sections: [
      detailSection("intro", "intro", "赛事介绍", { content: "面向无人机爱好者、院校和行业团队提供赛事报名、组别登记和活动组织服务。", sort: 1 }),
      detailSection("eventInfo", "eventInfo", "赛事信息", { date: "2026年暑期档", address: "宁波低空经济示范区", groups: ["成人组", "青少年组", "团体组"], deadline: "赛前7日截止报名", sort: 2 }),
      detailSection("fees", "fee", "报名费用", { items: [{ name: "个人报名", price: "线下确认" }, { name: "团体报名", price: "线下确认" }], sort: 3 }),
      detailContactSection(4)
    ],
    cta: { text: "立即报名", actionType: "signup" }
  };
}

function externalDetailPage(name) {
  return {
    templateType: "external",
    hero: { title: name, subtitle: "点击跳转 · 即时配送 · 便捷下单", icon: "takeout" },
    sections: [
      detailSection("intro", "intro", "服务说明", { content: "无人机外卖配送为独立配送业务入口，点击下方按钮进入配送服务。", sort: 1 }),
      detailSection("external", "externalLink", "跳转提示", { content: "外卖配送涉及商家、地址、餐品和配送链路，首版作为独立业务入口处理。", externalUrl: "https://microapp.zndkfx.com", sort: 2 }),
      detailContactSection(3)
    ],
    cta: { text: "去配送", actionType: "external", externalUrl: "https://microapp.zndkfx.com" }
  };
}

function detailPageFor(id, name) {
  if (id === "p8" || id === "p9") return trainingDetailPage(id, name);
  if (id === "p7") return eventDetailPage(name);
  if (id === "p6") return externalDetailPage(name);
  return serviceDetailPage(id, name);
}

function detailPageForTemplate(templateType, id, name) {
  if (templateType === "training") return trainingDetailPage(id === "p9" ? "p9" : "p8", name);
  if (templateType === "event") return eventDetailPage(name);
  if (templateType === "external") return externalDetailPage(name);
  return serviceDetailPage(id || "p3", name);
}

function productItem(id, name, category, fields, desc, price = "0", needPilot = true, icon = "") {
  const iconName = icon ? icon.split("/").pop() : "";
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
    images: icon ? [{ id: `${id}-icon`, name: iconName, url: icon }] : [],
    detailPage: detailPageFor(id, name),
    displayedReviewIds: []
  };
}

state.categories = [
  { id: "c1", name: "无人机服务", description: "巡检、物流、吊运、表演、托管等无人机服务", productCount: 5, sort: 1, enabled: true },
  { id: "c3", name: "培训教育与赛事举办", description: "无人机赛事、飞手培训、少儿培训信息填写", productCount: 3, sort: 2, enabled: true },
  { id: "c4", name: "增值服务", description: "无人机租赁等增值业务", productCount: 1, sort: 3, enabled: true }
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
  ]), "填写巡检区域、时间和需求说明，平台根据需求安排无人机巡检服务。", "0", true, productIcon("icon-inspection.png")),
  productItem("p2", "无人机物流服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("customerType", "客户类型", "select", true, {
      options: ["个人", "企业", "医院/园区", "政府机构"],
      subForms: {
        "个人": [
          { key: "personalName", label: "姓名", type: "text", required: true, placeholder: "请输入姓名", sort: 1 },
          { key: "personalPhone", label: "手机号", type: "text", required: true, placeholder: "请输入手机号", sort: 2 }
        ],
        "企业": [
          { key: "companyName", label: "企业名称", type: "text", required: true, placeholder: "请输入企业名称", sort: 1 },
          { key: "companyContact", label: "企业联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 2 },
          { key: "creditCode", label: "统一社会信用代码", type: "text", required: false, placeholder: "请输入统一社会信用代码", sort: 3 }
        ]
      }
    }),
    reqField("companyName", "企业/机构名称", "text", false, { placeholder: "企业、医院、园区或政府机构请填写", visibleWhen: { fieldKey: "customerType", equals: "企业" } }),
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
  ]), "填写货物、起运点、目的地和运输时效，平台确认后安排无人机物流服务。", "0", true, productIcon("icon-logistics.png")),
  {
    ...productItem("p3", "无人机吊运服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("itemName", "吊运物品", "text", true),
    reqField("weight", "物品重量（kg）", "text", true),
    reqField("workAddress", "作业地点", "text", true),
    reqField("height", "吊运高度（m）", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "选择吊运规格和数量后在线支付，平台收款后安排飞手服务。", "680", true, productIcon("icon-hoisting.png")),
    properties: { onlinePay: true, needPilot: true },
    specs: [
      { name: "轻量吊运（20kg以内）", price: "680" },
      { name: "标准吊运（20-50kg）", price: "1160" },
      { name: "重载吊运（50-100kg）", price: "1980" }
    ]
  },
  productItem("p4", "无人机表演服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("purpose", "表演目的", "text", true),
    reqField("date", "表演日期", "text", true),
    reqField("timeSlot", "表演时段", "text", true),
    reqField("backupDate", "是否备用雨天/延期日期"),
    reqField("scale", "表演规模", "select", true, { options: ["100 架以内", "100-300 架", "300 架以上", "待方案确认"] }),
    reqField("patternBrief", "图案/文字需求", "text", false, { placeholder: "请输入编队图案、文字或创意说明", visibleWhen: { fieldKey: "scale", equals: "300 架以上" } }),
    reqField("exampleImage", "例图", "image")
  ]), "填写表演目的、日期、时段和规模，平台根据活动需求制定无人机表演方案。", "0", true, productIcon("icon-performance.png")),
  productItem("p5", "无人机托管服务", "无人机服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("droneModel", "无人机型号", "text", true),
    reqField("count", "托管数量", "text", true),
    reqField("duration", "托管时长", "select", true, { options: ["1 个月", "3 个月", "6 个月", "12 个月"] }),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "填写托管机型、数量和时长，平台提供设备托管与运维管理服务。", "0", false, productIcon("icon-hosting.png")),
  productItem("p6", "无人机租赁", "增值服务", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "租赁下单页首版采用小程序固定主体表单，后台仅维护普通字段配置。", "0", false, productIcon("icon-rental.png")),
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
  ]), "填写赛事报名信息，适用于无人机赛事报名和资料登记。", "0", false, productIcon("icon-competition.png")),
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
  ]), "填写飞手培训报名信息，平台根据考试机型和基础情况安排培训。", "0", false, productIcon("icon-pilot-training.png")),
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
  ]), "填写少儿培训报名信息，便于课程顾问匹配课程和上课时间。", "0", false, productIcon("icon-child-training.png"))
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
state.productIconObjectUrls = [];

const requirementFieldTypes = ["text", "select", "image"];

function defaultRequirementFields() {
  return [
    { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
    { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 }
  ];
}

function normalizeRequirementField(field, index) {
  const type = requirementFieldTypes.includes(field.type) ? field.type : "text";
  const normalized = {
    ...field,
    type,
    required: Boolean(field.required),
    sort: field.sort || index + 1
  };
  if (type === "select") {
    normalized.options = Array.isArray(field.options) ? field.options : [];
    normalized.subForms = normalizeRequirementSubForms(field.subForms, normalized.options);
    delete normalized.unit;
  } else {
    delete normalized.options;
    delete normalized.subForms;
    delete normalized.unit;
  }
  if (field.visibleWhen?.fieldKey && field.visibleWhen?.equals) {
    normalized.visibleWhen = {
      fieldKey: String(field.visibleWhen.fieldKey),
      equals: String(field.visibleWhen.equals)
    };
  } else {
    delete normalized.visibleWhen;
  }
  return normalized;
}

function normalizeRequirementSubForms(subForms = {}, options = []) {
  return options.reduce((result, option) => {
    const fields = Array.isArray(subForms?.[option]) ? subForms[option] : [];
    result[option] = fields.map((field, index) => normalizeSubFormField(field, index));
    return result;
  }, {});
}

function normalizeSubFormField(field = {}, index = 0) {
  const type = requirementFieldTypes.includes(field.type) ? field.type : "text";
  const normalized = {
    key: field.key || `subField${Date.now()}${index}`,
    label: field.label || "子字段",
    type,
    required: Boolean(field.required),
    placeholder: field.placeholder || (type === "image" ? `上传${field.label || "子字段"}` : `请输入${field.label || "子字段"}`),
    sort: field.sort || index + 1
  };
  if (type === "select") normalized.options = Array.isArray(field.options) ? field.options : [];
  return normalized;
}

function normalizeRequirementConditions(fields) {
  const firstSelectIndex = fields.findIndex(field => field.type === "select");
  const firstSelectField = firstSelectIndex >= 0 ? fields[firstSelectIndex] : null;
  return fields.map((field, fieldIndex) => {
    const condition = field.visibleWhen;
    if (!condition) return field;
    const validOption = firstSelectField?.options?.includes(condition.equals);
    if (!firstSelectField || fieldIndex <= firstSelectIndex || condition.fieldKey !== firstSelectField.key || !validOption) {
      const cleaned = { ...field };
      delete cleaned.visibleWhen;
      return cleaned;
    }
    return field;
  });
}

function isLockedRequirementField(field, index) {
  return false;
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
  if (!product.detailPage) product.detailPage = detailPageFor(product.id || "p3", product.name || "未命名商品");
  if (!product.detailPage.hero) product.detailPage.hero = { title: product.name || "未命名商品", subtitle: "" };
  if (!product.detailPage.cta) product.detailPage.cta = { text: product.detailPage.templateType === "external" ? "去配送" : "立即下单", actionType: product.detailPage.templateType === "external" ? "external" : "order" };
  if (!Array.isArray(product.detailPage.sections)) product.detailPage.sections = [];
  if (!product.requirementFields?.length) product.requirementFields = defaultRequirementFields();
  product.requirementFields = normalizeRequirementConditions(product.requirementFields.map(normalizeRequirementField));
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
    detailPage: detailPageFor("p3", "未命名商品"),
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
  if (first?.url) {
    return `<span class="thumb" title="${catalogEscape(first.name)}"><img src="${catalogEscape(first.url)}" alt="${catalogEscape(product.name)}"></span>`;
  }
  return thumb(Boolean(first), { title: first ? first.name : "暂无图标" });
}

function productImagesPanel(product) {
  const icon = product.images?.[0];
  const preview = icon?.url
    ? `<img src="${catalogEscape(icon.url)}" alt="${catalogEscape(icon.name || product.name)}">`
    : "图";
  const iconName = displayAssetName(icon?.name || icon?.url?.split("/").pop());
  const row = icon ? `<div class="product-icon-card">
    <div class="product-icon-preview">${preview}</div>
    <div class="product-icon-copy">
      <div class="product-icon-title">
        <strong title="${catalogEscape(iconName)}">${catalogEscape(iconName)}</strong>
        <span class="tag blue">单张图标</span>
      </div>
      <p>用于后台商品列表、小程序商品卡片与商品详情页头图。</p>
      <div class="product-icon-tags">
        <span>列表封面</span>
        <span>商品卡片</span>
        <span>详情头图</span>
      </div>
    </div>
    <div class="row-actions product-icon-actions">
      ${button("替换图标", "add-product-image", "small")}
      ${button("删除", "delete-product-image", "small danger", `data-id="${icon.id}"`)}
    </div>
  </div>` : "";
  return panel("图标管理", `<div class="product-icon-panel">
    <div class="product-icon-head">
      <div>
        <strong>商品图标</strong>
        <span>上传 1 张图标，系统同步用于后台商品列表、小程序商品卡片和商品详情页头图。</span>
      </div>
      ${button(icon ? "替换图标" : "上传图标","add-product-image","primary")}
    </div>
    ${row || `<div class="product-icon-empty">
      <span>暂无图标</span>
      <p>上传后会同步展示在商品列表、小程序商品卡片和商品详情页头部。</p>
    </div>`}
  </div>`);
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

function splitRequirementOptions(value) {
  return String(value || "")
    .split(/\s+\/\s+/)
    .map(item => item.trim())
    .filter(Boolean);
}

function requirementFieldTitle(field) {
  return `${field.label || "未命名字段"}（${field.key}）`;
}

function requirementConditionSummary(fields, field) {
  const firstSelectIndex = fields.findIndex(item => item.type === "select");
  const fieldIndex = fields.findIndex(item => item.key === field.key);
  const firstSelectField = firstSelectIndex >= 0 ? fields[firstSelectIndex] : null;
  if (field.visibleWhen?.fieldKey && field.visibleWhen?.equals) {
    const parent = fields.find(item => item.key === field.visibleWhen.fieldKey);
    return `${parent?.label || field.visibleWhen.fieldKey}=${field.visibleWhen.equals}`;
  }
  if (firstSelectField?.key === field.key) return "-";
  if (firstSelectIndex >= 0 && fieldIndex < firstSelectIndex) return "始终显示";
  return "始终显示";
}

function requirementConditionClass(fields, field) {
  const firstSelectIndex = fields.findIndex(item => item.type === "select");
  const firstSelectField = firstSelectIndex >= 0 ? fields[firstSelectIndex] : null;
  if (field.visibleWhen?.fieldKey && field.visibleWhen?.equals) return " is-set";
  if (firstSelectField?.key === field.key) return " is-source";
  return "";
}

function requirementSubFormSummary(field) {
  if (field.type !== "select") return "仅下拉框可绑定";
  const options = field.options || [];
  if (!options.length) return "先填写下拉选项";
  const count = options.reduce((total, option) => total + ((field.subForms?.[option] || []).length), 0);
  return count ? `已绑定 ${count} 个子字段` : "绑定子表单";
}

function requirementSubFormModal(product, index, activeOption = "") {
  const fields = activeRequirementFields(product)
    .map((field, fieldIndex) => ({ ...field, sort: field.sort || fieldIndex + 1 }))
    .sort((a, b) => a.sort - b.sort);
  const field = fields[index];
  if (!field || field.type !== "select") return;
  const options = field.options || [];
  if (!options.length) {
    toast("请先填写下拉选项");
    return;
  }
  const option = options.includes(activeOption) ? activeOption : options[0];
  const subForms = normalizeRequirementSubForms(field.subForms, options);
  const subFields = subForms[option] || [];
  const tabs = options.map(item => {
    const count = (subForms[item] || []).length;
    return `<button class="subform-option${item === option ? " active" : ""}" data-action="switch-requirement-subform-option" data-index="${index}" data-option="${catalogEscape(item)}">
      <span>${catalogEscape(item)}</span><small>${count} 个字段</small>
    </button>`;
  }).join("");
  const rows = subFields.map((subField, subIndex) => [
    `<span class="requirement-sort">${subIndex + 1}</span>`,
    `<input data-field="subform-label" data-sub-index="${subIndex}" value="${catalogEscape(subField.label)}" placeholder="字段名称">`,
    `<input data-field="subform-key" data-sub-index="${subIndex}" value="${catalogEscape(subField.key)}" placeholder="字段Key">`,
    `<select data-field="subform-type" data-sub-index="${subIndex}">
      ${requirementFieldTypes.map(type => `<option value="${type}"${subField.type === type ? " selected" : ""}>${fieldTypeLabel(type)}</option>`).join("")}
    </select>`,
    `<label class="requirement-required"><input type="checkbox" data-field="subform-required" data-sub-index="${subIndex}"${subField.required ? " checked" : ""}> 必填</label>`,
    `<input data-field="subform-placeholder" data-sub-index="${subIndex}" value="${catalogEscape(subField.placeholder)}" placeholder="提示文案">`,
    `<div class="row-actions">${button("删除", "delete-requirement-subform-field", "small danger", `data-sub-index="${subIndex}"`)}</div>`
  ]);
  modal("绑定子表单", `<div class="subform-modal" data-requirement-index="${index}" data-active-option="${catalogEscape(option)}">
    <div class="subform-head">
      <div>
        <p class="muted">当前下拉字段</p>
        <h3>${catalogEscape(field.label || "未命名字段")}</h3>
      </div>
      <span class="tag blue">${options.length} 个选项</span>
    </div>
    <div class="subform-layout">
      <aside class="subform-sidebar">
        <strong>主体分类</strong>
        ${tabs}
      </aside>
      <section class="subform-editor">
        <div class="subform-editor-head">
          <div>
            <p class="muted">正在配置</p>
            <h3>${catalogEscape(option)}</h3>
          </div>
          ${button("添加字段", "add-requirement-subform-field", "primary")}
        </div>
        <div class="table-scroll subform-table-wrap">${rows.length ? table(["排序","字段名称","字段Key","组件类型","必填","提示文案","操作"], rows, "subform-table") : `<p class="empty">当前选项暂无子字段，点击「添加字段」开始配置。</p>`}</div>
        <p class="muted subform-tip">保存后，该下拉选项会带上自己的子字段配置；例如「客户类型=个人」和「客户类型=企业」可分别维护不同字段。</p>
      </section>
    </div>
  </div>`, `${button("取消","close-modal")}${button("保存子表单","save-requirement-subform","primary")}`, true);
}

function readRequirementSubFormFromModal(product) {
  const overlay = document.getElementById("overlay");
  const root = overlay.querySelector(".subform-modal");
  if (!root) return null;
  const index = Number(root.dataset.requirementIndex);
  const option = root.dataset.activeOption || "";
  const field = product.requirementFields[index];
  if (!field || field.type !== "select" || !option) return null;
  const options = field.options || [];
  field.subForms = normalizeRequirementSubForms(field.subForms, options);
  const rows = [...root.querySelectorAll("[data-field='subform-label']")];
  field.subForms[option] = rows.map((input, subIndex) => {
    const type = root.querySelector(`[data-field="subform-type"][data-sub-index="${subIndex}"]`)?.value || "text";
    const label = input.value.trim() || "子字段";
    const key = root.querySelector(`[data-field="subform-key"][data-sub-index="${subIndex}"]`)?.value.trim() || `${option}Field${subIndex + 1}`;
    const placeholder = root.querySelector(`[data-field="subform-placeholder"][data-sub-index="${subIndex}"]`)?.value.trim() || (type === "image" ? `上传${label}` : `请输入${label}`);
    return normalizeSubFormField({
      key,
      label,
      type,
      required: Boolean(root.querySelector(`[data-field="subform-required"][data-sub-index="${subIndex}"]`)?.checked),
      placeholder,
      sort: subIndex + 1
    }, subIndex);
  });
  product.requirementFields[index] = normalizeRequirementField(field, index);
  return { index, option };
}

function requirementConditionModal(product, index) {
  const fields = activeRequirementFields(product)
    .map((field, fieldIndex) => ({ ...field, sort: field.sort || fieldIndex + 1 }))
    .sort((a, b) => a.sort - b.sort);
  const field = fields[index];
  if (!field) return;
  const firstSelectIndex = fields.findIndex(item => item.type === "select" && item.options?.length);
  const firstSelectField = firstSelectIndex >= 0 ? fields[firstSelectIndex] : null;
  const selectFields = firstSelectField && index > firstSelectIndex ? [firstSelectField] : [];
  const parentKey = field.visibleWhen?.fieldKey || "";
  const selectedParent = selectFields.find(item => item.key === parentKey);
  const selectedOption = field.visibleWhen?.equals || "";
  const parentOptions = selectFields
    .map(item => `<option value="${catalogEscape(item.key)}"${item.key === parentKey ? " selected" : ""}>${catalogEscape(requirementFieldTitle(item))}</option>`)
    .join("");
  const optionOptions = selectedParent?.options
    ?.map(option => `<option value="${catalogEscape(option)}"${option === selectedOption ? " selected" : ""}>${catalogEscape(option)}</option>`)
    .join("") || "";
  modal("显示条件", `<div class="condition-modal" data-requirement-condition-index="${index}">
    <p class="muted">当前字段：<strong>${catalogEscape(field.label || "未命名字段")}</strong></p>
    <label>
      <span>字段</span>
      <select id="requirement-condition-parent" data-action="requirement-condition-parent"${selectFields.length ? "" : " disabled"}>
        <option value="">始终显示</option>
        ${parentOptions}
      </select>
    </label>
    <label>
      <span>条件</span>
      <select id="requirement-condition-operator" disabled>
        <option value="equals">等于</option>
      </select>
    </label>
    <label>
      <span>值</span>
      <select id="requirement-condition-option"${selectedParent ? "" : " disabled"}>
        ${selectedParent ? `<option value="">请选择</option>${optionOptions}` : `<option value="">先选择字段</option>`}
      </select>
    </label>
    <p class="muted condition-modal-tip">V1 只针对当前商品的第一个下拉框配置显示条件；清空字段后即恢复为始终显示。</p>
  </div>`, `${button("取消","close-modal")}${button("清空条件","clear-requirement-condition")}${button("确定","save-requirement-condition","primary")}`);
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
      `<button class="condition-link${requirementConditionClass(fields, field)}" data-action="open-requirement-condition" data-index="${index}">${catalogEscape(requirementConditionSummary(fields, field))}</button>`,
      `<div class="row-actions">
        ${button("绑定子表单", "open-requirement-subform", "small", `data-index="${index}"${field.type !== "select" || !field.options?.length ? " disabled" : ""}`)}
        ${button("上移", "move-requirement-field", "small", `data-index="${index}" data-dir="-1"${locked || index <= 0 ? " disabled" : ""}`)}
        ${button("下移", "move-requirement-field", "small", `data-index="${index}" data-dir="1"${locked || index === fields.length - 1 ? " disabled" : ""}`)}
        ${button("删除", "delete-requirement-field", "small danger", `data-index="${index}"${locked ? " disabled" : ""}`)}
      </div><span class="subform-summary">${catalogEscape(requirementSubFormSummary(field))}</span>`
    ];
  });
}

function setProductRequirementFields(product, fields) {
  product.requirementFields = normalizeRequirementConditions(fields.map((field, index) => normalizeRequirementField({ ...field, sort: index + 1 }, index)));
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
      <div class="table-scroll requirement-table-wrap">${table(["排序","字段名称","字段类型","必填","提示文案","下拉选项","显示条件","操作"], rows, "requirement-table")}</div>
      <p class="muted requirement-help">点击「显示条件」弹出轻量配置。V1 仅针对当前商品的第一个下拉框做「字段 = 选项」判断；不支持多条件组合、公式、跨商品规则或自动报价。</p>
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
    formatProductAttrs(item),
    tag(item.status),
    productActions(item)
  ]);
  return panel("商品列表", `<div class="toolbar" style="margin-bottom:14px">
    <input placeholder="商品名称 / 编号"><select><option>全部分类</option>${state.categories.map(item => `<option>${item.name}</option>`).join("")}</select>
    <select><option>全部状态</option><option>已上架</option><option>已下架</option></select>${button("查询","filter","primary")}
    <span class="spacer"></span>${button("创建商品","create-product","primary")}
  </div>${paginatedTable("products", ["商品图","商品编号","商品名称","分类","业务属性","状态","操作"], rows, "products-table")}`);
}

function propertyRow(label, key, product) {
  const checked = product.properties?.[key];
  return `<label class="property-row"><span>${label}</span><input type="checkbox" data-action="toggle-product-property" data-key="${key}"${checked ? " checked" : ""}></label>`;
}

const detailSectionTypeLabels = {
  intro: "单文本",
  grid: "四宫格",
  checklist: "勾选列表",
  fee: "费用明细",
  contact: "联系方式",
  image: "单图片"
};

const detailCtaLabels = {
  order: "立即下单",
  signup: "立即报名",
  contact: "联系客服",
  external: "外部跳转"
};

function detailSectionTypeOptions(selected) {
  return Object.entries(detailSectionTypeLabels)
    .map(([value, label]) => `<option value="${value}"${selected === value ? " selected" : ""}>${label}</option>`)
    .join("");
}

function detailCtaOptions(selected) {
  return Object.entries(detailCtaLabels)
    .map(([value, label]) => `<option value="${value}"${selected === value ? " selected" : ""}>${label}</option>`)
    .join("");
}

function normalizeDetailPage(product) {
  if (!product.detailPage) product.detailPage = detailPageFor(product.id || "p3", product.name || "未命名商品");
  product.detailPage.templateType = product.detailPage.templateType || "service";
  product.detailPage.hero = {
    title: product.detailPage.hero?.title || product.name || "未命名商品",
    subtitle: product.detailPage.hero?.subtitle || product.desc || "",
    bannerImage: product.detailPage.hero?.bannerImage || "",
    icon: product.detailPage.hero?.icon || product.id || "service"
  };
  product.detailPage.cta = product.detailPage.cta || { text: "立即下单", actionType: "order" };
  product.detailPage.cta.text = product.detailPage.cta.text || detailCtaLabels[product.detailPage.cta.actionType] || "立即下单";
  product.detailPage.cta.actionType = product.detailPage.cta.actionType || "order";
  if (!Array.isArray(product.detailPage.sections)) product.detailPage.sections = [];
  product.detailPage.sections = product.detailPage.sections.map((section, index) => ({
    id: section.id || `section-${Date.now()}-${index}`,
    type: section.type || "intro",
    title: section.title || "详情模块",
    enabled: section.enabled !== false,
    sort: Number(section.sort) || index + 1,
    ...section
  })).sort((a, b) => (Number(a.sort) || 0) - (Number(b.sort) || 0));
  return product.detailPage;
}

function detailSectionSummary(section) {
  if (section.content) return section.content;
  if (Array.isArray(section.items)) {
    return section.items.map(item => {
      if (typeof item === "string") return item;
      if (item.price) return `${item.name || item.title || "项目"}：${item.price}`;
      if (item.content) return `${item.title || item.name || "项目"}：${item.content}`;
      return item.title || item.name || "";
    }).filter(Boolean).join("、");
  }
  if (section.type === "eventInfo") {
    return [section.date, section.address, section.deadline, ...(section.groups || [])].filter(Boolean).join("、");
  }
  if (section.type === "contact") {
    return [section.phone, section.address].filter(Boolean).join("、");
  }
  return "";
}

function splitDetailSummary(value) {
  return String(value || "")
    .split(/[\n、,，/]+/)
    .map(item => item.trim())
    .filter(Boolean);
}

function applySummaryToDetailSection(section, summary) {
  const value = String(summary || "").trim();
  const parts = splitDetailSummary(value);
  const next = { ...section };
  delete next.content;
  delete next.items;
  if (["intro", "company", "license", "externalLink"].includes(next.type)) {
    next.content = value;
  } else if (next.type === "image") {
    next.imageUrl = value;
    next.content = value;
  } else if (next.type === "grid") {
    next.items = parts.map(title => ({ title }));
  } else if (["checklist", "condition"].includes(next.type)) {
    next.items = parts;
  } else if (next.type === "fee") {
    next.items = parts.map(item => {
      const [name, price] = item.split(/[：:]/).map(part => part.trim());
      return { name: name || item, price: price || "线下确认" };
    });
  } else if (next.type === "feature") {
    next.items = parts.map(item => {
      const [title, content] = item.split(/[：:]/).map(part => part.trim());
      return { title: title || item, content: content || "可在后台继续维护详细说明" };
    });
  } else if (next.type === "eventInfo") {
    next.date = next.date || parts[0] || "待确认";
    next.address = next.address || parts[1] || "待确认";
    next.deadline = next.deadline || parts[2] || "报名截止时间待确认";
    next.groups = next.groups?.length ? next.groups : parts.slice(3);
  } else if (next.type === "contact") {
    next.phone = next.phone || "0577-55558188";
    next.address = next.address || "浙江省宁波市鄞州区低空经济产业园";
  } else {
    next.content = value;
  }
  return next;
}

function detailPagePanel(product) {
  const detailPage = normalizeDetailPage(product);
  const hero = detailPage.hero || {};
  const rows = detailPage.sections.map((section, index) => [
    `<span class="detail-sort">${index + 1}</span>`,
    `<input data-field="detail-section-title" data-index="${index}" value="${catalogEscape(section.title)}" placeholder="模块名称">`,
    `<select data-field="detail-section-type" data-index="${index}">${detailSectionTypeOptions(section.type)}</select>`,
    `<textarea data-field="detail-section-summary" data-index="${index}" placeholder="内容摘要，多个内容用顿号或换行分隔">${catalogEscape(detailSectionSummary(section))}</textarea>`,
    `<label class="detail-enabled"><input type="checkbox" data-field="detail-section-enabled" data-index="${index}"${section.enabled !== false ? " checked" : ""}>启用</label>`,
    `<div class="actions">
      ${button("上移","move-detail-section","small",`data-index="${index}" data-dir="-1"`)}
      ${button("下移","move-detail-section","small",`data-index="${index}" data-dir="1"`)}
      ${button("删除","delete-detail-section","small danger",`data-index="${index}"`)}
    </div>`
  ]);
  return panel("详情页轻量配置", `<div class="detail-config">
    ${formGrid([
      { label: "标题", html: `<input data-field="detail-hero-title" value="${catalogEscape(hero.title)}" placeholder="详情页主标题">` },
      { label: "副标题", html: `<input data-field="detail-hero-subtitle" value="${catalogEscape(hero.subtitle)}" placeholder="详情页副标题">` },
      { label: "头图地址", html: `<input data-field="detail-hero-banner" value="${catalogEscape(hero.bannerImage)}" placeholder="可填图片路径；留空则使用商品图">` }
    ])}
    <div class="detail-config-actions">
      ${button("新增模块","add-detail-section","primary")}
    </div>
    <div class="detail-table-wrap">
      ${table(["排序","模块名称","模块类型","内容摘要","状态","操作"], rows, "detail-config-table")}
    </div>
    <p class="muted">详情页轻量配置只负责介绍内容；下单页表单仍由「需求采集字段」独立控制，历史订单保留下单时字段快照。</p>
  </div>`);
}

function readDetailPageFormFromPage(product) {
  const page = document.querySelector(".page");
  const previous = normalizeDetailPage(product);
  if (!page?.querySelector('[data-field="detail-hero-title"]')) return previous;
  const templateType = previous.templateType || "service";
  const sections = previous.sections.map((section, index) => {
    const type = page.querySelector(`[data-field="detail-section-type"][data-index="${index}"]`)?.value || section.type || "intro";
    const title = page.querySelector(`[data-field="detail-section-title"][data-index="${index}"]`)?.value.trim() || section.title || "详情模块";
    const summary = page.querySelector(`[data-field="detail-section-summary"][data-index="${index}"]`)?.value || "";
    const enabled = page.querySelector(`[data-field="detail-section-enabled"][data-index="${index}"]`)?.checked !== false;
    return applySummaryToDetailSection({
      ...section,
      type,
      title,
      enabled,
      sort: index + 1
    }, summary);
  });
  return {
    templateType,
    hero: {
      title: page.querySelector('[data-field="detail-hero-title"]')?.value.trim() || product.name || "未命名商品",
      subtitle: page.querySelector('[data-field="detail-hero-subtitle"]')?.value.trim() || "",
      bannerImage: page.querySelector('[data-field="detail-hero-banner"]')?.value.trim() || "",
      icon: previous.hero?.icon || product.id || "service"
    },
    sections,
    cta: previous.cta || { text: "立即下单", actionType: "order" }
  };
}

function addDetailSection(product) {
  const detailPage = normalizeDetailPage(product);
  detailPage.sections.push(detailSection(`custom-${Date.now()}`, "intro", "自定义模块", {
    content: "请输入模块内容摘要",
    sort: detailPage.sections.length + 1
  }));
}

function moveDetailSection(product, index, dir) {
  const detailPage = normalizeDetailPage(product);
  const next = index + dir;
  if (next < 0 || next >= detailPage.sections.length) return;
  [detailPage.sections[index], detailPage.sections[next]] = [detailPage.sections[next], detailPage.sections[index]];
  detailPage.sections.forEach((section, sectionIndex) => {
    section.sort = sectionIndex + 1;
  });
}

function productEditPage() {
  const product = activeProduct();
  const creating = isCreatingProduct();
  const publishRuleText = "上架前需填写商品名称、商品分类，上传商品图，至少保留 1 个有效规格和价格，并确认业务属性；不满足条件时应先保存为已下架。";
  const specs = product.specs.map((spec, index) => [
    `<input data-field="spec-name" data-index="${index}" value="${spec.name}">`,
    `<input data-field="spec-price" data-index="${index}" value="${spec.price}">`,
    opButton("删除","remove-spec","danger",`data-index="${index}"`)
  ]);
  return panel(creating ? "创建商品" : "编辑商品", formGrid([
    { label: "商品名称", html: `<input data-field="product-name" value="${product.name}" placeholder="请输入商品名称">` },
    { label: "商品分类", html: `<select data-field="product-category">${categoryOptions(product.category)}</select>` },
    { label: "上架状态", html: `<select data-field="product-status"><option${product.status === "已上架" ? " selected" : ""}>已上架</option><option${product.status === "已下架" ? " selected" : ""}>已下架</option></select>` }
  ]) + `<div class="module-note" style="margin-top:4px"><b>上下架条件：</b>${publishRuleText}</div>`, `${routeButton("返回商品列表","products","")}${button("保存商品","save-product","primary")}`)
  + productImagesPanel(product)
  + productReviewsPanel(product)
  + panel("多规格配置", `${table(["规格名称","价格（元）","操作"], specs)}<div style="margin-top:12px">${button("添加规格","add-spec")}</div>`)
  + detailPagePanel(product)
  + requirementFieldsPanel(product)
  + panel("业务属性", `<div class="check-list">${propertyRow("是否在线支付","onlinePay",product)}${propertyRow("是否需要飞手服务","needPilot",product)}</div>
    <p class="muted" style="margin:12px 0 0">业务属性与商品绑定。订单生成时保存最终属性快照，后续修改商品不会改变历史订单。</p>`);
}

async function handleAddProductImage() {
  const product = activeProduct();
  if (!product.images) product.images = [];
  const files = await pickLocalFile({ accept: "image/*" });
  const file = files[0];
  if (!file) return;
  const previousUrl = product.images[0]?.url;
  if (previousUrl?.startsWith("blob:")) URL.revokeObjectURL(previousUrl);
  const url = URL.createObjectURL(file);
  state.productIconObjectUrls.push(url);
  product.images = [{ id: product.images[0]?.id || `pi${Date.now()}`, name: file.name, url }];
  render();
  toast("商品图标已更新");
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
        field.options = splitRequirementOptions(value);
      } else {
        delete field.options;
      }
    });
    page.querySelectorAll('[data-field="requirement-condition-parent"]').forEach(input => {
      const index = Number(input.dataset.index);
      const field = product.requirementFields[index];
      if (!field) return;
      const parentKey = input.value.trim();
      const option = page.querySelector(`[data-field="requirement-condition-option"][data-index="${index}"]`)?.value.trim() || "";
      const parent = product.requirementFields.find(item => item.key === parentKey);
      const nextOption = option || parent?.options?.[0] || "";
      if (parentKey && nextOption) {
        field.visibleWhen = { fieldKey: parentKey, equals: nextOption };
      } else {
        delete field.visibleWhen;
      }
    });
    product.requirementFields = normalizeRequirementConditions(product.requirementFields.map(normalizeRequirementField));
  }
  product.detailPage = readDetailPageFormFromPage(product);
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
      ],
      [
        "操作",
        "编辑分类、上移下移排序或删除空分类；分类下存在商品时不可删除"
      ]
    ]
  },
  "products": {
    "summary": "管理平台全部商品 / 服务，含上架状态与业务属性概览。",
    "operations": [
      "按名称、编号、分类、状态筛选商品",
      "列表默认展示商品图标作为商品封面",
      "点击「创建商品」或列表「编辑」进入商品编辑页",
      "点击「删除」：仅当关联订单数为 0 时可删除，否则提示「该商品已有关联订单，不可删除」",
      "删除前弹出确认框，确认后永久移除商品（原型模拟）",
      "列表「业务属性」为商品级配置摘要，非分类默认值"
    ],
    "fields": [
      [
        "商品图",
        "商品图标，无图时显示「暂无」"
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
        "业务属性",
        "在线支付 / 飞手需求等，与商品绑定"
      ],
      [
        "状态",
        "上架条件：商品名称、分类、商品图、有效规格/价格和业务属性已完善；已上架可在小程序购买，已下架小程序不可见，历史订单不受影响"
      ],
      [
        "关联订单",
        "该商品产生的历史订单数；大于 0 时不允许删除商品"
      ],
      [
        "操作",
        "编辑商品或删除无关联订单的商品；删除前需二次确认"
      ]
    ]
  },
  "product-edit": {
    "summary": "创建或编辑商品，配置单张商品图标、评价展示、规格价格、详情页轻量配置、需求采集字段、轻量显示条件、下拉选项子表单和业务属性。",
    "operations": [
      "上传 / 替换 / 删除商品图标，用于列表封面、小程序商品卡片与商品详情页头图",
      "评价管理：分页浏览订单评价列表，多选后随「保存商品」一并生效；默认全不展示",
      "添加 / 删除规格，每个规格独立定价",
      "详情页轻量配置：维护详情页标题区、模块内容、排序和启停",
      "需求采集字段支持 V1 显示条件：当某个下拉字段选择指定选项时，显示当前字段；不做复杂规则引擎",
      "下拉框字段支持「绑定子表单」：把当前下拉选项拆成左侧分类，并为每个选项分别维护子字段",
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
        "上架状态",
        "上架需满足基础信息、商品图、有效规格价格和业务属性完整；下架后小程序不可见"
      ],
      [
        "商品图标",
        "单张图片，用于列表封面、小程序商品卡片与商品详情页头图"
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
        "价格（元）",
        "规格对应的人民币价格；线下报价商品可填 0 或展示线下报价"
      ],
      [
        "规格操作",
        "新增或删除规格；至少保留 1 个有效规格和价格才允许作为可上架商品"
      ],
      [
        "详情页轻量配置",
        "用于小程序商品详情介绍页展示，支持单文本、四宫格、勾选列表、费用明细、联系方式、单图片模块"
      ],
      [
        "模块名称",
        "详情页模块标题，例如服务介绍、服务项目、服务优势"
      ],
      [
        "模块类型",
        "决定小程序详情页模块渲染样式，如单文本、四宫格或勾选列表"
      ],
      [
        "内容摘要",
        "后台快速维护模块正文或条目摘要"
      ],
      [
        "需求采集字段",
        "用于下单页表单，配置用户提交订单时要填写的字段，与详情页展示内容解耦"
      ],
      [
        "字段名称",
        "下单页表单中展示给用户的字段标题"
      ],
      [
        "字段类型",
        "首版仅支持文本、下拉框、图片；下拉框字段才需要维护下拉选项"
      ],
      [
        "必填",
        "字段由当前商品单独维护，可按商品类型配置姓名、联系电话、家长信息等不同采集项"
      ],
      [
        "提示文案",
        "输入框占位提示或上传说明，引导用户填写正确内容"
      ],
      [
        "下拉选项",
        "仅字段类型为下拉框时填写，多个选项用斜杠或分隔符区分"
      ],
      [
        "绑定子表单",
        "仅下拉框字段可用；按选项分别配置子字段，例如个人、企业使用不同补充信息"
      ],
      [
        "显示条件",
        "默认始终显示；V1 可选择一个下拉字段和一个选项，表示当前字段仅在该选项被选中时展示"
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
    "reset-detail-template": function (target) {
      const product = readProductFormFromPage();
          const templateType = product.detailPage?.templateType || "service";
          product.detailPage = detailPageForTemplate(templateType, product.id || "p3", product.name || "未命名商品");
          render();
          toast("已套用当前模板默认模块");
    },
    "add-detail-section": function (target) {
      const product = readProductFormFromPage();
          addDetailSection(product);
          render();
    },
    "delete-detail-section": function (target) {
      const product = readProductFormFromPage();
          normalizeDetailPage(product).sections.splice(Number(target.dataset.index), 1);
          product.detailPage.sections.forEach((section, index) => {
            section.sort = index + 1;
          });
          render();
    },
    "move-detail-section": function (target) {
      const product = readProductFormFromPage();
          moveDetailSection(product, Number(target.dataset.index), Number(target.dataset.dir));
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
          product.requirementFields.splice(index, 1);
          setProductRequirementFields(product, product.requirementFields);
          render();
    },
    "move-requirement-field": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          const index = Number(target.dataset.index);
          const next = index + Number(target.dataset.dir);
          if (next < 0) {
            toast("已经是第一个字段");
            return;
          }
          if (next >= 0 && next < product.requirementFields.length) {
            [product.requirementFields[index], product.requirementFields[next]] = [product.requirementFields[next], product.requirementFields[index]];
            setProductRequirementFields(product, product.requirementFields);
            render();
          }
    },
    "open-requirement-condition": function (target) {
      const product = readProductFormFromPage();
          requirementConditionModal(product, Number(target.dataset.index));
    },
    "clear-requirement-condition": function (target) {
      const product = activeProduct();
          const overlay = document.getElementById("overlay");
          const index = Number(overlay.querySelector(".condition-modal")?.dataset.requirementConditionIndex);
          if (product.requirementFields[index]) {
            delete product.requirementFields[index].visibleWhen;
            product.requirementFields = normalizeRequirementConditions(product.requirementFields.map(normalizeRequirementField));
          }
          closeModal();
          render();
          toast("显示条件已清空");
    },
    "save-requirement-condition": function (target) {
      const product = activeProduct();
          const overlay = document.getElementById("overlay");
          const index = Number(overlay.querySelector(".condition-modal")?.dataset.requirementConditionIndex);
          const field = product.requirementFields[index];
          if (!field) return;
          const parentKey = overlay.querySelector("#requirement-condition-parent")?.value || "";
          const option = overlay.querySelector("#requirement-condition-option")?.value || "";
          if (parentKey && option) field.visibleWhen = { fieldKey: parentKey, equals: option };
          else delete field.visibleWhen;
          product.requirementFields = normalizeRequirementConditions(product.requirementFields.map(normalizeRequirementField));
          closeModal();
          render();
          toast("显示条件已保存");
    },
    "open-requirement-subform": function (target) {
      const product = readProductFormFromPage();
          requirementSubFormModal(product, Number(target.dataset.index));
    },
    "switch-requirement-subform-option": function (target) {
      const product = activeProduct();
          const current = readRequirementSubFormFromModal(product);
          requirementSubFormModal(product, current?.index ?? Number(target.dataset.index), target.dataset.option);
    },
    "add-requirement-subform-field": function (target) {
      const product = activeProduct();
          const current = readRequirementSubFormFromModal(product);
          if (!current) return;
          const field = product.requirementFields[current.index];
          field.subForms = normalizeRequirementSubForms(field.subForms, field.options || []);
          const fields = field.subForms[current.option] || [];
          fields.push(normalizeSubFormField({
            key: `${current.option}Field${Date.now()}`,
            label: "新子字段",
            type: "text",
            required: false,
            placeholder: "请输入内容",
            sort: fields.length + 1
          }, fields.length));
          field.subForms[current.option] = fields;
          requirementSubFormModal(product, current.index, current.option);
    },
    "delete-requirement-subform-field": function (target) {
      const product = activeProduct();
          const current = readRequirementSubFormFromModal(product);
          if (!current) return;
          const field = product.requirementFields[current.index];
          const fields = field.subForms?.[current.option] || [];
          fields.splice(Number(target.dataset.subIndex), 1);
          field.subForms[current.option] = fields.map((item, index) => normalizeSubFormField({ ...item, sort: index + 1 }, index));
          requirementSubFormModal(product, current.index, current.option);
    },
    "save-requirement-subform": function (target) {
      const product = activeProduct();
          const current = readRequirementSubFormFromModal(product);
          if (!current) return;
          closeModal();
          render();
          toast("子表单已保存");
    },
    "save-product": function (target) {
      const product = readProductFormFromPage();
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
          const removing = product.images.find(item => item.id === target.dataset.id);
          if (removing?.url?.startsWith("blob:")) URL.revokeObjectURL(removing.url);
          product.images = product.images.filter(item => item.id !== target.dataset.id);
          render();
          toast("商品图标已删除");
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
          if (field) field.required = event.target.checked;
          render();
          return;
    },
    "requirement-type-choice": function (target) {
      const product = readProductFormFromPage();
          ensureCustomRequirementFields(product);
          const field = product.requirementFields[Number(event.target.dataset.index)];
          if (field) field.type = event.target.value;
          product.requirementFields = normalizeRequirementConditions(product.requirementFields.map(normalizeRequirementField));
          render();
          return;
    },
    "requirement-condition-parent": function (target) {
      const product = activeProduct();
          const overlay = document.getElementById("overlay");
          const index = Number(overlay.querySelector(".condition-modal")?.dataset.requirementConditionIndex);
          const fields = activeRequirementFields(product);
          const parent = fields.find(field => field.key === event.target.value);
          const optionSelect = overlay.querySelector("#requirement-condition-option");
          if (!optionSelect) return;
          if (!parent?.options?.length) {
            optionSelect.innerHTML = `<option value="">先选择字段</option>`;
            optionSelect.disabled = true;
          } else {
            optionSelect.innerHTML = `<option value="">请选择</option>${parent.options.map(option => `<option value="${catalogEscape(option)}">${catalogEscape(option)}</option>`).join("")}`;
            optionSelect.disabled = false;
          }
          return;
    },
    "change-detail-template": function (target) {
      const product = readProductFormFromPage();
          product.detailPage = detailPageForTemplate(event.target.value, product.id || "p3", product.name || "未命名商品");
          render();
          toast("已生成对应模板默认模块");
          return;
    }
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
