import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Feedback from "./components/feedback";
import { authenticate } from "./store/session";
import Interview from "./components/interview"
import Info from "./components/info"
import Splash from "./components/splash"
import { useDispatch } from "react-redux";
import LiveInterview from "./components/liveInterview"

function App() {

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar  />
      <Switch>
        <Route path="/interview" exact={true} >
          <Interview />
        </Route>
        <Route path="/feedback" exact={true}>
          <Feedback />
        </Route>
        <Route path="/" exact={true} >
          <Splash />
        </Route>
        <Route path="/info" exact={true} >
          <Info />
        </Route>
        <Route path="/liveinterview" exact={true} >
          <LiveInterview />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
