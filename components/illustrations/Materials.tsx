/** Shared SVG materials; callers supply a unique React useId prefix. */
export function IllustrationMaterials({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-enamel`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#79b8fa" />
        <stop offset=".45" stopColor="#175cdb" />
        <stop offset="1" stopColor="#123b70" />
      </linearGradient>
      <linearGradient id={`${id}-paper`} x1="0" y1="0" x2=".7" y2="1">
        <stop stopColor="#fffef5" />
        <stop offset=".55" stopColor="#f4f0e4" />
        <stop offset="1" stopColor="#c8dae3" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#f3dc9c" />
        <stop offset="1" stopColor="#b38a39" />
      </linearGradient>
      <radialGradient id={`${id}-ground`}>
        <stop stopColor="#071a31" stopOpacity=".18" />
        <stop offset="1" stopColor="#071a31" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}
