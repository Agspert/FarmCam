import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RGBAFormat, VideoTexture, LinearFilter, PerspectiveCamera } from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DeviceOrientationControls, OrbitControls } from "@react-three/drei";
// import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls';
// import { useLoader } from '@react-three/drei';

extend({ OrbitControls, DeviceOrientationControls });

const SphereVideo = ({
  videoUrl,
  video,
}: {
  videoUrl: string;
  video: HTMLVideoElement;
}) => {
  video.play();

  const texture = new VideoTexture(video);
  texture.minFilter = LinearFilter;
  texture.format = RGBAFormat;

  return (
    <mesh>
      <sphereGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

type PlayerProps = {
  videoUrl?: string
}

const VideoPlayer = ({ videoUrl = "./pano.mp4" }: PlayerProps) => {
  const video = document.createElement("video");
  video.src = videoUrl;
  video.crossOrigin = "anonymous";
  video.loop = true;
  video.muted = true;
  console.log("logging from video player")

  return (
    <div className="flex h-screen z-10">
      <Canvas camera={{ position: [0, 0, 0.1] }}>
        {/* <Controls /> */}
        <SphereVideo videoUrl={videoUrl} video={video} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
export default VideoPlayer;
