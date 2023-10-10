import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
type Props = {
  url: string;
};

type MeshProps = {
  texturemap: THREE.Texture;
};
const MeshComponent = ({ texturemap }: MeshProps) => {
  const texture = useTexture("./dt.jpg");
  const shader = THREE.ShaderLib.equirect;

  return (
    <scene background={new THREE.CubeTextureLoader().load(["./dt.jpg"])}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <directionalLight args={[0xffffff, 1]} position={[-1, 2, 4]} />
      <mesh>
        {/* <boxGeometry args={[3, 3, 3]} /> */}
        <sphereGeometry args={[80, 200, 200]} />
        <OrbitControls
          enableZoom={false}
          target={[0, 0, 0.1]}
          position={[0, 0, 1]}
        />
        {/* <shaderMaterial args={[
        shader.fragmentShader,
        shader.vertexShader,
        shader.uniforms,
        false,
        THREE.BackSide
      ]
    } /> */}

        {/* <meshBasicMaterial map={new THREE.TextureLoader().load("./dt.jpg")} side={2} /> */}
        <meshBasicMaterial map={texturemap} side={THREE.BackSide} />
      </mesh>
    </scene>
  );
};

const ReactiveScene = (props: Props) => {
  const texturemap = new THREE.TextureLoader().load(props.url);
  texturemap.minFilter = THREE.LinearFilter;

  return (
    <div className="h-screen">
      <Canvas>
        {/* <perspectiveCamera args={[75,2, 0.1,100]} position={[0,0,-80]} /> */}
        <MeshComponent texturemap={texturemap} />
      </Canvas>
    </div>
  );
};

export default ReactiveScene;

// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from "@react-three/drei"
// import * as THREE from 'three';

// const ReactiveScene = () => {
//   const cameraRef = useRef<THREE.PerspectiveCamera>();
//   const bgMeshRef = useRef<THREE.Mesh>();

//   useFrame(({ camera }: {camera : any}) => {
//     bgMeshRef?.current?.position.copy(camera.position);
//   });

//   return (
//     <Canvas
//       // style={{ position: 'absolute' }}
//       className="border-2 border-red-600"
//       camera={{ position: [0, 0, 30], fov: 75 }}
//       gl={{ alpha: false }}
//       onCreated={({ gl }) => {
//         gl.autoClearColor = false;
//       }}
//     >
//       <ambientLight intensity={1} />
//       <directionalLight position={[-1, 2, 4]} intensity={1} />

//       <mesh>
//       {/* <mesh ref={bgMeshRef} scale={[1, 1, -1]}> */}
//         <boxGeometry args={[3, 3, 3]} />
//         <meshBasicMaterial map={new THREE.TextureLoader().load("./st.jpg" || 'https://threejsfundamentals.org/threejs/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg')} />
//       </mesh>

//       {/* <OrbitControls ref={cameraRef} target={[0, 0, 0]} /> */}
//       <OrbitControls  target={[0, 0, 0]} />
//     </Canvas>
//   );
// };

// export default ReactiveScene;
