// Original vector artwork: one source produces RML and matching SVG fallbacks.
import { mkdir, writeFile } from "node:fs/promises";

const output = new URL("../art/rive/learning-desk/", import.meta.url);
const assets = new URL("../public/assets/rive/", import.meta.url);
await mkdir(output, { recursive: true });
await mkdir(assets, { recursive: true });
const ink = "#163c60",
  blue = "#175cdb",
  gold = "#d8b25a",
  paper = "#fffdf6";
const gradients = {
  enamel: ["#73b5ed", "#175cdb", "#123c70"],
  paper: ["#fffdf6", "#edf1e9", "#cddedc"],
  gold: ["#f4dea1", "#d8b25a", "#ac8137"],
};
const poly = (name, points, fill, stroke, width = 1) => ({
  name,
  kind: "poly",
  points,
  fill,
  stroke,
  width,
});
const line = (name, points, stroke = ink, width = 1) => ({
  name,
  kind: "line",
  points,
  stroke,
  width,
});
const rect = (name, x, y, w, h, fill, stroke, rotation = 0) => ({
  name,
  kind: "rect",
  x,
  y,
  w,
  h,
  fill,
  stroke,
  rotation,
});
const ellipse = (name, x, y, rx, ry, fill, stroke, width = 1) => ({
  name,
  kind: "ellipse",
  x,
  y,
  rx,
  ry,
  fill,
  stroke,
  width,
});
const backdrop = [
  ellipse("Drafting orbit", 210, 151, 150, 126, undefined, "#d9e3df"),
  ellipse("Inner drafting orbit", 210, 151, 120, 98, undefined, "#e4eae3"),
  ...[74, 134, 194, 254].map((y) =>
    line(
      `Guide ${y}`,
      [
        [42, y],
        [378, y],
      ],
      "#e4eae3",
      0.6,
    ),
  ),
  line(
    "Left registration",
    [
      [25, 40],
      [25, 29],
      [36, 29],
    ],
    "#829eac",
  ),
  line(
    "Right registration",
    [
      [384, 270],
      [395, 270],
      [395, 259],
    ],
    "#829eac",
  ),
];
const desk = [
  ellipse("Ground", 210, 284, 153, 11, "#dce4dc"),
  poly(
    "Desk depth",
    [
      [43, 228],
      [211, 266],
      [378, 229],
      [378, 242],
      [211, 282],
      [43, 243],
    ],
    ink,
  ),
  poly(
    "Enamel work surface",
    [
      [43, 228],
      [209, 194],
      [378, 229],
      [211, 267],
    ],
    "enamel",
  ),
  poly(
    "Book cover",
    [
      [99, 149],
      [210, 158],
      [310, 134],
      [334, 215],
      [212, 245],
      [89, 222],
    ],
    ink,
  ),
  poly(
    "Page stack",
    [
      [99, 144],
      [210, 154],
      [309, 129],
      [329, 209],
      [211, 239],
      [94, 216],
    ],
    "#c1d4d4",
  ),
  poly(
    "Left open page",
    [
      [104, 139],
      [208, 150],
      [210, 232],
      [99, 209],
    ],
    "paper",
  ),
  poly(
    "Right open page",
    [
      [208, 150],
      [304, 124],
      [323, 201],
      [210, 232],
    ],
    "paper",
  ),
  line(
    "Binding",
    [
      [208, 150],
      [210, 232],
    ],
    "#3c6687",
    2,
  ),
  ...[0, 1, 2, 3].map((i) =>
    line(
      `Left text ${i}`,
      [
        [119, 164 + i * 10],
        [187, 174 + i * 10],
      ],
      "#9cb4ba",
      1,
    ),
  ),
  ...[0, 1, 2].map((i) =>
    line(
      `Right text ${i}`,
      [
        [229, 163 + i * 10],
        [294, 147 + i * 10],
      ],
      "#9cb4ba",
      1,
    ),
  ),
  poly(
    "Bookmark",
    [
      [250, 218],
      [268, 214],
      [271, 238],
      [261, 233],
      [253, 241],
    ],
    "gold",
  ),
  poly(
    "Pencil",
    [
      [325, 178],
      [331, 174],
      [359, 219],
      [353, 223],
    ],
    "gold",
  ),
  poly(
    "Pencil point",
    [
      [353, 223],
      [359, 219],
      [362, 231],
    ],
    "#e7d1a5",
  ),
  poly(
    "Graphite tip",
    [
      [359, 227],
      [362, 231],
      [356, 229],
    ],
    ink,
  ),
];
const gcse = [
  poly(
    "Practice sheet shadow",
    [
      [106, 61],
      [204, 71],
      [197, 160],
      [99, 150],
    ],
    "#c9d9d3",
  ),
  poly(
    "Practice sheet",
    [
      [101, 55],
      [199, 65],
      [192, 154],
      [94, 144],
    ],
    "paper",
    "#c8d6cf",
  ),
  poly(
    "Folded corner",
    [
      [181, 63],
      [199, 65],
      [197, 83],
    ],
    "#d1e3e4",
  ),
  ...[0, 1, 2].map((i) =>
    line(
      `Practice line ${i}`,
      [
        [117, 78 + i * 11],
        [169, 84 + i * 11],
      ],
      "#8ca9b4",
      1.3,
    ),
  ),
  line(
    "Practice axes",
    [
      [116, 112],
      [113, 133],
      [169, 139],
    ],
    "#497e9f",
    1.3,
  ),
  line(
    "Practice graph",
    [
      [119, 127],
      [131, 116],
      [143, 123],
      [160, 108],
    ],
    blue,
    2,
  ),
  ellipse("Question token", 245, 91, 28, 28, "enamel"),
  line(
    "Question mark top",
    [
      [237, 83],
      [241, 77],
      [249, 77],
      [254, 82],
      [253, 88],
      [245, 94],
      [245, 98],
    ],
    paper,
    2,
  ),
  ellipse("Question mark dot", 245, 105, 1.7, 1.7, paper),
  line(
    "Connection",
    [
      [220, 103],
      [210, 121],
    ],
    gold,
    1.5,
  ),
];
const alevel = [
  poly(
    "Reference back",
    [
      [93, 80],
      [186, 57],
      [208, 143],
      [114, 167],
    ],
    "#d4e2dc",
  ),
  poly(
    "Reference sheet",
    [
      [88, 73],
      [181, 50],
      [203, 136],
      [109, 160],
    ],
    "paper",
    "#c8d6cf",
  ),
  ...[0, 1, 2, 3].map((i) =>
    line(
      `Reference line ${i}`,
      [
        [107 + i * 3, 89 + i * 10],
        [170 + i * 3, 73 + i * 10],
      ],
      "#8ca9b4",
      1.2,
    ),
  ),
  poly(
    "Diagram card",
    [
      [222, 49],
      [315, 72],
      [293, 159],
      [201, 135],
    ],
    "enamel",
  ),
  ellipse("Orbit one", 257, 103, 29, 15, undefined, "#c4e5f4", 1.2),
  ellipse("Orbit two", 257, 103, 15, 29, undefined, "#c4e5f4", 1.2),
  ellipse("Orbit core", 257, 103, 4.5, 4.5, "gold"),
  ellipse("Orbit electron", 279, 92, 3.5, 3.5, paper),
  line(
    "Reference baseline",
    [
      [124, 140],
      [179, 125],
    ],
    gold,
    2,
  ),
];
const entrance = [
  ...[0, 1, 2, 3].flatMap((i) => [
    poly(
      `Step ${i} depth`,
      [
        [91 + i * 43, 148 - i * 22],
        [122 + i * 43, 158 - i * 22],
        [141 + i * 43, 149 - i * 22],
        [141 + i * 43, 158 - i * 22],
        [122 + i * 43, 167 - i * 22],
        [91 + i * 43, 157 - i * 22],
      ],
      ink,
    ),
    poly(
      `Step ${i} paper`,
      [
        [91 + i * 43, 148 - i * 22],
        [109 + i * 43, 139 - i * 22],
        [141 + i * 43, 149 - i * 22],
        [122 + i * 43, 158 - i * 22],
      ],
      i === 3 ? "gold" : "paper",
    ),
  ]),
  line(
    "Flag staff",
    [
      [281, 96],
      [281, 44],
    ],
    ink,
    2,
  ),
  poly(
    "Ambition flag",
    [
      [282, 44],
      [314, 51],
      [282, 62],
    ],
    "gold",
  ),
  ellipse("Learning token", 113, 86, 25, 25, "enamel"),
  line(
    "Learning spark vertical",
    [
      [113, 72],
      [113, 100],
    ],
    paper,
    1.6,
  ),
  line(
    "Learning spark horizontal",
    [
      [99, 86],
      [127, 86],
    ],
    paper,
    1.6,
  ),
  line(
    "Learning spark diagonal",
    [
      [104, 77],
      [122, 95],
    ],
    paper,
    1.1,
  ),
];
const variants = [gcse, alevel, entrance];
const escape = (s) =>
  String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const argb = (color) => "FF" + color.replace("#", "").toUpperCase();
const rmlPaint = (fill, stroke, width = 1) => {
  let value = "";
  if (fill)
    value += gradients[fill]
      ? `<Fill><LinearGradient startX="60" startY="40" endX="330" endY="270">${gradients[fill].map((c, i) => `<GradientStop position="${i / 2}" colorValue="${argb(c)}"/>`).join("")}</LinearGradient></Fill>`
      : `<Fill><SolidColor colorValue="${argb(fill)}"/></Fill>`;
  if (stroke)
    value += `<Stroke thickness="${width}" cap="round" join="round"><SolidColor colorValue="${argb(stroke)}"/></Stroke>`;
  return value;
};
const rmlShape = (s) => {
  let geometry,
    position = "";
  if (s.kind === "poly" || s.kind === "line")
    geometry = `<PointsPath isClosed="${s.kind === "poly"}" isClockwise="true">${s.points.map(([x, y]) => `<StraightVertex x="${x}" y="${y}"/>`).join("")}</PointsPath>`;
  else if (s.kind === "ellipse") {
    position = `x="${s.x}" y="${s.y}"`;
    geometry = `<Ellipse width="${s.rx * 2}" height="${s.ry * 2}" originX="0.5" originY="0.5"/>`;
  } else {
    position = `x="${s.x}" y="${s.y}" rotation="${s.rotation}"`;
    geometry = `<Rectangle width="${s.w}" height="${s.h}" originX="0" originY="0"/>`;
  }
  return `<Shape name="${escape(s.name)}" ${position}>${geometry}${rmlPaint(s.fill, s.stroke, s.width)}</Shape>`;
};
const rmlGroup = (shapes, id, name, opacity = 1) =>
  `<Node name="${name}" id="0:${id}" opacity="${opacity}">${[...shapes].reverse().map(rmlShape).join("\n")}</Node>`;
const condition = (i) =>
  `<TransitionViewModelCondition opValue="equal"><TransitionPropertyViewModelComparator><BindablePropertyNumber><DataBindContext sourcePathIds="0:40-0:42" propertyKey="636"/></BindablePropertyNumber></TransitionPropertyViewModelComparator><TransitionValueNumberComparator value="${i}"/></TransitionViewModelCondition>`;
const pose = (i) =>
  `<LinearAnimation name="${["GCSE", "ALevel", "Entrance"][i]}" id="0:${80 + i}" duration="1">${variants.map((_, j) => `<KeyedObject objectId="0:${101 + j}"><KeyedProperty propertyKey="18"><KeyFrameDouble value="${i === j ? 1 : 0}"/></KeyedProperty><KeyedProperty propertyKey="14"><KeyFrameDouble value="${i === j ? 0 : 14}"/></KeyedProperty></KeyedObject>`).join("")}</LinearAnimation>`;
const rml = `<Rive version="1" kind="fragment">
<Artboard name="LearningDesk" id="0:2" width="420" height="320" x="0" y="0" styleId="0:5" viewModelId="0:40" viewModelInstanceId="0:41" defaultStateMachineId="0:7">
<LayoutComponentStyle id="0:5"/>
<Fill><SolidColor colorValue="FFFFFDF6"/></Fill>
<Node name="Desk entrance" id="0:10">
${variants.map((v, i) => rmlGroup(v, 101 + i, ["GCSE sheets", "A Level references", "Entrance steps"][i], i === 0 ? 1 : 0)).join("\n")}
${rmlGroup(desk, 100, "Paper and enamel desk")}
</Node>
${rmlGroup(backdrop, 110, "Drafting guides")}
<StateMachine name="LearningJourney" id="0:7">
<StateMachineLayer name="Programme"><AnyState x="0" y="-180"/><ExitState x="600" y="-180"/><EntryState x="-180" y="0"><StateTransition stateToId="0:90"/></EntryState>
${variants.map((_, i) => `<AnimationState id="0:${90 + i}" animationId="0:${80 + i}" x="${i * 220}" y="${(i % 2) * 150}">${variants.flatMap((_, j) => (j === i ? [] : [`<StateTransition stateToId="0:${90 + j}" duration="1200" enableEarlyExit="true" interpolationType="cubic"><CubicEaseInterpolator x1="0.22" y1="1" x2="0.36" y2="1"/>${condition(j)}</StateTransition>`])).join("")}</AnimationState>`).join("\n")}</StateMachineLayer>
<StateMachineLayer name="First entrance"><AnyState x="0" y="-100"/><ExitState x="320" y="100"/><EntryState x="0" y="0"><StateTransition stateToId="0:121"/></EntryState><AnimationState id="0:121" animationId="0:120" x="160" y="0"/></StateMachineLayer>
</StateMachine>
${variants.map((_, i) => pose(i)).join("\n")}
<LinearAnimation name="Entrance" id="0:120" duration="120"><KeyedObject objectId="0:10"><KeyedProperty propertyKey="14"><KeyFrameDouble value="12" frame="0" interpolationType="cubic"><CubicEaseInterpolator x1="0.22" y1="1" x2="0.36" y2="1"/></KeyFrameDouble><KeyFrameDouble value="0" frame="120"/></KeyedProperty></KeyedObject></LinearAnimation>
</Artboard>
<ViewModel name="LearningDesk" id="0:40" defaultInstanceId="0:41"><ViewModelPropertyNumber name="programme" id="0:42"/><ViewModelInstance name="Default" id="0:41" exports="true"><ViewModelInstanceNumber propertyValue="0" viewModelPropertyId="0:42"/></ViewModelInstance></ViewModel>
</Rive>`;
const svgShape = (s) => {
  const paint = `fill="${s.fill ? (gradients[s.fill] ? `url(#${s.fill})` : s.fill) : "none"}"${s.stroke ? ` stroke="${s.stroke}" stroke-width="${s.width ?? 1}" stroke-linecap="round" stroke-linejoin="round"` : ""}`;
  if (s.kind === "poly" || s.kind === "line")
    return `<${s.kind === "poly" ? "polygon" : "polyline"} points="${s.points.map((p) => p.join(",")).join(" ")}" ${paint}/>`;
  if (s.kind === "ellipse")
    return `<ellipse cx="${s.x}" cy="${s.y}" rx="${s.rx}" ry="${s.ry}" ${paint}/>`;
  return `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" ${paint}/>`;
};
await writeFile(new URL("scene.rml", output), rml + "\n");
await writeFile(
  new URL("rive.yaml", output),
  "name: learning-desk\nmain: LearningDesk\nlogs:\n  file: build/rive.log\n  problems: build/problems.log\n",
);
await writeFile(new URL(".gitignore", output), "build/\n");
for (let i = 0; i < 3; i++) {
  const defs = Object.entries(gradients)
    .map(
      ([name, colors]) =>
        `<linearGradient id="${name}" x1="60" y1="40" x2="330" y2="270" gradientUnits="userSpaceOnUse">${colors.map((c, j) => `<stop offset="${j / 2}" stop-color="${c}"/>`).join("")}</linearGradient>`,
    )
    .join("");
  await writeFile(
    new URL(`learning-desk-${i}.svg`, assets),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 320"><defs>${defs}</defs><rect width="420" height="320" fill="${paper}"/>${[...backdrop, ...desk, ...variants[i]].map(svgShape).join("")}</svg>\n`,
  );
}
console.log("Authored learning-desk RML and three SVG posters.");
