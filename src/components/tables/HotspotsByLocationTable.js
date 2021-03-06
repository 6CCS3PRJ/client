/* eslint-disable react/display-name */
import React, {useEffect, useState} from "react";
import {getFeatures} from "../../api/server";
import MaterialTable from "material-table";

const HotspotsByLocationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  const loadWifis = async () => {
    setLoading(true);
    let [code, result] = await getFeatures();
    setLoading(false);
    if (code === 200) {
      result = result.features.map((county) => ({
        accessPointsCount: county.properties.accessPointsCount ?? 0,
        positivesCount: county.properties.positivesCount ?? 0,
        name: county.properties.PCON13NM,
        areaCode: county.properties.PCON13CD,
      }));

      result.sort(
          (a, b) =>
            b.positivesCount - a.positivesCount ||
          b.accessPointsCount - a.accessPointsCount,
      );

      setData(result);
    }
  };

  useEffect(() => {
    loadWifis();
  }, []);

  return (
    <MaterialTable
      title="Registered Access Points by Region"
      columns={[
        {title: "Location", field: "name"},
        {title: "Positive Scans", field: "accessPointsCount"},
        {title: "Hotspot Count", field: "positivesCount"},
        {
          title: "Area Code",
          field: "areaCode",
          render: (rowData) => (
            <a
              href={`https://findthatpostcode.uk/areas/${rowData.areaCode}.html`}
              rel="noreferrer"
              target="_blank">
              {rowData.areaCode}
            </a>
          ),
        },
      ]}
      data={data}
      options={{
        pageSize: 20,
        pageSizeOptions: [10, 20, 50],
        search: false,
        sorting: true,
        grouping: false,
        filtering: true,
        thirdSortClick: false,
      }}
      isLoading={loading}
    />
  );
};

export default HotspotsByLocationTable;
