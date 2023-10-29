import React from "react";

type Props = {
  currentIndex: number;
  width?: string;
};

const bars = [
  {
    completed: true,
    isCurrent: false,
  },
  {
    completed: true,
    isCurrent: false,
  },
  // {
  //   completed: false,
  //   isCurrent: false,
  // },
];
const Bars = ({ currentIndex, width }: Props) => {
  return (
    <div className="absolute grid grid-cols-2 gap-2 h-4 top-4 px-4  w-screen">
      {bars.map((bar, index) => {
        return (
          <div
            key={index}
            className="h-2 border-2 border-yellow-400 rounded-sm z-50"
          >
            <div
              style={{
                width: `${
                  index === currentIndex
                    ? width
                    : index < currentIndex
                    ? "100%"
                    : ""
                }`,
              }}
              className={` h-full ${
                index < currentIndex
                  ? "w-full bg-yellow-400"
                  : "w-0 bg-yellow-400"
              } `}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default Bars;
