import React from "react";
import Grid from "@material-ui/core/Grid";
import Layout from "../layout/Layout";
import "./home.css";
// eslint-disable-next-line max-len
import HotspotsByLocationTable from "../components/tables/HotspotsByLocationTable";

const HotspotsPage = () => {
  return (
    <>
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HotspotsByLocationTable />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default HotspotsPage;
