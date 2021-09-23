import React from "react";
import { Paper, TablePagination } from "@material-ui/core";

//
import findFilterIndexInArray from "../services/findFilterIndexInArray";
//

function PaginationFilter(props) {
  const {
    obsvStatus,
    obsvData,
    filterState,
    handlePageChange,
    handleChangeRowsPerPage,
    ...args
  } = props;

  if (obsvStatus === "success") {
    return (
      <Paper {...args}>
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
