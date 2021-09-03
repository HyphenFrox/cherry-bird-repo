import React from "react";
import { CircularProgress } from "@material-ui/core";

function ProgressLoader({ className, ...args }) {
  return (
    <div className={className} {...args}>
      <CircularProgress></CircularProgress>
      {args.children}
    </div>
  );
}

export default ProgressLoader;
