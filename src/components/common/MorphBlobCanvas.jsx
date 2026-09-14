import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { IcosahedronGeometry } from "three";

/**
 * Low-poly icosahedron whose vertices ripple with layered sine noise —
 * a continuously morphing faceted blob in the style of classic Three.js
 * WebGL portfolios.
 */
const MorphingShape = ({ dark, flip }) => {
  const groupRef = useRef(null);

  const { geometry, directions } = useMemo(() => {
    const geo = new IcosahedronGeometry(1, 2);
    const pos = geo.getAttribute("position");
    const dirs = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const len = Math.sqrt(x * x + y * y + z * z) || 1;
      dirs[i * 3] = x / len;
      dirs[i * 3 + 1] = y / len;
      dirs[i * 3 + 2] = z / len;
    }
    return { geometry: geo, directions: dirs };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * 0.5;
    const pos = geometry.getAttribute("position");
    for (let i = 0; i < pos.count; i += 1) {
      const nx = directions[i * 3];
      const ny = directions[i * 3 + 1];
      const nz = directions[i * 3 + 2];
      const noise =
        Math.sin(nx * 3.1 + t) * 0.35 +
        Math.sin(ny * 2.3 + t * 1.4) * 0.3 +
        Math.sin(nz * 4.2 + t * 0.8) * 0.25;
      const r = 1 + noise * 0.35;
      pos.setXYZ(i, nx * r, ny * r, nz * r);
    }
    pos.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (flip ? -0.2 : 0.2);
      groupRef.current.rotation.x += delta * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#6366f1"
          roughness={0.25}
          metalness={0.5}
          flatShading
          transparent
          opacity={dark ? 0.85 : 0.4}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.001}>
        <meshBasicMaterial
          color={dark ? "#a5b4fc" : "#6366f1"}
          wireframe
          transparent
          opacity={dark ? 0.2 : 0.14}
        />
      </mesh>
    </group>
  );
};

/**
 * Standalone canvas for one morphing blob. `active` pauses the render
 * loop while the section is off screen.
 */
const MorphBlobCanvas = ({ dark, flip, active }) => (
  <Canvas
    dpr={[1, 1.5]}
    frameloop={active ? "always" : "never"}
    camera={{ position: [0, 0, 4], fov: 50 }}
    gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#818cf8" />
    <pointLight position={[-5, -3, 2]} intensity={0.7} color="#8b5cf6" />
    <MorphingShape dark={dark} flip={flip} />
  </Canvas>
);

export default MorphBlobCanvas;
