import React from "react";
import {
  Tabs,
  Tab,
  makeStyles,
  Paper,
  TablePagination,
} from "@material-ui/core";

//
import { dateViewValueToLabel } from "../services/dateViewConversion";
import capitalizeFirstLetterOfString from "../services/capitalizeFirstLetterOfString";
import findFilterIndexInArray from "../services/findFilterIndexInArray";
//

const useStyles = makeStyles((theme) => ({
  pagination: {
    maxWidth: "90%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "75%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "40%",
    },
  },
  selectedTab: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function DateAndPaginationFilter(props) {
  const classes = useStyles();

  const {
    dateViewValue,
    handleDateViewValueChange,
    obsvData,
    filterState,
    handlePageChange,
    handleChangeRowsPerPage,
    ...args
  } = props;

  return (
    <div {...args}>
      <Tabs value={dateViewValue} onChange={handleDateViewValueChange}>
        {dateViewValueToLabel.map((filterViewName, index) => (
          <Tab
            key={index}
            classes={{ selected: classes.selectedTab }}
            label={capitalizeFirstLetterOfString(filterViewName)}
          />
        ))}
      </Tabs>
      <Paper className={classes.pagination}>
        <TablePagination
          component="div"
          count={obsvData.total_results}
          page={
            filterState[findFilterIndexInArray(filterState, "page")].selected
          }
          onPageChange={handlePageChange}
          labelRowsPerPage="Items per page:"
          rowsPerPage={
            filterState[findFilterIndexInArray(filterState, "per_page")]
              .selected
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default DateAndPaginationFilter;
