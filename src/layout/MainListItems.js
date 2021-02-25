import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WifiIcon from "@material-ui/icons/Wifi";
import {useHistory} from "react-router-dom";

export const MainListItems = () => {
    const history = useHistory();
    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText onClick={() => history.push("/")} primary="Homepage"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <WifiIcon/>
                </ListItemIcon>
                <ListItemText
                    onClick={() => history.push("/hotspots")}
                    primary="Hotspots Count"
                />
            </ListItem>
        </div>
    );
};
