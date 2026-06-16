import { hoistingProducts } from "../data/catalog.js";

export const state = {
  page: location.hash.replace("#/", "") || "home",
  history: [],
  selectedProduct: hoistingProducts[0],
  productListMode: "hoisting",
  productReviewFilter: "全部",
  selectedSpecIndex: 0,
  pendingProductOrder: null,
  userProfile: {
    role: "pilot",
    nickname: "云北用户",
    phone: "13888888821",
    gender: "男",
    birthday: "1993-08-18",
    region: "浙江省 宁波市",
    avatarText: "云",
    wechatAuthorized: true,
    phoneAuthorized: true
  },
  selectedOrderNo: "ORD17811004481206569",
  orders: [
    {
      orderNo: "ORD17811004481206569",
      status: "已取消",
      tab: "已取消",
      time: "2026-06-10 22:07",
      title: "医疗物品吊运",
      spec: "50kg-100kg - 医疗药品",
      price: 120,
      count: 1,
      paid: 120,
      serviceType: "应急吊运",
      contactName: "张医生",
      contactPhone: "13888886661",
      address: "上海市 黄浦区 复兴中路 521 号",
      remark: "夜间加急配送，需到院区西门交接",
      timeline: [
        { time: "2026-06-10 22:07", title: "订单提交", desc: "已提交医疗物品吊运需求" },
        { time: "2026-06-10 22:16", title: "平台受理", desc: "客服已确认需求与配送地址" },
        { time: "2026-06-10 23:02", title: "订单取消", desc: "用户主动取消，本次未安排飞手" }
      ]
    },
    {
      orderNo: "ORD17811004481206570",
      status: "待服务",
      tab: "待服务",
      time: "2026-06-12 09:30",
      title: "园区楼宇巡检",
      spec: "航线巡检 - 半日服务",
      price: 680,
      count: 1,
      paid: 680,
      serviceType: "楼宇巡检",
      contactName: "李工",
      contactPhone: "13888887772",
      address: "上海市 浦东新区 张江低空产业园 6 号楼",
      remark: "重点查看幕墙、屋面机组和西侧连廊",
      timeline: [
        { time: "2026-06-12 09:30", title: "订单提交", desc: "已提交园区楼宇巡检需求" },
        { time: "2026-06-12 10:00", title: "支付完成", desc: "订单已支付，等待平台调度" },
        { time: "2026-06-15 18:40", title: "待服务", desc: "已分配飞手，等待按预约时间上门" }
      ]
    },
    {
      orderNo: "ORD17811004481206571",
      status: "待接单",
      tab: "待接单",
      time: "2026-06-13 14:15",
      title: "无人机租赁订单",
      spec: "行业测绘机 - 3 天租期",
      price: 300,
      count: 3,
      paid: 900,
      serviceType: "无人机租赁",
      contactName: "周老师",
      contactPhone: "13888889993",
      address: "苏州市 吴江区 东太湖路 88 号",
      remark: "租赁 3 天，需附带双电池与充电器",
      timeline: [
        { time: "2026-06-13 14:15", title: "订单提交", desc: "已提交行业测绘机租赁需求" },
        { time: "2026-06-13 14:22", title: "支付完成", desc: "订单已支付，等待商家接单" },
        { time: "2026-06-14 10:20", title: "待接单", desc: "商家正在确认库存与交付时间" }
      ]
    }
  ],
  serviceNotifications: [
    {
      id: "service-notice-1",
      orderNo: "ORD17811004481206569",
      fromStatus: "待服务",
      toStatus: "已取消",
      time: "2026-06-16 09:20",
      isRead: false
    },
    {
      id: "service-notice-2",
      orderNo: "ORD17811004481206570",
      fromStatus: "待接单",
      toStatus: "待服务",
      time: "2026-06-15 18:40",
      isRead: true
    },
    {
      id: "service-notice-3",
      orderNo: "ORD17811004481206571",
      fromStatus: "待付款",
      toStatus: "待接单",
      time: "2026-06-14 10:20",
      isRead: true
    }
  ],
  taskHallTab: "任务信息",
  selectedTaskId: "REQ20260614001",
  selectedAssignedOrderNo: "YB26061326",
  pilotTasks: [
    {
      id: "REQ20260614001",
      requirementNo: "REQ20260614001",
      title: "高空清洗服务协作",
      serviceTime: "2026-06-18 09:00-12:00",
      address: "成都市武侯区某园区 3 号楼",
      remark: "需具备楼宇外立面作业经验，现场有停车位。",
      description: "后台发布的飞手意愿征集任务。飞手报名后，平台将结合资质、距离和排班情况进行筛选并分配订单。",
      status: "征集中",
      joined: false,
      intentionCount: 6
    },
    {
      id: "REQ20260615002",
      requirementNo: "REQ20260615002",
      title: "园区屋面巡检任务",
      serviceTime: "2026-06-19 14:00-17:30",
      address: "宁波市鄞州区低空经济产业园",
      remark: "重点查看屋面设备、排水沟和西侧幕墙。",
      description: "任务需要按指定航线完成影像采集，并在服务后提交巡检素材。平台将根据报名飞手情况统一派单。",
      status: "征集中",
      joined: false,
      intentionCount: 3
    },
    {
      id: "REQ20260612003",
      requirementNo: "REQ20260612003",
      title: "商业航拍补拍",
      serviceTime: "2026-06-16 16:00-18:00",
      address: "杭州市滨江区江南大道 1888 号",
      remark: "天气原因已暂缓，等待后台重新开放。",
      description: "该需求当前已关闭，飞手可查看任务信息，但不能继续提交报名意愿。",
      status: "已关闭",
      joined: false,
      intentionCount: 9
    }
  ],
  assignedPilotOrders: [
    {
      orderNo: "YB26061326",
      user: "林先生",
      category: "飞行服务",
      productName: "高空清洗服务",
      amount: 1599,
      onlinePay: "是（下单快照）",
      needPilot: "是（下单快照）",
      needBooking: "是（下单快照）",
      bookingDate: "2026-06-14",
      bookingTime: "09:00-11:00",
      contactPhone: "139****5528",
      bookingAddress: "成都市武侯区某园区 3 号楼",
      infoRemark: "重点清洗北侧玻璃幕墙，现场有停车位。",
      remarkPhoto: "北侧外立面.jpg",
      status: "待完成",
      assignedTime: "2026-06-13 18:20",
      progress: [
        { time: "2026-06-13 18:20", title: "后台派单", desc: "平台已将订单分配给当前飞手" },
        { time: "2026-06-14 08:30", title: "等待服务", desc: "请按预约时间到达服务地址" }
      ]
    },
    {
      orderNo: "YB26061327",
      user: "陈女士",
      category: "巡检服务",
      productName: "园区屋面巡检",
      amount: 880,
      onlinePay: "是（下单快照）",
      needPilot: "是（下单快照）",
      needBooking: "是（下单快照）",
      bookingDate: "2026-06-18",
      bookingTime: "14:00-16:00",
      contactPhone: "138****2091",
      bookingAddress: "宁波市鄞州区低空经济产业园 2 号楼",
      infoRemark: "需要拍摄屋顶机组、排水沟和东侧连廊。",
      remarkPhoto: "屋面点位示意.jpg",
      status: "待完成",
      assignedTime: "2026-06-15 10:45",
      progress: [
        { time: "2026-06-15 10:45", title: "后台派单", desc: "平台已将订单分配给当前飞手" },
        { time: "2026-06-15 11:10", title: "服务准备", desc: "请提前核对设备电池和飞行资质" }
      ]
    },
    {
      orderNo: "YB26061218",
      user: "周先生",
      category: "农业服务",
      productName: "农田植保作业",
      amount: 1260,
      onlinePay: "是（下单快照）",
      needPilot: "是（下单快照）",
      needBooking: "是（下单快照）",
      bookingDate: "2026-06-12",
      bookingTime: "07:30-10:30",
      contactPhone: "137****6180",
      bookingAddress: "苏州市吴江区东太湖农服中心",
      infoRemark: "作业前需与农服站确认药剂配比。",
      remarkPhoto: "地块边界图.jpg",
      status: "已完成",
      assignedTime: "2026-06-11 16:35",
      progress: [
        { time: "2026-06-11 16:35", title: "后台派单", desc: "平台已将订单分配给当前飞手" },
        { time: "2026-06-12 10:42", title: "订单完成", desc: "飞手已完成现场服务" }
      ]
    }
  ],
  tab: "home",
  addressBook: [
    {
      id: 1,
      name: "云北用户",
      phone: "13888888821",
      region: "上海市 浦东新区",
      detail: "张江低空产业园 6 号楼 1208 室",
      isDefault: true
    },
    {
      id: 2,
      name: "项目负责人",
      phone: "13888888832",
      region: "上海市 闵行区",
      detail: "低空装备交付中心 2 号仓",
      isDefault: false
    }
  ],
  editingAddressId: null,
  showAddressForm: false,
  showContactSheet: false,
  showPilotOnlyDialog: false,
  flightReports: [
    {
      reportNo: "BB20260615001",
      pilot: "林先生",
      modelLicense: "DJI M350 RTK / CAAC-A01236",
      sorties: 3,
      duration: "2小时30分",
      reportTime: "2026-06-15 09:30",
      status: "待确认"
    },
    {
      reportNo: "BB20260612008",
      pilot: "周先生",
      modelLicense: "植保 T60 / CAAC-A00821",
      sorties: 5,
      duration: "4小时10分",
      reportTime: "2026-06-12 16:20",
      status: "已确认"
    },
    {
      reportNo: "BB20260610003",
      pilot: "林先生",
      modelLicense: "行业测绘 M3E / CAAC-A01236",
      sorties: 2,
      duration: "1小时45分",
      reportTime: "2026-06-10 11:05",
      status: "已确认"
    }
  ],
  reportFilter: "全部报备",
  orderFilter: "全部",
  orderSearch: "",
  invoiceTab: "apply",
  selectedInvoiceOrders: ["FF20260615001"],
  invoicePreview: null,
  pilotJoinType: "personal",
  pilotCompanyMode: "existing",
  pilotAgreement: false,
  operatorAgreement: false
};
