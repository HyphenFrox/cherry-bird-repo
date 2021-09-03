import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//
import "./styles.css";
import Theme from "./components/Theme";
import Homepage from "./pages/Homepage";
import Test from "./Test";
//

const MyQueryClient = new QueryClient();

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Theme>
            <Route path="/" exact>
              <QueryClientProvider client={MyQueryClient}>
                <Homepage></Homepage>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </Route>
            <Route path="/test" exact>
              <Test></Test>
            </Route>
          </Theme>
        </Switch>
      </Router>
    </>
  );
}

export default App;
