import { OrbitControls, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

type MeshProps = {};

const MeshComponent = (props: MeshProps) => {
  const fbx = useFBX("./dummy.fbx");

  return (
    <mesh position={[0, -4, 0]} scale={[0.04, 0.04, 0.04]}>
      <primitive object={fbx} />
    </mesh>
  );
};

type Props = {};

const FBXModel = (props: Props) => {
  return (
    <div>
      <Canvas>
        <MeshComponent />
        <OrbitControls position={[1, 1, 1]} />
        <pointLight args={[0xffffff, 1000]} position={[2.5, 7.5, 15]} />
        <perspectiveCamera position={[2, 0, 1.0]} />
      </Canvas>
    </div>
  );
};

export default FBXModel;
