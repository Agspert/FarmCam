import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <div className=" flex flex-col min-h-screen w-screen ">{children}</div>
  );
};

export default RootLayout;
