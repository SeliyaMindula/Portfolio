import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdditiveBlending, NormalBlending } from "three";
import { useTheme } from "../../context/ThemeContext";

/**
 * Generates `count` points randomly distributed inside a sphere so the
 * cloud looks organic from every angle while it rotates.
 */
const generateSpherePositions = (count, radius) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

const Particles = ({ count, dark }) => {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => generateSpherePositions(count, 9), [count]);

  useEffect(() => {
    const handleMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Constant slow drift.
    group.rotation.y += delta * 0.03;

    // Ease toward the pointer for a parallax feel.
    const targetX = pointer.current.y * 0.25;
    const targetZ = pointer.current.x * 0.2;
    group.rotation.x += (targetX - group.rotation.x) * Math.min(delta * 2, 1);
    group.rotation.z += (targetZ - group.rotation.z) * Math.min(delta * 2, 1);
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={dark ? 0.045 : 0.05}
          color={dark ? "#818cf8" : "#6366f1"}
          transparent
          opacity={dark ? 0.85 : 0.45}
          sizeAttenuation
          depthWrite={false}
          blending={dark ? AdditiveBlending : NormalBlending}
        />
      </points>
    </group>
  );
};

/**
 * Mouse-reactive 3D particle field rendered behind the hero content.
 * Lazy-loaded from Home so three.js stays out of the main bundle, and
 * only mounted when the visitor has no reduced-motion preference.
 */
const ParticleField = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 900 : 2200;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Particles count={count} dark={dark} />
      </Canvas>
    </div>
  );
};

export default ParticleField;
