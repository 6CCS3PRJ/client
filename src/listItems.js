import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
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
                    <LocalHospitalIcon/>
                </ListItemIcon>
                <ListItemText
                    onClick={() => history.push("/cases")}
                    primary="All cases"
                />
            </ListItem>
        </div>
    );
};
