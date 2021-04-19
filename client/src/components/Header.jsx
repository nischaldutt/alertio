import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import AnnouncementIcon from "@material-ui/icons/Announcement";

const useStyles = makeStyles((theme) => ({
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
}));

const Header = () => {
  const classes = useStyles();
  const appHeader = "AlertIO: An Alert Management Application";

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
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
