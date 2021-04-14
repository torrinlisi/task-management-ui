import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import TaskList from './TaskList';

export default function Home() {
  return (
    <>
      <Typography varient="h3" className="sectionHeader">Dashboard</Typography>
      <Grid spacing={2} container>
        <Grid item xs={6}>
          <Typography varient="h4">Upcoming Tasks</Typography>
          <TaskList />
        </Grid>
        <Grid item xs={6}>urgent</Grid>
      </Grid>
    </>
  )
}