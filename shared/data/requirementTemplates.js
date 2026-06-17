export const requirementTemplates = [
  {
    id: "tpl-inspection",
    name: "巡检服务模板",
    serviceType: "无人机巡检服务",
    fields: [
      { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
      { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 },
      { key: "serviceType", label: "服务类型", type: "select", required: true, options: ["楼宇巡检", "园区巡检", "航线巡检", "设备巡检"], sort: 3 },
      { key: "area", label: "巡检区域", type: "address", required: true, placeholder: "请输入巡检区域或详细地址", sort: 4 },
      { key: "serviceTime", label: "巡检时间", type: "timeSlot", required: true, placeholder: "请选择巡检时间", sort: 5 },
      { key: "remark", label: "需求说明", type: "textarea", required: false, placeholder: "请补充重点巡检对象、交付要求等", sort: 6 },
      { key: "referencePhoto", label: "例图/附件", type: "image", required: false, placeholder: "上传巡检范围或点位示意图", sort: 7 }
    ]
  },
  {
    id: "tpl-logistics",
    name: "物流服务模板",
    serviceType: "无人机物流服务",
    fields: [
      { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
      { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 },
      { key: "customerType", label: "客户类型", type: "select", required: true, options: ["个人", "企业", "医院/园区", "政府机构"], sort: 3 },
      { key: "cargoType", label: "货物类型", type: "text", required: true, placeholder: "如医疗物资、文件样本、备件", sort: 4 },
      { key: "cargoWeight", label: "货物重量", type: "number", required: true, unit: "kg", placeholder: "请输入重量", sort: 5 },
      { key: "cargoVolume", label: "货物体积", type: "text", required: false, unit: "m3", placeholder: "请输入长宽高或体积", sort: 6 },
      { key: "startAddress", label: "起运点", type: "address", required: true, placeholder: "请输入起运点详细地址", sort: 7 },
      { key: "endAddress", label: "目的地", type: "address", required: true, placeholder: "请输入目的地详细地址", sort: 8 },
      { key: "transportSpeed", label: "运输时效", type: "select", required: true, options: ["普通", "加急", "定时达"], sort: 9 },
      { key: "expectedTime", label: "期望运输时间", type: "timeSlot", required: true, placeholder: "请选择期望运输时间", sort: 10 },
      { key: "cargoPhoto", label: "货物照片", type: "image", required: false, placeholder: "上传货物照片", sort: 11 },
      { key: "remark", label: "备注说明", type: "textarea", required: false, placeholder: "请补充交接要求、包装情况等", sort: 12 }
    ]
  },
  {
    id: "tpl-hoisting",
    name: "吊运服务模板",
    serviceType: "无人机吊运服务",
    fields: [
      { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
      { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 },
      { key: "itemName", label: "吊运物品", type: "text", required: true, placeholder: "请输入吊运物品名称", sort: 3 },
      { key: "weight", label: "物品重量", type: "number", required: true, unit: "kg", placeholder: "请输入重量", sort: 4 },
      { key: "workAddress", label: "作业地点", type: "address", required: true, placeholder: "请输入作业地点", sort: 5 },
      { key: "height", label: "吊运高度", type: "number", required: true, unit: "m", placeholder: "请输入吊运高度", sort: 6 },
      { key: "remark", label: "需求说明", type: "textarea", required: false, placeholder: "请补充现场环境、交接人、风险点", sort: 7 },
      { key: "sitePhoto", label: "现场照片", type: "image", required: false, placeholder: "上传现场或物品照片", sort: 8 }
    ]
  },
  {
    id: "tpl-performance",
    name: "表演服务模板",
    serviceType: "无人机表演服务",
    fields: [
      { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
      { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 },
      { key: "purpose", label: "表演目的", type: "text", required: true, placeholder: "如开业、庆典、文旅活动", sort: 3 },
      { key: "date", label: "表演日期", type: "date", required: true, sort: 4 },
      { key: "timeSlot", label: "表演时段", type: "timeSlot", required: true, placeholder: "如 19:30-20:00", sort: 5 },
      { key: "backupDate", label: "备用雨天/延期日期", type: "date", required: false, sort: 6 },
      { key: "scale", label: "表演规模", type: "select", required: true, options: ["100 架以内", "100-300 架", "300 架以上", "待方案确认"], sort: 7 }
    ]
  },
  {
    id: "tpl-hosting",
    name: "托管服务模板",
    serviceType: "无人机托管服务",
    fields: [
      { key: "contactName", label: "登记联系人", type: "text", required: true, placeholder: "请输入联系人", sort: 1 },
      { key: "contactPhone", label: "联系电话", type: "text", required: true, placeholder: "请输入联系电话", sort: 2 },
      { key: "droneModel", label: "无人机型号", type: "text", required: true, placeholder: "请输入无人机品牌和型号", sort: 3 },
      { key: "count", label: "托管数量", type: "number", required: true, unit: "台", placeholder: "请输入数量", sort: 4 },
      { key: "duration", label: "托管时长", type: "select", required: true, options: ["1 个月", "3 个月", "6 个月", "12 个月"], sort: 5 },
      { key: "remark", label: "需求说明", type: "textarea", required: false, placeholder: "请补充设备状态、交付方式等", sort: 6 },
      { key: "devicePhoto", label: "设备照片", type: "image", required: false, placeholder: "上传设备照片", sort: 7 }
    ]
  }
];

export function getRequirementTemplate(templateId = "tpl-hoisting") {
  return requirementTemplates.find(item => item.id === templateId) || requirementTemplates[0];
}

export function cloneRequirementTemplate(templateId = "tpl-hoisting") {
  const template = getRequirementTemplate(templateId);
  return {
    ...template,
    fields: template.fields.map(field => ({ ...field, options: field.options ? [...field.options] : undefined }))
  };
}
