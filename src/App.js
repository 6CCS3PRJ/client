import React from "react";
import {BrowserRouter as Router, Route, Switch, useHistory,} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import HomePage from "./pages/home";
import CasesPage from "./pages/cases";

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
                    <Route exact path="/cases" component={CasesPage}/>
                </Switch>
            </Router>
        </SnackbarProvider>
    );
};

export default App;
