import React from "react";
import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

// icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonIcon from "@material-ui/icons/Person";
//

//
import getResponsiveSquare from "../services/getResponsiveSquare";
import useFlexBox from "../services/getFlexbox";
//

const useStyles = makeStyles((theme) => ({
  observationCard: {
    backgroundColor: "hsla(144, 100%, 50%, 0.3)",
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up("sm")]: {
      cursor: "pointer",
      "&:hover": {
        boxShadow: theme.shadows[10],
      },
    },
    "& > *": {
      marginTop: "0.5em",
    },
  },
  obsvLocation: {
    gap: "0.5em",
    justifyContent: "flex-start",
  },
  userAndTimeInfoBox: {
    marginTop: "0.5em",
    justifyContent: "flex-start",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: "50% 50%",
  },
}));

function ObservationCard(props) {
  const { observationData, ...args } = props;

  const created_at = new Date(observationData?.created_at);
  const time_observed_at = new Date(observationData?.time_observed_at);

  //for more details button
  const appTheme = useTheme();
  const isDesktop = useMediaQuery(appTheme.breakpoints.up("sm"));
  const history = useHistory();
  const handleCardClick = (observationID) => () =>
    history.push(`/observation/${observationID}`);
  //

  //observation photo styles
  const observationPhotoStyles = (url) => {
    if (url) {
      url = url.replace("square", "original");
      const styles = {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      };
      return styles;
    } else return null;
  };
  //

  //user icon styles
  const userIconStyles = (iconUrl) => {
    return {
      backgroundImage: `url(${iconUrl})`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
  };
  //

  const classes = useStyles({ isDesktop });
  const responsiveSquare = getResponsiveSquare();
  const flexbox = useFlexBox();

  return (
    <Card
      className={classes.observationCard}
      onClick={isDesktop ? handleCardClick(observationData.id) : null}
      {...args}
    >
      <CardContent>
        {/* photo */}
        <div
          className={responsiveSquare.square}
          style={observationPhotoStyles(
            observationData?.observation_photos[0]?.photo?.url
          )}
        >
          {observationData?.observation_photos[0]?.photo?.url ? null : (
            <div
              className={classNames(
                responsiveSquare.content,
                flexbox.flexboxColumn
              )}
            >
              <Typography variant="subtitle2" align="center">
                No Photo Available
              </Typography>
            </div>
          )}
        </div>
        {/*  */}

        {/* common name */}
        <Typography variant="subtitle1" style={{ marginTop: "1em" }}>
          {observationData?.taxon?.preferred_common_name ?? "Common Name N/A"}
        </Typography>
        {/*  */}

        {/* scientific name */}
        <Typography
          variant="subtitle1"
          style={{
            fontSize: "0.9rem",
            fontStyle: "italic",
          }}
        >
          {`${observationData?.species_guess ?? "Unkown Scientific Name"}, ${
            observationData?.taxon?.iconic_taxon_name ?? "Unknown Kind"
          }`}
        </Typography>
        {/*  */}

        {/* location box */}
        <div className={classNames(flexbox.flexboxRow, classes.obsvLocation)}>
          <LocationOnIcon></LocationOnIcon>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: "0.85rem",
            }}
          >
            {observationData?.place_guess ?? "Location N/A"}
          </Typography>
        </div>
        {/*  */}

        {/* user and time info box */}
        <div
          className={classNames(
            flexbox.flexboxRowWrap,
            classes.userAndTimeInfoBox
          )}
        >
          {/* user name */}
          <div className={flexbox.flexboxRow} style={{ gap: "0.5em" }}>
            {observationData?.user?.icon_url ? (
              <div
                className={classes.userIcon}
                style={userIconStyles(observationData?.user?.icon_url)}
              ></div>
            ) : (
              <PersonIcon></PersonIcon>
            )}
            <Typography
              variant="subtitle1"
              style={{
                fontSize: "1rem",
              }}
            >
              {observationData?.user?.name ?? "Unknown Observer"}
            </Typography>
          </div>
          {/*  */}

          {/* observed on time */}
          <div className={flexbox.flexboxRow}>
            <VisibilityIcon></VisibilityIcon>
            <Typography
              variant="subtitle1"
              style={{
                fontSize: "1rem",
              }}
            >
              {observationData?.time_observed_at
                ? time_observed_at.toLocaleString()
                : "Observation Date Unknown"}
            </Typography>
          </div>
          {/*  */}

          {/* created at time */}
          <div className={flexbox.flexboxRow}>
            <CreateIcon></CreateIcon>
            <Typography
              variant="subtitle1"
              style={{
                fontSize: "1rem",
              }}
            >
              {observationData?.created_at
                ? created_at.toLocaleString()
                : "Creation Date Unknown"}
            </Typography>
          </div>
          {/*  */}
        </div>
        {/*  */}

        {/* more details button */}
        <div
          className={flexbox.flexboxRow}
          style={{ justifyContent: "flex-end" }}
        >
          {isDesktop ? null : (
            <Button href={`/observations/${observationData.id}`}>
              More Details
            </Button>
          )}
        </div>
        {/*  */}
      </CardContent>
    </Card>
  );
}

export default ObservationCard;
