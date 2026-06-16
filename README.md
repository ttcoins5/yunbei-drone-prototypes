# 奉飞飞无人机平台原型

这个仓库统一维护奉飞飞小程序原型和后台管理原型，并通过 GitHub Pages 发布两个可访问入口。

## 访问地址

- 总入口：https://ttcoins5.github.io/yunbei-drone-prototypes/
- 小程序原型：https://ttcoins5.github.io/yunbei-drone-prototypes/apps/miniapp/
- 后台管理原型：https://ttcoins5.github.io/yunbei-drone-prototypes/admin/

## 目录结构

```text
apps/
  miniapp/       小程序原型
  admin/         后台管理原型
shared/
  assets/        两端共用图片和图标
  data/          两端共用演示数据
docs/            需求、页面地图、功能矩阵和会议材料
```

## 修改约定

- 小程序端页面和交互改 `apps/miniapp`。
- 后台端页面和交互改 `apps/admin`。
- 两端共用的分类、商品、首页导航、订单状态等演示数据优先改 `shared/data`。
- 两端共用图片优先放 `shared/assets`，不要在两个 app 里重复维护。
- 不提交真实客户数据、生产账号、接口密钥或隐私信息。

## 部署

推送到 `main` 分支后，GitHub Actions 会自动生成 Pages 站点：

- `apps/miniapp` 发布为 `/apps/miniapp/`
- `apps/admin` 发布为 `/admin/`
- `shared` 发布为 `/shared/`

本地检查建议先生成与 GitHub Pages 一致的预览目录：

```bash
rm -rf /tmp/yunbei-drone-pages-site
mkdir -p /tmp/yunbei-drone-pages-site
cp index.html /tmp/yunbei-drone-pages-site/index.html
mkdir -p /tmp/yunbei-drone-pages-site/apps
cp -R apps/miniapp /tmp/yunbei-drone-pages-site/apps/miniapp
cp -R apps/admin /tmp/yunbei-drone-pages-site/admin
cp -R shared /tmp/yunbei-drone-pages-site/shared
cd /tmp/yunbei-drone-pages-site
python3 -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`、`/apps/miniapp/`、`/admin/`。
