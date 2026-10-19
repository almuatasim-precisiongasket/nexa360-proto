import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/** Authored scene, with four held compositions and no external model downloads. */
export function createLearningStudio() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#081727");
  scene.fog = new THREE.Fog("#081727", 17, 32);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  const shadows: THREE.LightShadow[] = [];
  const mat = (color: string, metalness = 0, roughness = 0.65) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
    });
    materials.add(material);
    return material;
  };
  const navy = mat("#102b46", 0.18, 0.38);
  const blue = mat("#194a76", 0.25, 0.34);
  const gold = mat("#ba9a61", 0.65, 0.3);
  const dark = mat("#071321", 0.2, 0.42);
  const paper = mat("#f0e9da", 0, 0.85);
  const light = mat("#fce7b1");
  light.emissive.set("#ffce7c");
  light.emissiveIntensity = 1.5;
  function mesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    parent: THREE.Object3D = scene,
  ) {
    geometries.add(geometry);
    const object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(
    w: number,
    h: number,
    d: number,
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = scene,
    radius = 0.04,
  ) {
    const object = mesh(
      new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 3, h / 3, d / 3)),
      material,
      parent,
    );
    object.position.set(x, y, z);
    return object;
  }
  function rod(
    a: THREE.Vector3,
    b: THREE.Vector3,
    radius: number,
    material: THREE.Material,
    parent: THREE.Object3D = scene,
  ) {
    const delta = b.clone().sub(a);
    const object = mesh(
      new THREE.CylinderGeometry(radius, radius, delta.length(), 16),
      material,
      parent,
    );
    object.position.copy(a).add(b).multiplyScalar(0.5);
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      delta.normalize(),
    );
    return object;
  }
  function panelTexture(title: string, lines: string[], warm = false) {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = warm ? "#eee9dc" : "#0e2943";
    ctx.fillRect(0, 0, 1024, 768);
    ctx.fillStyle = warm ? "#667889" : "#95b4ce";
    ctx.font = "22px Arial";
    ctx.fillText("NEXA360  /  LEARNING STUDIO", 72, 75);
    ctx.strokeStyle = warm ? "#c7c6bd" : "#34516c";
    ctx.beginPath();
    ctx.moveTo(72, 108);
    ctx.lineTo(952, 108);
    ctx.stroke();
    ctx.fillStyle = warm ? "#132d43" : "#eee9dc";
    ctx.font = "52px Georgia";
    ctx.fillText(title, 72, 212);
    lines.forEach((line, i) => {
      ctx.fillStyle =
        i === 0 ? (warm ? "#37566b" : "#dac28c") : warm ? "#687887" : "#acc0d1";
      ctx.font = i === 0 ? "40px Arial" : "28px Arial";
      ctx.fillText(line, 72, 318 + i * 86);
    });
    ctx.font = "18px Arial";
    ctx.fillStyle = warm ? "#7c827f" : "#7592ac";
    ctx.fillText("ILLUSTRATIVE LEARNING EXAMPLE", 72, 710);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textures.add(texture);
    return texture;
  }
  function display(
    w: number,
    h: number,
    texture: THREE.Texture,
    parent: THREE.Object3D,
  ) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
    });
    materials.add(material);
    return mesh(new THREE.PlaneGeometry(w, h), material, parent);
  }
  scene.add(new THREE.HemisphereLight("#c5ddfa", "#0a1627", 2.2));
  const key = new THREE.DirectionalLight("#ffe9c7", 4.5);
  key.position.set(-3, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.normalBias = 0.035;
  scene.add(key);
  shadows.push(key.shadow);
  const rim = new THREE.DirectionalLight("#689fe5", 3);
  rim.position.set(5, 3, -4);
  scene.add(rim);
  const fill = new THREE.PointLight("#487cba", 12, 14, 2);
  fill.position.set(-4, 1.5, -1);
  scene.add(fill);

  // Architectural island, raised desk, restrained brass edge and corner fins.
  const island = mesh(new THREE.CylinderGeometry(4.3, 4.45, 0.25, 96), navy);
  island.position.y = -1.5;
  const rimRing = mesh(new THREE.TorusGeometry(4.32, 0.018, 8, 96), gold);
  rimRing.rotation.x = -Math.PI / 2;
  rimRing.position.y = -1.36;
  const floor = mesh(new THREE.PlaneGeometry(100, 100), mat("#081727"));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.64;
  for (let i = 0; i < 13; i++) {
    const fin = box(
      0.045,
      3.5,
      0.15,
      i % 4 === 0 ? gold : navy,
      -3.1 + i * 0.29,
      0.35,
      -2.55,
    );
    fin.rotation.y = -0.25;
  }
  box(6.1, 0.18, 3.1, navy, 0, 0, 0, scene, 0.08);
  box(6.06, 0.025, 3.06, gold, 0, -0.1, 0);
  for (const x of [-2.6, 2.6])
    for (const z of [-1.1, 1.1]) box(0.07, 1.23, 0.07, gold, x, -0.74, z);
  box(2.45, 0.02, 1.65, mat("#173749", 0.02, 0.95), 0.15, 0.103, 0.35);
  const seat = box(1.4, 0.16, 1.25, blue, 0.05, -0.65, 2.05, scene, 0.06);
  const back = box(1.4, 1.15, 0.13, blue, 0.05, -0.15, 2.55, scene, 0.06);
  back.rotation.x = -0.1;
  rod(new THREE.Vector3(0.05, -1.36, 2.05), seat.position, 0.06, gold);
  for (let i = 0; i < 3; i++) {
    const book = box(
      0.85,
      0.13,
      1.05,
      i === 1 ? paper : blue,
      -2.08,
      0.18 + i * 0.14,
      0.6,
    );
    book.rotation.y = i * 0.13 - 0.15;
    box(0.82, 0.07, 0.98, paper, -2.08, 0.18 + i * 0.14, 0.6);
  }
  // The task lamp gives the room a recognisable human scale.
  const lamp = new THREE.Group();
  lamp.position.set(2.15, 0.13, -0.85);
  scene.add(lamp);
  mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.06, 32), gold, lamp);
  rod(
    new THREE.Vector3(0, 0.03, 0),
    new THREE.Vector3(0, 1.25, 0),
    0.025,
    gold,
    lamp,
  );
  rod(
    new THREE.Vector3(0, 1.25, 0),
    new THREE.Vector3(-0.65, 1.8, 0),
    0.025,
    gold,
    lamp,
  );
  const shade = mesh(
    new THREE.ConeGeometry(0.34, 0.25, 32, 1, true),
    navy,
    lamp,
  );
  shade.position.set(-0.65, 1.69, 0);
  const lampDisc = mesh(new THREE.CircleGeometry(0.25, 32), light, lamp);
  lampDisc.rotation.x = Math.PI / 2;
  lampDisc.position.set(-0.65, 1.56, 0);
  const glow = new THREE.PointLight("#ffda91", 5, 5, 2);
  glow.position.set(-0.65, 1.5, 0);
  lamp.add(glow);

  const tablet = new THREE.Group();
  tablet.position.set(-1.45, 0.92, -0.65);
  tablet.rotation.y = 0.22;
  scene.add(tablet);
  box(1.82, 1.36, 0.095, dark, 0, 0, 0, tablet, 0.04);
  display(
    1.65,
    1.2,
    panelTexture("A place to begin.", [
      "Questions are welcome.",
      "Subject  /  Mathematics",
      "Focus  /  Understanding",
    ]),
    tablet,
  ).position.z = 0.051;
  rod(
    new THREE.Vector3(-1.45, 0.1, -0.68),
    new THREE.Vector3(-1.45, 0.65, -0.68),
    0.045,
    gold,
  );

  const equation = new THREE.Group();
  scene.add(equation);
  box(1.9, 1.42, 0.025, paper, 0, 0, -0.02, equation, 0.008);
  const equationMaterial = new THREE.MeshBasicMaterial({
    map: panelTexture(
      "Work it through.",
      ["2x + 3 = 11", "What would you do first?"],
      true,
    ),
    toneMapped: false,
  });
  materials.add(equationMaterial);
  mesh(
    new THREE.PlaneGeometry(1.82, 1.36),
    equationMaterial,
    equation,
  ).position.z = 0.002;
  const solvedMap = panelTexture(
    "Check the method.",
    ["2x + 3 = 11", "2x = 8     →     x = 4", "Check: 2 × 4 + 3 = 11"],
    true,
  );
  const unsolvedMap = equationMaterial.map;
  const pencil = new THREE.Group();
  scene.add(pencil);
  const pencilBody = mesh(
    new THREE.CylinderGeometry(0.027, 0.027, 1, 6),
    gold,
    pencil,
  );
  pencilBody.rotation.z = Math.PI / 2;
  const tip = mesh(new THREE.ConeGeometry(0.027, 0.12, 6), paper, pencil);
  tip.rotation.z = -Math.PI / 2;
  tip.position.x = 0.56;

  const report = new THREE.Group();
  scene.add(report);
  box(2.25, 1.69, 0.08, dark, 0, 0, -0.05, report);
  const reportMaterial = new THREE.MeshBasicMaterial({
    map: panelTexture("A clearer picture.", [
      "Practice awaits your choice.",
      "Topic  /  Two-step equations",
      "Next  /  Explain each step",
    ]),
    toneMapped: false,
  });
  materials.add(reportMaterial);
  mesh(new THREE.PlaneGeometry(2.1, 1.56), reportMaterial, report);
  const reportSolved = panelTexture("A clearer picture.", [
    "Example completed together.",
    "Method  /  Inverse operations",
    "Next  /  Try a new equation",
  ]);
  const reportInitial = reportMaterial.map;

  const signalCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.45, 1.2, 0.3),
    new THREE.Vector3(0.5, 2.6, 0.1),
    new THREE.Vector3(1.4, 2.7, -0.2),
    new THREE.Vector3(1.5, 1.5, -0.35),
  );
  const signalMat = new THREE.MeshBasicMaterial({
    color: "#c2a469",
    transparent: true,
    opacity: 0.65,
  });
  materials.add(signalMat);
  const signal = mesh(
    new THREE.TubeGeometry(signalCurve, 48, 0.009, 6, false),
    signalMat,
  );
  const bead = mesh(new THREE.SphereGeometry(0.045, 12, 12), light);
  const cameras = [
    new THREE.Vector3(7, 5.3, 8.5),
    new THREE.Vector3(2.8, 2.9, 6.2),
    new THREE.Vector3(-1.7, 2.9, 6),
    new THREE.Vector3(4.6, 3.1, 6.4),
  ];
  const looks = [
    new THREE.Vector3(0, 0.2, 0),
    new THREE.Vector3(0.15, 1, 0.1),
    new THREE.Vector3(0.2, 1.15, 0.2),
    new THREE.Vector3(0.95, 1.15, -0.1),
  ];
  const look = new THREE.Vector3();
  const lerp = THREE.MathUtils.lerp;
  function update(
    progress: number,
    camera: THREE.PerspectiveCamera,
    solved: boolean,
    pointerX: number,
    pointerY: number,
    mobile: boolean,
  ) {
    const p = THREE.MathUtils.clamp(progress, 0, 3);
    const index = Math.min(2, Math.floor(p));
    const blend = THREE.MathUtils.smoothstep(p - index, 0.12, 0.85);
    camera.position.lerpVectors(cameras[index], cameras[index + 1], blend);
    look.lerpVectors(looks[index], looks[index + 1], blend);
    if (mobile) {
      camera.position.multiplyScalar(1.12);
      camera.position.y += 0.4;
    }
    camera.position.x += pointerX * 0.18;
    camera.position.y += pointerY * 0.1;
    camera.lookAt(look);
    const lift = THREE.MathUtils.smoothstep(p, 0.18, 0.9);
    equation.position.set(
      lerp(0.35, 0.1, lift),
      lerp(0.14, 1.3, lift),
      lerp(0.35, 0.45, lift),
    );
    equation.rotation.set(
      lerp(-Math.PI / 2, -0.08, lift),
      lerp(-0.12, -0.1, lift),
      lerp(-0.08, 0.02, lift),
    );
    const share = THREE.MathUtils.smoothstep(p, 2.1, 2.9);
    equation.position.x -= share * 0.8;
    equation.position.y -= share * 0.25;
    equation.scale.setScalar(1 - share * 0.16);
    equationMaterial.map = solved ? solvedMap : unsolvedMap;
    pencil.position.set(
      lerp(1.35, 1.1, lift) - share * 0.4,
      lerp(0.15, 1.05, lift),
      lerp(0.4, 0.8, lift),
    );
    pencil.rotation.set(0, lerp(-0.5, 0.1, lift), lerp(0, -0.75, lift));
    report.position.set(1.4, lerp(0.12, 1.45, share), -0.4);
    report.rotation.set(lerp(-Math.PI / 2, 0, share), -0.15, 0);
    report.scale.setScalar(lerp(0.55, 1, share));
    report.visible = p > 1.9;
    reportMaterial.map = solved ? reportSolved : reportInitial;
    signal.visible = bead.visible = share > 0.1;
    bead.position.copy(
      signalCurve.getPoint(THREE.MathUtils.clamp((share - 0.1) / 0.9, 0, 1)),
    );
  }
  function dispose() {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
    shadows.forEach((s) => s.dispose());
    scene.clear();
  }
  return { scene, update, dispose };
}
