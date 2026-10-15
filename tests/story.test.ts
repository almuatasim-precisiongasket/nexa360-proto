import assert from "node:assert/strict";
import test from "node:test";
import { readingPosition, storyFrame } from "../lib/story.ts";
import { pageGeometry, deformPage } from "../lib/book-geometry.ts";
test("direct chapter jumps land on stable, fully revealed reading spreads", () => {
  for (let chapter = 1; chapter <= 6; chapter++) {
    const frame = storyFrame(readingPosition(chapter));
    assert.equal(frame.chapter, chapter);
    assert.equal(frame.turn, 0);
    assert.equal(frame.visibility, 1);
    assert.equal(frame.opening, 1);
    assert.equal(frame.closing, 0);
  }
});
test("forward and reverse samples produce the same book state, including turn boundaries", () => {
  const positions = [
    0, 0.35, 0.8, 1, 1.65, 1.825, 2, 2.825, 5.825, 6.25, 6.7, 7,
  ];
  const forward = positions.map(storyFrame);
  const reverse = positions.toReversed().map(storyFrame).toReversed();
  assert.deepEqual(forward, reverse);
  for (const frame of forward)
    for (const value of Object.values(frame)) assert.ok(Number.isFinite(value));
});
test("the book opens and closes; invalid positions stay bounded", () => {
  assert.equal(storyFrame(0).opening, 0);
  assert.equal(storyFrame(7).closing, 1);
  assert.equal(storyFrame(7).visibility, 0);
  assert.equal(storyFrame(-9).chapter, 0);
  assert.equal(storyFrame(100).progress, 7);
  assert.equal(storyFrame(NaN).progress, 0);
});
test("paper remains attached to its spine and finite through the entire turn", () => {
  for (const mobile of [false, true]) {
    const geometry = pageGeometry(false, mobile);
    for (let step = 0; step <= 40; step++) {
      const angle = (step / 40) * Math.PI;
      deformPage(geometry, angle, Math.sin(angle));
      const position = geometry.getAttribute("position"),
        normal = geometry.getAttribute("normal");
      for (const n of [...position.array, ...normal.array])
        assert.ok(Number.isFinite(n));
      const { cols, rows } = geometry.userData;
      for (let row = 0; row <= rows; row++) {
        const i = row * (cols + 1);
        assert.ok(Math.abs(position.getX(i)) < 1e-7);
        assert.ok(Math.abs(position.getY(i) - 0.15) < 1e-6);
      }
    }
    geometry.dispose();
  }
});
test("both flat pages face up, with left-page text UVs oriented outer-edge to spine", () => {
  for (const left of [false, true]) {
    const geometry = pageGeometry(left);
    assert.ok(geometry.getAttribute("normal").getY(5) > 0.99);
    const positions = geometry.getAttribute("position"),
      uv = geometry.getAttribute("uv");
    const cols = geometry.userData.cols;
    assert.ok(left ? positions.getX(cols) < 0 : positions.getX(cols) > 0);
    assert.equal(uv.getX(0), left ? 1 : 0);
    assert.equal(uv.getX(cols), left ? 0 : 1);
    geometry.dispose();
  }
});
