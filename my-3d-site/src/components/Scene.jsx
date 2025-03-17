import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, useGLTF, Html } from "@react-three/drei"; // ✅ เพิ่ม Html
import { Suspense } from "react";
import { Model } from "./Model.jsx";
import { createGrass } from "./Grass";
import { addClouds } from "./createCloud";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <SetBackground />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={3} />

      {/* โมเดล 3D สามชิ้น */}
      <Suspense fallback={null}>
        <Model url="/models/Castle.glb" position={[0, 0, -5]} scale={[5, 5, 5]} />
        <Model url="/models/Witch.glb" position={[2, 0, -1]} scale={[1, 1, 1]} />
        <Model url="/models/Hooded Adventurer.glb" position={[3, 0, 3]} scale={[1, 1, 1]} />
      </Suspense>

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* ข้อความ */}
      <Text position={[0, 10, -5]} fontSize={1} color="orange">
        Apichaya Sriwong
      </Text>

      <TreeComponent count={20} />
      <GrassComponent />
      <CloudComponent />
      <FiboWebsiteComponent />

      <OrbitControls />
    </Canvas>
  );
}

function SetBackground() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(0xa0d8ef); // ตั้งค่าสีฟ้าของ Ghibli
  }, [gl]);

  return null;
}

function TreeComponent({ count = 20 }) {
  const { scene } = useThree();
  const { scene: treeModel } = useGLTF("/models/Tree.glb");

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const tree = treeModel.clone();
      tree.position.set(
        (Math.random() - 0.5) * 100, // กระจายในพื้นที่ -50 ถึง 50
        0,
        (Math.random() - 0.5) * 100
      );
      tree.scale.setScalar(6 + Math.random() * 2); // สุ่มขนาดต้นไม้
      tree.rotation.y = Math.random() * Math.PI; // สุ่มหมุนต้นไม้
      scene.add(tree);
    }
    console.log(`Added ${count} Trees`);
  }, [scene, treeModel]);

  return null;
}

function GrassComponent() {
  const { scene } = useThree(); // ดึง Scene จาก useThree()
  const grassMaterialRef = useRef(null);

  useEffect(() => {
    grassMaterialRef.current = createGrass(scene); // ส่ง Scene เข้าไป
    console.log("Grass Created in Scene:", scene);
  }, [scene]);

  useFrame(({ clock }) => {
    if (grassMaterialRef.current) {
      grassMaterialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return null;
}

function CloudComponent() {
  const { scene } = useThree();

  useEffect(() => {
    addClouds(scene, 10); // ✅ เพิ่มเมฆ 10 ก้อนใน Scene
    console.log("Clouds Added to Scene");
  }, [scene]);

  return null;
}

function FiboWebsiteComponent() {
  return (
    <Html position={[-15, 6, -2]} rotation={[0, Math.PI / 4, 0]} transform occlude>
      <iframe
        src="https://fibo.kmutt.ac.th/en/"
        width="800"
        height="600"
        style={{ border: "none", borderRadius: "10px" }}
      />
    </Html>
  );
}