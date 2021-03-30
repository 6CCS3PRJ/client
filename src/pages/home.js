import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "../components/Chart";
import Cases from "../components/Cases";
import Layout from "../layout/Layout";
import "./home.css";
import {getUploadStats} from "../api/server";
import {useSnackbar} from "notistack";
import {DateTime} from "luxon";

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

const HomePage = () => {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [uploadStats, setUploadStats] = useState();
  const [loadingStats, setLoadingStats] = useState(false);
  const [todaysCount, setTodaysCount] = useState(0);
  useEffect(() => {
    const loadUploadStats = async () => {
      setLoadingStats(true);
      const [code, result] = await getUploadStats();
      setLoadingStats(false);
      if (code !== 200) {
        enqueueSnackbar("There was an error.", {
          variant: "error",
          autoHideDuration: 300,
        });
        return;
      }
      const todayDate = DateTime.now().toISODate();
      console.log(todayDate);
      const today = result.filter(
          (el) => todayDate === DateTime.fromISO(el.date).toISODate(),
      );
      if (today.length === 1) {
        setTodaysCount(today[0].amount);
      }

      setUploadStats(
          result.map((el) => {
            el.date = DateTime.fromISO(el.date).toLocaleString({
              day: "2-digit",
              month: "short",
            });
            return el;
          }),
      );
    };
    loadUploadStats();
  }, [enqueueSnackbar]);

  return (
    <>
      <Layout>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart loading={loadingStats} stats={uploadStats} />
            </Paper>
          </Grid>
          {/* Recent Cases */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Cases loading={loadingStats} count={todaysCount} />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HomePage;
