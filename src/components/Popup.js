import React from "react";
import PropTypes from "prop-types";
import {Paper, Typography} from "@material-ui/core";

const Popup = ({feature}) => {
  let name;
  let accessPointsCount;
  let positivesCount;
  if (feature?.properties) {
    name = feature.properties.PCON13NM ?? "Not Found";
    accessPointsCount = feature.properties.accessPointsCount ?? 0;
    positivesCount = feature.properties.positivesCount ?? 0;
  }
  return feature ? (
    <Paper elevation={2} style={{padding: 5}}>
      <Typography variant="h6">{name}</Typography>
      <hr />
      <Typography variant="body2">
        Positive Scans: {positivesCount}
      </Typography>
      <Typography variant="body2">
        Available Access Points: {accessPointsCount}
      </Typography>
    </Paper>
  ) : (
    <></>
  );
};

Popup.propTypes = {
  feature: PropTypes.object,
};

export default Popup;
