import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import "./home.css";
import QRCode from "qrcode.react";
import {
    Grid,
    CircularProgress,
    Typography,
    LinearProgress,
} from "@material-ui/core";
import { getToken } from "../api/server";
import { useSnackbar } from "notistack";
const APP_URL = "http://www.prj-android-app.com/upload?token=";
const QR_DURATION = 60; //in seconds

export default function UploadPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useState();
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const loadToken = async () => {
            setSecondsLeft(0);
            const [code, result] = await getToken();
            if (code === 200) {
                setToken(result);
            } else {
                enqueueSnackbar("Could not fetch a new token for the QR code", {
                    variant: "3000",
                    autoHideDuration: 3000,
                });
            }
        };
        loadToken();
        setSecondsLeft(0);
        const timer = setInterval(() => {
            setSecondsLeft((secondsLeft) => secondsLeft + 0.1); // <-- Change this line!
        }, 100);
        const loadTokenTimer = setInterval(loadToken, QR_DURATION * 1000);

        return () => {
            clearInterval(timer);
            clearInterval(loadTokenTimer);
        };
    }, [enqueueSnackbar]);

    return (
        <>
            <Layout>
                <Grid container spacing={3} align="center" justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Scan this QR code to upload scans
            </Typography>
                        <br />
                        <br />
                        <Typography variant="h6">
                            By confirming, you will be uploading <strong>ALL</strong> data collected in the past 14 days. <br />
             This means that the provider of this service will be able to see all WiFi signals you've been near in the past 14 days.
             <br />This information could be used to triangulate your location for this period of time. <br /><br />
              We kindly ask you to also support the contact tracing effort by uploading location data, which will anonymously inform others of where contagion is spreading.
            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {token ? (
                            <>
                                <QRCode size={256} value={`${APP_URL}${token}`} />
                                <br />
                                <br />
                                <Typography variant="h6">{`This code will expire in ${(
                                    QR_DURATION - secondsLeft
                                ).toFixed(1)}s`}</Typography>
                                <LinearProgress
                                    style={{ width: "50%" }}
                                    variant="determinate"
                                    value={(secondsLeft / QR_DURATION) * 100}
                                />
                            </>
                        ) : (
                            <CircularProgress />
                        )}
                    </Grid>
                </Grid>
            </Layout>
        </>
    );
}
