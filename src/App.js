import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

//
import "./styles.css";
import Theme from "./components/Theme";
import Homepage from "./pages/Homepage";
import Observation from "./pages/Observation";
//

const MyQueryClient = new QueryClient();

function App() {
  return (
    <>
      <Theme>
        <QueryClientProvider client={MyQueryClient}>
          <Router>
            <Switch>
              <Route path="/" exact>
                <Homepage />
              </Route>
              <Route path="/observation/:observationID" exact>
                <Observation />
              </Route>
            </Switch>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <CssBaseline></CssBaseline>
      </Theme>
    </>
  );
}

export default App;
