import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { toggleTheme, adminLogout } from "../actions";

import {
  AppBar,
  Button,
  Switch,
  Badge,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    boxShadow: "0px 0px",
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      // height: "70",
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  iconHeader: {
    position: "relative",
    top: "5px",
    transition: "transform .2s",
    fontSize: 30,
    "&:hover": {
      transform: "scale(1.5)",
    },
  },
  headerItems: {
    marginRight: theme.spacing(4),
    fontWeight: "bold",
    display: "block",
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  badge: {
    color: "red",
  },
  menuButtons: {
    marginRight: theme.spacing(1),
  },
}));

const Header = ({
  darkTheme,
  toggleTheme,
  loggedIn,
  adminLogout,
  branches,
  alerts,
}) => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [invisible, setInvisible] = React.useState(true);
  const appHeader = "AlertIO: An Alert Management Application";

  const handleChange = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    adminLogout();
  };

  React.useEffect(() => {
    const handleBadgeVisibility = () => {
      const length = alerts.length;
      for (let i = 0; i < length; i++) {
        if (alerts[i].is_read === 0) {
          console.log(alerts);
          return setInvisible(false);
        }
      }
      return setInvisible(true);
    };
    handleBadgeVisibility();
  }, [setInvisible, alerts]);

  const renderNotificationBadge = () => {
    return (
      <Link to="/admin/notifications">
        <IconButton
          className={classes.menuButtons}
          aria-label="show new notifications"
          color="secondary"
        >
          <Badge variant="dot" invisible={invisible} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Link>
    );
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton}>
          <Link to="/">
            <AnnouncementIcon
              color="secondary"
              className={classes.iconHeader}
            />
          </Link>
        </IconButton>

        <Link to="/">
          <Typography className={classes.headerItems} variant="h5" noWrap>
            {appHeader}
          </Typography>
        </Link>

        <div className={classes.grow} />
        <Switch
          className={classes.menuButtons}
          checked={darkTheme}
          onChange={handleChange}
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        {pathname === "/admin/dashboard" && branches.length
          ? renderNotificationBadge()
          : null}
        {loggedIn ? (
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  darkTheme: state.darkTheme,
  loggedIn: state.loggedIn,
  branches: state.branches,
  alerts: state.alerts,
});

const mapDispatchToProps = {
  toggleTheme,
  adminLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
