import * as THREE from "three";

type Vec3 = [number, number, number];
export function createProp(index: number, logo: THREE.Texture) {
  const group = new THREE.Group();
  const blue = "#175cdb",
    ice = "#ccdfed",
    gold = "#d8b25a",
    navy = "#102b48";
  const cube = new THREE.BoxGeometry(1, 1, 1),
    cyl = new THREE.CylinderGeometry(1, 1, 1, 32),
    ball = new THREE.SphereGeometry(1, 20, 12);
  const mats = new Map<string, THREE.Material>();
  function object(
    geo: THREE.BufferGeometry,
    p: Vec3,
    s: Vec3,
    color: string,
    rotation: Vec3 = [0, 0, 0],
    metal = 0.45,
  ) {
    const key = color + metal;
    let mat = mats.get(key);
    if (!mat) {
      mat = new THREE.MeshStandardMaterial({
        color,
        metalness: metal,
        roughness: metal > 0.7 ? 0.23 : 0.4,
      });
      mats.set(key, mat);
    }
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...p);
    mesh.scale.set(...s);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  const signals: { mesh: THREE.Mesh; length: number; delay: number }[] = [];
  const signal = (mesh: THREE.Mesh, delay: number) => {
    const material = (mesh.material as THREE.MeshStandardMaterial).clone();
    material.emissive = new THREE.Color("#70c8ff");
    material.emissiveIntensity = 0;
    mesh.material = material;
    signals.push({ mesh, length: mesh.scale.y, delay });
  };
  const link = (a: Vec3, b: Vec3, color = blue, r = 0.012) => {
    const av = new THREE.Vector3(...a),
      bv = new THREE.Vector3(...b),
      dir = bv.clone().sub(av);
    const mesh = object(
      cyl,
      av.add(bv).multiplyScalar(0.5).toArray() as Vec3,
      [r, dir.length(), r],
      color,
    );
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize(),
    );
    return mesh;
  };
  if (index === 0) {
    // Approved academic logo: original image, cropped UVs and navy ink mask.
    const geometry = new THREE.PlaneGeometry(2.02, (2.02 * 306) / 731);
    const uv = geometry.getAttribute("uv");
    for (let i = 0; i < uv.count; i++)
      uv.setXY(
        i,
        (140 + uv.getX(i) * 731) / 1080,
        1 - (423 + (1 - uv.getY(i)) * 306) / 1080,
      );
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: logo },
        ink: { value: new THREE.Color("#123d6b") },
      },
      vertexShader:
        "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader:
        "uniform sampler2D map;uniform vec3 ink;varying vec2 vUv;void main(){vec4 t=texture2D(map,vUv);float mask=clamp(1.-dot(t.rgb,vec3(.299,.587,.114)),0.,1.);gl_FragColor=vec4(ink,t.a*mask);}",
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mark = new THREE.Mesh(geometry, mat);
    mark.position.set(0, 0.9, 0.8);
    mark.rotation.x = -0.43;
    group.add(mark);
  }
  if (index === 1) {
    object(cube, [0, 0.1, 0.28], [0.92, 0.2, 0.55], navy);
    for (let j = 0; j < 3; j++)
      object(
        cube,
        [0.5 - j * 0.34, 0.25 + j * 0.19, 0.12],
        [0.27, 0.11 + j * 0.18, 0.28],
        blue,
      );
    const ring = new THREE.TorusGeometry(0.3, 0.018, 8, 48);
    object(ring, [0.22, 1.22, 0.12], [1, 1, 1], blue);
    object(ring, [0.22, 1.22, 0.12], [0.55, 0.55, 0.55], ice);
    link([-0.35, 0.6, 0.13], [0.22, 1.22, 0.13]);
    object(ball, [0.22, 1.22, 0.12], [0.04, 0.04, 0.04], ice);
  }
  if (index === 2) {
    object(cube, [0, 0.1, 0.15], [1, 0.15, 0.6], navy);
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.62);
    shape.bezierCurveTo(-0.35, -0.4, -0.45, -0.1, -0.45, 0.05);
    shape.lineTo(-0.45, 0.55);
    shape.lineTo(0, 0.72);
    shape.lineTo(0.45, 0.55);
    shape.lineTo(0.45, 0.05);
    shape.bezierCurveTo(0.45, -0.1, 0.35, -0.4, 0, -0.62);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSize: 0.025,
      bevelThickness: 0.02,
      bevelSegments: 2,
      steps: 1,
    });
    object(geo, [0, 0.95, 0.1], [1, 1, 1], blue, [-0.24, 0, 0]);
    link([-0.23, 0.9, 0.32], [-0.06, 0.73, 0.32], ice, 0.025);
    link([-0.06, 0.73, 0.32], [0.26, 1.12, 0.32], ice, 0.025);
    for (let j = 0; j < 6; j++) {
      const t = (j / 6) * Math.PI * 2;
      const point: Vec3 = [Math.cos(t) * 0.72, 0.8 + Math.sin(t) * 0.45, 0.24];
      object(ball, point, [0.045, 0.045, 0.045], ice);
      signal(link([0, 0.8, 0.08], point, "#559fca", 0.008), j * 0.08);
    }
  }
  if (index === 3) {
    object(cube, [0, 0.08, 0.08], [1.25, 0.16, 0.85], navy);
    object(cube, [0, 0.19, 0.08], [0.83, 0.07, 0.56], ice);
    object(cube, [0, 0.24, 0.08], [0.52, 0.04, 0.36], blue);
    for (let j = -3; j <= 3; j++) {
      object(cube, [j * 0.16, 0.15, 0.56], [0.055, 0.045, 0.18], ice);
      object(cube, [j * 0.16, 0.15, -0.4], [0.055, 0.045, 0.18], ice);
    }
    const nodes: Vec3[] = [
      [-0.61, 0.57, 0.1],
      [-0.67, 0.96, 0.06],
      [-0.51, 1.35, 0.1],
      [0, 0.48, -0.02],
      [0, 0.91, -0.08],
      [0, 1.36, -0.02],
      [0.53, 0.62, 0.1],
      [0.67, 1.03, 0.06],
      [0.5, 1.43, 0.1],
    ];
    for (let layer = 0; layer < 2; layer++)
      for (let a = 0; a < 3; a++)
        for (let b = 0; b < 3; b++)
          if (Math.abs(a - b) < 2)
            signal(
              link(nodes[layer * 3 + a], nodes[(layer + 1) * 3 + b], "#3c82ba"),
              (layer * 9 + a * 3 + b) * 0.025,
            );
    link([0, 0.26, 0.08], nodes[3]);
    nodes.forEach((point, j) =>
      object(
        ball,
        point,
        [0.085, 0.085, 0.085],
        j % 3 === 1 ? ice : blue,
        undefined,
        0.75,
      ),
    );
  }
  if (index === 4) {
    // Approved arm: exact positions, dimensions and rotations from dist/book.js.
    object(
      cyl,
      [0, 0.09, 0.18],
      [0.37, 0.18, 0.37],
      "#172940",
      undefined,
      0.75,
    );
    object(cyl, [0, 0.28, 0.18], [0.25, 0.2, 0.25], ice, undefined, 0.6);
    object(ball, [0, 0.44, 0.18], [0.18, 0.18, 0.18], blue, undefined, 0.7);
    object(
      cube,
      [-0.2, 0.79, 0.18],
      [0.23, 0.75, 0.23],
      ice,
      [0, 0, -0.5],
      0.6,
    );
    object(ball, [-0.4, 1.14, 0.18], [0.2, 0.2, 0.2], blue, undefined, 0.7);
    object(
      cube,
      [-0.05, 1.37, 0.18],
      [0.66, 0.21, 0.21],
      ice,
      [0, 0, 0.42],
      0.65,
    );
    object(ball, [0.26, 1.5, 0.18], [0.12, 0.12, 0.12], blue, undefined, 0.7);
    object(
      cube,
      [0.43, 1.42, 0.18],
      [0.32, 0.12, 0.12],
      ice,
      [0, 0, -0.5],
      0.65,
    );
    for (const z of [-1, 1])
      object(
        cube,
        [0.56, 1.26, 0.18 + z * 0.1],
        [0.09, 0.27, 0.055],
        "#193054",
        [0, 0, -0.25],
        0.6,
      );
  }
  if (index === 5) {
    object(cube, [0, 0.11, 0.18], [1.1, 0.22, 0.7], "#07101f", undefined, 0.7);
    object(cyl, [0, 0.28, 0.12], [0.27, 0.12, 0.27], gold, undefined, 0.85);
    object(cyl, [0, 0.43, 0.12], [0.085, 0.23, 0.085], gold, undefined, 0.85);
    const profile = [
      [0, 0.49],
      [0.1, 0.51],
      [0.14, 0.59],
      [0.19, 0.66],
      [0.25, 0.78],
      [0.34, 0.97],
      [0.4, 1.17],
      [0.4, 1.21],
      [0.37, 1.21],
      [0.35, 1.13],
      [0.29, 0.94],
      [0.18, 0.73],
      [0.09, 0.65],
      [0, 0.63],
    ];
    const cup = new THREE.LatheGeometry(
      profile.map(([r, y]) => new THREE.Vector2(r, y)),
      48,
    );
    object(cup, [0, 0, 0.12], [1.1, 1.1, 1.1], gold, undefined, 0.85);
    for (const side of [-1, 1]) {
      const points = Array.from({ length: 31 }, (_, i) => {
        const t = (i / 30) * Math.PI * 1.35 - 0.18 * Math.PI;
        return new THREE.Vector3(
          side * (0.27 + Math.sin(t) * 0.33),
          0.92 + Math.cos(t) * 0.33,
          0,
        );
      });
      object(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points),
          32,
          0.035,
          8,
          false,
        ),
        [0, 0, 0.12],
        [1.1, 1.1, 1.1],
        gold,
        undefined,
        0.85,
      );
    }
    const plaqueCanvas = document.createElement("canvas");
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 256;
    const c = plaqueCanvas.getContext("2d")!;
    const gradient = c.createLinearGradient(0, 0, 1024, 256);
    gradient.addColorStop(0, "#e4c16b");
    gradient.addColorStop(0.5, "#fff0b5");
    gradient.addColorStop(1, "#ae872e");
    c.fillStyle = gradient;
    c.fillRect(0, 0, 1024, 256);
    c.strokeStyle = "#886625";
    c.lineWidth = 5;
    c.strokeRect(12, 12, 1000, 232);
    c.font = '600 155px "DM Sans"';
    c.fillStyle = "#30200a";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("NEXA360", 512, 135, 920);
    const plaque = new THREE.CanvasTexture(plaqueCanvas);
    plaque.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.99, 0.17),
      new THREE.MeshBasicMaterial({ map: plaque }),
    );
    label.position.set(0, 0.14, 0.54);
    label.rotation.x = -0.18;
    group.add(label);
  }
  group.userData.signals = signals;
  return group;
}
