import logo from "./logo.svg";
import "./App.css";
import NavBar from "@/components/navbar";

import RootLayout from "@/components/layout/root-layout";
import THREECanvas from "@/components/viewer";
import Model from "@//components/model";
import { RWebShare } from "react-web-share";

import { SendHorizonal, MapPin, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button, buttonVariants } from "./components/ui/button";
import { cn } from "./lib/utils";
import { useEffect, useRef, useState } from "react";
import FBXModel from "./components/fbxModel";
function App() {
  const lat = 27.629683;
  const lon = 78.106681;

  const [domTouched, setDomTouched] = useState(false);
  const [audio] = useState(() => new Audio("./Love-Me-Like-You-Do.mp3"));
  const [progress, setProgress] = useState("0");
  const [seconds, setSeconds] = useState(1);
  const [width, setWidth] = useState("0px");

  const [paused, setPaused] = useState<boolean>(false)
  const [caption, setCaption] = useState<string | undefined>(undefined);

  useEffect(() => {
    let interval: any;
    if (domTouched) {
      console.log("in if")
      audio.play();
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [domTouched]);

  const dd = [
    { id: 0, startTime: 0, endTime: 5, text: "Love Me Like You Do" },
    { id: 1, startTime: 5, endTime: 10, text: "Ellie Goulding" },
    {
      id: 2,
      startTime: 19.39,
      endTime: 22.54,
      text: "You're the light, you're the night",
    },
    {
      id: 3,
      startTime: 22.54,
      endTime: 24.42,
      text: "You're the colour of my blood",
    },
    {
      id: 4,
      startTime: 24.42,
      endTime: 27.17,
      text: "You're the cure, you're the pain",
    },
    {
      id: 5,
      startTime: 27.17,
      endTime: 31.92,
      text: "You're the only thing I wanna touch",
    },
    {
      id: 6,
      startTime: 31.92,
      endTime: 36.31,
      text: "Never knew that it could mean so much,",
    },
    { id: 7, startTime: 36.31, endTime: 39.2, text: "so much" },
    {
      id: 8,
      startTime: 39.84,
      endTime: 42.47,
      text: "You're the fear, I don't care",
    },
    {
      id: 9,
      startTime: 42.47,
      endTime: 44.87,
      text: "'Cause I've never been so high",
    },
    { id: 10, startTime: 44.87, endTime: 47.12, text: "Follow me to the dark" },
    {
      id: 11,
      startTime: 47.12,
      endTime: 52.51,
      text: "Let me take you past our satellites",
    },
    {
      id: 12,
      startTime: 52.51,
      endTime: 56.76,
      text: "You can see the world you brought to life,",
    },
    { id: 13, startTime: 56.76, endTime: 58.65, text: "to life" },
    {
      id: 14,
      startTime: 60.05,
      endTime: 64.68,
      text: "So love me like you do, lo-lo-love me like you do",
    },
    {
      id: 15,
      startTime: 64.68,
      endTime: 70.18,
      text: "Love me like you do, lo-lo-love me like you do",
    },
    {
      id: 16,
      startTime: 70.18,
      endTime: 76.43,
      text: "Touch me like you do, to-to-touch me like you do",
    },
    {
      id: 17,
      startTime: 76.43,
      endTime: 79.83,
      text: "What are you waiting for?",
    },
    { id: 18, startTime: 79.83, endTime: 82.83, text: "Fading in, fading out" },
    {
      id: 19,
      startTime: 82.83,
      endTime: 85.33,
      text: "On the edge of paradise",
    },
    {
      id: 20,
      startTime: 85.33,
      endTime: 92.59,
      text: "Every inch of your skin is a holy grail I've got to find",
    },
    {
      id: 21,
      startTime: 92.59,
      endTime: 99.08,
      text: "Only you can set my heart on fire, on fire",
    },
    {
      id: 22,
      startTime: 99.479,
      endTime: 105.13,
      text: "Yeah, I'll let you set the pace",
    },
    {
      id: 23,
      startTime: 105.13,
      endTime: 110.52000000000001,
      text: "'Cause I'm not thinking straight",
    },
    {
      id: 24,
      startTime: 110.52000000000001,
      endTime: 117.52000000000001,
      text: "My head's spinning around I can't see clear no more",
    },
    {
      id: 25,
      startTime: 117.52000000000001,
      endTime: 120.77,
      text: "What are you waiting for?",
    },
    {
      id: 26,
      startTime: 120.77,
      endTime: 126.42,
      text: "Love me like you do, lo-lo-love me like you do (like you do)",
    },
    {
      id: 27,
      startTime: 126.42,
      endTime: 130.32,
      text: "Love me like you do, lo-lo-love me like you do",
    },
    {
      id: 28,
      startTime: 130.32,
      endTime: 137.24,
      text: "Touch me like you do, to-to-touch me like you do",
    },
    {
      id: 29,
      startTime: 137.24,
      endTime: 141.13,
      text: "What are you waiting for?",
    },
    {
      id: 30,
      startTime: 141.13,
      endTime: 146.639,
      text: "Love me like you do, lo-lo-love me like you do (like you do)",
    },
    {
      id: 31,
      startTime: 146.639,
      endTime: 151.13,
      text: "Love me like you do, lo-lo-love me like you do (yeah)",
    },
    {
      id: 32,
      startTime: 151.13,
      endTime: 157.38,
      text: "Touch me like you do, to-to-touch me like you do",
    },
    {
      id: 33,
      startTime: 157.38,
      endTime: 161.38,
      text: "What are you waiting for?",
    },
    {
      id: 34,
      startTime: 171.139,
      endTime: 176.55,
      text: "I'll let you set the pace",
    },
    {
      id: 35,
      startTime: 176.55,
      endTime: 180.7,
      text: "'Cause I'm not thinking straight",
    },
    {
      id: 36,
      startTime: 180.7,
      endTime: 190.21,
      text: "My head's spinning around I can't see clear no more",
    },
    {
      id: 37,
      startTime: 190.21,
      endTime: 193.84,
      text: "What are you waiting for?",
    },
    {
      id: 38,
      startTime: 193.84,
      endTime: 199.59,
      text: "Love me like you do, lo-lo-love me like you do (like you do)",
    },
    {
      id: 39,
      startTime: 199.59,
      endTime: 204.09,
      text: "Love me like you do, lo-lo-love me like you do (yeah)",
    },
    {
      id: 40,
      startTime: 204.09,
      endTime: 211.23,
      text: "Touch me like you do, to-to-touch me like you do",
    },
    {
      id: 41,
      startTime: 211.23,
      endTime: 214.73,
      text: "What are you waiting for?",
    },
    {
      id: 42,
      startTime: 214.73,
      endTime: 219.62,
      text: "Love me like you do, lo-lo-love me like you do (like you do)",
    },
    {
      id: 43,
      startTime: 219.62,
      endTime: 224.77,
      text: "Love me like you do, lo-lo-love me like you do (oh)",
    },
    {
      id: 44,
      startTime: 224.77,
      endTime: 231.77,
      text: "Touch me like you do, to-to-touch me like you do",
    },
    {
      id: 45,
      startTime: 231.77,
      endTime: 234.77,
      text: "What are you waiting for?",
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
    if(paused){
      audio.play();
      setPaused(false)
    } else {
      audio.pause()
      setPaused(true)
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen w-screen relative"
      onClick={() => setDomTouched(true)}
    >
      <THREECanvas />
      {/* <div className="absolute bottom right-2 z-50">
        <Model />
        <FBXModel />
      </div> */}
      <div className="absolute top-[50%] right-4 flex flex-col gap-2 z-50">
        <RWebShare
          data={{
            text: "this is dummy text",
            url: `${window.location.href}`,
            title: "This is just a dummy title for testing purposes",
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
        <Button size="icon" className="rounded-full bg-slate-100" onClick={handleClick} >
          {paused ? 
          <Play className="w-4 h-4 text-black" />
          :
          <Pause className="w-4 h-4 text-black" /> 
        }
          </Button>
      </div>
      <div
        style={{ width: width }}
        className="absolute top-0 border-2 border-red-600 z-50"
      ></div>
      <p className="absolute bottom-4 text-black font-semibold text-2xl rounded-sm z-40 bg-yellow-600 px-2 backdrop-blur-sm">
        {caption}
      </p>
    </div>
  );
}

export default App;
