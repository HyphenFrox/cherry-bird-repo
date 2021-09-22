import React from "react";
import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

//
import useResponsiveSquare from "../services/useResponsiveSquare";
import useFlexBox from "../services/useFlexbox";
//

const useStyles = makeStyles((theme) => ({
  observationCard: (props) => ({
    backgroundColor: "hsla(144, 100%, 50%, 0.3)",
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up(props.maxMobileWidth + 1)]: {
      cursor: "pointer",
      "&:hover": {
        boxShadow: theme.shadows[10],
      },
    },
    "& > *": {
      marginTop: "0.5em",
    },
  }),
  userAndTimeInfoBox: {
    marginTop: "0.5em",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "0.25em",
    },
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: "50% 50%",
  },
  iconAndTextBox: {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
  },
  moreDetailsButton: {
    marginLeft: "auto",
    marginTop: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: "initial",
      marginRight: "auto",
    },
  },
}));

function ObservationCard(props) {
  const { observationData, maxMobileWidth, ...args } = props;

  const created_at = new Date(observationData?.created_at);
  const time_observed_at = new Date(observationData?.time_observed_at);

  //for more details button
  const isMobile = useMediaQuery(`(max-width:${maxMobileWidth - 1}px)`);
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

  const classes = useStyles({ maxMobileWidth });
  const responsiveSquare = useResponsiveSquare();
  const flexbox = useFlexBox();

  return (
    <Card
      className={classes.observationCard}
      onClick={!isMobile ? handleCardClick(observationData.id) : null}
      {...args}
    >
      <CardContent>
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
        <Typography
          className={classes.observationCommonName}
          variant="subtitle1"
          style={{ marginTop: "1em" }}
        >
          {observationData?.taxon?.preferred_common_name ?? "Common Name N/A"}
        </Typography>
        <Typography
          className={classes.observationSpeciesName}
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
        <div className={classes.iconAndTextBox}>
          <LocationOnIcon></LocationOnIcon>
          <Typography
            className={classes.observationLocation}
            variant="subtitle1"
            style={{
              fontSize: "0.85rem",
            }}
          >
            {observationData?.place_guess ?? "Location N/A"}
          </Typography>
        </div>
        <div className={classes.userAndTimeInfoBox}>
          <div className={classes.iconAndTextBox}>
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
              className={classes.userName}
              style={{
                fontSize: "1rem",
              }}
            >
              {observationData?.user?.name ?? "Unknown Observer"}
            </Typography>
          </div>
          <div className={classes.iconAndTextBox}>
            <VisibilityIcon></VisibilityIcon>
            <Typography
              variant="subtitle1"
              className={classes.observedOnTime}
              style={{
                fontSize: "1rem",
              }}
            >
              {observationData?.time_observed_at
                ? time_observed_at.toLocaleString()
                : "Observation Date Unknown"}
            </Typography>
          </div>
          <div className={classes.iconAndTextBox}>
            <CreateIcon></CreateIcon>
            <Typography
              variant="subtitle1"
              className={classes.createdAtTime}
              style={{
                fontSize: "1rem",
              }}
            >
              {observationData?.created_at
                ? created_at.toLocaleString()
                : "Creation Date Unknown"}
            </Typography>
          </div>
          {isMobile ? (
            <Button
              href={`/observations/${observationData.id}`}
              className={classes.moreDetailsButton}
            >
              More Details
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default ObservationCard;
