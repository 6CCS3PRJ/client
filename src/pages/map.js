import React, {useState} from "react";
import {Grid, Paper} from "@material-ui/core/";
import Layout from "../layout/Layout";
import "./home.css";
import MapChart from "../components/MapChart";
import Popup from "../components/Popup";
import MouseTooltip from "react-sticky-mouse-tooltip";

const MapPage = () => {
  const [content, setContent] = useState();
  return (
    <>
      <Layout>
        <MouseTooltip
          style={{zIndex: 101}}
          visible={content}
          offsetX={15}
          offsetY={10}>
          <Popup feature={content} />
        </MouseTooltip>
        <Grid container align="center" justify="center">
          <Grid item xs={12}>
            <Paper elevation={3} style={{height: "80vh", width: "100%"}}>
              <MapChart setTooltipContent={setContent} />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default MapPage;
