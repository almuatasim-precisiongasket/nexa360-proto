import type { Interest, PathwayId, TuitionFormat } from "./content";

/** Browser-only communication between the book, intro, dialog and enquiry form. */
type SiteEvents = {
  "nexa:book-ready": void;
  "nexa:book-fallback": void;
  "nexa:replay-intro": void;
  "nexa:open-path": PathwayId;
  "nexa:interest": Interest;
  "nexa:tuition": TuitionFormat | "";
};

export function emitSiteEvent<Name extends keyof SiteEvents>(
  name: Name,
  ...payload: SiteEvents[Name] extends void ? [] : [SiteEvents[Name]]
) {
  window.dispatchEvent(new CustomEvent(name, { detail: payload[0] }));
}

export function onSiteEvent<Name extends keyof SiteEvents>(
  name: Name,
  receive: (detail: SiteEvents[Name]) => void,
) {
  const listener = (event: Event) =>
    receive((event as CustomEvent<SiteEvents[Name]>).detail);
  window.addEventListener(name, listener);
  return () => window.removeEventListener(name, listener);
}
