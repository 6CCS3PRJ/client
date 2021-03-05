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
    }, []);

    return (
        <>
            <Layout>
                <Grid container spacing={3} align="center" justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Scan this QR code to upload scans
            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {token ? (
                            <>
                                <QRCode size={256} value={`${APP_URL}${token}`} />
                                <br />
                                <br/>
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
