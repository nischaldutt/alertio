import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { toggleTheme } from "../actions";

import {
  AppBar,
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
    backgroundColor: theme.palette.primary.main,
    height: 70,
    boxShadow: "0px 0px",
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
    "&:hover": {},
  },
  badge: {
    color: "red",
  },
}));

const Header = ({ darkTheme, toggleTheme }) => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const appHeader = "AlertIO: An Alert Management Application";
  const handleChange = () => {
    toggleTheme();
  };

  const renderNotificationBadge = () => {
    return (
      <Link to="/admin/notifications">
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge variant="dot" color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Link>
    );
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <Link to="/">
            <AnnouncementIcon className={classes.iconHeader} />
          </Link>
        </IconButton>

        <Link to="/">
          <Typography className={classes.headerItems} variant="h5" noWrap>
            {appHeader}
          </Typography>
        </Link>

        <div className={classes.grow} />
        <Switch
          checked={darkTheme}
          onChange={handleChange}
          color="secondary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        {pathname === "/admin/dashboard" ? renderNotificationBadge() : null}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state, ownProps) => ({
  darkTheme: state.darkTheme,
});

const mapDispatchToProps = {
  toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
