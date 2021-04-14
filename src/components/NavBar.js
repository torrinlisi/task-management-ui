import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <div className="titlePosition">
              <Link className="headerLink" to="/">
                <Typography variant="h6">
                  Task Manager
                </Typography>
              </Link>
            </div>
            <div className="navigationOptions">
              <IconButton color="inherit">
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}