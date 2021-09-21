import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  progressLoaderContainer: {
    display: "flex",
    gap: "1em",
    alignItems: "center",
  },
});

function ProgressLoader(props) {
  const { children, ...args } = props;
  const classes = useStyles();
  return (
    <div className={classes.progressLoaderContainer} {...args}>
      <CircularProgress></CircularProgress>
      {children}
    </div>
  );
}

export default ProgressLoader;
