# drone-admin-prototype

奉飞飞无人机平台后台管理静态 HTML 交互原型。

## 查看方式

直接打开 `index.html`，或在目录中启动任意静态文件服务：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 文件

- `index.html`：页面入口
- `styles.css`：后台界面样式
- `app.js`：应用启动入口
- `js/core/`：状态、公共 UI、路由、事件和富文本能力
- `js/modules/`：按业务模块拆分的页面、mock 数据和交互
- `FEATURES.md`：低 Token 接力索引
- `docs/features/`：各模块功能与依赖说明
- `docs/project-page-function-list-v1.md`：后台与小程序页面功能总清单
- `docs/new-session-prompt.md`：新会话开场模板

项目不连接真实接口或数据库，所有数据均为原型演示数据。
