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
    image: "../../shared/assets/home-nav/entry-hoisting-large.png",
    jumpType: "internal",
    link: "/pages/services/hoisting/index",
    enabled: true
  },
  {
    id: "nav-agriculture",
    name: "农业",
    size: "large",
    image: "../../shared/assets/home-nav/entry-agriculture-large.png",
    jumpType: "internal",
    link: "/pages/services/agriculture/index",
    enabled: true
  },
  {
    id: "nav-cleaning",
    name: "高空清洗",
    size: "large",
    image: "../../shared/assets/home-nav/entry-cleaning-large.png",
    jumpType: "internal",
    link: "/pages/services/cleaning/index",
    enabled: true
  },
  {
    id: "nav-transport",
    name: "高空搬运",
    size: "large",
    image: "../../shared/assets/home-nav/entry-transport-large.png",
    jumpType: "internal",
    link: "/pages/services/transport/index",
    enabled: true
  },
  {
    id: "nav-sales",
    name: "无人机销售",
    size: "small",
    image: "../../shared/assets/home-nav/entry-sales-small.png",
    jumpType: "internal",
    link: "/pages/products/index?type=sales",
    enabled: true
  },
  {
    id: "nav-rental",
    name: "无人机租赁",
    size: "small",
    image: "../../shared/assets/home-nav/entry-rental-small.png",
    jumpType: "internal",
    link: "/pages/products/index?type=rental",
    enabled: true
  },
  {
    id: "nav-maintenance",
    name: "保养",
    size: "small",
    image: "../../shared/assets/home-nav/entry-maintenance-small.png",
    jumpType: "internal",
    link: "/pages/maintenance/index",
    enabled: true
  },
  {
    id: "nav-all",
    name: "全部分类",
    size: "small",
    image: "../../shared/assets/home-nav/entry-all-small.png",
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
    image: "../../shared/assets/product-mapping.png",
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
    image: "../../shared/assets/product-mapping.png",
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
    image: "../../shared/assets/product-agriculture.png",
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
    image: "../../shared/assets/product-mapping.png",
    specs: [
      { name: "巡检套装", price: 26900, desc: "主机 · 巡检镜头 · 标准电池" },
      { name: "长航时套装", price: 32900, desc: "增强电池 · 远距离图传" },
      { name: "企业套装", price: 39800, desc: "长航时套装 · 平台接入支持" }
    ]
  }
].sort((a, b) => b.sales - a.sales);

export const hoistingProducts = [
  {
    id: "hoist-medical",
    name: "医疗物资应急吊运",
    desc: "院区调拨 · 夜间可约",
    price: 120,
    sales: 318,
    location: "上海黄浦",
    image: "../../shared/assets/home-nav/entry-hoisting-large.png",
    reviewCount: 46,
    detail: "适用于院区、园区或楼宇之间的小件应急吊运。下单后平台会根据货物类型、起降点条件和飞行窗口安排飞手与设备。",
    specs: [
      { name: "50kg以内", price: 120, desc: "医疗药品 · 文件样本 · 单点直达" },
      { name: "50kg-100kg", price: 198, desc: "医疗箱 · 应急备件 · 专人交接" },
      { name: "夜间加急", price: 298, desc: "夜间窗口 · 加急调度 · 双人核验" }
    ],
    reviews: [
      { user: "张医生", rating: 5, content: "夜间调度很快，交接流程清楚，药品送达时间比地面车辆稳定。", time: "2026-06-12 23:40" },
      { user: "黄浦院区", rating: 5, content: "飞手提前确认起降点，平台客服一直同步进度，适合应急物资。", time: "2026-06-10 18:26" },
      { user: "林先生", rating: 4, content: "整体很顺畅，希望后续能增加更多夜间预约时段。", time: "2026-06-08 21:12" }
    ]
  },
  {
    id: "hoist-construction",
    name: "工地建材吊运",
    desc: "小件建材 · 楼层转运",
    price: 260,
    sales: 204,
    location: "四川成都",
    image: "../../shared/assets/home-nav/entry-transport-large.png",
    reviewCount: 38,
    detail: "面向工地楼层、屋面和临时作业点的小件建材吊运。平台根据重量、楼层高度和现场安全条件配置吊运方案。",
    specs: [
      { name: "轻载吊运", price: 260, desc: "30kg以内 · 单次吊运 · 现场确认" },
      { name: "标准吊运", price: 480, desc: "30kg-80kg · 多批次吊运 · 安全员协同" },
      { name: "半日服务", price: 1280, desc: "半日驻场 · 多点吊运 · 履约记录" }
    ],
    reviews: [
      { user: "陈工", rating: 5, content: "楼顶材料转运效率高，现场安全交底比较规范。", time: "2026-06-11 16:20" },
      { user: "成都建工", rating: 4, content: "平台确认重量和起吊点很仔细，半日服务比较适合连续作业。", time: "2026-06-06 10:18" }
    ]
  },
  {
    id: "hoist-park",
    name: "园区设备吊运",
    desc: "设备备件 · 跨楼配送",
    price: 180,
    sales: 176,
    location: "浙江宁波",
    image: "../../shared/assets/home-nav/entry-hoisting-large.png",
    reviewCount: 29,
    detail: "适用于园区内部跨楼、跨区的小型设备与备件吊运，支持预约时段、固定交接人和履约留痕。",
    specs: [
      { name: "单点配送", price: 180, desc: "园区内单点 · 小型备件 · 到点交付" },
      { name: "多点配送", price: 360, desc: "园区多点 · 路线规划 · 统一交接" },
      { name: "企业月结", price: 980, desc: "企业协议价 · 月度结算 · 专属客服" }
    ],
    reviews: [
      { user: "云航科技", rating: 5, content: "跨楼备件配送省了很多沟通成本，交付照片也能追溯。", time: "2026-06-09 13:35" },
      { user: "王女士", rating: 5, content: "预约时间准，客服会提前提醒收货人到交接点。", time: "2026-06-05 09:48" }
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
