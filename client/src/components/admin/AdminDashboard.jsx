import React from "react";
import { connect } from "react-redux";

import socket from "../../socketClient";
import Loading from "../Loading";
import BranchLoginForm from "../branch/BranchLoginForm";
import BranchTable from "../branch/BranchTable";

import {
  checkIfAdminLoggedIn,
  fetchAllBranches,
  saveAlertsInStore,
  saveRealTimeAlertInStore,
} from "../../actions";

import { Grid, Snackbar, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    // border: "2px solid red",
    backgroundColor: theme.palette.primary.light,
  },
  branchSvg: {
    // border: "2px solid green",
    objectFit: "contain",
    width: "500px",
    height: "500px",
    [theme.breakpoints.down("md")]: {
      width: "300px",
      height: "300px",
    },
  },
  tableDiv: {},
}));

const AdminDashboard = ({
  branches,
  fetchAllBranches,
  saveAlertsInStore,
  saveRealTimeAlertInStore,
  checkIfAdminLoggedIn,
  loggedIn,
  alerts,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // check if admin session is present after refresh
  React.useEffect(() => {
    if (!loggedIn) {
      checkIfAdminLoggedIn();
    }
  }, [checkIfAdminLoggedIn, loggedIn]);

  socket.on("fetch-alerts", (alerts) => {
    saveAlertsInStore(alerts);
  });

  socket.on("fetch-alerts-realtime", (alert) => {
    saveRealTimeAlertInStore(alert);
    handleOpen();
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="info">
          New Alert Received!
        </Alert>
      </Snackbar>
    );
  };

  const renderSvg = () => {
    return (
      <svg
        className={classes.branchSvg}
        id="f71115d1-abc3-47ac-8361-b6e087de44cd"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 719.17697 739.77571"
      >
        <path
          d="M312.55007,731.36394c12.1034,28.8432-1.6645,87.78855-1.6645,87.78855s-51.70851-31.46966-63.81191-60.31286-7.25774-58.37587,10.82307-65.96308S300.44668,702.52074,312.55007,731.36394Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <circle cx="387.57111" cy="252.79148" r="16.60586" fill="#6c63ff" />
        <circle cx="387.57111" cy="142.79148" r="16.60586" fill="#6c63ff" />
        <circle cx="387.57111" cy="32.79148" r="16.60586" fill="#6c63ff" />
        <path
          d="M688.4586,80.11215a5.00589,5.00589,0,0,0-5,5v55.583a5.00589,5.00589,0,0,0,5,5H954.58849a5.00589,5.00589,0,0,0,5-5v-55.583a5.00589,5.00589,0,0,0-5-5Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M690.25646,84.01107A2.90242,2.90242,0,0,0,687.357,86.91v51.9873a2.90243,2.90243,0,0,0,2.89942,2.89893H952.79063a2.90159,2.90159,0,0,0,2.89844-2.89893V86.91a2.90158,2.90158,0,0,0-2.89844-2.89893Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#fff"
        />
        <path
          d="M936.307,127.54052a4.71032,4.71032,0,1,0,0-9.42063H714.24943a4.71032,4.71032,0,0,0,0,9.42063Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M809.80146,107.07669a4.71031,4.71031,0,0,0,0-9.42062h-95.552a4.71031,4.71031,0,1,0,0,9.42062Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#6c63ff"
        />
        <path
          d="M688.4586,190.11215a5.00589,5.00589,0,0,0-5,5v55.583a5.00589,5.00589,0,0,0,5,5H954.58849a5.00589,5.00589,0,0,0,5-5v-55.583a5.00589,5.00589,0,0,0-5-5Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M690.25646,194.01107A2.90242,2.90242,0,0,0,687.357,196.91v51.9873a2.90243,2.90243,0,0,0,2.89942,2.89893H952.79063a2.90159,2.90159,0,0,0,2.89844-2.89893V196.91a2.90158,2.90158,0,0,0-2.89844-2.89893Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#fff"
        />
        <path
          d="M936.307,237.54052a4.71032,4.71032,0,1,0,0-9.42063H714.24943a4.71032,4.71032,0,0,0,0,9.42063Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M809.80146,217.07669a4.71031,4.71031,0,0,0,0-9.42062h-95.552a4.71031,4.71031,0,1,0,0,9.42062Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#6c63ff"
        />
        <path
          d="M688.4586,300.11215a5.00589,5.00589,0,0,0-5,5v55.583a5.00589,5.00589,0,0,0,5,5H954.58849a5.00589,5.00589,0,0,0,5-5v-55.583a5.00589,5.00589,0,0,0-5-5Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M690.25646,304.01107A2.90242,2.90242,0,0,0,687.357,306.91v51.9873a2.90243,2.90243,0,0,0,2.89942,2.89893H952.79063a2.90159,2.90159,0,0,0,2.89844-2.89893V306.91a2.90158,2.90158,0,0,0-2.89844-2.89893Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#fff"
        />
        <path
          d="M936.307,347.54052a4.71032,4.71032,0,1,0,0-9.42063H714.24943a4.71032,4.71032,0,0,0,0,9.42063Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M809.80146,327.07669a4.71031,4.71031,0,0,0,0-9.42062h-95.552a4.71031,4.71031,0,1,0,0,9.42062Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#6c63ff"
        />
        <path
          d="M392.74205,542.641h0a13.89217,13.89217,0,0,1-11.183-17.64554l10.52951-35.80033,16,3,.68789,36.45817A13.89217,13.89217,0,0,1,392.74205,542.641Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#9f616a"
        />
        <polygon
          points="244.677 691.083 224.677 688.083 229.677 493.083 201.677 577.083 186.677 695.083 167.677 690.083 163.677 567.083 185.677 422.083 295.677 447.083 244.677 691.083"
          fill="#2f2e41"
        />
        <path
          d="M475.90628,819.19515h0a14.69968,14.69968,0,0,1-14.62909-16.1386l3.10563-31.57384a4.63448,4.63448,0,0,1,2.41141-3.621c5.89555-3.17977,11.958-2.40866,18.16316,1.7416a4.60629,4.60629,0,0,1,2.00153,3.28362l3.54469,29.8767A14.69968,14.69968,0,0,1,475.90628,819.19515Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#2f2e41"
        />
        <path
          d="M394.2699,816.84477h0a13.24081,13.24081,0,0,1-6.428-19.82219l21.334-31.71265c7.69066-5.51912,12.329-2.83082,14.13232,7.48182l4.31313-10.80707,3.24988,3.54532a10.33785,10.33785,0,0,1,.5472,13.32261l-22.12892,33.67726A13.2408,13.2408,0,0,1,394.2699,816.84477Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#2f2e41"
        />
        <circle cx="288.67697" cy="204.08301" r="30" fill="#9f616a" />
        <path
          d="M548.08849,339.19515l-51-10c6.56909-14.01118,11.82983-18.75161,6-34h41C540.47264,310.98928,543.9669,325.81362,548.08849,339.19515Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#9f616a"
        />
        <path
          d="M542.08849,541.19515l-120-34c24.03615-52.90185,29.07072-110.98348,21.94418-172.38016a11.1094,11.1094,0,0,1,10.14924-12.36449c15.65286-1.28925,31.972-2.94405,48.90658-5.25535l19,13,22-5c7.0594,3.42154,14.16992,6.26727,20.58711,9.1045a25.738,25.738,0,0,1,13.99334,31.655C559.11624,425.00339,546.0277,483.49419,542.08849,541.19515Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M411.08849,496.19515l-23-3L442.57542,336.1989c2.77155-7.98582,9.64493-12.3083,18.01307-13.50375l8,1-6,93Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M591.25564,466.1823h0a18.22954,18.22954,0,0,1-18.233-11.18286l-21.93408-52.80429,18-65,4.7582,3.02795q.68762.43758,1.35747.897c13.70447,9.3986,20.37239,26.16665,17.57878,42.54778l-4.69445,27.52725L607.4531,452.772A18.22953,18.22953,0,0,1,591.25564,466.1823Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#e6e6e6"
        />
        <path
          d="M531.3959,239.73219h0a31.85787,31.85787,0,0,1,14.55472,4.28527c1.02008.59364.54857,2.7345,1.49136,3.43271,1.18729.87929,3.7652.34532,4.8166,1.37524a31.9265,31.9265,0,0,1,9.49406,25.72273l-1.674,16.64425-3.94905-4.31885a41.16414,41.16414,0,0,0-27.45227-13.47735q-.67177-.04564-1.34595-.07166l3.03816-5.31675-5.28016,5.28016a51.414,51.414,0,0,0-7.19368.58556L521.936,266.803l-7.75225,7.75225-.0006.00033a20.72693,20.72693,0,0,0-14.48278,11.81228l-.86081,1.90841-.96433-15.87882A32.00588,32.00588,0,0,1,531.3959,239.73219Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#2f2e41"
        />
        <ellipse
          cx="318.87301"
          cy="209.8831"
          rx="2.40958"
          ry="5.72276"
          fill="#9f616a"
        />
        <ellipse
          cx="258.63339"
          cy="208.07591"
          rx="2.40958"
          ry="5.72276"
          fill="#9f616a"
        />
        <path
          d="M616.27913,364.64286h0A13.89217,13.89217,0,0,1,625.924,383.174l-13.53033,34.77735L596.7061,413.604l2.40926-36.385A13.89217,13.89217,0,0,1,616.27913,364.64286Z"
          transform="translate(-240.41151 -80.11215)"
          fill="#9f616a"
        />
        <polygon
          points="357.677 384.083 332.677 368.083 353.677 325.083 379.677 335.083 366.677 373.083 357.677 384.083"
          fill="#e6e6e6"
        />
        <polygon
          points="349.027 739.776 45.288 739.776 45.288 737.67 349.408 737.67 349.027 739.776"
          fill="#3f3d56"
        />
      </svg>
    );
  };

  return (
    <Grid container justify="center" className={classes.root}>
      {renderSnackbar()}
      {!branches.length ? (
        <Grid item container justify="center" alignItems="center" xs={12}>
          <Grid item md={5} sm={10}>
            <BranchLoginForm />
          </Grid>
          <Grid item container justify="center" md={5} sm={12}>
            {renderSvg()}
          </Grid>
        </Grid>
      ) : (
        <Grid item className={classes.tableDiv} xs={12}>
          <BranchTable />
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  branches: state.branches,
  loggedIn: state.loggedIn,
  alerts: state.alerts,
});

const mapDispatchToProps = {
  checkIfAdminLoggedIn,
  fetchAllBranches,
  saveAlertsInStore,
  saveRealTimeAlertInStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
