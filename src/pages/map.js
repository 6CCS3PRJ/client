import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core/";
import Layout from "../layout/Layout";
import "./home.css";
import MapChart from "../components/MapChart";
import MouseTooltip from "react-sticky-mouse-tooltip";

export default function MapPage() {
  const [content, setContent] = useState();

  return (
    <>
      <Layout>
        <MouseTooltip visible={content?.length > 0} offsetX={15} offsetY={10}>
          {content ? (
            <Paper elevation={2}>
              <Typography style={{ padding: 10 }}>
                <b>{content[0]}</b> - {content[1]}
              </Typography>
            </Paper>
          ) : undefined}
        </MouseTooltip>
        <Grid container align="center" justify="center">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ height: "103vh" }}>
              <MapChart setTooltipContent={setContent} />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
