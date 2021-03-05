import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { getFeatures } from "../api/server";
import { CircularProgress } from "@material-ui/core";
import * as axios from "axios";

const centrePoint = [-1.464854, 52.561928]; //https://bit.ly/3usGiQX
const geoUrl = "https://martinjc.github.io/UK-GeoJSON/json/eng/topo_wpc.json";

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
    .domain(data.map((d) => d.hotspotCount))
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
    return cur?.hotspotCount > 0 ? colorScale(cur?.hotspotCount) : "#fde0c5";
  };

  return data.length === 0 ? (
    <CircularProgress />
  ) : (
    <ComposableMap style={{ backgroundColor: "lightblue" }}>
      <ZoomableGroup zoom={35} center={centrePoint} maxZoom={500} minZoom={10}>
        <Geographies geography={topology}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cur = data.find((s) => s?.id === geo?.id);
              return (
                <Geography
                  onMouseLeave={() => {
                    setTooltipContent("");
                    setHighlight(null);
                  }}
                  onMouseEnter={() => {
                    const { PCON13NM } = geo.properties;
                    setTooltipContent([PCON13NM, cur?.hotspotCount ?? 0]);
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
