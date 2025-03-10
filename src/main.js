import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createGrass } from "./grassShader.js";  // นำเข้า Grass
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addClouds } from "./createCloud.js";

// สร้าง Scene, Camera, Renderer
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0d8ef);

const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// เพิ่มการควบคุมกล้อง
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Clock สำหรับอนิเมชัน
const clock = new THREE.Clock();

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // แสงทั่วฉาก
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(ambientLight, directionalLight);

// สร้างพื้นสีเขียว
const groundGeometry = new THREE.PlaneGeometry(100, 100); // กำหนดขนาดพื้น
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x3a9d23 }); // ใช้ MeshBasicMaterial ไม่ต้องใช้แสง
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// เพิ่มหญ้าลงในฉาก
const grassMaterial = createGrass(scene, 1000000); // ใช้ Grass 1,000,000 ต้น

// เพิ่มเมฆในฉาก (จำนวน 10 ก้อน)
addClouds(scene, 20);

// character
const loader = new GLTFLoader();
loader.load("/glb/Hooded Adventurer.glb", function (gltf) { //https://poly.pizza/m/y9KWOVG21R
    const character = gltf.scene;
    character.position.set(0, 0, 0); // กำหนดตำแหน่งตัวละคร
    character.scale.set(2, 2, 2); // ปรับขนาดให้เหมาะสม
    scene.add(character);
});

loader.load("/glb/Witch.glb", function (gltf) { //https://poly.pizza/m/QBEOV9ZUT8
    const character = gltf.scene;
    character.position.set(3, 0, 3); // กำหนดตำแหน่งตัวละคร
    character.scale.set(2, 2, 2); // ปรับขนาดให้เหมาะสม
    scene.add(character);
});

// Castle
loader.load("./glb/Castle.glb", function (gltf) { //https://poly.pizza/m/4360GdbxRe
    const house = gltf.scene;
    house.position.set(-5, 0, -15); // ตำแหน่งบ้าน
    house.scale.set(15, 15, 15); // ปรับขนาด
    scene.add(house);
});

//Church
loader.load("./glb/Church.glb", function (gltf) { //https://poly.pizza/m/GHzPfvoyzX
    const Church = gltf.scene;
    Church.position.set(-15, 0, -5); // ตำแหน่งบ้าน
    Church.rotation.set(0, -5, 0);
    Church.scale.set(20, 20,20);//ับขนาด
    scene.add(Church);
});

// Tree
loader.load("/glb/Tree.glb", function (gltf) { //https://poly.pizza/m/DprqDP0C0y
    for (let i = 0; i < 40; i++) { // จำนวนต้นไม้ที่ต้องการเพิ่ม
        const tree = gltf.scene.clone(); // Clone ต้นไม้แต่ละต้น
        tree.position.set(
            (Math.random() - 0.5) * 100, // กระจายตำแหน่งแบบสุ่ม
            0,
            (Math.random() - 0.5) * 100
        );
        tree.scale.set(15, 15, 15); // ปรับขนาด
        scene.add(tree);
    }
});

// ฟังก์ชันอัปเดตอนิเมชัน
function animate() {
  grassMaterial.uniforms.time.value = clock.getElapsedTime();

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// รองรับการเปลี่ยนขนาดหน้าจอ
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  renderer.setSize(newWidth, newHeight);
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
});
