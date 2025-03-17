import * as THREE from "three";

// ฟังก์ชันสร้างก้อนเมฆ
export function createCloud(scene) {
    const cloudGeometry = new THREE.SphereGeometry(1, 16, 16);
    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, // สีขาวของเมฆ
        transparent: true,
        opacity: 0.9
    });

    const cloud = new THREE.Group();

    for (let i = 0; i < 5; i++) { // สุ่มก้อนเมฆเล็กๆ มารวมกัน
        const puff = new THREE.Mesh(cloudGeometry, cloudMaterial);
        puff.position.set(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 2
        );
        puff.scale.setScalar(Math.random() * 2 + 0.5);
        cloud.add(puff);
    }

    return cloud;
}

// สุ่มกระจายเมฆในฉาก
export function addClouds(scene, count = 10) {
    for (let i = 0; i < count; i++) {
        const cloud = createCloud(scene);
        cloud.position.set(
            (Math.random() - 0.5) * 100,
            Math.random() * 20 + 10, // ให้เมฆอยู่สูงจากพื้น
            (Math.random() - 0.5) * 100
        );
        scene.add(cloud);
    }
}
