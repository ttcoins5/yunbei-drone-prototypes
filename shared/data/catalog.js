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

function productIcon(name) {
  return `../../shared/assets/product-icons/${name}?v=product-line-icons-1`;
}

function serviceProduct(id, name, desc, fields, image, sales, category = "无人机服务") {
  return {
    id,
    name,
    desc,
    category,
    price: 0,
    sales,
    location: "信息填写",
    image,
    requirementFields: fields,
    reviewCount: 0,
    detail: `${name}需要先填写需求信息，平台确认后安排后续服务。`,
    detailPage: detailPageFor(id, name),
    specs: [{ name: "信息提交", price: 0, desc: "填写信息后由平台确认" }],
    reviews: [
      { id: `${id}-rv1`, user: "平台用户", rating: 5, content: "信息填写清楚，平台沟通及时。", time: "2026-06-12 15:20" }
    ],
    displayedReviewIds: [`${id}-rv1`]
  };
}

function paidHoistingProduct(fields, image, sales) {
  const product = serviceProduct("hoisting", "无人机吊运服务", "按吊运规格计价 · 在线支付", fields, image, sales);
  product.price = 680;
  product.location = "在线下单";
  product.detail = "选择吊运规格和数量后在线支付，平台收款后进入待接单并安排飞手服务。";
  product.specs = [
    { name: "轻量吊运（20kg以内）", price: 680, desc: "适合小型设备、物料箱、工具包等" },
    { name: "标准吊运（20-50kg）", price: 1160, desc: "适合空调外机、建材箱、应急物资等" },
    { name: "重载吊运（50-100kg）", price: 1980, desc: "适合大型设备或高空施工物资" }
  ];
  product.reviews = [
    { id: "hoisting-rv1", user: "成都建工", rating: 5, content: "标准吊运下单后很快完成派单，价格和数量在订单里看得清楚。", time: "2026-06-16 18:20" }
  ];
  product.displayedReviewIds = ["hoisting-rv1"];
  return product;
}

function section(id, type, title, extra = {}) {
  return { id, type, title, enabled: true, sort: extra.sort || 1, ...extra };
}

function contactSection(sort = 99) {
  return section("contact", "contact", "联系方式", {
    phone: "0577-55558188",
    backupPhone: "0577-88360168",
    address: "浙江省宁波市鄞州区低空经济产业园",
    sort
  });
}

const serviceDetailDefaults = {
  inspection: {
    subtitle: "智能巡检 · 精准采集 · 高效交付",
    intro: "提供专业无人机巡检服务，适用于园区、楼宇、航线、设备等场景，帮助客户完成高效巡查与影像记录。",
    items: ["楼宇巡检", "园区巡检", "航线巡检", "设备巡检"],
    advantages: ["航线规划清晰", "高清影像采集", "问题点位标注", "巡检报告交付"]
  },
  logistics: {
    subtitle: "快速配送 · 安全可靠 · 覆盖全城",
    intro: "无人机物流服务利用先进的无人机技术，为城市和偏远地区提供快速、高效的物资配送服务。",
    items: ["城市配送", "紧急物资", "医疗运输", "特殊货物"],
    advantages: ["2小时快速响应", "全程GPS跟踪", "专业团队操作", "全程保险覆盖"]
  },
  hoisting: {
    subtitle: "高空作业 · 精准操控 · 安全高效",
    intro: "提供专业的无人机吊运服务，适用于高空作业、建筑施工、设备安装等场景。",
    items: ["高空吊运", "设备安装", "建筑施工", "特殊作业"],
    advantages: ["专业吊运设备", "精准操控技术", "严格安全规范", "经验丰富团队"]
  },
  performance: {
    subtitle: "创意编队 · 活动传播 · 视觉震撼",
    intro: "提供无人机编队表演方案设计、航线编排、现场执行和安全保障服务，适用于庆典、文旅、商业活动等场景。",
    items: ["方案策划", "图案编排", "现场执行", "安全保障"],
    advantages: ["定制化创意方案", "多规模机群支持", "活动传播效果强", "现场执行经验丰富"]
  },
  hosting: {
    subtitle: "设备托管 · 运维保养 · 资产管理",
    intro: "为企业和个人无人机提供托管、检测、保养、维修协调和飞行资产管理服务。",
    items: ["设备托管", "定期检测", "维护保养", "资产管理"],
    advantages: ["标准化仓储管理", "定期健康检查", "维修保养协同", "设备档案清晰"]
  },
  rental: {
    subtitle: "灵活租赁 · 设备保障 · 按需使用",
    intro: "提供多型号无人机短租、长租和项目制租赁服务，适用于临时作业、培训演示、活动保障等场景。",
    items: ["短期租赁", "项目租赁", "设备交付", "基础保障"],
    advantages: ["租期灵活匹配", "设备状态可追溯", "交付前检测", "支持押金与档期确认"]
  }
};

function serviceDetailPage(id, name) {
  const config = serviceDetailDefaults[id] || serviceDetailDefaults.hoisting;
  return {
    templateType: "service",
    hero: { title: name, subtitle: config.subtitle, icon: id },
    sections: [
      section("intro", "intro", "服务介绍", { content: config.intro, sort: 1 }),
      section("items", "grid", "服务项目", { items: config.items.map(title => ({ title })), sort: 2 }),
      section("advantages", "checklist", "服务优势", { items: config.advantages, sort: 3 }),
      contactSection(4)
    ],
    cta: { text: "立即下单", actionType: "order" }
  };
}

function trainingDetailPage(id, name) {
  const isChild = id === "child-training";
  return {
    templateType: "training",
    hero: {
      title: name,
      subtitle: isChild ? "兴趣启蒙 · 实操体验 · 竞赛培养" : "专业培训 · 证书认证 · 实操教学",
      bannerImage: isChild ? "../../shared/assets/product-mapping.png" : "../../shared/assets/product-agriculture.png"
    },
    sections: [
      section("conditions", "condition", isChild ? "适合对象" : "报名条件", {
        items: isChild
          ? ["6-16 岁青少年", "对无人机或科技课程感兴趣", "家长同意报名并配合安全要求"]
          : ["中华人民共和国公民", "年满16周岁以上，70周岁以下", "初中以上文化程度", "遵纪守法，无不良行为记录", "身体健康，具备无人机操控所需能力"],
        sort: 1
      }),
      section("fees", "fee", isChild ? "课程费用" : "培训费用", {
        items: isChild
          ? [{ name: "无人机启蒙体验课", price: "199元/次" }, { name: "少儿无人机系统课", price: "3980元/期" }]
          : [{ name: "小型无人机-多旋翼-视距内", price: "7800元/人" }, { name: "小型无人机-多旋翼-超视距", price: "11800元/人" }, { name: "中型无人机-多旋翼-视距内", price: "9800元/人" }, { name: "中型无人机-多旋翼-超视距", price: "13800元/人" }],
        sort: 2
      }),
      section("features", "feature", "教学特色", {
        items: isChild
          ? [
              { title: "动手实践", content: "通过真实飞行体验和基础编程任务培养空间感与工程意识。" },
              { title: "安全教学", content: "课程配套安全规范和教师指导，降低入门门槛。" },
              { title: "竞赛衔接", content: "面向有兴趣的学员提供竞赛训练方向。" }
            ]
          : [
              { title: "权威认证", content: "围绕民航无人机执照考试要求组织课程和实操训练。" },
              { title: "全面课程", content: "覆盖无人机基础知识、飞行操作、维护保养、法律法规等内容。" },
              { title: "灵活教学", content: "可根据学员基础和时间安排匹配课程节奏。" },
              { title: "资深老牌", content: "教学团队具备丰富行业经验和培训交付经验。" }
            ],
        sort: 3
      }),
      ...(!isChild ? [
        section("company", "company", "公司简介", { content: "浙江御风航空科技有限公司深耕无人机服务与培训领域，面向行业客户提供专业化培训和服务交付。", sort: 4 }),
        section("license", "license", "执照功能", { content: "CAAC 无人机执照是从事无人机行业相关岗位的重要资质，可用于空域申请、航线申请及相关商业活动等场景。", sort: 5 })
      ] : []),
      contactSection(isChild ? 4 : 6)
    ],
    cta: { text: "立即报名", actionType: "signup" }
  };
}

function eventDetailPage(name) {
  return {
    templateType: "event",
    hero: { title: name, subtitle: "赛事报名 · 规则透明 · 专业组织", icon: "competition" },
    sections: [
      section("intro", "intro", "赛事介绍", { content: "面向无人机爱好者、院校和行业团队提供赛事报名、组别登记和活动组织服务。", sort: 1 }),
      section("eventInfo", "eventInfo", "赛事信息", { date: "2026年暑期档", address: "宁波低空经济示范区", groups: ["成人组", "青少年组", "团体组"], deadline: "赛前7日截止报名", sort: 2 }),
      section("rules", "checklist", "组别规则", { items: ["按年龄和单位类型分组", "报名资料审核后确认参赛", "现场需遵守飞行安全规范"], sort: 3 }),
      section("fees", "fee", "报名费用", { items: [{ name: "个人报名", price: "线下确认" }, { name: "团体报名", price: "线下确认" }], sort: 4 }),
      contactSection(5)
    ],
    cta: { text: "立即报名", actionType: "signup" }
  };
}

function externalDetailPage(name) {
  return {
    templateType: "external",
    hero: { title: name, subtitle: "点击跳转 · 即时配送 · 便捷下单", icon: "takeout" },
    sections: [
      section("intro", "intro", "服务说明", { content: "无人机外卖配送为独立配送业务入口，点击下方按钮进入配送服务。", sort: 1 }),
      section("external", "externalLink", "跳转提示", { content: "外卖配送涉及商家、地址、餐品和配送链路，首版作为独立业务入口处理。", externalUrl: "https://microapp.zndkfx.com", sort: 2 }),
      contactSection(3)
    ],
    cta: { text: "去配送", actionType: "external", externalUrl: "https://microapp.zndkfx.com" }
  };
}

function detailPageFor(id, name) {
  if (id === "pilot-training" || id === "child-training") return trainingDetailPage(id, name);
  if (id === "competition") return eventDetailPage(name);
  if (id === "takeout") return externalDetailPage(name);
  return serviceDetailPage(id, name);
}

export const categories = [
  { name: "无人机服务", desc: "巡检、物流、吊运、表演、托管", route: "products", icon: 0, featured: true, image: "nav-hoisting" },
  { name: "培训教育与赛事举办", desc: "赛事报名、飞手培训、少儿培训", route: "products", icon: 2, featured: true, image: "nav-maintain" },
  { name: "增值服务", desc: "无人机租赁等增值业务", route: "products", icon: 3, featured: true, image: "nav-rental" },
  { name: "全部分类", route: "categories", icon: 7 }
];

export const homepageNavItems = [
  {
    id: "nav-hoisting",
    name: "吊运",
    size: "large",
    image: "../../shared/assets/home-nav-v2/entry-hoisting-large-v2.png",
    jumpType: "internal",
    link: "/pages/services/hoisting/index",
    enabled: true
  },
  {
    id: "nav-agriculture",
    name: "表演",
    size: "large",
    image: "../../shared/assets/home-nav-v2/entry-agriculture-large-v2.png",
    jumpType: "internal",
    link: "/pages/services/performance/index",
    enabled: true
  },
  {
    id: "nav-cleaning",
    name: "培训",
    size: "large",
    image: "../../shared/assets/home-nav-v2/entry-cleaning-large-v2.png",
    jumpType: "internal",
    link: "/pages/training/index",
    enabled: true
  },
  {
    id: "nav-transport",
    name: "无人机巡检",
    size: "large",
    image: "../../shared/assets/home-nav-v2/entry-transport-large-v2.png",
    jumpType: "internal",
    link: "/pages/services/inspection/index",
    enabled: true
  },
  {
    id: "nav-sales",
    name: "外卖",
    size: "small",
    image: "../../shared/assets/home-nav-v2/entry-sales-small-v2.png",
    jumpType: "external",
    link: "https://microapp.zndkfx.com",
    enabled: true
  },
  {
    id: "nav-rental",
    name: "无人机租赁",
    size: "small",
    image: "../../shared/assets/home-nav-v2/entry-rental-small-v2.png",
    jumpType: "internal",
    link: "/pages/services/rental/index",
    enabled: true
  },
  {
    id: "nav-maintenance",
    name: "少儿研学",
    size: "small",
    image: "../../shared/assets/home-nav-v2/entry-maintenance-small-v2.png",
    jumpType: "internal",
    link: "/pages/training/children/index",
    enabled: true
  },
  {
    id: "nav-all",
    name: "更多",
    size: "small",
    image: "../../shared/assets/home-nav-v2/entry-all-small-v2.png",
    jumpType: "internal",
    link: "/pages/categories/index",
    enabled: true
  }
];

export const hoistingProducts = [
  serviceProduct("inspection", "无人机巡检服务", "巡检区域 · 巡检时间", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("serviceType", "服务类型", "select", true, { options: ["楼宇巡检", "园区巡检", "航线巡检", "设备巡检"] }),
    reqField("inspectionArea", "巡检区域", "text", true),
    reqField("inspectionTime", "巡检时间", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), productIcon("icon-inspection.png"), 312),
  serviceProduct("logistics", "无人机物流服务", "货物信息 · 运输时效", productFields([
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
  ]), productIcon("icon-logistics.png"), 286),
  paidHoistingProduct(productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("itemName", "吊运物品", "text", true),
    reqField("weight", "物品重量（kg）", "text", true),
    reqField("workAddress", "作业地点", "text", true),
    reqField("height", "吊运高度（m）", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), productIcon("icon-hoisting.png"), 264),
  serviceProduct("performance", "无人机表演服务", "表演日期 · 表演规模", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("purpose", "表演目的", "text", true),
    reqField("date", "表演日期", "text", true),
    reqField("timeSlot", "表演时段", "text", true),
    reqField("backupDate", "是否备用雨天/延期日期"),
    reqField("scale", "表演规模", "select", true, { options: ["100 架以内", "100-300 架", "300 架以上", "待方案确认"] }),
    reqField("exampleImage", "例图", "image")
  ]), productIcon("icon-performance.png"), 198),
  serviceProduct("hosting", "无人机托管服务", "无人机型号 · 托管时长", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("droneModel", "无人机型号", "text", true),
    reqField("count", "托管数量", "text", true),
    reqField("duration", "托管时长", "select", true, { options: ["1 个月", "3 个月", "6 个月", "12 个月"] }),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), productIcon("icon-hosting.png"), 156),
  serviceProduct("rental", "无人机租赁", "租赁机型 · 租赁周期", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("droneModel", "租赁机型", "select", true, { options: ["多旋翼航拍机", "行业巡检机", "物流运输机", "待平台推荐"] }),
    reqField("rentalPeriod", "租赁周期", "select", true, { options: ["1-3 天", "1 周", "1 个月", "项目制租赁"] }),
    reqField("useScene", "使用场景", "text", true),
    reqField("startDate", "期望开始日期", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), productIcon("icon-rental.png"), 142, "增值服务"),
  serviceProduct("competition", "无人机赛事", "赛事报名 · 信息填写", productFields([
    reqField("registerType", "注册类型", "select", true, { options: ["个人", "单位", "学校", "机构"] }),
    reqField("organization", "单位名称", "text", true),
    reqField("name", "姓名", "text", true),
    reqField("gender", "性别", "select", true, { options: ["男", "女"] }),
    reqField("idNo", "证件号", "text", true),
    reqField("group", "组别", "select", true, { options: ["成人组", "青少年组", "团体组"] }),
    reqField("phone", "联系电话", "text", true),
    reqField("email", "电子邮箱"),
    reqField("remark", "备注")
  ]), productIcon("icon-competition.png"), 116, "培训教育与赛事举办"),
  serviceProduct("pilot-training", "飞手培训", "证照级别 · 考试机型", productFields([
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
  ]), productIcon("icon-pilot-training.png"), 104, "培训教育与赛事举办"),
  serviceProduct("child-training", "少儿培训", "少儿课程 · 家长信息", productFields([
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
  ]), productIcon("icon-child-training.png"), 92, "培训教育与赛事举办")
].sort((a, b) => b.sales - a.sales);

export const products = hoistingProducts;

export const orderStatuses = [
  { name: "待付款", count: 1, route: "orders", icon: 0 },
  { name: "待接单", count: 3, route: "orders", icon: 1 },
  { name: "待服务", count: 2, route: "orders", icon: 2 },
  { name: "待评价", count: 1, route: "orders", icon: 3 },
  { name: "已完成", count: 3, route: "orders", icon: 4 }
];

export const serviceModules = [
  { name: "地址簿", desc: "地址管理 30", route: "address", icon: 0, iconName: "address" },
  { name: "开票中心", desc: "开票中心 32", route: "invoice", icon: 2, iconName: "invoice" },
  { name: "城市运营申请", desc: "城市运营申请", route: "operator", icon: 6, iconName: "operator" },
  { name: "意见反馈", desc: "意见反馈 29", route: "feedback", icon: 3, iconName: "feedback" },
  { name: "飞手加入", desc: "填写入驻资料", route: "pilot", icon: 5, iconName: "pilot" },
  { name: "任务大厅", desc: "任务大厅", route: "tasks", icon: 7, iconName: "tasks", pilotOnly: true },
  { name: "联系客服", desc: "联系客服 31", route: "contact", icon: 1, iconName: "contact" },
  { name: "关于我们", desc: "关于我们 28", route: "about", icon: 4, iconName: "about" }
];
