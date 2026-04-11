"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

const DESKTOP_SEG_X = 80;
const DESKTOP_SEG_Y = 50;
const MOBILE_SEG_X = 30;
const MOBILE_SEG_Y = 20;
const PLANE_WIDTH = 28;
const PLANE_HEIGHT = 18;
const WAVE_AMPLITUDE = 1.2;
const WAVE_SPEED = 0.3;
const MOUSE_RADIUS = 5;
const MOUSE_LIFT = 0.8;
const GLOW_THRESHOLD = 0.6;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TerrainMeshProps {
  segX: number;
  segY: number;
  isMobile: boolean;
}

// ─── Inner component (runs inside R3F Canvas) ─────────────────────────────────

function TerrainMesh({ segX, segY, isMobile }: TerrainMeshProps) {
  const { camera } = useThree();
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const secondaryMeshRef = useRef<THREE.Mesh>(null);
  const glowPointsRef = useRef<THREE.Points>(null);

  // Stable noise function
  const noise3D = useMemo(() => createNoise3D(), []);

  // Track mouse position in normalized device coordinates
  const mouseNDC = useRef(new THREE.Vector2(0, 0));
  // Track scroll phase offset
  const scrollPhase = useRef(0);

  // Build geometry (vertices count = (segX+1)*(segY+1))
  const vertexCount = (segX + 1) * (segY + 1);

  // Shared position buffer for main and secondary terrain
  const positions = useMemo(
    () => new Float32Array(vertexCount * 3),
    [vertexCount]
  );

  const glowPositions = useMemo(
    () => new Float32Array(vertexCount * 3),
    [vertexCount]
  );

  // Materials — created once
  const mainMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#E4BE6A"),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    []
  );

  const secondaryMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#243558"),
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#E4BE6A"),
        size: 0.06,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  // Raycaster for mouse → world
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  // Invisible plane at z=0 for raycasting
  const intersectPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
  const mouseWorld = useRef(new THREE.Vector3());

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      scrollPhase.current = window.scrollY * 0.001;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Mouse listener (desktop only) ────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseNDC.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // ── Geometry seeding ─────────────────────────────────────────────────────
  // Pre-compute base X/Y for each vertex from PlaneGeometry layout
  const baseXY = useMemo(() => {
    const data = new Float32Array(vertexCount * 2);
    const segW = PLANE_WIDTH / segX;
    const segH = PLANE_HEIGHT / segY;
    let idx = 0;
    for (let iy = 0; iy <= segY; iy++) {
      for (let ix = 0; ix <= segX; ix++) {
        data[idx * 2] = ix * segW - PLANE_WIDTH / 2;
        data[idx * 2 + 1] = iy * segH - PLANE_HEIGHT / 2;
        idx++;
      }
    }
    return data;
  }, [segX, segY, vertexCount]);

  // ── Animation frame ───────────────────────────────────────────────────────
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * WAVE_SPEED + scrollPhase.current;

    // Resolve mouse world position
    if (!isMobile) {
      raycaster.setFromCamera(mouseNDC.current, camera);
      raycaster.ray.intersectPlane(intersectPlane, mouseWorld.current);
    }

    let glowCount = 0;

    for (let i = 0; i < vertexCount; i++) {
      const bx = baseXY[i * 2];
      const by = baseXY[i * 2 + 1];

      // Base terrain height via simplex noise
      let z =
        noise3D(bx * 0.15, by * 0.15, t) * WAVE_AMPLITUDE;

      // Secondary noise layer for detail
      z += noise3D(bx * 0.3, by * 0.3, t * 1.5) * WAVE_AMPLITUDE * 0.3;

      // Mouse lift (desktop only)
      if (!isMobile) {
        const mx = mouseWorld.current.x;
        const my = mouseWorld.current.y;
        const dx = bx - mx;
        const dy = by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const influence = 1 - dist / MOUSE_RADIUS;
          z += influence * influence * MOUSE_LIFT;
        }
      }

      const i3 = i * 3;
      positions[i3] = bx;
      positions[i3 + 1] = by;
      positions[i3 + 2] = z;

      // Collect glow points above threshold
      if (z > GLOW_THRESHOLD) {
        const g3 = glowCount * 3;
        glowPositions[g3] = bx;
        glowPositions[g3 + 1] = by;
        glowPositions[g3 + 2] = z;
        glowCount++;
      }
    }

    // Update main mesh geometry
    if (mainMeshRef.current) {
      const geo = mainMeshRef.current.geometry as THREE.BufferGeometry;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      attr.set(positions);
      attr.needsUpdate = true;
      geo.computeBoundingSphere();
    }

    // Update secondary mesh geometry (slightly behind)
    if (secondaryMeshRef.current) {
      const geo = secondaryMeshRef.current.geometry as THREE.BufferGeometry;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      // Secondary terrain: same vertices but scaled down and z offset back
      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3;
        attr.setXYZ(i, positions[i3] * 1.05, positions[i3 + 1] * 1.05, positions[i3 + 2] - 0.5);
      }
      attr.needsUpdate = true;
      geo.computeBoundingSphere();
    }

    // Update glow points
    if (glowPointsRef.current && glowCount > 0) {
      const geo = glowPointsRef.current.geometry as THREE.BufferGeometry;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < glowCount; i++) {
        const g3 = i * 3;
        attr.setXYZ(i, glowPositions[g3], glowPositions[g3 + 1], glowPositions[g3 + 2]);
      }
      // Zero out unused slots
      for (let i = glowCount; i < vertexCount; i++) {
        attr.setXYZ(i, 0, 0, -999);
      }
      attr.needsUpdate = true;
    }

  });

  // Build initial plane geometry — we'll update positions each frame
  const mainGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const initialPos = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      initialPos[i * 3] = baseXY[i * 2];
      initialPos[i * 3 + 1] = baseXY[i * 2 + 1];
      initialPos[i * 3 + 2] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(initialPos, 3));

    const indices: number[] = [];
    for (let iy = 0; iy < segY; iy++) {
      for (let ix = 0; ix < segX; ix++) {
        const a = ix + (segX + 1) * iy;
        const b = ix + (segX + 1) * (iy + 1);
        const c = ix + 1 + (segX + 1) * (iy + 1);
        const d = ix + 1 + (segX + 1) * iy;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [segX, segY, vertexCount, baseXY]);

  const secondaryGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const initialPos = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      initialPos[i * 3] = baseXY[i * 2];
      initialPos[i * 3 + 1] = baseXY[i * 2 + 1];
      initialPos[i * 3 + 2] = 0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(initialPos, 3));

    const indices: number[] = [];
    for (let iy = 0; iy < segY; iy++) {
      for (let ix = 0; ix < segX; ix++) {
        const a = ix + (segX + 1) * iy;
        const b = ix + (segX + 1) * (iy + 1);
        const c = ix + 1 + (segX + 1) * (iy + 1);
        const d = ix + 1 + (segX + 1) * iy;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [segX, segY, vertexCount, baseXY]);

  // Glow geometry — preallocated, unused vertices parked at z=-999
  const glowGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      pos[i * 3 + 2] = -999;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [vertexCount]);

  return (
    <group rotation={[-Math.PI * 0.35, 0, 0]}>
      {/* Secondary blue wireframe — rendered slightly behind */}
      <mesh
        ref={secondaryMeshRef}
        geometry={secondaryGeo}
        material={secondaryMaterial}
      />

      {/* Main gold wireframe */}
      <mesh
        ref={mainMeshRef}
        geometry={mainGeo}
        material={mainMaterial}
      />

      {/* Glow points at terrain peaks */}
      <points ref={glowPointsRef} geometry={glowGeo} material={glowMaterial} />
    </group>
  );
}

// ─── WebGL availability check ─────────────────────────────────────────────────

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ─── Outer wrapper component ───────────────────────────────────────────────────

export default function TerrainBackground() {
  const [mounted, setMounted] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebglOk(isWebGLAvailable());
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Don't render during SSR
  if (!mounted || !webglOk) return null;

  const segX = isMobile ? MOBILE_SEG_X : DESKTOP_SEG_X;
  const segY = isMobile ? MOBILE_SEG_Y : DESKTOP_SEG_Y;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent", pointerEvents: isMobile ? "none" : "auto" }}
      >
        <TerrainMesh segX={segX} segY={segY} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
