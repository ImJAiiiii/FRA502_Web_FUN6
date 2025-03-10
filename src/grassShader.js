import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  uniform float time;
  
	void main() {
    vUv = uv;
    
    vec4 mvPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
    	mvPosition = instanceMatrix * mvPosition;
    #endif
    
    float dispPower = 1.0 - cos(uv.y * 3.1416 / 2.0);
    float displacement = sin(mvPosition.z + time * 5.0) * (0.1 * dispPower);
    mvPosition.z += displacement;
    
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;
	}
`;

const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
  	vec3 baseColor = vec3(0.2, 0.6, 0.3);
    float clarity = (vUv.y * 0.5) + 0.5;
    gl_FragColor = vec4(baseColor * clarity, 1);
  }
`;

const uniforms = { time: { value: 0 } };

// 🌿 สร้าง Shader Material
const leavesMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
  side: THREE.DoubleSide,
});

// 🌿 ฟังก์ชันสร้าง Grass InstancedMesh
export function createGrass(scene, instanceNumber = 10000) {
  const dummy = new THREE.Object3D();
  const geometry = new THREE.PlaneGeometry(0.1, 1, 1, 4);
  geometry.translate(0, 0.5, 0);

  const instancedMesh = new THREE.InstancedMesh(geometry, leavesMaterial, instanceNumber);
  scene.add(instancedMesh);

  for (let i = 0; i < instanceNumber; i++) {
    dummy.position.set((Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 100);
    dummy.scale.setScalar(0.5 + Math.random() * 0.5);
    dummy.rotation.y = Math.random() * Math.PI;
    dummy.updateMatrix();
    instancedMesh.setMatrixAt(i, dummy.matrix);
  }

  return leavesMaterial; // คืนค่า Material เพื่ออัปเดตเวลาในอนิเมชัน
}
