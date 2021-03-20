import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { getFeatures } from "../api/server";
import { CircularProgress, Typography } from "@material-ui/core";
import * as axios from "axios";

const centrePoint = [14, 41]; //https://bit.ly/3usGiQX
const geoUrl =
  "https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_provinces.geojson";

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);
  const [topology, setTopology] = useState();
  const [highlight, setHighlight] = useState(null);
  const loadWifis = async () => {
    const [code, result] = await getFeatures();
    setTopology((await axios.get(geoUrl)).data);
    if (code === 200) {
      setData(result);
    }
  };

  useEffect(() => {
    loadWifis();
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.positivesCount))
    .range([
      "#fcde9c",
      "#faa476",
      "#f0746e",
      "#e34f6f",
      "#dc3977",
      "#b9257a",
      "#7c1d6f",
    ]);

  const getFill = (cur, geo) => {
    if (highlight === geo && geo !== null) {
      return "#D9B6AF";
    }
    return cur?.positivesCount > 0
      ? colorScale(cur?.positivesCount)
      : "#fde0c5";
  };

  return data.length === 0 ? (
    <>
      <Typography variant="h5" style={{ paddingTop: 50 }}>
        Loading Map Data{" "}
      </Typography>
      <br /> <CircularProgress />
    </>
  ) : (
    <ComposableMap style={{ backgroundColor: "lightblue" }}>
      <ZoomableGroup zoom={25} center={centrePoint} maxZoom={500} minZoom={10}>
        <Geographies geography={topology}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cur = data.find(
                (s) => s?.properties?.prov_acr === geo?.properties?.prov_acr
              );
              return (
                <Geography
                  onMouseLeave={() => {
                    setTooltipContent("");
                    setHighlight(null);
                  }}
                  onMouseEnter={() => {
                    const { prov_name } = geo.properties;
                    setTooltipContent([prov_name, cur?.positivesCount ?? 0]);
                    setHighlight(geo);
                  }}
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onClick={(e) => e.preventDefault()}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getFill(cur, geo)}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
