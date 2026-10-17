"use client";
import { useEffect, useRef } from "react";
import s from "./v5.module.css";

const fragment = `precision mediump float;
uniform vec2 resolution; uniform float time; uniform float mode; uniform float selected; uniform vec2 pointer; uniform vec4 weights; uniform float clusters;
float line(vec2 p,vec2 a,vec2 b){vec2 d=b-a;return length((p-a)-d*clamp(dot(p-a,d)/dot(d,d),0.,1.));}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution; vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);
 p+=pointer*.015; float light=0.; vec3 col=vec3(.28,.62,1.);
 if(mode<-.5){
  for(int i=0;i<4;i++){float k=float(i);float a=k*1.5707963+.785398;
   vec2 end=vec2(cos(a)*.66,sin(a)*.42);float d=line(p,vec2(0.),end);
   float strength=abs(k-selected)<.5?1.:.18;
   light+=strength*.13*exp(-d*300.);float v=fract(time*.13+k*.25);
   light+=strength*.7*exp(-length(p-end*v)*240.);light+=strength*.24*exp(-length(p-end)*110.);
  } light+=.22*exp(-length(p)*28.);
 }else{
  float grid=abs(sin(p.x*32.))*abs(sin(p.y*32.)); light+=.025*(1.-smoothstep(.0,.12,grid));
  for(int i=0;i<32;i++){
   float k=float(i);vec2 q=vec2(sin(k*12.1),cos(k*7.7))*.40;
   q.x+=sin(time*.045+k)*.035;
   vec2 agents=vec2(fract(k/32.+time*.035)*.95-.475,sin(k*11.)*.21);
   vec2 pixels=floor(q*16.)/16.;
   vec2 groups=vec2(q.x*.85,q.y*.65+sign(q.x)*.16);
   q=q*(weights.x+weights.z)+agents*weights.y+pixels*weights.w+groups*clusters;
   float d=length(p-q);light+=.19*exp(-d*210.);
   float path=line(p,q,vec2(sin((k+1.)*12.1),cos((k+1.)*7.7))*.40);
   light+=.012*exp(-path*260.);
  }
  float angle=atan(p.y,p.x);float ring=abs(length(p)-.33-sin(angle*3.+time*.2+mode)*.025);
  light+=.11*exp(-ring*180.);float sweep=abs(p.x-sin(time*.17+mode)*.65);
  light+=weights.z*.06*pow(max(0.,cos(angle-time*.3)),18.)*exp(-abs(length(p)-.3)*8.);
  light+=.035*exp(-sweep*55.);
 }
 float edge=1.-smoothstep(.2,.75,length(p)); gl_FragColor=vec4(col,clamp(light*edge,0.,.7));
}`;

/** Two local WebGL scenes. Labels and an SVG poster remain independent of GPU readiness. */
export function VisualField({
  mode = 0,
  focus = 0,
}: {
  mode?: number;
  focus?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const latest = useRef(mode);
  const selected = useRef(focus);
  const invalidate = useRef<() => void>(() => {});
  useEffect(() => {
    selected.current = focus;
    invalidate.current();
  }, [focus]);
  useEffect(() => {
    latest.current = mode;
    invalidate.current();
  }, [mode]);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", {
      alpha: true,
      antialias: false,
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(
      gl.VERTEX_SHADER,
      "attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}",
    );
    const pixel = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!vertex || !pixel || !program) {
      shaders.forEach((x) => gl.deleteShader(x));
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, pixel);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach((x) => gl.deleteShader(x));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const u = Object.fromEntries(
      [
        "resolution",
        "time",
        "mode",
        "selected",
        "pointer",
        "weights",
        "clusters",
      ].map((k) => [k, gl.getUniformLocation(program, k)]),
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0,
      visible = false,
      lost = false,
      elapsed = 0,
      previous = 0,
      painted = 0,
      px = 0,
      py = 0,
      sx = 0,
      sy = 0,
      current = latest.current;
    const blend = new Float32Array(5);
    blend[Math.max(0, latest.current)] = 1;
    const draw = (now: number) => {
      raf = 0;
      if (lost) return;
      if (!reduced.matches && now - painted < 32) {
        raf = requestAnimationFrame(draw);
        return;
      }
      painted = now;
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!reduced.matches) elapsed += dt;
      current = reduced.matches
        ? latest.current
        : current + (latest.current - current) * Math.min(1, dt * 3);
      for (let i = 0; i < 5; i++) {
        const target = latest.current === i ? 1 : 0;
        blend[i] = reduced.matches
          ? target
          : blend[i] + (target - blend[i]) * (1 - Math.exp(-4 * dt));
      }
      sx += (px - sx) * 0.04;
      sy += (py - sy) * 0.04;
      gl.uniform2f(u.resolution, el.width, el.height);
      gl.uniform1f(u.time, elapsed);
      gl.uniform1f(u.mode, current);
      gl.uniform1f(u.selected, selected.current);
      gl.uniform2f(u.pointer, sx, sy);
      gl.uniform4f(u.weights, blend[0], blend[1], blend[2], blend[3]);
      gl.uniform1f(u.clusters, blend[4]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (visible && !document.hidden && !reduced.matches)
        raf = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (visible && !document.hidden && !lost) {
        previous = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    invalidate.current = sync;
    const resize = () => {
      const box = el.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 1.25);
      el.width = Math.max(1, Math.min(1200, Math.round(box.width * ratio)));
      el.height = Math.max(1, Math.min(850, Math.round(box.height * ratio)));
      gl.viewport(0, 0, el.width, el.height);
      sync();
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = el.getBoundingClientRect();
      px = (e.clientX - b.left) / b.width - 0.5;
      py = (e.clientY - b.top) / b.height - 0.5;
    };
    const loss = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      invalidate.current = () => {};
    };
    const restore = () => {
      /* The independent SVG poster remains visible after a GPU reset. */
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    const size = new ResizeObserver(resize);
    size.observe(el);
    resize();
    el.parentElement?.addEventListener("pointermove", move);
    el.addEventListener("webglcontextlost", loss);
    el.addEventListener("webglcontextrestored", restore);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      invalidate.current = () => {};
      observer.disconnect();
      size.disconnect();
      el.parentElement?.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      el.removeEventListener("webglcontextlost", loss);
      el.removeEventListener("webglcontextrestored", restore);
      if (buffer) gl.deleteBuffer(buffer);
      shaders.forEach((x) => gl.deleteShader(x));
      gl.deleteProgram(program);
    };
  }, []);
  return <canvas className={s.visualField} ref={canvas} aria-hidden="true" />;
}
