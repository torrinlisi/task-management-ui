import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

import { Link } from 'react-router-dom';

export default function SideBar() {
  return(
    <Drawer
      variant="permanent"
      anchor="left"
      className="sideNav"
    >
      <Divider />
      <List>
        <Link className="sideNavLink" to="/">
          <ListItem button key="Home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link className="sideNavLink" to="/create">
          <ListItem button key="Create">
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}