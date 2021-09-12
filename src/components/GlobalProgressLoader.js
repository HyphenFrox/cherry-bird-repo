import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  progressLoaderContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: "1em",
    },
  },
});

function GlobalProgressLoader(props) {
  const { children, ...args } = props;
  const classes = useStyles();
  return (
    <div className={classes.progressLoaderContainer} {...args}>
      <CircularProgress></CircularProgress>
      {children}
    </div>
  );
}

export default GlobalProgressLoader;
