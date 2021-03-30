import React from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import {useHistory} from "react-router-dom";
import {DateTime} from "luxon";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});
const Cases = (props) => {
  const history = useHistory();

  const classes = useStyles();
  return (
    <>
      <Title>Positive Cases</Title>
      <Typography component="p" variant="h4">
        {props.count ?? 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {DateTime.now().toLocaleString(DateTime.DATE_MED)}
      </Typography>
      <div>
        <Link color="primary" onClick={() => history.push("/hotspots")}>
          View all
        </Link>
      </div>
    </>
  );
};

Cases.propTypes = {
  count: PropTypes.number,
};

export default Cases;
