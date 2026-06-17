from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import shutil


ROOT = Path(__file__).resolve().parents[1]
TARGET_DIRS = [
    ROOT / "shared/assets/home-nav",
    ROOT / "shared/assets/icons/home-nav",
    ROOT / "apps/admin/assets/icons/home-nav",
    ROOT / "apps/miniapp/assets/home-nav",
]

FONT_BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"
FONT_REGULAR = "/System/Library/Fonts/STHeiti Light.ttc"


def font(size, bold=False):
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def text_center(draw, xy, text, fill, size, bold=False):
    f = font(size, bold)
    box = draw.textbbox((0, 0), text, font=f)
    draw.text((xy[0] - (box[2] - box[0]) / 2, xy[1]), text, fill=fill, font=f)


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_background(draw, w, h):
    draw.rectangle((0, 0, w, h), fill=(248, 252, 255))
    for i in range(0, w, 18):
        alpha = int(16 + 10 * math.sin(i / 30))
        draw.line((i, h - 98, i + 58, h - 160), fill=(216, 237, 247, alpha), width=1)
    draw.line((48, h - 58, w - 48, h - 58), fill=(153, 210, 229), width=3)
    base_y = h - 58
    buildings = [
        (58, 96, 38), (102, 128, 50), (165, 82, 46), (365, 102, 38), (418, 126, 48), (476, 86, 34)
    ]
    for x, bh, bw in buildings:
        draw.rectangle((x, base_y - bh, x + bw, base_y), fill=(221, 239, 248))
        for k in range(4):
            y = base_y - bh + 14 + k * 18
            draw.line((x + 8, y, x + bw - 8, y), fill=(244, 250, 253), width=3)


def draw_drone(draw, cx, cy, scale=1.0, accent=(36, 178, 188), payload=None):
    s = scale
    body = (cx - 46 * s, cy - 16 * s, cx + 46 * s, cy + 18 * s)
    rounded_rect(draw, body, int(13 * s), fill=(232, 247, 251), outline=(52, 108, 132), width=max(1, int(2 * s)))
    rounded_rect(draw, (cx - 24 * s, cy - 26 * s, cx + 24 * s, cy - 6 * s), int(10 * s), fill=(250, 253, 255), outline=(188, 223, 233), width=max(1, int(s)))
    for side in (-1, 1):
        arm_x = cx + side * 82 * s
        draw.line((cx + side * 38 * s, cy, arm_x, cy - 18 * s), fill=(48, 88, 108), width=max(2, int(4 * s)))
        rounded_rect(draw, (arm_x - 10 * s, cy - 8 * s, arm_x + 10 * s, cy + 14 * s), int(4 * s), fill=(38, 79, 99))
        draw.ellipse((arm_x - 44 * s, cy - 28 * s, arm_x + 44 * s, cy - 18 * s), fill=(176, 204, 217))
        draw.ellipse((arm_x - 32 * s, cy - 26 * s, arm_x + 32 * s, cy - 20 * s), fill=(210, 230, 237))
        rounded_rect(draw, (arm_x - 8 * s, cy + 10 * s, arm_x + 8 * s, cy + 38 * s), int(3 * s), fill=accent)
    draw.line((cx - 24 * s, cy + 18 * s, cx - 30 * s, cy + 42 * s), fill=(40, 77, 96), width=max(2, int(3 * s)))
    draw.line((cx + 24 * s, cy + 18 * s, cx + 30 * s, cy + 42 * s), fill=(40, 77, 96), width=max(2, int(3 * s)))
    draw.arc((cx - 35 * s, cy + 34 * s, cx - 4 * s, cy + 56 * s), 180, 360, fill=(40, 77, 96), width=max(2, int(3 * s)))
    draw.arc((cx + 4 * s, cy + 34 * s, cx + 35 * s, cy + 56 * s), 180, 360, fill=(40, 77, 96), width=max(2, int(3 * s)))
    if payload:
        draw.line((cx, cy + 18 * s, cx, cy + 68 * s), fill=(80, 125, 145), width=max(1, int(2 * s)))
        if payload == "box":
            draw.polygon([(cx - 46 * s, cy + 104 * s), (cx, cy + 78 * s), (cx + 48 * s, cy + 104 * s), (cx + 4 * s, cy + 132 * s)], fill=(50, 177, 182))
            draw.polygon([(cx - 46 * s, cy + 104 * s), (cx + 4 * s, cy + 132 * s), (cx + 4 * s, cy + 168 * s), (cx - 48 * s, cy + 136 * s)], fill=(42, 151, 160))
            draw.polygon([(cx + 48 * s, cy + 104 * s), (cx + 4 * s, cy + 132 * s), (cx + 4 * s, cy + 168 * s), (cx + 50 * s, cy + 138 * s)], fill=(83, 201, 203))


def draw_large(path, title, subtitle, accent, payload=None, motif="drone"):
    w, h = 545, 432
    img = Image.new("RGB", (w, h), (248, 252, 255))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw_background(draw, w, h)
    text_center(draw, (w / 2, 34), title, (20, 36, 55), 34, True)
    text_center(draw, (w / 2, 88), subtitle, (96, 113, 136), 24, True)
    if motif == "training":
        rounded_rect(draw, (178, 154, 368, 276), 18, fill=(230, 248, 251), outline=(71, 165, 183), width=3)
        draw.rectangle((202, 178, 344, 224), fill=(255, 255, 255), outline=(167, 214, 226), width=2)
        draw.line((222, 202, 264, 190), fill=accent, width=5)
        draw.line((264, 190, 320, 210), fill=(43, 87, 107), width=4)
        draw.ellipse((238, 242, 268, 272), fill=accent)
        draw.ellipse((288, 242, 318, 272), fill=(79, 129, 214))
        draw_drone(draw, w / 2, 150, 0.45, accent)
    else:
        draw_drone(draw, w / 2, 176, 0.95, accent, payload=payload)
        if motif == "inspection":
            draw.ellipse((w / 2 - 74, 266, w / 2 + 74, 340), outline=accent, width=4)
            draw.line((w / 2 + 50, 326, w / 2 + 94, 370), fill=accent, width=6)
        if motif == "performance":
            for angle in range(0, 360, 45):
                x = w / 2 + math.cos(math.radians(angle)) * 94
                y = 282 + math.sin(math.radians(angle)) * 44
                draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill=accent)
            draw.arc((170, 238, 375, 342), 10, 170, fill=(59, 122, 211), width=4)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    img.save(path)


def draw_small(path, title, subtitle, accent, motif="more"):
    w, h = 190, 210
    img = Image.new("RGB", (w, h), (248, 252, 255))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle((10, 10, w - 10, h - 10), radius=22, fill=(248, 252, 255), outline=(215, 232, 239), width=2)
    draw.ellipse((w - 76, 20, w + 42, 138), fill=(*accent, 38))
    text_center(draw, (w / 2, 24), title, (20, 36, 55), 24, True)
    text_center(draw, (w / 2, 58), subtitle, (96, 113, 136), 15, True)
    if motif == "takeout":
        draw_drone(draw, w / 2, 100, 0.42, accent, payload="box")
    elif motif == "rental":
        draw_drone(draw, w / 2, 116, 0.52, accent)
        rounded_rect(draw, (48, 144, 142, 174), 8, fill=(235, 248, 250), outline=accent, width=2)
    elif motif == "study":
        rounded_rect(draw, (54, 102, 136, 160), 12, fill=(232, 248, 251), outline=accent, width=2)
        draw.line((72, 122, 118, 122), fill=(39, 83, 103), width=4)
        draw.line((72, 142, 108, 142), fill=(39, 83, 103), width=4)
        draw.ellipse((72, 164, 92, 184), fill=accent)
        draw.ellipse((104, 164, 124, 184), fill=(79, 129, 214))
    else:
        for i, x in enumerate((62, 95, 128)):
            draw.ellipse((x - 10, 118 - 5 * (i % 2), x + 10, 138 - 5 * (i % 2)), fill=accent if i != 1 else (79, 129, 214))
        draw.arc((48, 92, 142, 168), 205, 335, fill=(56, 114, 140), width=4)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    img.save(path)


def main():
    source = ROOT / "shared/assets/home-nav"
    source.mkdir(parents=True, exist_ok=True)
    large = [
        ("entry-hoisting-large.png", "吊运", "重物空中转运", (35, 178, 188), "box", "drone"),
        ("entry-agriculture-large.png", "表演", "低空编队秀", (79, 129, 214), None, "performance"),
        ("entry-cleaning-large.png", "培训", "飞手成长课堂", (45, 166, 137), None, "training"),
        ("entry-transport-large.png", "无人机巡检", "高效巡查取证", (58, 150, 214), None, "inspection"),
    ]
    small = [
        ("entry-sales-small.png", "外卖", "即时配送", (35, 178, 188), "takeout"),
        ("entry-rental-small.png", "无人机租赁", "灵活租期", (79, 129, 214), "rental"),
        ("entry-maintenance-small.png", "少儿研学", "兴趣启蒙", (45, 166, 137), "study"),
        ("entry-all-small.png", "更多", "全部服务", (58, 150, 214), "more"),
    ]
    for file_name, title, subtitle, accent, payload, motif in large:
        draw_large(source / file_name, title, subtitle, accent, payload, motif)
    for file_name, title, subtitle, accent, motif in small:
        draw_small(source / file_name, title, subtitle, accent, motif)
    for target in TARGET_DIRS:
        target.mkdir(parents=True, exist_ok=True)
        if target == source:
            continue
        for file in source.glob("entry-*.png"):
            shutil.copy2(file, target / file.name)


if __name__ == "__main__":
    main()
