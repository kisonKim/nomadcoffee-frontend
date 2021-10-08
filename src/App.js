

import { useReactiveVar } from "@apollo/client";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";

function App() {
  const isloggedIn = useReactiveVar(isLoggedInVar);
  return (
  <div>
  <Router>
    <Switch>
      <Route path="/" exact>
        {isloggedIn?(
        <Home />
        ):(
        <Login />
        )}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
  </div>
  );
}




export default App;
  