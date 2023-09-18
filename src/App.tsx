import logo from "./logo.svg";
import "./App.css";
import NavBar from "@/components/navbar";

import RootLayout from "@/components/layout/root-layout";
import THREECanvas from "@/components/viewer";
import Model from "@//components/model";

function App() {
  return (
    // <RootLayout>
    //   <NavBar />
    //   <div className="boder-2 border-pink-600 width-full max-h-[400px] px-2">
    //     <Slider />
    //   </div>
    //   <Model />
    // </RootLayout>
      <THREECanvas />
  );
}

export default App;
