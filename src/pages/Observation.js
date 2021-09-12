import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";

//
import GlobalProgressLoader from "../components/GlobalProgressLoader";
import fetchObservation from "../services/fetchObservation";
import ObservationDetails from "../components/ObservationDetails";
import UserDetails from "../components/UserDetails";
import AppHeader from "../components/AppHeader";
//

const useStyles = makeStyles((theme) => ({
  page: {
    width: "100%",
    height: "100%",
    paddingTop: "1em",
    paddingBottom: "1em",
    "& > * + *": {
      marginTop: "1em",
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
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
  obsvDetailsBox: {
    display: "grid",
    gridTemplateColumns: "70% 30%",
    "@media screen and (max-aspect-ratio: 1/1)": {
      gridTemplateColumns: "100%",
    },
    "& > *:first-child": {
      padding: "0.5em",
    },
  },
  obsvDetailsSection: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
  },
  noPhotos: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "100%",
    alignContent: "center",
  },
  obsvPhoto: {
    position: "relative",
    width: "100%",
    "&:after": {
      content: "''",
      display: "block",
      paddingBottom: "50%",
      "@media screen and (max-aspect-ratio: 1/1)": {
        paddingBottom: "100%",
      },
    },
  },
  noPhoto: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "100%",
    alignContent: "center",
  },
  userDetailsSection: {
    "& > *": {
      padding: "1em",
      borderBottom: "3px solid lightGray",
      "&:first-child": {
        borderTop: "3px solid lightGray",
      },
    },
  },
  error: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "100%",
    alignContent: "center",
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
    return {};
  };

  const classes = useStyles();

  if (obsvStatus === "success") {
    const observation = obsvData.results[0];
    const obsvHasPhotos =
      observation.hasOwnProperty("observation_photos") &&
      observation.observation_photos.length > 0;

    return (
      <div className={classes.root}>
        <AppHeader></AppHeader>
        <div className={classes.page}>
          <Typography className={classes.commonName} variant="h1">
            {observation?.species_guess ?? "Common Name N/A"}{" "}
            <span className={classes.speciesName}>
              {`(${observation?.taxon?.name ?? "Unknown Scientific Name"}, ${
                observation?.taxon?.iconic_taxon_name ?? "Unknown Kind"
              })`}
            </span>
          </Typography>

          <div className={classes.obsvDetailsBox}>
            <div className={classes.obsvDetailsSection}>
              {obsvHasPhotos ? (
                <Carousel autoPlay={false}>
                  {observation.observation_photos.map((photo_object, index) => {
                    return (
                      <div
                        className={classes.obsvPhoto}
                        style={photoDivStyles(
                          photo_object?.photo?.url ?? false
                        )}
                        key={index}
                      >
                        {photo_object?.photo?.url ? null : (
                          <div className={classes.noPhoto}>
                            <Typography align="center">
                              Photo Unavaliable
                            </Typography>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <div className={classes.noPhotos}>
                  <Typography align="center">
                    No Observation Photos Found
                  </Typography>
                </div>
              )}
              <ObservationDetails
                observation={observation}
              ></ObservationDetails>
            </div>
            <UserDetails
              userDetails={observation.user}
              className={classes.userDetailsSection}
            ></UserDetails>
          </div>
          {obsvHasPhotos ? (
            <div style={{ padding: "0.5em" }}>
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
        </div>
      </div>
    );
  }

  if (obsvStatus === "loading") {
    return (
      <GlobalProgressLoader>
        <Typography variant="h5">Loading Observation Data</Typography>
      </GlobalProgressLoader>
    );
  }

  if (obsvStatus === "error") {
    return (
      <div className={classes.error}>
        <Typography align="center" variant="h5">
          Error fetching observation data: {obsvError.toString()}
        </Typography>
      </div>
    );
  }

  return null;
}

export default Test;
