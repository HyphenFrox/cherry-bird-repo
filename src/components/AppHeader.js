import React from "react";
import { AppBar, Link, Toolbar } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";

function AppHeader() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link
          variant="h1"
          href="/"
          underline="none"
          style={{ fontSize: "2rem", color: "white" }}
        >
          Cherry Bird Repo
        </Link>
        <div style={{ flexGrow: 1 }}></div>
        <Link
          href="https://github.com/HyphenFrox/cherry-bird-repo"
          target="_blank"
        >
          <GitHub style={{ color: "white" }} fontSize="large"></GitHub>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
