export const categories = [
  { name: "无人机销售", desc: "专业设备选购", route: "products", icon: 0, featured: true, image: "nav-sales" },
  { name: "无人机租赁", desc: "灵活租期方案", route: "rental", icon: 1, featured: true, image: "nav-rental" },
  { name: "保养维修", desc: "专业检测养护", route: "booking", icon: 2, featured: true, image: "nav-maintain" },
  { name: "无人机保险", desc: "设备飞行保障", route: "booking", icon: 3, featured: true, image: "nav-insurance" },
  { name: "空域代办", route: "booking", icon: 4 },
  { name: "共享电池", route: "booking", icon: 5 },
  { name: "培训服务", route: "booking", icon: 6 },
  { name: "全部分类", route: "categories", icon: 7 }
];

export const homepageNavItems = [
  {
    id: "nav-hoisting",
    name: "吊运",
    size: "large",
    image: "../shared/assets/home-nav/entry-hoisting-large.png",
    jumpType: "internal",
    link: "/pages/services/hoisting/index",
    enabled: true
  },
  {
    id: "nav-agriculture",
    name: "农业",
    size: "large",
    image: "../shared/assets/home-nav/entry-agriculture-large.png",
    jumpType: "internal",
    link: "/pages/services/agriculture/index",
    enabled: true
  },
  {
    id: "nav-cleaning",
    name: "高空清洗",
    size: "large",
    image: "../shared/assets/home-nav/entry-cleaning-large.png",
    jumpType: "internal",
    link: "/pages/services/cleaning/index",
    enabled: true
  },
  {
    id: "nav-transport",
    name: "高空搬运",
    size: "large",
    image: "../shared/assets/home-nav/entry-transport-large.png",
    jumpType: "internal",
    link: "/pages/services/transport/index",
    enabled: true
  },
  {
    id: "nav-sales",
    name: "无人机销售",
    size: "small",
    image: "../shared/assets/home-nav/entry-sales-small.png",
    jumpType: "internal",
    link: "/pages/products/index?type=sales",
    enabled: true
  },
  {
    id: "nav-rental",
    name: "无人机租赁",
    size: "small",
    image: "../shared/assets/home-nav/entry-rental-small.png",
    jumpType: "internal",
    link: "/pages/products/index?type=rental",
    enabled: true
  },
  {
    id: "nav-maintenance",
    name: "保养",
    size: "small",
    image: "../shared/assets/home-nav/entry-maintenance-small.png",
    jumpType: "internal",
    link: "/pages/maintenance/index",
    enabled: true
  },
  {
    id: "nav-all",
    name: "全部分类",
    size: "small",
    image: "../shared/assets/home-nav/entry-all-small.png",
    jumpType: "internal",
    link: "/pages/categories/index",
    enabled: true
  }
];

export const products = [
  {
    name: "轻型航拍无人机",
    desc: "便携航拍 · 智能避障",
    price: 6999,
    sales: 238,
    image: "../shared/assets/product-mapping.png",
    specs: [
      { name: "标准套装", price: 6999, desc: "主机 · 遥控器 · 标准电池" },
      { name: "双电套装", price: 8299, desc: "标准套装 · 备用电池" },
      { name: "保险套装", price: 8999, desc: "双电套装 · 设备保险" }
    ]
  },
  {
    name: "行业测绘无人机套装",
    desc: "高精度航测 · RTK 定位",
    price: 19999,
    sales: 126,
    image: "../shared/assets/product-mapping.png",
    specs: [
      { name: "标准套装", price: 19999, desc: "主机 · RTK 模块 · 基础培训" },
      { name: "RTK 套装", price: 23999, desc: "标准套装 · 高精度定位增强" },
      { name: "增强套装", price: 28999, desc: "RTK 套装 · 航测软件 · 交付支持" }
    ]
  },
  {
    name: "农业植保无人机",
    desc: "精准喷洒 · 高效作业",
    price: 38800,
    sales: 89,
    image: "../shared/assets/product-agriculture.png",
    specs: [
      { name: "基础版", price: 38800, desc: "喷洒系统 · 标准药箱" },
      { name: "大田版", price: 45800, desc: "大容量药箱 · 智能航线" },
      { name: "作业版", price: 52800, desc: "作业培训 · 备件包 · 售后支持" }
    ]
  },
  {
    name: "长航时巡检无人机",
    desc: "工业巡检 · 稳定续航",
    price: 26900,
    sales: 67,
    image: "../shared/assets/product-mapping.png",
    specs: [
      { name: "巡检套装", price: 26900, desc: "主机 · 巡检镜头 · 标准电池" },
      { name: "长航时套装", price: 32900, desc: "增强电池 · 远距离图传" },
      { name: "企业套装", price: 39800, desc: "长航时套装 · 平台接入支持" }
    ]
  }
].sort((a, b) => b.sales - a.sales);

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
