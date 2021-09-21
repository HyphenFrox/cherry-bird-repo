import { makeStyles } from "@material-ui/core";

const useResponsiveSquare = makeStyles({
  square: {
    width: "100%",
    position: "relative",
    "&:after": {
      content: "''",
      display: "block",
      paddingBottom: "100%",
    },
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default useResponsiveSquare;
