import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// export const width = window.innerWidth
// export const height = window.innerHeight
import { useCallback, useEffect, useState } from "react";

type CanvasProps = {
  url: string;
};

const initThreeJSScene = (node: HTMLDivElement, url?: string) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.autoClearColor = false;
  // renderer.domElement.width = width;
  // renderer.domElement.height = height;
  node.appendChild(renderer.domElement);
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = -30;

  const controls = new OrbitControls(camera, node); //
  controls.target.set(-10, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const bgScene = new THREE.Scene();
  let bgMesh: any; //
  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      url
        ? url
        : "https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    );
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;

    const shader = THREE.ShaderLib.equirect;
    const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide,
    });
    material.uniforms.tEquirect.value = texture;
    const plane = new THREE.BoxGeometry(3, 3, 3);
    bgMesh = new THREE.Mesh(plane, material);
    bgScene.add(bgMesh);
  }

  // resizer

  function resizeRendererToDisplaySize(renderer: any) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      // renderer.setSize(canvas.width, canvas.height, false);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    }
    return needResize;
  }

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  const animate = () => {
    requestAnimationFrame(animate);
    bgMesh.position.copy(camera.position);
    renderer.render(bgScene, camera);
  };

  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    // update camera aspect
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // update renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
  });

  animate();
};

export default function THREECanvas({ url }: CanvasProps) {

  const threeDivRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        initThreeJSScene(node, url);
      }
    },
    [url],
  );

  return <div className="flex h-screen z-10" ref={threeDivRef}></div>;
}
