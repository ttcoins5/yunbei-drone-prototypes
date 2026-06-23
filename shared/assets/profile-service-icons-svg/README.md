# 个人中心服务图标 SVG 交付说明

## 文件说明

本目录用于交付小程序「我的 - 更多服务」入口图标。

当前 SVG 由原型 PNG 图标转换而来，尺寸统一为 `84 x 84`，文件内部以 SVG `<image>` 方式嵌入原 PNG 资产。

## 图标映射

| iconName | 中文名称 | 文件 |
| --- | --- | --- |
| address | 地址簿 | address.svg |
| invoice | 开票中心 | invoice.svg |
| operator | 城市运营申请 | operator.svg |
| feedback | 意见反馈 | feedback.svg |
| pilot | 飞手加入 | pilot.svg |
| tasks | 任务大厅 | tasks.svg |
| contact | 联系客服 | contact.svg |
| about | 关于我们 | about.svg |

## uni-app / Vue3 使用建议

```vue
<image
  class="service-icon"
  :src="`/static/profile-service-icons/${item.iconName}.svg`"
  mode="aspectFit"
/>
```

```ts
type ServiceIconName =
  | 'address'
  | 'invoice'
  | 'operator'
  | 'feedback'
  | 'pilot'
  | 'tasks'
  | 'contact'
  | 'about'
```

## 注意事项

- 这批文件适合前端直接引用和交付，不再依赖雪碧图定位。
- 当前 SVG 保留原 PNG 视觉效果，但不是可编辑描边路径 SVG。
- 如果后续需要通过 CSS 改颜色、改线宽、做主题色切换，建议由设计源文件导出 path 型 SVG，或重新绘制为 iconfont / SVG symbol。
