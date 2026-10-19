import { useId } from "react";
import s from "./v5.module.css";

export function ChapterSignal() {
  const id = useId();
  return (
    <div className={s.chapterSignal} data-nexa-gate aria-hidden="true">
      <span>THE STORY OPENS INTO POSSIBILITY</span>
      <svg viewBox="0 0 1200 90" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id}>
            <stop stopColor="#6d92b7" stopOpacity=".15" />
            <stop offset=".5" stopColor="#bca77a" />
            <stop offset="1" stopColor="#6d92b7" stopOpacity=".15" />
          </linearGradient>
        </defs>
        <path
          d="M600 0V18C600 44 440 42 300 60S80 82 0 82M600 18C600 44 760 42 900 60S1120 82 1200 82"
          stroke={`url(#${id})`}
          strokeWidth="1"
          pathLength="1"
          data-nexa-gate-path
        />
        <path
          d="M600 0V88"
          stroke="#789aba"
          opacity=".17"
          pathLength="1"
          data-nexa-gate-path
        />
        <circle cx="600" cy="20" r="3" fill="#c6b386" data-nexa-gate-node />
        <circle cx="300" cy="60" r="2.5" fill="#6d92b7" data-nexa-gate-node />
        <circle cx="900" cy="60" r="2.5" fill="#6d92b7" data-nexa-gate-node />
      </svg>
    </div>
  );
}
