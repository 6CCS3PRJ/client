import React from "react";
import {BrowserRouter as Router, Route, Switch, useHistory,} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import HomePage from "./pages/home";
import HotspotsPage from "./pages/hotspots";

const App = () => {
    let history = useHistory();
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/hotspots" component={HotspotsPage}/>
                </Switch>
            </Router>
        </SnackbarProvider>
    );
};

export default App;
