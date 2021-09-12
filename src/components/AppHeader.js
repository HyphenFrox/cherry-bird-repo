import React from "react";
import { AppBar, Link, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { GitHub } from "@material-ui/icons";

const useStyles = makeStyles({
  spacer: {
    flexGrow: 1,
  },
});

function AppHeader() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Link
          variant="h1"
          href="/"
          underline="none"
          style={{ fontSize: "2rem", color: "white" }}
        >
          Cherry Bird Repo
        </Link>
        <div className={classes.spacer}></div>
        <Link
          href="https://github.com/HyphenFrox/cherry-bird-repo"
          target="_blank"
        >
          <GitHub style={{ color: "white" }}></GitHub>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
