import * as THREE from "three";
/** The approved book's spine-attached curved surface, ported from dist/book.js. */
export function pageGeometry(left = false, mobile = false) {
  const cols = mobile ? 25 : 44,
    rows = mobile ? 4 : 8;
  const positions = new Float32Array((cols + 1) * (rows + 1) * 3);
  const uv = new Float32Array((cols + 1) * (rows + 1) * 2);
  const indices: number[] = [];
  for (let j = 0; j <= rows; j++)
    for (let i = 0; i <= cols; i++) {
      const n = j * (cols + 1) + i;
      uv[n * 2] = left ? 1 - i / cols : i / cols;
      uv[n * 2 + 1] = j / rows;
    }
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const a = j * (cols + 1) + i,
        b = a + 1,
        c = b + cols + 1,
        d = a + cols + 1;
      indices.push(...(left ? [a, b, c, a, c, d] : [a, d, c, a, c, b]));
    }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
  );
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.userData = { cols, rows, left };
  deformPage(geometry, 0, 0);
  return geometry;
}
export function deformPage(
  geometry: THREE.BufferGeometry,
  angle: number,
  bend: number,
) {
  const { cols, rows, left } = geometry.userData as {
    cols: number;
    rows: number;
    left: boolean;
  };
  const position = geometry.getAttribute("position") as THREE.BufferAttribute;
  for (let j = 0; j <= rows; j++)
    for (let i = 0; i <= cols; i++) {
      const u = i / cols,
        v = j / rows;
      const theta =
        angle +
        bend * Math.sin(u * Math.PI) * 0.34 +
        Math.sin(angle) * Math.pow(u, 4) * Math.pow(v, 3) * 0.22;
      const d = 2.3 * u;
      position.setXYZ(
        j * (cols + 1) + i,
        (left ? -1 : 1) * d * Math.cos(theta),
        0.15 + d * Math.sin(theta) + Math.sin(u * Math.PI) * 0.018,
        v * 3.28 - 1.64,
      );
    }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}
