import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TaskList from './TaskList';

export default function Home() {
  return (
    <>
      <Typography varient="h3" className="sectionHeader">Dashboard</Typography>
      <Grid spacing={2} container>
        <Grid item xs={6}>
          <Paper className="formContainer">
            <Typography varient="h4">Upcoming Tasks</Typography>
            <TaskList filterType="upcoming"/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="formContainer">
            {/* Upcoming and Overdue Tasks */}
            <Typography varient="h4">Urgent Tasks</Typography>
            <TaskList filterType="urgent"/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}