import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

//
import useResponsiveSquare from "../services/useResponsiveSquare";
//

const useStyles = makeStyles({
  userIconBG: {
    borderRadius: "50% 50%",
  },
  defaultUserIcon: {
    margin: "auto",
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
  const responsiveSquare = useResponsiveSquare();

  if (userIconURL) {
    return (
      <div className={classNames(responsiveSquare.square)}>
        <div
          className={classNames(responsiveSquare.content, classes.userIconBG)}
          style={userIconStyles(userIconURL)}
        ></div>
      </div>
    );
  }

  return <PersonIcon className={classes.defaultUserIcon}></PersonIcon>;
}

export default UserIcon;
