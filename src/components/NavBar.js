import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}