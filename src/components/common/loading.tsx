import clsx from "clsx";
import React from "react";

interface LoadingProps {
  type: "spinner" | "dots" | "ring" | "bars" | "gif" | "svg";
  size: "xs" | "sm" | "md" | "lg";
}

const Loading: React.FC<LoadingProps> = ({ size, type }) => {
  if (type === "gif") {
    return <img src="/gifs/loading.gif" alt="loading"></img>;
  }

  if (type === "svg") {
    return <img src="/svgs/loading.svg" alt="loading"></img>;
  }

  return (
    <div
      className={clsx(
        `loading text-primary `,
        type === "dots" && `loading-dots`,
        type === "ring" && `loading-ring`,
        type === "spinner" && `loading-spinner`,
        type === "bars" && `loading-bars`,
        size === "lg" && `loading-lg`,
        size === "md" && `loading-md`,
        size === "sm" && `loading-sm`,
        size === "xs" && `loading-xs`
      )}
    ></div>
  );
};

export default Loading;
