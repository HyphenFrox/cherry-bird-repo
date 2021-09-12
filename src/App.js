import React from "react"
// import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//
import "./styles.css";
import Theme from "./components/Theme";
import Homepage from "./pages/Homepage";
import Observation from "./pages/Observation";
// import GlobalProgressLoader from "./components/GlobalProgressLoader";

// const Test = React.lazy(() => import("./Test"));
//

const MyQueryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <Suspense fallback={<GlobalProgressLoader></GlobalProgressLoader>}> */}
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
              {/* <Route path="/test" exact>
                  <Test></Test>
                </Route> */}
            </Switch>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Theme>
      {/* </Suspense> */}
    </>
  );
}

export default App;
