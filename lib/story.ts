export const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));
export const ease = (value: number) => value * value * (3 - 2 * value);
export const readingPosition = (chapter: number) =>
  chapter === 0 ? 0 : clamp(chapter, 1, 6) + 0.25;
export function storyFrame(value: number) {
  const progress = clamp(Number.isFinite(value) ? value : 0, 0, 7);
  const interval = Math.floor(progress);
  const turn =
    interval >= 1 && interval < 6
      ? clamp((progress - interval - 0.65) / 0.35)
      : 0;
  const chapter =
    progress < 0.8 ? 0 : Math.min(6, Math.max(1, Math.floor(progress + 0.175)));
  const from = Math.min(5, Math.max(0, interval - 1));
  const opening = ease(clamp((progress - 0.35) / 0.65));
  const closing = ease(clamp((progress - 6.7) / 0.3));
  const emerging =
    progress < 1
      ? ease(clamp((progress - 0.8) / 0.2))
      : turn > 0
        ? Math.pow(Math.abs(turn - 0.5) * 2, 2)
        : 1;
  return {
    progress,
    chapter,
    from,
    to: Math.min(5, from + 1),
    turn,
    opening,
    closing,
    visibility: emerging * (1 - closing),
  };
}
export type StoryBridge = { progress: number; invalidate: () => void };
