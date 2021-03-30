import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import HomePage from "./pages/home";
import HotspotsPage from "./pages/hotspots";
import UploadPage from "./pages/upload";
import MapPage from "./pages/map";

const App = () => {
  const history = useHistory();
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/hotspots" component={HotspotsPage} />
          <Route exact path="/upload" component={UploadPage} />
          <Route exact path="/map" component={MapPage} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
