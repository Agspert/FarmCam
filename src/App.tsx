import React, { Ref, Suspense, useEffect, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// import "./styles.css";
// import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";

// All textures are CC0 textures from: https://cc0textures.com/
const name = (type: string) => `PavingStones092_1K_${type}.jpg`;

const dd = [
  {
    id: 1,
    startTime: 0,
    endTime: 10.2,
    text: "Thank you for purchasing this tea grown right here in my farm that you see behind! I am Prema, a farmer from the scenic hills of tawang, a small town in Arunachal Pradesh.",
  },
  {
    id: 2,
    startTime: 10.2,
    endTime: 17.11,
    text: "Generations of my family have tilled this land, facing the uphill battle of marketing our produce as small farmers.",
  },
  {
    id: 3,
    startTime: 17.11,
    endTime: 21.17,
    text: "Our farm boasts diverse crops like tea and exotic fruits.",
  },
  {
    id: 4,
    startTime: 21.17,
    endTime: 26.55,
    text: "Connecting with consumers was a challenge until we embraced agspeak's digital technologies.",
  },
  {
    id: 5,
    startTime: 26.55,
    endTime: 31.64,
    text: "Now, we are gaining more visibility, thus reaching end consumers efficiently.",
  },
  {
    id: 6,
    startTime: 31.64,
    endTime: 39.34,
    text: "By the way, you can tap on the share button to share my story with your friends, or use the location button to find my farm on the map.",
  },
  {
    id: 7,
    startTime: 39.34,
    endTime: 44.36,
    text: "Do visit my farm to enjoy a day full of nature and fresh food from our ethnic kitchen.",
  },
  {
    id: 8,
    startTime: 44.36,
    endTime: 48.73,
    text: "Meanwhile, enjoy your tea grown right here at my farm!",
  },
];
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
  const [caption, setCaption] = useState("");
  const [width, setWidth] = useState("0px");
  // useEffect(() => {
  //     setTimeout(() => {
  //         setUrl("test1.jpg")
  //     }, 10000)
  // }, [])
  const callback = () => {
    console.log("clicked");
    setUrl("test1.jpg");
  };
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const handleTimeUpdate = (e: any) => {
    const time = audioRef.current?.currentTime || 1;
    const text = dd.find((segment) => {
      if (segment.startTime < time && segment.endTime >= time) {
        return segment;
      }
    });

    if (text && text.text) {
      setCaption(text.text);
    }

    // progress bar
    if (audioRef && audioRef.current?.duration) {
      const chuncks = Math.ceil(window.innerWidth / audioRef.current.duration);
      let width = chuncks * Math.ceil(audioRef.current.currentTime);
      width = width > window.innerWidth ? window.innerWidth : width;
      setWidth(`${width}px`);
    }
  };
  return (
    <div
      className="App h-screen w-screen"
      onClick={() => {
        audioRef.current?.play();
      }}
    >
      <div
        ref={divRef}
        style={{ width: width }}
        className="absolute top-0 border-2 border-yellow-400 rounded-sm z-50"
      ></div>
      <audio
        src="./main.mp3"
        autoPlay
        controls
        ref={audioRef}
        style={{ display: "none" }}
        onTimeUpdate={handleTimeUpdate}
      />
      <Canvas>
        <Suspense fallback={<Loading />}>
          <Scene url={url} callback={callback} />
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
      <p className="absolute left-[50%] translate-x-[-50%] w-[90vw] bottom-12 mb-4 text-black font-semibold text-2xl rounded-sm z-40">
        <span className="bg-yellow-600">{caption}</span>
      </p>
    </div>
  );
}
