import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useQuery } from "react-query";

//
import { filterDetails } from "../services/filterDetails";
import FilterSection from "../components/FilterSection";
import fetchObservations from "../services/fetchObservations";
import ProgressLoader from "../components/ProgressLoader";
import findFilterIndexInArray from "../services/findFilterIndexInArray";
import ObservationCard from "../components/ObservationCard";
import { dateViewLabelToValue } from "../services/dateViewConversion";
import DateFilter from "../components/DateFilter";
import PaginationFilter from "../components/PaginationFilter";
//

const useStyles = makeStyles((theme) => ({
  app: {
    padding: "1em 0",
    "& > * + *": {
      marginTop: "1em",
    },
  },
  heading: {
    textTransform: "uppercase",
  },
  filterSection: {
    maxWidth: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "75%",
    },
  },
  resultsFilterSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      margin: "0.5em",
    },
  },
  progressLoader: {
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      marginLeft: "1em",
    },
  },
  observationResults: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    "& > * + *": {
      marginTop: "0.5em",
    },
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row wrap",
      alignItems: "initial",
      justifyContent: "center",
      "& > *": {
        margin: "0.5em",
      },
    },
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

  return (
    <div className={classes.app}>
      {/* Heading */}
      <Typography variant="h4" align="center" className={classes.heading}>
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
      </Typography>
      {/*  */}

      {/* main filter section */}
      <FilterSection
        className={classes.filterSection}
        filterState={filterState}
        setFilterState={setFilterState}
        filterDetails={filterDetails}
      ></FilterSection>
      {/*  */}

      {/* top results filter section */}
      <div className={classes.resultsFilterSection}>
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
        <ProgressLoader className={classes.progressLoader}>
          <Typography variant="h6">Loading Observations</Typography>
        </ProgressLoader>
      ) : obsvStatus === "success" ? (
        <div className={classes.observationResults}>
          {obsvData.results.map((observationData, index) => (
            <ObservationCard
              observationData={observationData}
              key={index}
            ></ObservationCard>
          ))}
        </div>
      ) : null}
      {/*  */}

      {/* bottom results filter section */}
      <div className={classes.resultsFilterSection}>
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
    </div>
  );
}

export default Homepage;
