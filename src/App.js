import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//
import "./styles.css";
import Theme from "./components/Theme";
import Homepage from "./pages/Homepage";
// import Test from "./Test";
//

const MyQueryClient = new QueryClient();

function App() {
  return (
    <>
      <Theme>
        <QueryClientProvider client={MyQueryClient}>
          <Homepage></Homepage>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Theme>
    </>
  );
}

export default App;
