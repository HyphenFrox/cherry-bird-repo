import React from "react";
import { makeStyles } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import classNames from "classnames";

//
import getResponsiveSquare from "../services/getResponsiveSquare";
//

const useStyles = makeStyles({
  userIcon: {
    maxWidth: "60px",
    borderRadius: "50% 50%",
  },
  defaultUserIcon: {
    maxWidth: "50px",
  },
});

function UserIcon(props) {
  const { userIconURL } = props;
  const userIconStyles = (iconUrl) => {
    if (iconUrl) {
      return {
        backgroundImage: `url(${iconUrl})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      };
    }
    return null;
  };

  const classes = useStyles();
  const responsiveSquare = getResponsiveSquare();

  if (userIconURL) {
    return (
      <div
        className={classNames(responsiveSquare.square, classes.userIcon)}
        style={{ ...userIconStyles(userIconURL), margin: "auto" }}
      ></div>
    );
  }

  return (
    <PersonIcon
      className={classes.defaultUserIcon}
      style={{
        margin: "auto",
      }}
    ></PersonIcon>
  );
}

export default UserIcon;
