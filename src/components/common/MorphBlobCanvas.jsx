import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  DodecahedronGeometry,
  IcosahedronGeometry,
  OctahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
} from "three";

const SHAPE_CONFIG = {
  blob: {
    create: () => new IcosahedronGeometry(1, 2),
    color: "#6366f1",
    wire: "#a5b4fc",
    scale: 1.45,
    spinX: 0.06,
    spinY: 0.2,
    morph: 0.35,
  },
  torus: {
    create: () => new TorusGeometry(0.85, 0.28, 16, 40),
    color: "#8b5cf6",
    wire: "#c4b5fd",
    scale: 1.15,
    spinX: 0.28,
    spinY: 0.12,
    morph: 0.12,
  },
  knot: {
    create: () => new TorusKnotGeometry(0.7, 0.22, 80, 10, 2, 3),
    color: "#4f46e5",
    wire: "#818cf8",
    scale: 1.05,
    spinX: 0.1,
    spinY: 0.32,
    morph: 0.1,
  },
  octa: {
    create: () => new OctahedronGeometry(1, 0),
    color: "#7c3aed",
    wire: "#ddd6fe",
    scale: 1.55,
    spinX: 0.22,
    spinY: -0.16,
    morph: 0.18,
  },
  dodeca: {
    create: () => new DodecahedronGeometry(1, 0),
    color: "#6366f1",
    wire: "#c7d2fe",
    scale: 1.4,
    spinX: -0.08,
    spinY: 0.14,
    morph: 0.22,
  },
};

const MorphingShape = ({ dark, flip, kind }) => {
  const groupRef = useRef(null);
  const config = SHAPE_CONFIG[kind] || SHAPE_CONFIG.blob;

  const { geometry, rest } = useMemo(() => {
    const geo = config.create();
    const pos = geo.getAttribute("position");
    const restPos = new Float32Array(pos.array.length);
    restPos.set(pos.array);
    return { geometry: geo, rest: restPos };
  }, [config]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pos = geometry.getAttribute("position");
    const amount = config.morph;

    for (let i = 0; i < pos.count; i += 1) {
      const ix = i * 3;
      const x = rest[ix];
      const y = rest[ix + 1];
      const z = rest[ix + 2];
      const wave =
        Math.sin(x * 2.4 + t * 1.1) * amount +
        Math.sin(y * 3.1 + t * 0.9) * amount * 0.7 +
        Math.sin(z * 2.7 + t * 1.3) * amount * 0.5;
      pos.setXYZ(i, x * (1 + wave), y * (1 + wave), z * (1 + wave));
    }
    pos.needsUpdate = true;

    if (groupRef.current) {
      const dir = flip ? -1 : 1;
      groupRef.current.rotation.y += delta * config.spinY * dir;
      groupRef.current.rotation.x += delta * config.spinX;
    }
  });

  return (
    <group ref={groupRef} scale={config.scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={config.color}
          roughness={0.25}
          metalness={0.5}
          flatShading
          transparent
          opacity={dark ? 0.85 : 0.4}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.002}>
        <meshBasicMaterial
          color={dark ? config.wire : config.color}
          wireframe
          transparent
          opacity={dark ? 0.22 : 0.14}
        />
      </mesh>
    </group>
  );
};

const MorphBlobCanvas = ({ dark, flip, active, kind = "blob" }) => (
  <Canvas
    dpr={[1, 1.5]}
    frameloop={active ? "always" : "never"}
    camera={{ position: [0, 0, 4], fov: 50 }}
    gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#818cf8" />
    <pointLight position={[-5, -3, 2]} intensity={0.7} color="#8b5cf6" />
    <MorphingShape dark={dark} flip={flip} kind={kind} />
  </Canvas>
);

export default MorphBlobCanvas;
