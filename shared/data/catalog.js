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
    specs: [{ name: "信息提交", price: 0, desc: "填写信息后由平台确认" }],
    reviews: [
      { user: "平台用户", rating: 5, content: "信息填写清楚，平台沟通及时。", time: "2026-06-12 15:20" }
    ]
  };
}

export const categories = [
  { name: "无人机服务", desc: "巡检、物流、吊运、表演、托管", route: "products", icon: 0, featured: true, image: "nav-hoisting" },
  { name: "无人机外卖配送", desc: "点击后跳转到配送服务", route: "products", icon: 1, featured: true, image: "nav-transport" },
  { name: "培训教育与赛事举办", desc: "赛事报名、飞手培训、少儿培训", route: "products", icon: 2, featured: true, image: "nav-maintain" },
  { name: "全部分类", route: "categories", icon: 7 }
];

export const homepageNavItems = [
  {
    id: "nav-hoisting",
    name: "吊运",
    size: "large",
    image: "../../shared/assets/home-nav/entry-hoisting-large.png",
    jumpType: "internal",
    link: "/pages/services/hoisting/index",
    enabled: true
  },
  {
    id: "nav-agriculture",
    name: "表演",
    size: "large",
    image: "../../shared/assets/home-nav/entry-agriculture-large.png",
    jumpType: "internal",
    link: "/pages/services/performance/index",
    enabled: true
  },
  {
    id: "nav-cleaning",
    name: "培训",
    size: "large",
    image: "../../shared/assets/home-nav/entry-cleaning-large.png",
    jumpType: "internal",
    link: "/pages/training/index",
    enabled: true
  },
  {
    id: "nav-transport",
    name: "无人机巡检",
    size: "large",
    image: "../../shared/assets/home-nav/entry-transport-large.png",
    jumpType: "internal",
    link: "/pages/services/inspection/index",
    enabled: true
  },
  {
    id: "nav-sales",
    name: "外卖",
    size: "small",
    image: "../../shared/assets/home-nav/entry-sales-small.png",
    jumpType: "internal",
    link: "/pages/services/takeout/index",
    enabled: true
  },
  {
    id: "nav-rental",
    name: "无人机租赁",
    size: "small",
    image: "../../shared/assets/home-nav/entry-rental-small.png",
    jumpType: "internal",
    link: "/pages/services/rental/index",
    enabled: true
  },
  {
    id: "nav-maintenance",
    name: "少儿研学",
    size: "small",
    image: "../../shared/assets/home-nav/entry-maintenance-small.png",
    jumpType: "internal",
    link: "/pages/training/children/index",
    enabled: true
  },
  {
    id: "nav-all",
    name: "更多",
    size: "small",
    image: "../../shared/assets/home-nav/entry-all-small.png",
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
  ]), "../../shared/assets/home-nav/entry-cleaning-large.png", 312),
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
  ]), "../../shared/assets/home-nav/entry-agriculture-large.png", 286),
  serviceProduct("hoisting", "无人机吊运服务", "吊运物品 · 作业地点", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("itemName", "吊运物品", "text", true),
    reqField("weight", "物品重量（kg）", "text", true),
    reqField("workAddress", "作业地点", "text", true),
    reqField("height", "吊运高度（m）", "text", true),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "../../shared/assets/home-nav/entry-hoisting-large.png", 264),
  serviceProduct("performance", "无人机表演服务", "表演日期 · 表演规模", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("purpose", "表演目的", "text", true),
    reqField("date", "表演日期", "text", true),
    reqField("timeSlot", "表演时段", "text", true),
    reqField("backupDate", "是否备用雨天/延期日期"),
    reqField("scale", "表演规模", "select", true, { options: ["100 架以内", "100-300 架", "300 架以上", "待方案确认"] }),
    reqField("exampleImage", "例图", "image")
  ]), "../../shared/assets/home-nav/entry-transport-large.png", 198),
  serviceProduct("hosting", "无人机托管服务", "无人机型号 · 托管时长", productFields([
    reqField("contactName", "登记联系人", "text", true),
    reqField("contactPhone", "联系电话", "text", true),
    reqField("droneModel", "无人机型号", "text", true),
    reqField("count", "托管数量", "text", true),
    reqField("duration", "托管时长", "select", true, { options: ["1 个月", "3 个月", "6 个月", "12 个月"] }),
    reqField("remark", "需求说明"),
    reqField("exampleImage", "例图", "image")
  ]), "../../shared/assets/home-nav/entry-rental-small.png", 156),
  serviceProduct("takeout", "无人机外卖配送", "点击任意地方即可跳转", productFields([
    reqField("jumpTip", "跳转说明", "text", false, { placeholder: "点击任意地方即可跳转" })
  ]), "../../shared/assets/home-nav/entry-sales-small.png", 142, "无人机外卖配送"),
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
  ]), "../../shared/assets/product-mapping.png", 116, "培训教育与赛事举办"),
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
  ]), "../../shared/assets/product-agriculture.png", 104, "培训教育与赛事举办"),
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
  ]), "../../shared/assets/product-mapping.png", 92, "培训教育与赛事举办")
].sort((a, b) => b.sales - a.sales);

export const products = hoistingProducts;

export const orderStatuses = [
  { name: "待付款", count: 2, route: "orders", icon: 0 },
  { name: "待接单", count: 1, route: "orders", icon: 1 },
  { name: "待服务", count: 3, route: "orders", icon: 2 },
  { name: "待评价", count: 0, route: "orders", icon: 3 },
  { name: "已完成", count: 12, route: "orders", icon: 4 }
];

export const serviceModules = [
  { name: "地址簿", desc: "地址管理 30", route: "address", icon: 0 },
  { name: "联系客服", desc: "联系客服 31", route: "contact", icon: 1 },
  { name: "开票中心", desc: "开票中心 32", route: "invoice", icon: 2 },
  { name: "意见反馈", desc: "意见反馈 29", route: "feedback", icon: 3 },
  { name: "关于我们", desc: "关于我们 28", route: "about", icon: 4 },
  { name: "飞手加入", desc: "飞手加入 25", route: "pilot", icon: 5 },
  { name: "城市运营申请", desc: "城市运营申请", route: "operator", icon: 6 },
  { name: "任务大厅", desc: "任务大厅", route: "tasks", icon: 7, pilotOnly: true }
];
