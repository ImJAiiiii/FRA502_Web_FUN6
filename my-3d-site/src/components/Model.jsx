import { useGLTF } from "@react-three/drei";

export function Model({ url, position, scale }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} scale={scale} />;
}
