import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core/";
import Layout from "../layout/Layout";
import "./home.css";
import MapChart from "../components/MapChart";
import MouseTooltip from "react-sticky-mouse-tooltip";

export default function MapPage() {
  const [content, setContent] = useState();

  const Popup = ({ feature }) => {
    let name, accessPointsCount, positivesCount;
    if (feature?.properties) {
      name = feature.properties.PCON13NM ?? "Not Found";
      accessPointsCount = feature.properties.accessPointsCount ?? 0;
      positivesCount = feature.properties.positivesCount ?? 0;
    }
    return (
      feature ?
        <Paper elevation={2} style={{ padding: 5 }}>
          <Typography variant="h6">{name}</Typography>
          <hr />
          <Typography variant="body2">Positive Scans: {positivesCount}</Typography>
          <Typography variant="body2">Available Access Points: {accessPointsCount}</Typography>
        </Paper>
        : <></>
    );
  };
  return (
    <>
      <Layout>
        <MouseTooltip style={{ zIndex: 101 }} visible={content} offsetX={15} offsetY={10}>
          <Popup feature={content} />
        </MouseTooltip>
        <Grid container align="center" justify="center">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ height: "80vh", width: "100%" }}>
              <MapChart setTooltipContent={setContent} />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
