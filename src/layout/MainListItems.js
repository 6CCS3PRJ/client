import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WifiIcon from "@material-ui/icons/Wifi";
import PublishIcon from "@material-ui/icons/Publish"
import { useHistory } from "react-router-dom";

export const MainListItems = () => {
  const history = useHistory();
  return (
    <div>
      <ListItem button onClick={() => history.push("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Homepage" />
      </ListItem>
      <ListItem button onClick={() => history.push("/hotspots")}>
        <ListItemIcon>
          <WifiIcon />
        </ListItemIcon>
        <ListItemText
          primary="Hotspots Count"
        />
      </ListItem>
      <ListItem button onClick={() => history.push("/upload")}>
        <ListItemIcon>
          <PublishIcon />
        </ListItemIcon>
        <ListItemText
          primary="Upload Scans"
        />
      </ListItem>
    </div>
  );
};
