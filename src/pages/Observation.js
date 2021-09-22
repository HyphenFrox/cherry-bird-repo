import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";
import classNames from "classnames";

//
import ProgressLoader from "../components/ProgressLoader";
import fetchObservation from "../services/fetchObservation";
import ObservationDetails from "../components/ObservationDetails";
import UserDetails from "../components/UserDetails";
import AppHeader from "../components/AppHeader";
import useResponsiveSquare from "../services/useResponsiveSquare";
import useFlexbox from "../services/useFlexbox";
//

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: "100%",
  },
  content: {
    padding: "1em 0",
    "& > *": {
      margin: "1em",
    },
  },
  commonName: {
    fontSize: "2rem",
    fontWeight: "400",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "initial",
    },
  },
  speciesName: {
    fontSize: "1.8rem",
    fontStyle: "italic",
    color: "hsla(0, 70%, 0%, 0.6)",
  },
  obsvDetailsGridBox: {
    display: "grid",
    gridTemplateColumns: "70% 30%",
    gap: "0.5em",
    "@media screen and (max-aspect-ratio: 1/1)": {
      gridTemplateColumns: "100%",
    },
  },
  obsvDetailsColumn: {
    display: "flex",
    flexFlow: "column nowrap",
    gap: "0.5em",
  },
  obsvPhoto: {
    "&:after": {
      paddingBottom: "50%",
      "@media screen and (max-aspect-ratio: 1/1)": {
        paddingBottom: "100%",
      },
    },
  },
  progressLoader: {
    minHeight: "100%",
  },
  error: {
    minHeight: "100%",
  },
}));
function Test() {
  const { observationID } = useParams();
  const {
    status: obsvStatus,
    data: obsvData,
    error: obsvError,
  } = useQuery(["observation", observationID], fetchObservation);

  const photoDivStyles = (url) => {
    if (url) {
      url = url.replace("square", "original");
      return {
        backgroundImage: `url(${url})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      };
    }
    return null;
  };

  const classes = useStyles();
  const responsiveSquare = useResponsiveSquare();
  const flexbox = useFlexbox();

  if (obsvStatus === "success") {
    const observation = obsvData.results[0];
    const obsvHasPhotos =
      observation.hasOwnProperty("observation_photos") &&
      observation.observation_photos.length > 0;

    return (
      <div className={classes.page}>
        {/* header */}
        <AppHeader></AppHeader>
        {/*  */}

        {/* content */}
        <div className={classes.content}>
          {/* heading */}
          <Typography className={classes.commonName} variant="h1">
            {observation?.species_guess ?? "Common Name N/A"}{" "}
            <span className={classes.speciesName}>
              {`(${observation?.taxon?.name ?? "Unknown Scientific Name"}, ${
                observation?.taxon?.iconic_taxon_name ?? "Unknown Kind"
              })`}
            </span>
          </Typography>
          {/*  */}

          {/* observation details grid */}
          <div className={classes.obsvDetailsGridBox}>
            <div className={classes.obsvDetailsColumn}>
              {obsvHasPhotos ? (
                <Carousel autoPlay={false}>
                  {observation.observation_photos.map((photo_object, index) => {
                    return (
                      <div
                        className={classNames(
                          responsiveSquare.square,
                          classes.obsvPhoto
                        )}
                        style={photoDivStyles(photo_object?.photo?.url)}
                        key={index}
                      >
                        {photo_object?.photo?.url ? null : (
                          <div className={responsiveSquare.content}>
                            <Typography variant="subtitle2" align="center">
                              Photo Unavaliable
                            </Typography>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <Typography
                  variant="h5"
                  align="center"
                  style={{ fontSize: "1rem" }}
                >
                  No Observation Photos Found
                </Typography>
              )}
              <ObservationDetails
                observation={observation}
              ></ObservationDetails>
            </div>
            <UserDetails userDetails={observation.user}></UserDetails>
          </div>
          {/*  */}

          {/* attributions */}
          {obsvHasPhotos ? (
            <div>
              <Typography
                variant="h2"
                gutterBottom
                style={{ fontSize: "2rem" }}
              >
                Attributions
              </Typography>
              <Typography>
                {observation.observation_photos
                  .map((photo_object) => photo_object.photo.attribution)
                  .filter((item, i, ar) => ar.indexOf(item) === i)
                  .map((att) => att)}
              </Typography>
            </div>
          ) : null}
          {/*  */}
        </div>
        {/*  */}
      </div>
    );
  }

  if (obsvStatus === "loading") {
    return (
      <div
        className={classNames(flexbox.flexboxColumn, classes.progressLoader)}
      >
        <ProgressLoader>
          <Typography variant="h5" style={{ fontSize: "1.5rem" }}>
            Loading Observation Data
          </Typography>
        </ProgressLoader>
      </div>
    );
  }

  if (obsvStatus === "error") {
    return (
      <div className={classNames(flexbox.flexboxColumn, classes.error)}>
        <Typography align="center" variant="h5">
          Error fetching observation data: {obsvError.toString()}
        </Typography>
      </div>
    );
  }

  return null;
}

export default Test;
