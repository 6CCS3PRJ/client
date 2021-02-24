import React from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import {useHistory} from "react-router-dom";
import {DateTime} from "luxon";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Cases() {
    const history = useHistory();

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Positive Cases (24hrs)</Title>
            <Typography component="p" variant="h4">
                653
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {DateTime.now().toLocaleString(DateTime.DATE_MED)}
            </Typography>
            <div>
                <Link color="primary" onClick={() => history.push("/cases")}>
                    View all
                </Link>
            </div>
        </React.Fragment>
    );
}
