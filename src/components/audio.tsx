import React, { useState } from "react";
import Bars from "@/components/bars";

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  src: string;
  currentIndex: number;
};
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

const AudioPlayer = ({ audioRef, src, currentIndex }: Props) => {
  const [caption, setCaption] = useState("");
  const [width, setWidth] = useState("0px");
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
      // calculating bar width
      // gap-2 * (bars - 1) px-4 border-2 * (bars * 2)
      // 16 * (3-1) + (16px * 2)
      // console.log(window.innerWidth , Math.floor((window.innerWidth - 64)/ 3))
      const w = Math.floor((window.innerWidth - 64) / 3);
      const chuncks = Math.ceil(w / audioRef.current.duration);
      let width = chuncks * Math.ceil(audioRef.current.currentTime);
      width = width > w ? w : width;
      setWidth(`${width}px`);
    }
  };

  return (
    <>
      <Bars width={width} currentIndex={currentIndex} />
      <audio
        src={src}
        autoPlay
        controls
        ref={audioRef}
        style={{ display: "none" }}
        onTimeUpdate={handleTimeUpdate}
      />
      <p className="absolute left-[50%] translate-x-[-50%] w-[90vw] bottom-12 mb-4 text-black font-semibold text-2xl rounded-sm z-40">
        <span className="bg-yellow-600">{caption}</span>
      </p>
    </>
  );
};

export default AudioPlayer;
