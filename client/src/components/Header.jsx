import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
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
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  iconHeader: {
    position: "relative",
    top: "5px",
    transition: "transform .2s",
    color: `${theme.palette.secondary.main}`,
    fontSize: 30,
    "&:hover": {
      transform: "scale(1.5)",
    },
  },
  headerItems: {
    marginRight: theme.spacing(4),
    fontWeight: "bold",
    color: `${theme.palette.secondary.main}`,
    display: "block",
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
    },
  },
  badge: {
    color: "red",
  },
}));

const Header = (props) => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const appHeader = "AlertIO: An Alert Management Application";
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
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
        {pathname === "/admin/dashboard" ? renderNotificationBadge() : null}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
