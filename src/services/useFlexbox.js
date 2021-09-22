import { makeStyles } from "@material-ui/core";

const useFlexbox = makeStyles({
  flexboxRow: {
    display: "flex",
    gap: "1em",
    justifyContent: "center",
    alignItems: "center",
  },
  flexboxRowWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1em",
    justifyContent: "center",
    alignItems: "center",
  },
  flexboxColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default useFlexbox;
