import * as THREE from "three";
import { chapters } from "./content";
export function paintedTexture(
  paint: (ctx: CanvasRenderingContext2D) => void,
  width = 768,
  height = 1024,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(width / 1024, height / 1365);
  paint(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
function rule(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  color = "#8098b333",
) {
  c.fillStyle = color;
  c.fillRect(x, y, w, 1.5);
}
function text(
  c: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  size: number,
  color = "#163b64",
  font = "DM Sans",
  align: CanvasTextAlign = "left",
) {
  c.fillStyle = color;
  c.font = `${size}px "${font}"`;
  c.textAlign = align;
  c.fillText(value, x, y);
}
export function createBookResources(mobile: boolean) {
  const textures = new Map<string, THREE.Texture>();
  const materials = new Map<string, THREE.MeshStandardMaterial>();
  const width = mobile ? 512 : 768,
    height = mobile ? 682 : 1024;
  function texture(key: string) {
    if (textures.has(key)) return textures.get(key)!;
    const tex = paintedTexture(
      (c) => {
        if (key === "cover") {
          const g = c.createLinearGradient(0, 0, 1024, 1365);
          g.addColorStop(0, "#214974");
          g.addColorStop(0.5, "#12335b");
          g.addColorStop(1, "#0b203d");
          c.fillStyle = g;
          c.fillRect(0, 0, 1024, 1365);
          c.strokeStyle = "#8dc9eb66";
          c.lineWidth = 2;
          c.strokeRect(50, 50, 924, 1265);
          c.strokeRect(68, 68, 888, 1229);
          text(c, "NEXA360", 512, 280, 85, "#d4e8f6", "DM Sans", "center");
          rule(c, 402, 372, 220, "#70c8ff88");
          text(
            c,
            "The Book of",
            512,
            640,
            112,
            "#deeff9",
            "Instrument Serif",
            "center",
          );
          text(
            c,
            "Becoming",
            512,
            795,
            180,
            "#deeff9",
            "Instrument Serif",
            "center",
          );
          text(
            c,
            "A WORLD OF POSSIBILITIES",
            512,
            1040,
            27,
            "#9bbad8",
            "DM Sans",
            "center",
          );
          text(
            c,
            "LONDON TUITION · ONLINE LEARNING",
            512,
            1225,
            24,
            "#9bbad8",
            "DM Sans",
            "center",
          );
        } else {
          const [side, n] = key.split("-");
          const index = Number(n),
            chapter = chapters[index + 1];
          c.fillStyle =
            side === "left"
              ? index === 5
                ? "#f4eee0"
                : "#f5f5ef"
              : index === 2
                ? "#102a47"
                : index === 5
                  ? "#12253b"
                  : "#dfe9ed";
          c.fillRect(0, 0, 1024, 1365);
          if (side === "left") {
            for (let i = 0; i < 2500; i++) {
              c.fillStyle = i % 3 ? "#1f345504" : "#ffffff55";
              c.fillRect((i * 193) % 1024, (i * 347) % 1365, 2, 1);
            }
            const g = c.createLinearGradient(0, 0, 1024, 0);
            g.addColorStop(0, "#ffffff00");
            g.addColorStop(0.85, "#ffffff00");
            g.addColorStop(1, "#172c4b20");
            c.fillStyle = g;
            c.fillRect(0, 0, 1024, 1365);
            const ink = index === 5 ? "#8a6a29" : "#123b63";
            text(c, "NEXA360", 90, 126, 29, "#687f92");
            text(
              c,
              String(index + 1).padStart(2, "0"),
              925,
              126,
              31,
              "#687f92",
              "DM Sans",
              "right",
            );
            rule(c, 90, 178, 835);
            const size =
              index === 2 ? 109 : index === 1 ? 127 : index === 3 ? 136 : 173;
            const top = chapter.pageTitle.length === 1 ? 470 : 385;
            chapter.pageTitle.forEach((line, j) =>
              text(c, line, 86, top + j * 165, size, ink, "Instrument Serif"),
            );
            rule(c, 90, 655, 820);
            chapter.pageCopy.forEach((line, j) =>
              text(c, line, 90, 785 + j * 90, 57, "#123b63"),
            );
            rule(c, 90, 1150, 835);
            text(
              c,
              index === 3 || index === 4
                ? "FUTURE EDUCATIONAL VISION"
                : index === 5
                  ? "A SYMBOLIC CELEBRATION"
                  : "THE BOOK OF BECOMING",
              90,
              1240,
              24,
              "#4c657b",
            );
          } else {
            const ink =
              index === 2
                ? "#70c8ff35"
                : index === 5
                  ? "#d8b25a30"
                  : "#175cdb40";
            c.strokeStyle = ink;
            c.lineWidth = 1.5;
            for (let x = 80; x < 1024; x += 90) {
              c.beginPath();
              c.moveTo(x, 170);
              c.lineTo(x, 1200);
              c.stroke();
            }
            for (let y = 170; y < 1200; y += 90) rule(c, 80, y, 864, ink);
            c.beginPath();
            c.arc(512, 735, 300, 0, Math.PI * 2);
            c.stroke();
            c.beginPath();
            c.arc(512, 735, 235, 0, Math.PI * 2);
            c.stroke();
            if (index === 1) {
              text(
                c,
                "x² − 5x + 6 = 0",
                512,
                1060,
                57,
                "#123b63",
                "Instrument Serif",
                "center",
              );
              text(
                c,
                "x = 2   or   x = 3",
                512,
                1150,
                50,
                "#175cdb",
                "Instrument Serif",
                "center",
              );
            }
            if (index === 4) {
              for (let r = 80; r <= 300; r += 55) {
                c.beginPath();
                c.arc(500, 790, r, 0, Math.PI * 2);
                c.stroke();
              }
              rule(c, 120, 790, 765, "#175cdb44");
              c.fillStyle = "#175cdb44";
              c.fillRect(500, 350, 1.5, 780);
              text(
                c,
                "ROBOTICS",
                512,
                1200,
                70,
                "#175cdb",
                "DM Sans",
                "center",
              );
            }
            text(
              c,
              "NEXA360",
              80,
              1300,
              25,
              index === 2 ? "#91bbda" : index === 5 ? "#d8b25a" : "#43678a",
            );
          }
        }
      },
      width,
      height,
    );
    textures.set(key, tex);
    return tex;
  }
  function material(front: string, back?: string) {
    const key = `${front}:${back ?? ""}`;
    if (materials.has(key)) return materials.get(key)!;
    const mat = new THREE.MeshStandardMaterial({
      map: texture(front),
      roughness: front === "cover" ? 0.42 : 0.88,
      metalness: front === "cover" ? 0.12 : 0,
      side: back ? THREE.DoubleSide : THREE.FrontSide,
    });
    if (back) {
      const backMap = texture(back);
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.backMap = { value: backMap };
        shader.fragmentShader =
          "uniform sampler2D backMap;\n" +
          shader.fragmentShader.replace(
            "#include <map_fragment>",
            "#ifdef USE_MAP\nvec4 sampledDiffuseColor = gl_FrontFacing ? texture2D(map, vMapUv) : texture2D(backMap, vec2(1.0-vMapUv.x,vMapUv.y)); diffuseColor *= sampledDiffuseColor;\n#endif",
          );
      };
      mat.customProgramCacheKey = () => "nexa-double-page";
    }
    materials.set(key, mat);
    return mat;
  }
  return {
    material,
    dispose() {
      textures.forEach((t) => t.dispose());
      materials.forEach((m) => m.dispose());
    },
  };
}
export function studioEnvironment() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const c = canvas.getContext("2d")!;
  const gradient = c.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, "#7791aa");
  gradient.addColorStop(0.5, "#15273e");
  gradient.addColorStop(1, "#07101f");
  c.fillStyle = gradient;
  c.fillRect(0, 0, 512, 256);
  c.fillStyle = "#ffffff";
  c.fillRect(45, 20, 50, 145);
  c.fillStyle = "#bedfff";
  c.fillRect(280, 35, 95, 80);
  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
