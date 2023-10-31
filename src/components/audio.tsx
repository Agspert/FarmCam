import React, { SetStateAction, useState } from "react";
import Bars from "@/components/bars";

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  src: string;
  setAudioSrc: React.Dispatch<React.SetStateAction<string>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  width: string;
  setWidth: React.Dispatch<SetStateAction<string>>;
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
];

const cc = [
  {
    id: 1,
    startTime: 0,
    endTime: 5.09,
    text: "Now, we are gaining more visibility, thus reaching end consumers efficiently.",
  },
  {
    id: 2,
    startTime: 5.09,
    endTime: 12.79,
    text: "By the way, you can tap on the share button to share my story with your friends, or use the location button to find my farm on the map.",
  },
  {
    id: 3,
    startTime: 12.79,
    endTime: 17.81,
    text: "Do visit my farm to enjoy a day full of nature and fresh food from our ethnic kitchen.",
  },
  {
    id: 4,
    startTime: 17.81,
    endTime: 22.18,
    text: "Meanwhile, enjoy your tea grown right here at my farm!",
  },
];
const AudioPlayer = ({
  audioRef,
  src,
  setAudioSrc,
  currentIndex,
  setCurrentIndex,
  setUrl,
  width,
  setWidth,
}: Props) => {
  const [caption, setCaption] = useState("");

  const divRef = React.useRef<HTMLDivElement | null>(null);
  const handleTimeUpdate = (e: any) => {
    const time = audioRef.current?.currentTime || 1;
    let text: any = "";
    if (src === "./main_1.mp3") {
      text = dd.find((segment) => {
        if (segment.startTime < time && segment.endTime >= time) {
          return segment;
        }
      });
    } else {
      text = cc.find((segment) => {
        if (segment.startTime < time && segment.endTime >= time) {
          return segment;
        }
      });
    }

    if (text && text.text) {
      setCaption(text.text);
    }

    // progress bar
    if (audioRef && audioRef.current?.duration) {
      // calculating bar width
      // ("gap-2" * (bars - 1)) "px-4" ("border-2" * (bars * 2))
      // 16 * (3-1) + (16px * 2)
      // console.log(window.innerWidth , Math.floor((window.innerWidth - 64)/ 3))
      const w = Math.floor((window.innerWidth - 48) / 2);
      const chuncks = Math.fround(w / audioRef.current.duration);
      let width = chuncks * Math.ceil(audioRef.current.currentTime);
      width = width > w ? w : width;
      setWidth(`${width}px`);
    }
  };

  const handleEnd = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.log("audio ended", e);
    if (src === "./main_1.mp3") {
      setWidth("0px");
      setUrl("farm2.jpg");
      setAudioSrc("./main_2.mp3");
      setCurrentIndex(() => 1);
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
        onEnded={(e) => handleEnd(e)}
      />
      <p className="absolute left-[50%] translate-x-[-50%] w-[90vw] bottom-12 mb-4 text-black font-semibold text-2xl rounded-sm z-40">
        <span className="bg-yellow-600">{caption}</span>
      </p>
    </>
  );
};

export default AudioPlayer;
