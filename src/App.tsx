import logo from "./logo.svg";
import "./App.css";
import NavBar from "@/components/navbar";

import RootLayout from "@/components/layout/root-layout";
import THREECanvas from "@/components/viewer";
import Model from "@//components/model";
import { RWebShare } from "react-web-share";

import { SendHorizonal, MapPin } from "lucide-react";
import { Button, buttonVariants } from "./components/ui/button";
import { cn } from "./lib/utils";
import { useEffect, useRef, useState } from "react";
import FBXModel from "./components/fbxModel";
function App() {
  const lat = 27.629683;
  const lon = 78.106681;

  const [domTouched, setDomTouched] = useState(false);
  const [audio] = useState(() => new Audio("./mixkit.wav"));
  const [progress, setProgress] = useState("0");
  const [seconds, setSeconds] = useState(1);
  const [width, setWidth] = useState("0px");

  useEffect(() => {
    let interval: any;
    if (domTouched) {
      audio.play();
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [domTouched]);

  useEffect(() => {
    console.log("sedon", seconds);
    if (seconds <= audio.duration) {
      const chuncks = Math.ceil(window.innerWidth / audio.duration);
      let width = chuncks * seconds;
      width = width > window.innerWidth ? window.innerWidth : width;
      console.log(width);
      setWidth(`${width}px`);
    }
  }, [seconds]);

  return (
    <div
      className="flex flex-col min-h-screen w-screen relative"
      onClick={() => setDomTouched(true)}
    >
      <THREECanvas />
      <div className="absolute bottom right-2">
        {/* <Model /> */}
        <FBXModel />
      </div>
      <div className="absolute top-[50%] right-4 flex flex-col gap-2">
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
      </div>
      <div
        style={{ width: width }}
        className="absolute top-0 border-2 border-red-600 z-50"
      >
      </div>
    </div>
  );
}

export default App;
