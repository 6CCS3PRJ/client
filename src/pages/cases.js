import React, {useEffect, useState} from "react";
import {allWifis} from "../api/server";
import Grid from "@material-ui/core/Grid";
import Layout from "../layout/Layout";
import "./home.css";
import MaterialTable from "material-table";

export default function CasesPage() {
    const [data, setData] = useState([]);

    const loadWifis = async () => {
        let [code, result] = await allWifis();
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
        <>
            <Layout>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MaterialTable
                            title="Cases by Location"
                            columns={[
                                {title: "Location", field: "name"},
                                {title: "Hotspot Count", field: "hotspotCount"},
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
                        />
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}
