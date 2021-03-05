import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../components/Chart";
import Cases from "../components/Cases";
import MapChart from "../components/MapChart";
import MouseTooltip from "react-sticky-mouse-tooltip";
import Layout from "../layout/Layout";
import "./home.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [content, setContent] = useState();

  return (
    <>
      <MouseTooltip visible={content?.length > 0} offsetX={15} offsetY={10}>
        {content ? (
          <Paper elevation={2}>
            <Typography style={{ padding: 10 }}>
              <b>{content[0]}</b> - {content[1]}
            </Typography>
          </Paper>
        ) : undefined}
      </MouseTooltip>
      <Layout>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Cases */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Cases />
            </Paper>
          </Grid>
          {/* Table */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>
                <MapChart setTooltipContent={setContent} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
