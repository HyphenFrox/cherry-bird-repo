import React from "react";
import { AppBar, Link, Toolbar } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

function AppHeader() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          variant="h1"
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
