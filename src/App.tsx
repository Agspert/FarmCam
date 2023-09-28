import logo from "./logo.svg";
import "./App.css";
import NavBar from "@/components/navbar";

import RootLayout from "@/components/layout/root-layout";
import THREECanvas from "@/components/viewer";
import Model from "@//components/model";
import { RWebShare } from "react-web-share";

import {
  SendHorizonal,
  MapPin,
  Play,
  Pause,
} from "lucide-react";
import { Button, buttonVariants } from "./components/ui/button";
import { cn } from "./lib/utils";
import { useEffect, useRef, useState } from "react";
function App() {
  const lat = 27.629683;
  const lon = 78.106681;

  const [domTouched, setDomTouched] = useState(false);
  const [audio] = useState(() => new Audio("./main.mp3"));
  const [progress, setProgress] = useState("0");
  const [seconds, setSeconds] = useState(1);
  const [width, setWidth] = useState("0px");

  const [paused, setPaused] = useState<boolean>(false);
  const [caption, setCaption] = useState<string | undefined>(undefined);

  useEffect(() => {
    let interval: any;
    if (domTouched) {
      console.log("in if");
      audio.play();
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [domTouched]);

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

  useEffect(() => {
    const text = dd.find((segment) => {
      if (
        segment.startTime < audio.currentTime &&
        segment.endTime >= audio.currentTime
      ) {
        return segment;
      }
    });
    if (text && text.text) {
      setCaption(text.text);
    }
  }, [audio.currentTime]);

  useEffect(() => {
    // if (seconds <= audio.duration) {
    const chuncks = Math.ceil(window.innerWidth / audio.duration);
    let width = chuncks * Math.ceil(audio.currentTime);
    width = width > window.innerWidth ? window.innerWidth : width;
    setWidth(`${width}px`);
    // }
  }, [audio.currentTime]);

  const handleClick = () => {
    if (paused) {
      audio.play();
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  };

  return (
    <div
      className="flex flex-col overflow-hidden min-h-screen w-screen relative"
      onClick={() => setDomTouched(true)}
    >
      <THREECanvas />
      {/* <div className="absolute bottom right-2 z-50">
        <Model />
        <FBXModel />
      </div> */}
      <div className="absolute top-[50%] translate-y-[-50%] right-4 flex flex-col gap-2 z-50">
        <RWebShare
          data={{
            text: "Prema's Farm",
            url: `${window.location.href}`,
            title: "",
          }}
        >
          <Button size="icon" className=" rounded-full bg-slate-100">
            <SendHorizonal className="text-black" />
          </Button>
        </RWebShare>
        <a
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "icon" }),
            "rounded-full bg-slate-100",
          )}
          href={`https://maps.google.com?q=${lat},${lon}`}
        >
          <MapPin className="text-black" />
        </a>
        <Button
          size="icon"
          className="rounded-full bg-slate-100"
          onClick={handleClick}
        >
          {paused ? (
            <Play className="w-4 h-4 text-black" />
          ) : (
            <Pause className="w-4 h-4 text-black" />
          )}
        </Button>
      </div>
      <div
        style={{ width: width }}
        className="absolute top-0 border-2 border-yellow-400 rounded-sm z-50"
      ></div>
      <p className="absolute left-[50%] translate-x-[-50%] w-[90vw] bottom-12 mb-4 text-black font-semibold text-2xl rounded-sm z-40">
        <span className="bg-yellow-600">{caption}</span>
      </p>
    </div>
  );
}

export default App;
