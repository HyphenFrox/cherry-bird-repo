import React, { useState } from "react";
import { makeStyles, Typography, Link } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import { useQuery } from "react-query";
import classNames from "classnames";

//
import ProgressLoader from "../components/ProgressLoader";
import { filterDetails } from "../services/filterDetails";
import Filters from "../components/Filters";
import fetchObservations from "../services/fetchObservations";
import findFilterIndexInArray from "../services/findFilterIndexInArray";
import ObservationCard from "../components/ObservationCard";
import { dateViewLabelToValue } from "../services/dateViewConversion";
import DateFilter from "../components/DateFilter";
import PaginationFilter from "../components/PaginationFilter";
import getFlexbox from "../services/getFlexbox";
//

const observationCardMaxWidth = 300;

const useStyles = makeStyles((theme) => ({
  page: {
    minHeight: "100%",
  },
  content: {
    justifyContent: "initial",
    padding: "0 1em",
    "& > *": {
      margin: "1em",
    },
  },
  header: {
    height: 50,
    padding: "2em",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  filterSection: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "75%",
    },
  },
  observationResults: {
    gap: "2em",
    "& > *": {
      alignSelf: "flex-start",
      maxWidth: observationCardMaxWidth,
    },
  },
  progressLoaderSection: {
    minHeight: 200,
  },
}));

function Homepage() {
  //create simpler filter state
  const [filterState, setFilterState] = useState(
    filterDetails.map((filter) => ({
      filterName: filter.filterName,
      elementType: filter.elementType,
      selected: filter.selected,
    }))
  );
  //

  //fetch observations
  const {
    status: obsvStatus,
    error: obsvError,
    data: obsvData,
  } = useQuery(["observationResults", filterState], fetchObservations);

  if (obsvStatus === "error") {
    console.error(obsvError);
  }
  //

  //handle functions
  function handleDateViewValueChange(...args) {
    const [, value] = args;
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, "dateView")].selected = value;
      return [...newState];
    });
  }

  function handlePageChange(...args) {
    const [, page] = args;
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, "page")].selected = page;
      return [...newState];
    });
  }

  function handleChangeRowsPerPage(event) {
    setFilterState((state) => {
      let newState = state;
      newState[findFilterIndexInArray(newState, "per_page")].selected =
        parseInt(event.target.value, 10);
      newState[findFilterIndexInArray(newState, "page")].selected = 0;
      return [...newState];
    });
  }
  //

  const classes = useStyles();
  const flexbox = getFlexbox();

  return (
    <div className={classes.page}>
      {/* header */}
      <div className={classes.header}>
        <Link
          href="https://github.com/HyphenFrox/cherry-bird-repo"
          target="_blank"
        >
          <GitHub fontSize="large"></GitHub>
        </Link>
      </div>
      {/*  */}

      <div className={classNames(flexbox.flexboxColumn, classes.content)}>
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          style={{ margin: "0.5em", textTransform: "uppercase" }}
        >
          {obsvStatus === "success"
            ? `${obsvData.total_results.toLocaleString()} `
            : null}
          WildLife Oservations
          {filterState[findFilterIndexInArray(filterState, "dateView")]
            .selected === dateViewLabelToValue("daily")
            ? ` Today`
            : filterState[findFilterIndexInArray(filterState, "dateView")]
                .selected === dateViewLabelToValue("monthly")
            ? ` This Month`
            : filterState[findFilterIndexInArray(filterState, "dateView")]
                .selected === dateViewLabelToValue("yearly")
            ? ` This Year`
            : null}
          {filterState[findFilterIndexInArray(filterState, "isNearbyOn")]
            .selected
            ? " Around You"
            : null}
        </Typography>
        {/*  */}

        {/* main filter section */}
        <div className={classes.filterSection}>
          <Filters
            filterState={filterState}
            setFilterState={setFilterState}
            filterDetails={filterDetails}
          ></Filters>
        </div>
        {/*  */}

        {/* top results filter section */}
        <div className={flexbox.flexboxRowWrap}>
          <DateFilter
            dateViewValue={
              filterState[findFilterIndexInArray(filterState, "dateView")]
                .selected
            }
            handleDateViewValueChange={handleDateViewValueChange}
          ></DateFilter>
          <PaginationFilter
            obsvStatus={obsvStatus}
            obsvData={obsvData}
            filterState={filterState}
            handlePageChange={handlePageChange}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          ></PaginationFilter>
        </div>
        {/*  */}

        {/* observation results and progress loader */}
        {obsvStatus === "loading" ? (
          <div
            className={classNames(
              flexbox.flexboxColumn,
              classes.progressLoaderSection
            )}
          >
            <ProgressLoader>
              <Typography variant="h5" style={{ fontSize: "1.3rem" }}>
                Loading Observations
              </Typography>
            </ProgressLoader>
          </div>
        ) : obsvStatus === "success" ? (
          <>
            <div
              className={classNames(
                flexbox.flexboxRowWrap,
                classes.observationResults
              )}
            >
              {obsvData.results.map((observationData, index) => (
                <ObservationCard
                  observationData={observationData}
                  key={index}
                ></ObservationCard>
              ))}
            </div>

            {/* bottom results filter section */}
            <div className={flexbox.flexboxRowWrap}>
              <DateFilter
                dateViewValue={
                  filterState[findFilterIndexInArray(filterState, "dateView")]
                    .selected
                }
                handleDateViewValueChange={handleDateViewValueChange}
              ></DateFilter>
              <PaginationFilter
                obsvStatus={obsvStatus}
                obsvData={obsvData}
                filterState={filterState}
                handlePageChange={handlePageChange}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              ></PaginationFilter>
            </div>
            {/*  */}
          </>
        ) : null}
        {/*  */}
      </div>
    </div>
  );
}

export default Homepage;
