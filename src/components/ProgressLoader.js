import React from "react";
import { CircularProgress } from "@material-ui/core";

//
import getFlexbox from "../services/getFlexbox";
//

function ProgressLoader(props) {
  const { children, ...args } = props;
  const flexbox = getFlexbox();

  return (
    <div className={flexbox.flexboxRow} {...args}>
      <CircularProgress></CircularProgress>
      {children}
    </div>
  );
}

export default ProgressLoader;
