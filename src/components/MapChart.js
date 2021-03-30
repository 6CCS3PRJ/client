import React, {useEffect, useState} from "react";

import {getFeatures, getScanCounts} from "../api/server";
import {CircularProgress, Typography} from "@material-ui/core";

import {Map, TileLayer, GeoJSON, LayersControl} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import PropTypes from "prop-types";

const centrePoint = [52.561928, -1.464854]; // https://bit.ly/3usGiQX
const defaultZoom = 6;

const MapChart = ({setTooltipContent}) => {
  const [loading, setLoading] = useState(false);
  const [topology, setTopology] = useState();
  const [scanCounts, setScanCounts] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      let [code, result] = await getScanCounts();
      const scans = [];
      if (code === 200) {
        for (const scan of result) {
          scans.push([scan.lat, scan.lng, scan.count]);
        }
      }
      setScanCounts(scans)
      ;[code, result] = await getFeatures();
      if (code === 200) {
        setTopology(result);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBindPopups = (feature, layer) => {
    layer.on("mouseover", function(e) {
      setTooltipContent(feature);
    });
    layer.on("mouseout", () => {
      setTooltipContent(undefined);
    });
  };

  return loading ? (
    <>
      <Typography variant="h5" style={{paddingTop: 50}}>
        Loading Map Data{" "}
      </Typography>
      <br /> <CircularProgress />
    </>
  ) : (
    <Map
      style={{height: "80vh", width: "100%", zIndex: 1}}
      center={centrePoint}
      zoom={defaultZoom}
      maxZoom={20}
      minZoom={0}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Light">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            minZoom={0}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Dark">
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            minZoom={0}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Show Data">
          {topology ? (
            <GeoJSON
              style={{fillOpacity: 0.05, weight: 0.5}}
              onEachFeature={handleBindPopups}
              key={topology.features.length}
              data={topology}
            />
          ) : (
            <></>
          )}
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Show Heatmap">
          <HeatmapLayer
            points={scanCounts}
            longitudeExtractor={(m) => m[1]}
            latitudeExtractor={(m) => m[0]}
            intensityExtractor={(m) => parseFloat(m[2])}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  );
};


MapChart.propTypes = {
  setTooltipContent: PropTypes.func,
};

export default MapChart;
