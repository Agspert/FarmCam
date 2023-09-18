import React, { ReactNode } from "react";

interface RootLayoutProps {
  children : ReactNode
}

const RootLayout = ( props: any ) => {
  return (
    <div className=" flex flex-col min-h-screen w-screen ">{props.children}</div>
  );
};

export default RootLayout;
