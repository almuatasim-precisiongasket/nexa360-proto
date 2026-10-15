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

/** A thin binding wall follows the cover's real vertex normals as it turns. */
export function coverRim(surface: THREE.BufferGeometry) {
  const { cols, rows } = surface.userData as { cols: number; rows: number };
  const outline: number[] = [];
  for (let i = 0; i <= cols; i++) outline.push(i);
  for (let j = 1; j <= rows; j++) outline.push(j * (cols + 1) + cols);
  for (let i = cols - 1; i >= 0; i--) outline.push(rows * (cols + 1) + i);
  for (let j = rows - 1; j > 0; j--) outline.push(j * (cols + 1));
  outline.push(outline[0]);
  const geometry = new THREE.BufferGeometry();
  const vertices = new THREE.BufferAttribute(
    new Float32Array(outline.length * 6),
    3,
  ).setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute("position", vertices);
  const indices: number[] = [];
  for (let i = 0; i < outline.length - 1; i++) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  geometry.setIndex(indices);
  const update = () => {
    const positions = surface.getAttribute("position");
    const normals = surface.getAttribute("normal");
    outline.forEach((n, i) => {
      const x = positions.getX(n),
        y = positions.getY(n),
        z = positions.getZ(n);
      vertices.setXYZ(i * 2, x, y, z);
      vertices.setXYZ(
        i * 2 + 1,
        x - normals.getX(n) * 0.035,
        y - normals.getY(n) * 0.035,
        z - normals.getZ(n) * 0.035,
      );
    });
    vertices.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
  };
  update();
  return { geometry, update };
}
