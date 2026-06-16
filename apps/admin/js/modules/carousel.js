state.media = [
  {
    "id": "v1",
    "type": "视频",
    "name": "平台品牌宣传视频.mp4",
    "url": "",
    "poster": "../shared/assets/banners/home-hero.png",
    "enabled": true
  },
  {
    "id": "i1",
    "type": "图片",
    "name": "行业无人机解决方案.jpg",
    "url": "../shared/assets/icons/category-enterprise.png",
    "enabled": true
  },
  {
    "id": "i2",
    "type": "图片",
    "name": "专业飞手服务.jpg",
    "url": "../shared/assets/icons/category-onsite.png",
    "enabled": true
  },
  {
    "id": "i3",
    "type": "图片",
    "name": "无人机培训报名.jpg",
    "url": "../shared/assets/icons/category-agency.png",
    "enabled": false
  }
];
state.carouselObjectUrls = [];

function carouselConfigBody() {
  const rows = state.media.map((item, index) => `<div class="media-row">
    <div class="drag">${item.type === "视频" ? "锁定" : "☷"}</div>
    <div class="media-preview">${item.url && item.type === "图片" ? `<img src="${item.url}" alt="${item.name}">` : item.type}</div>
    <div class="media-meta"><strong>${item.name}</strong><span class="muted">${item.type === "视频" ? "固定轮播首位" : `图片序号 ${index}`}</span></div>
    <label class="switch"><input type="checkbox" data-action="toggle-media" data-id="${item.id}" ${item.enabled ? "checked" : ""}> ${item.enabled ? "已启用" : "已停用"}</label>
    ${item.type === "图片"
      ? rowActions({ moveAction: "move-media", deleteAction: "delete-media", id: item.id, index, total: state.media.length })
      : `<div class="row-actions">${button("删除","delete-media","small danger",`data-id="${item.id}"`)}</div>`}
  </div>`).join("");
  return `<div class="toolbar" style="margin-bottom:14px">
    ${button("上传视频","add-video","primary")}${button(`上传图片（${state.media.filter(x => x.type === "图片").length}/5）`,"add-image","primary")}
    <span class="muted">视频最多 1 个，图片最多 5 张</span>
  </div><div class="media-list">${rows}</div>`;
}

function carouselPage() {
  return panel("轮播图配置", carouselConfigBody());
}

async function handleAddVideo() {
  if (state.media.some(item => item.type === "视频")) {
    toast("视频最多上传 1 个");
    return;
  }
  const files = await pickLocalFile({ accept: "video/*" });
  const file = files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  state.carouselObjectUrls.push(url);
  state.media.unshift({
    id: `v${Date.now()}`,
    type: "视频",
    name: file.name,
    url,
    poster: "../shared/assets/banners/home-hero.png",
    enabled: true
  });
  render();
  toast(`已选择视频：${file.name}`);
}

async function handleAddCarouselImage() {
  const current = state.media.filter(item => item.type === "图片").length;
  if (current >= 5) {
    toast("图片最多上传 5 张");
    return;
  }
  const files = await pickLocalFile({ accept: "image/*", multiple: true });
  if (!files.length) return;
  const slots = 5 - current;
  files.slice(0, slots).forEach((file, index) => {
    const url = URL.createObjectURL(file);
    state.carouselObjectUrls.push(url);
    state.media.push({ id: `i${Date.now() + index}`, type: "图片", name: file.name, url, enabled: true });
  });
  render();
  if (files.length > slots) toast(`最多还可上传 ${slots} 张，已添加 ${slots} 张`);
  else toast(`已选择 ${Math.min(files.length, slots)} 张图片`);
}

DroneAdmin.registerModule({
  id: "carousel",
  routes: [
  "carousel"
],
  titles: {
  "carousel": "轮播图配置"
},
  docs: {
  "carousel": {
    "summary": "配置小程序首页轮播内容，支持 1 个视频 + 最多 5 张图片。",
    "operations": [
      "上传视频：最多 1 个，固定展示在轮播首位",
      "上传图片：最多 5 张，可通过上移 / 下移调整顺序",
      "启用 / 停用：控制该条内容是否在小程序端展示",
      "删除：移除对应轮播素材"
    ],
    "fields": [
      [
        "素材类型",
        "视频或图片，视频仅允许 1 条"
      ],
      [
        "素材名称",
        "后台识别用，展示文件名或上传后自动命名"
      ],
      [
        "启用状态",
        "关闭后小程序端不展示该条轮播"
      ],
      [
        "排序",
        "图片支持拖拽式上移 / 下移；视频位置固定"
      ]
    ]
  }
},
  pages: {
    "carousel": carouselPage
  },
  actions: {
    "add-video": function (target) {
      handleAddVideo();
    },
    "add-image": function (target) {
      handleAddCarouselImage();
    },
    "delete-media": function (target) {
      const item = state.media.find(x => x.id === target.dataset.id);
      if (item?.url?.startsWith("blob:")) URL.revokeObjectURL(item.url);
      state.media = state.media.filter(x => x.id !== target.dataset.id);
          render();
          toast("轮播内容已删除");
    },
    "move-media": function (target) {
      const index = state.media.findIndex(x => x.id === target.dataset.id);
          const next = index + Number(target.dataset.dir);
          if (next > 0 && next < state.media.length) {
            [state.media[index], state.media[next]] = [state.media[next], state.media[index]];
            render();
          }
    }
  },
  changeActions: {
    "toggle-media": function (target) {
      const item = state.media.find(entry => entry.id === target.dataset.id);
          if (item) {
            item.enabled = target.checked;
            render();
            toast(item.enabled ? "已启用该轮播内容" : "已停用该轮播内容");
          }
          return;
    }
  },
  afterRender: {},
  beforeNavigate: null,
  onClose: null
});
