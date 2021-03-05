import React, { useEffect, useState } from "react";
import { getWifis } from "../../api/server";
import MaterialTable from "material-table";

const HotspotsByLocationTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  const loadWifis = async () => {
    setLoading(true);
    let [code, result] = await getWifis();
    setLoading(false);
    if (code === 200) {
      result = result.map((county) => ({
        hotspotCount: county.hotspotCount ?? 0,
        name: county.properties.PCON13NM,
        areaCode: county.properties.PCON13CD,
      }));
      setData(result);
    }
  };

  useEffect(() => {
    loadWifis();
  }, []);

  return (
    <MaterialTable
      title="Registered Hotspots by Location"
      columns={[
        { title: "Location", field: "name" },
        { title: "Hotspot Count", field: "hotspotCount" },
        {
          title: "Area Code",
          field: "areaCode",
          render: (rowData) => (
            <a
              href={`https://findthatpostcode.uk/areas/${rowData.areaCode}.html`}
              rel="noreferrer"
              target="_blank"
            >
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
