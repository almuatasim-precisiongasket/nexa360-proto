"use client";

import { useEffect, useRef } from "react";

const vertex = `attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}`;
const fragment = `precision mediump float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
uniform float travel;
uniform float energy;
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  vec2 p=uv; p.x*=resolution.x/resolution.y;
  float light=0.0;
  for(int i=0;i<5;i++){
    float f=float(i);
    float curve=0.25+f*0.105
      +sin(p.x*(2.1+energy*0.16)+time*0.16+f*0.72+travel)*(0.13+energy*0.015)
      +sin(p.x*4.0-time*0.09+f)*0.035;
    float d=abs(uv.y-curve-pointer.y*0.035);
    light+=exp(-d*42.0)*0.035+exp(-d*190.0)*0.05;
  }
  float halo=exp(-length(uv-vec2(0.72+pointer.x*0.035,0.55))*3.8)*0.13;
  float edge=smoothstep(0.0,0.15,uv.y)*smoothstep(0.0,0.15,1.0-uv.y);
  gl_FragColor=vec4(vec3(0.12,0.43,0.78),min(0.3,(light+halo)*edge*(1.0+energy*0.12)));
}`;

/** Slow WebGL light ribbons. Offscreen/hidden sections do not render frames. */
export function AmbientField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const surface = canvas.current;
    const section = surface?.parentElement;
    if (!surface || !section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];
    let raf = 0,
      visible = false,
      failed = false,
      last = 0,
      elapsed = 0,
      previousScroll = 0,
      energy = 0;
    let pointerX = 0,
      pointerY = 0,
      smoothX = 0,
      smoothY = 0;
    let timeLocation: WebGLUniformLocation | null = null;
    let pointerLocation: WebGLUniformLocation | null = null;
    let travelLocation: WebGLUniformLocation | null = null;
    let energyLocation: WebGLUniformLocation | null = null;
    const disposeGpu = () => {
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        shaders.forEach((shader) => gl!.deleteShader(shader));
      }
      buffer = program = null;
      shaders.length = 0;
      timeLocation = pointerLocation = travelLocation = energyLocation = null;
      gl = null;
    };

    const resize = () => {
      if (failed || !gl || !program || gl.isContextLost()) return;
      const rect = section.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 1.25);
      surface.width = Math.max(
        1,
        Math.min(1600, Math.round(rect.width * ratio)),
      );
      surface.height = Math.max(
        1,
        Math.min(1000, Math.round(rect.height * ratio)),
      );
      gl.viewport(0, 0, surface.width, surface.height);
      gl.uniform2f(
        gl.getUniformLocation(program, "resolution"),
        surface.width,
        surface.height,
      );
    };
    const initialize = () => {
      if (gl) return true;
      gl = surface.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
        depth: false,
        powerPreference: "low-power",
      });
      if (!gl) return false;
      program = gl.createProgram();
      if (!program) return false;
      for (const [type, source] of [
        [gl.VERTEX_SHADER, vertex],
        [gl.FRAGMENT_SHADER, fragment],
      ] as const) {
        const shader = gl.createShader(type);
        if (!shader) return false;
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return false;
        gl.attachShader(program, shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
      gl.useProgram(program);
      buffer = gl.createBuffer();
      if (!buffer) return false;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const position = gl.getAttribLocation(program, "position");
      if (position < 0) return false;
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      timeLocation = gl.getUniformLocation(program, "time");
      pointerLocation = gl.getUniformLocation(program, "pointer");
      travelLocation = gl.getUniformLocation(program, "travel");
      energyLocation = gl.getUniformLocation(program, "energy");
      resize();
      return true;
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return;
      const dt = Math.min((now - last) / 1000, 0.06);
      elapsed += dt;
      const position = window.scrollY;
      const targetEnergy = Math.min(
        1,
        Math.abs(position - previousScroll) / Math.max(1, dt * 1500),
      );
      energy += (targetEnergy - energy) * (1 - Math.exp(-3 * dt));
      previousScroll = position;
      last = now;
      smoothX += (pointerX - smoothX) * 0.035;
      smoothY += (pointerY - smoothY) * 0.035;
      gl!.uniform1f(timeLocation, elapsed);
      gl!.uniform2f(pointerLocation, smoothX, smoothY);
      gl!.uniform1f(travelLocation, previousScroll * 0.000045);
      gl!.uniform1f(energyLocation, energy);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (failed || !visible || document.hidden || reduced.matches) return;
      if (!initialize()) {
        failed = true;
        disposeGpu();
        return;
      }
      previousScroll = window.scrollY;
      energy = 0;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const move = (event: PointerEvent) => {
      if (!visible || event.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const reset = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const lost = (event: Event) => {
      event.preventDefault();
      failed = true;
      cancelAnimationFrame(raf);
    };
    const restored = () => {
      disposeGpu();
      failed = false;
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(section);
    const sizing = new ResizeObserver(resize);
    sizing.observe(section);
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", reset);
    surface.addEventListener("webglcontextlost", lost);
    surface.addEventListener("webglcontextrestored", restored);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      sizing.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", reset);
      surface.removeEventListener("webglcontextlost", lost);
      surface.removeEventListener("webglcontextrestored", restored);
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      disposeGpu();
    };
  }, []);
  return <canvas ref={canvas} className="ambient-field" aria-hidden="true" />;
}
