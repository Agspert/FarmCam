import React, { Ref, Suspense, useEffect, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// import "./styles.css";
// import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";

// All textures are CC0 textures from: https://cc0textures.com/
const name = (type: string) => `PavingStones092_1K_${type}.jpg`;

function Loading() {
  return (
    <Html>
      <h2>🌀 Loading...</h2>
    </Html>
  );
}

function Scene({ url, callback }: { url: string; callback: any }) {
  // const myMesh = React.useRef<Ref<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>> | null>(null)
  const myMesh = React.useRef<any>(null);
  const [posX, setPosX] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setPosX(100);
    }, 10000);
  }, []);
  //   const [
  //     test, test1
  //   ] = useLoader(TextureLoader, [
  //     "test.jpg",
  //     "test1.jpg"
  //   ]);
  const texture = useTexture(url);

  //   useFrame(() => {
  //     console.log("Hey, I'm executing every frame!")
  //     console.log(typeof(test))
  //     console.log(test)
  //   })
  // const [
  //   colorMap,
  //   displacementMap,
  //   normalMap,
  //   roughnessMap,
  //   aoMap
  // ] = useTexture([
  //   name("Color"),
  //   name("Displacement"),
  //   name("Normal"),
  //   name("Roughness"),
  //   name("AmbientOcclusion")
  // ]);
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh
        position={[posX, 0, 0]}
        onBeforeRender={() => {
          "rendering";
        }}
        ref={myMesh}
        onDoubleClick={callback}
      >
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[500, 60, 40]}></sphereGeometry>
        {/* {posX ? <meshBasicMaterial map={test} side={2}></meshBasicMaterial> : <meshBasicMaterial map={test1} side={2}></meshBasicMaterial>} */}
        {/* <meshBasicMaterial onUpdate={() => {console.log("updated")}} map={posX ? test : test1} needsUpdate={true} side={2}></meshBasicMaterial> */}
        <meshBasicMaterial
          onUpdate={() => {
            console.log("updated");
          }}
          map={texture}
          needsUpdate={true}
          side={2}
        ></meshBasicMaterial>
        {/* <sphereBufferGeometry args={[3, 10  0, 100]} /> */}
        {/* <meshStandardMaterial
          map={test}
          attach="material"
        /> */}
      </mesh>
    </>
  );
}

export default function App() {
  const [url, setUrl] = useState("Street.jpg");
  // useEffect(() => {
  //     setTimeout(() => {
  //         setUrl("test1.jpg")
  //     }, 10000)
  // }, [])
  const callback = () => {
    console.log("clicked");
    setUrl("test1.jpg");
  };
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={<Loading />}>
          <Scene url={url} callback={callback} />
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}
