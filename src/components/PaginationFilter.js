import React from "react";
import { makeStyles, Paper, TablePagination } from "@material-ui/core";

//
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
}));

function PaginationFilter(props) {
  const {
    obsvStatus,
    obsvData,
    filterState,
    handlePageChange,
    handleChangeRowsPerPage,
    ...args
  } = props;

  const classes = useStyles();

  if (obsvStatus === "success") {
    return (
      <Paper className={classes.pagination} {...args}>
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
    );
  } else return null;
}

export default PaginationFilter;
