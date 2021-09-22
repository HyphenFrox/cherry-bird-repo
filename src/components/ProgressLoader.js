import React from "react";
import { CircularProgress } from "@material-ui/core";

//
import useFlexbox from "../services/useFlexbox";
//

function ProgressLoader(props) {
  const { children, ...args } = props;
  const flexbox = useFlexbox();

  return (
    <div className={flexbox.flexboxRow} {...args}>
      <CircularProgress></CircularProgress>
      {children}
    </div>
  );
}

export default ProgressLoader;
