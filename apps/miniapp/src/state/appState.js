import { hoistingProducts } from "../data/catalog.js?v=home-core-gapless-1";

const productById = Object.fromEntries(hoistingProducts.map(product => [product.id, product]));

function snapshotValue(field, values) {
  if (Object.prototype.hasOwnProperty.call(values, field.key)) return values[field.key];
  if (field.type === "select") return field.options?.[0] || "";
  return "";
}

function productRequirementSnapshot(product, values) {
  return {
    templateId: product.id,
    templateName: `${product.name}需求字段`,
    serviceType: product.category,
    fields: [...(product.requirementFields || [])]
      .sort((a, b) => a.sort - b.sort)
      .map(field => {
        const value = snapshotValue(field, values);
        return {
          key: field.key,
          label: field.label,
          type: ["text", "select", "image"].includes(field.type) ? field.type : "text",
          value,
          displayValue: value,
          required: Boolean(field.required)
        };
      })
  };
}

function miniOrder(config) {
  const product = productById[config.productId] || hoistingProducts[0];
  const spec = product.specs?.[config.specIndex || 0] || { name: "信息提交", price: 0 };
  const quantity = config.quantity || 1;
  const values = {
    contactName: config.contactName,
    contactPhone: config.contactPhone,
    name: config.contactName,
    phone: config.contactPhone,
    parentName: config.contactName,
    parentPhone: config.contactPhone,
    ...config.values
  };
  const snapshot = productRequirementSnapshot(product, values);
  return {
    productId: product.id,
    orderNo: config.orderNo,
    status: config.status,
    tab: config.tab || config.status,
    time: config.time,
    title: product.name,
    spec: spec.name,
    price: config.amount ?? spec.price,
    count: quantity,
    paid: config.paid ?? config.amount ?? spec.price,
    serviceType: product.category,
    contactName: config.contactName,
    contactPhone: config.contactPhone,
    address: config.address || "",
    remark: config.remark || "",
    requirementSnapshot: snapshot,
    timeline: config.timeline || [
      { time: config.time, title: "订单提交", desc: `已提交${product.name}需求` },
      { time: config.time, title: config.status, desc: "平台正在确认需求信息并安排后续服务" }
    ]
  };
}

export const state = {
  page: location.hash.replace("#/", "") || "home",
  history: [],
  selectedProduct: hoistingProducts[0],
  selectedCaseId: "case-hospital-hoisting",
  productListMode: "hoisting",
  productReviewFilter: "全部",
  selectedSpecIndex: 0,
  orderQuantity: 1,
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
  pilotApplication: {
    id: "FS20260612008",
    status: "已通过",
    applicant: "云北用户",
    subject: "个人主体",
    phone: "13888888821",
    area: "浙江省 宁波市",
    companyName: "",
    droneModel: "DJI Mavic 3E",
    appliedAt: "2026-06-12 10:20",
    reviewedAt: "2026-06-12 16:40",
    rejectReason: "",
    progress: [
      { time: "2026-06-12 10:20", title: "提交申请", desc: "已提交个人资料、操作执照和设备信息" },
      { time: "2026-06-12 14:10", title: "平台审核", desc: "运营人员核验资质与设备资料" },
      { time: "2026-06-12 16:40", title: "审核通过", desc: "飞手权限已开通，可进入任务大厅和报备功能" }
    ],
    history: [
      { time: "2026-06-10 18:30", status: "已驳回", reason: "操作执照照片不清晰，请重新上传完整文件。" }
    ]
  },
  selectedOrderNo: "ORD20260617001",
  orders: [
    miniOrder({
      orderNo: "ORD20260617001",
      status: "待接单",
      time: "2026-06-17 17:16",
      productId: "inspection",
      contactName: "云北用户",
      contactPhone: "13888888821",
      address: "上海市 浦东新区 张江低空产业园 6 号楼",
      remark: "需巡检园区屋面、连廊与设备平台",
      values: {
        serviceType: "园区巡检",
        inspectionArea: "上海市 浦东新区 张江低空产业园 6 号楼",
        inspectionTime: "2026-06-20 09:00-11:00",
        remark: "需巡检园区屋面、连廊与设备平台",
        exampleImage: "园区巡检范围.jpg"
      },
      timeline: [
        { time: "2026-06-17 17:16", title: "订单提交", desc: "已提交无人机巡检服务需求" },
        { time: "2026-06-17 17:20", title: "待接单", desc: "后台正在确认需求信息并安排服务" }
      ]
    }),
    miniOrder({
      orderNo: "ORD20260617002",
      status: "待服务",
      time: "2026-06-16 14:40",
      productId: "logistics",
      contactName: "华景医院",
      contactPhone: "13888886661",
      address: "上海市 黄浦区 复兴中路 521 号",
      remark: "医疗样本冷链运输，需 2 小时内送达",
      values: {
        customerType: "医院/园区",
        cargoType: "医疗样本",
        cargoWeight: "8kg",
        cargoVolume: "40cm x 30cm x 30cm",
        startPoint: "华景医院检验科",
        startAddress: "上海市 黄浦区 复兴中路 521 号",
        destination: "张江医学中心",
        destinationAddress: "上海市 浦东新区 张江科学城",
        transportLimit: "加急",
        expectedTime: "2026-06-18 15:00",
        cargoPhoto: "冷链箱照片.jpg",
        remark: "医疗样本冷链运输，需 2 小时内送达",
        exampleImage: "起降点示意.jpg"
      },
      timeline: [
        { time: "2026-06-16 14:40", title: "订单提交", desc: "已提交无人机物流服务需求" },
        { time: "2026-06-16 15:10", title: "待服务", desc: "平台已确认运输信息，等待服务执行" }
      ]
    }),
    miniOrder({
      orderNo: "ORD20260617003",
      status: "待服务",
      time: "2026-06-15 09:30",
      productId: "hoisting",
      specIndex: 1,
      amount: 2320,
      paid: 2320,
      quantity: 2,
      contactName: "成都建工",
      contactPhone: "13888887772",
      address: "成都市天府新区某工地",
      remark: "空调外机需吊运至 18 层平台",
      values: {
        itemName: "空调外机",
        weight: "35kg",
        workAddress: "成都市天府新区某工地",
        height: "54m",
        remark: "空调外机需吊运至 18 层平台",
        exampleImage: "工地入口.jpg"
      },
      timeline: [
        { time: "2026-06-15 09:30", title: "订单提交", desc: "已提交无人机吊运服务需求" },
        { time: "2026-06-15 18:40", title: "待服务", desc: "已分配飞手，等待按服务时间上门" }
      ]
    }),
    miniOrder({
      orderNo: "ORD20260617004",
      status: "待接单",
      time: "2026-06-13 14:15",
      productId: "performance",
      contactName: "文旅集团",
      contactPhone: "13888889993",
      address: "成都市锦江区音乐广场",
      remark: "开幕式表演，需预留雨天延期方案",
      values: {
        purpose: "开幕式",
        date: "2026-07-01",
        timeSlot: "19:30-20:00",
        backupDate: "2026-07-02",
        scale: "300 架以上",
        exampleImage: "表演图案参考.jpg"
      },
      timeline: [
        { time: "2026-06-13 14:15", title: "订单提交", desc: "已提交无人机表演服务需求" },
        { time: "2026-06-13 14:22", title: "待接单", desc: "平台正在确认表演规模和空域条件" }
      ]
    }),
    miniOrder({
      orderNo: "ORD20260617005",
      status: "已完成",
      time: "2026-06-12 10:20",
      productId: "hosting",
      contactName: "赵女士",
      contactPhone: "13888880005",
      address: "成都市双流区低空服务中心",
      remark: "两台 M30T 托管 3 个月",
      values: {
        droneModel: "M30T",
        count: "2 台",
        duration: "3 个月",
        remark: "两台 M30T 托管 3 个月",
        exampleImage: "设备照片.jpg"
      }
    }),
    miniOrder({
      orderNo: "ORD20260617006",
      status: "待接单",
      time: "2026-06-11 16:00",
      productId: "rental",
      contactName: "周老师",
      contactPhone: "13888880006",
      address: "苏州市 吴江区 东太湖路 88 号",
      remark: "研学活动租赁 1 周",
      values: {
        droneModel: "行业巡检机",
        rentalPeriod: "1 周",
        useScene: "研学活动飞行展示",
        startDate: "2026-06-21",
        remark: "需附带双电池与充电器",
        exampleImage: "活动场地.jpg"
      }
    }),
    miniOrder({
      orderNo: "ORD20260617007",
      status: "待评价",
      time: "2026-06-10 10:30",
      productId: "competition",
      contactName: "成都航协",
      contactPhone: "13888880007",
      remark: "团队报名 6 人，需确认参赛资料",
      values: {
        registerType: "单位",
        organization: "成都航协",
        name: "唐先生",
        gender: "男",
        idNo: "5101**********26",
        group: "团体组",
        phone: "13888880007",
        email: "event@example.com",
        remark: "团队报名 6 人，需确认参赛资料"
      },
      timeline: [
        { time: "2026-06-10 10:30", title: "订单提交", desc: "已提交无人机赛事报名需求" },
        { time: "2026-06-11 15:20", title: "服务完成", desc: "赛事服务已完成，等待用户评价" }
      ]
    }),
    miniOrder({
      orderNo: "ORD20260617008",
      status: "已完成",
      time: "2026-06-09 09:20",
      productId: "pilot-training",
      contactName: "李同学",
      contactPhone: "13888880008",
      remark: "周末班，期望 7 月开课",
      values: {
        name: "李同学",
        phone: "13888880008",
        gender: "男",
        birthday: "2001-08-18",
        idNo: "5101**********18",
        examModel: "多旋翼",
        licenseLevel: "视距内",
        hasBase: "无基础",
        remark: "周末班，期望 7 月开课",
        exampleImage: "证件照.jpg"
      }
    }),
    miniOrder({
      orderNo: "ORD20260617009",
      status: "已完成",
      time: "2026-06-08 15:10",
      productId: "child-training",
      contactName: "王女士",
      contactPhone: "13888880009",
      remark: "周六上午试听",
      values: {
        name: "王小雨",
        gender: "女",
        age: "10",
        grade: "四年级",
        parentName: "王女士",
        parentPhone: "13888880009",
        hasDroneBase: "无",
        interest: "飞行体验",
        classTime: "周六上午",
        intent: "试听"
      }
    })
  ],
  serviceNotifications: [
    {
      id: "service-notice-1",
      orderNo: "ORD20260617003",
      fromStatus: "待接单",
      toStatus: "待服务",
      time: "2026-06-15 18:40",
      isRead: false
    },
    {
      id: "service-notice-2",
      orderNo: "ORD20260617002",
      fromStatus: "待接单",
      toStatus: "待服务",
      time: "2026-06-16 15:10",
      isRead: true
    },
    {
      id: "service-notice-3",
      orderNo: "ORD20260617006",
      fromStatus: "订单提交",
      toStatus: "待接单",
      time: "2026-06-11 16:00",
      isRead: true
    }
  ],
  taskHallTab: "任务征集",
  selectedTaskId: "REQ20260614001",
  selectedAssignedOrderNo: "YB26061703",
  pilotTasks: [
    {
      id: "REQ20260614001",
      requirementNo: "REQ20260614001",
      sourceType: "backendTask",
      title: "无人机吊运服务协作",
      serviceTime: "2026-06-18 09:00-12:00",
      address: "成都市天府新区某工地",
      remark: "需具备高空吊运作业经验，现场有安全员对接。",
      status: "征集中",
      joined: false,
      intentionCount: 6
    },
    {
      id: "REQ20260615002",
      requirementNo: "REQ20260615002",
      sourceType: "backendTask",
      title: "园区屋面巡检任务",
      serviceTime: "2026-06-19 14:00-17:30",
      address: "宁波市鄞州区低空经济产业园",
      remark: "重点查看屋面设备、排水沟和西侧幕墙。",
      status: "征集中",
      joined: false,
      intentionCount: 3
    },
    {
      id: "REQ20260612003",
      requirementNo: "REQ20260612003",
      sourceType: "backendTask",
      title: "无人机表演试飞",
      serviceTime: "2026-06-16 16:00-18:00",
      address: "杭州市滨江区江南大道 1888 号",
      remark: "天气原因已暂缓，等待后台重新开放。",
      status: "已关闭",
      joined: false,
      intentionCount: 9
    }
  ],
  assignedPilotOrders: [
    {
      orderNo: "YB26061703",
      sourceType: "backendTask",
      user: "成都建工",
      category: "无人机服务",
      productName: "无人机吊运服务",
      amount: 2320,
      onlinePay: "是（下单快照）",
      needPilot: "是（下单快照）",
      bookingDate: "2026-06-18",
      bookingTime: "14:00-16:00",
      contactPhone: "028-55****90",
      bookingAddress: "成都市天府新区某工地",
      infoRemark: "空调外机需吊运至 18 层平台，现场有安全员对接。",
      remarkPhoto: "工地入口.jpg",
      requirementSnapshot: {
        templateName: "无人机吊运服务需求字段",
        fields: [
          { label: "登记联系人", type: "text", value: "成都建工" },
          { label: "联系电话", type: "text", value: "028-55****90" },
          { label: "服务规格", type: "select", value: "标准吊运（20-50kg）" },
          { label: "下单数量", type: "text", value: "2" },
          { label: "吊运物品", type: "text", value: "空调外机" },
          { label: "物品重量（kg）", type: "text", value: "35" },
          { label: "作业地点", type: "text", value: "成都市天府新区某工地" },
          { label: "吊运高度（m）", type: "text", value: "54" },
          { label: "需求说明", type: "text", value: "空调外机需吊运至 18 层平台，现场有安全员对接。" },
          { label: "例图", type: "image", value: "工地入口.jpg" }
        ]
      },
      status: "待完成",
      assignedTime: "2026-06-13 18:20",
      progress: [
        { time: "2026-06-13 18:20", title: "后台派单", desc: "平台已将订单分配给当前飞手" },
        { time: "2026-06-18 13:30", title: "等待服务", desc: "请按服务时间到达服务地址" }
      ]
    },
    {
      orderNo: "YB26061327",
      sourceType: "userOrder",
      user: "陈女士",
      category: "巡检服务",
      productName: "无人机巡检服务",
      amount: 0,
      onlinePay: "否（下单快照）",
      needPilot: "是（下单快照）",
      bookingDate: "2026-06-18",
      bookingTime: "14:00-16:00",
      contactPhone: "138****2091",
      bookingAddress: "宁波市鄞州区低空经济产业园 2 号楼",
      infoRemark: "需要拍摄屋顶机组、排水沟和东侧连廊。",
      remarkPhoto: "屋面点位示意.jpg",
      requirementSnapshot: {
        templateName: "无人机巡检服务需求字段",
        fields: [
          { label: "登记联系人", type: "text", value: "陈女士" },
          { label: "联系电话", type: "text", value: "138****2091" },
          { label: "服务类型", type: "select", value: "园区巡检" },
          { label: "巡检区域", type: "text", value: "宁波市鄞州区低空经济产业园 2 号楼" },
          { label: "巡检时间", type: "text", value: "2026-06-18 14:00-16:00" },
          { label: "需求说明", type: "text", value: "需要拍摄屋顶机组、排水沟和东侧连廊。" },
          { label: "例图", type: "image", value: "屋面点位示意.jpg" }
        ]
      },
      status: "待完成",
      assignedTime: "2026-06-15 10:45",
      progress: [
        { time: "2026-06-15 10:45", title: "后台派单", desc: "平台已将订单分配给当前飞手" },
        { time: "2026-06-15 11:10", title: "服务准备", desc: "请提前核对设备电池和飞行资质" }
      ]
    },
    {
      orderNo: "YB26061218",
      sourceType: "userOrder",
      user: "周先生",
      category: "无人机服务",
      productName: "无人机物流服务",
      amount: 0,
      onlinePay: "否（下单快照）",
      needPilot: "是（下单快照）",
      bookingDate: "2026-06-12",
      bookingTime: "07:30-10:30",
      contactPhone: "137****6180",
      bookingAddress: "苏州市吴江区东太湖路 88 号",
      infoRemark: "医疗样本冷链运输，需 2 小时内送达。",
      remarkPhoto: "冷链箱照片.jpg",
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
      entrustedSubject: "宁波市自然资源和规划局奉化分局",
      pilot: "苏炜",
      pilotPhone: "18356570510",
      droneModel: "DJI Mavic 3E",
      serialNo: "1581F5FHD23CF00D5",
      flightPlan: "2026 年 6 月 12 日 12:00-14:00",
      flightArea: "萧王庙街道云溪村",
      flightAltitude: "120 米",
      taskNature: "测绘",
      reportStatement: "特此报备",
      modelLicense: "DJI Mavic 3E / 1581F5FHD23CF00D5",
      sorties: 3,
      duration: "2小时30分",
      reportTime: "2026-06-15 09:30",
      status: "待确认"
    },
    {
      reportNo: "BB20260612008",
      entrustedSubject: "东太湖农服中心",
      pilot: "周先生",
      pilotPhone: "13888889993",
      droneModel: "植保 T60",
      serialNo: "T60-20260612008",
      flightPlan: "2026-06-12 08:00-12:10",
      flightArea: "苏州市吴江区东太湖农服中心",
      flightAltitude: "60 米",
      taskNature: "植保飞防",
      reportStatement: "特此报备",
      modelLicense: "植保 T60 / T60-20260612008",
      sorties: 5,
      duration: "4小时10分",
      reportTime: "2026-06-12 16:20",
      status: "已确认"
    },
    {
      reportNo: "BB20260610003",
      entrustedSubject: "张江低空产业园",
      pilot: "林先生",
      pilotPhone: "13888888821",
      droneModel: "行业测绘 M3E",
      serialNo: "M3E-20260610003",
      flightPlan: "2026-06-10 09:00-11:00",
      flightArea: "上海市浦东新区张江低空产业园 6 号楼",
      flightAltitude: "100 米",
      taskNature: "园区巡检",
      reportStatement: "特此报备",
      modelLicense: "行业测绘 M3E / M3E-20260610003",
      sorties: 2,
      duration: "1小时45分",
      reportTime: "2026-06-10 11:05",
      status: "已确认"
    }
  ],
  reportFilter: "全部报备",
  selectedFlightReportNo: "BB20260615001",
  orderFilter: "全部",
  orderSearch: "",
  orderReviewDraft: {
    rating: 5,
    content: ""
  },
  invoiceTab: "apply",
  selectedInvoiceOrders: ["FF20260615001"],
  invoicePreview: null,
  pilotJoinType: "personal",
  pilotCompanyMode: "existing",
  pilotAgreement: false,
  operatorAgreement: false
};
