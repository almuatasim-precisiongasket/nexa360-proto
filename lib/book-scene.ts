import * as THREE from "three";
import { pageGeometry, deformPage, coverRim } from "./book-geometry";
import { createBookResources, paintedTexture } from "./book-textures";
import { createProp } from "./book-props";
import { storyFrame, ease, clamp } from "./story";
export function createBookScene(mobile: boolean, logo: THREE.Texture) {
  const world = new THREE.Group(),
    book = new THREE.Group(),
    leftBlock = new THREE.Group();
  world.add(book);
  book.add(leftBlock);
  const resources = createBookResources(mobile);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const bindings = new THREE.CylinderGeometry(1, 1, 1, 24);
  const navy = new THREE.MeshStandardMaterial({
    color: "#103253",
    metalness: 0.08,
    roughness: 0.72,
    bumpMap: resources.grain,
    bumpScale: 0.009,
  });
  const paperEdges = paintedTexture(
    (c) => {
      c.fillStyle = "#f0ede4";
      c.fillRect(0, 0, 1024, 1365);
      for (let i = 0; i < 100; i++) {
        c.fillStyle = i % 3 ? "#c8c3b855" : "#ffffff99";
        c.fillRect(0, i * 14, 1024, 2);
      }
    },
    32,
    256,
  );
  const edge = new THREE.MeshStandardMaterial({
    color: "#fffaf0",
    map: paperEdges,
    roughness: 0.9,
  });
  const leftNavy = navy.clone(),
    leftEdge = edge.clone();
  leftNavy.transparent = true;
  leftEdge.transparent = true;
  function block(
    parent: THREE.Group,
    p: [number, number, number],
    s: [number, number, number],
    material: THREE.Material,
  ) {
    const mesh = new THREE.Mesh(cube, material);
    mesh.position.set(...p);
    mesh.scale.set(...s);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  block(book, [1.16, -0.18, 0], [2.47, 0.13, 3.5], navy);
  block(book, [1.15, -0.03, 0], [2.3, 0.2, 3.29], edge);
  block(leftBlock, [-1.16, -0.18, 0], [2.47, 0.13, 3.5], leftNavy);
  block(leftBlock, [-1.15, -0.03, 0], [2.3, 0.2, 3.29], leftEdge);
  for (const z of [-1.2, -0.6, 0, 0.6, 1.2]) {
    const mesh = new THREE.Mesh(bindings, navy);
    mesh.position.set(0, -0.03, z);
    mesh.rotation.x = Math.PI / 2;
    mesh.scale.set(0.074, 0.025, 0.125);
    book.add(mesh);
  }
  const spine = new THREE.Mesh(bindings, navy);
  spine.position.y = -0.03;
  spine.rotation.x = Math.PI / 2;
  spine.scale.set(0.065, 3.32, 0.12);
  book.add(spine);
  const left = new THREE.Mesh(
    pageGeometry(true, mobile),
    resources.material("left-0"),
  );
  const right = new THREE.Mesh(
    pageGeometry(false, mobile),
    resources.material("right-0"),
  );
  const turn = new THREE.Mesh(
    pageGeometry(false, mobile),
    resources.material("cover", "left-0"),
  );
  turn.position.y = 0.028;
  turn.castShadow = true;
  const rim = coverRim(turn.geometry);
  const coverWall = new THREE.Mesh(rim.geometry, navy);
  coverWall.position.y = turn.position.y;
  coverWall.castShadow = true;
  book.add(coverWall);
  [left, right, turn].forEach((mesh) => {
    mesh.receiveShadow = true;
    book.add(mesh);
  });
  const shadow = paintedTexture(
    (c) => {
      const gradient = c.createRadialGradient(512, 682, 50, 512, 682, 510);
      gradient.addColorStop(0, "#020814df");
      gradient.addColorStop(0.5, "#02081490");
      gradient.addColorStop(1, "#02081400");
      c.fillStyle = gradient;
      c.fillRect(0, 0, 1024, 1365);
    },
    256,
    256,
  );
  const shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    new THREE.MeshBasicMaterial({
      map: shadow,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
    }),
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -1.35;
  world.add(shadowMesh);
  const propGroups = new Map<number, THREE.Group>();
  const anchor = new THREE.Vector3();
  let lastAngle = -10,
    lastBend = -10;
  function update(progress: number) {
    const f = storyFrame(progress);
    const transition = f.turn ? Math.sin(f.turn * Math.PI) : 0;
    book.position.x = -1.12 * (1 - f.opening + f.closing);
    book.rotation.set(0.72 - transition * 0.11, -0.035 + transition * 0.045, 0);
    book.updateMatrixWorld(true);
    leftBlock.visible = f.opening > 0.01 && f.closing < 0.99;
    leftNavy.opacity = leftEdge.opacity = 1 - f.closing;
    left.visible = leftBlock.visible;
    right.visible = true;
    left.material = resources.material(`left-${f.from}`);
    left.material.transparent = true;
    left.material.opacity = 1 - f.closing;
    right.material = resources.material(`right-${f.turn > 0 ? f.to : f.from}`);
    let angle = 0,
      bend = 0;
    if (progress < 1) {
      turn.visible = true;
      angle = f.opening * Math.PI;
      turn.material = resources.material("cover", "left-0");
    } else if (f.closing > 0) {
      turn.visible = true;
      angle = (1 - f.closing) * Math.PI;
      turn.material = resources.material("cover", "left-5");
    } else if (f.turn > 0) {
      turn.visible = true;
      // Quintic easing gives a quieter start and finish than a linear curl.
      const t = f.turn;
      const settled = t * t * t * (t * (t * 6 - 15) + 10);
      angle = settled * Math.PI;
      bend = Math.sin(settled * Math.PI) * 0.85;
      turn.material = resources.material(`right-${f.from}`, `left-${f.to}`);
    } else turn.visible = false;
    if (turn.visible && (angle !== lastAngle || bend !== lastBend)) {
      deformPage(turn.geometry, angle, bend);
      lastAngle = angle;
      lastBend = bend;
      rim.update();
    }
    coverWall.visible = turn.visible && (progress < 1 || f.closing > 0);
    shadowMesh.scale.set(0.78 + f.opening * 0.22, 1, 1);
    const index = Math.max(0, f.chapter - 1);
    if (f.visibility > 0.005 && !propGroups.has(index)) {
      const prop = createProp(index, logo);
      world.add(prop);
      propGroups.set(index, prop);
    }
    for (const [n, prop] of propGroups) {
      prop.visible = n === index && f.visibility > 0.005;
      if (prop.visible) {
        anchor.set(1.13, 0.18, -0.07).applyMatrix4(book.matrixWorld);
        prop.position.copy(anchor);
        prop.rotation.y = -0.04;
        prop.scale.set(1, Math.max(0.001, f.visibility), 1);
        for (const signal of prop.userData.signals ?? []) {
          const reveal = clamp(
            (f.visibility - signal.delay) / (1 - signal.delay),
          );
          signal.mesh.scale.y = signal.length * reveal;
          (
            signal.mesh.material as THREE.MeshStandardMaterial
          ).emissiveIntensity = Math.sin(reveal * Math.PI) * 0.45;
        }
      }
    }
    return { distance: 0.8 + f.opening * 0.2, transition };
  }
  update(0);
  return {
    world,
    update,
    dispose() {
      resources.dispose();
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      world.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          geometries.add(obj.geometry);
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((mat) => {
            materials.add(mat);
            if (
              "map" in mat &&
              mat.map instanceof THREE.Texture &&
              mat.map !== logo
            )
              textures.add(mat.map);
          });
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
  };
}
