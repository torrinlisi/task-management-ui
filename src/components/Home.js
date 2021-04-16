import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import TaskList from './TaskList';

export default function Home() {
  //setTriggerRerender will be called from child components that will kickoff useeffect in their siblings
  const [triggerRerender, setTriggerRerender] = useState(0);

  return (
    <>
      <Typography varient="h3" className="sectionHeader">Dashboard</Typography>
      <Grid spacing={2} container>
        <Grid item xs={6}>
          <Paper className="formContainer">
            <Typography varient="h4">Upcoming Tasks</Typography>
            <TaskList 
              filterType="upcoming" 
              isWidget={true} 
              setTriggerRerender={setTriggerRerender} 
              triggerRerender={triggerRerender} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="formContainer">
            {/* Upcoming and Overdue Tasks */}
            <Typography varient="h4">Urgent Tasks</Typography>
            <TaskList 
              filterType="urgent" 
              isWidget={true} 
              setTriggerRerender={setTriggerRerender} 
              triggerRerender={triggerRerender} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="formContainer">
            <Typography varient="h4">Overdue Tasks</Typography>
            <TaskList 
              filterType="overdue" 
              isWidget={true} 
              setTriggerRerender={setTriggerRerender} 
              triggerRerender={triggerRerender}/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="formContainer">
            <Typography varient="h4">Completed Tasks</Typography>
            <TaskList
              filterType="completed" 
              isWidget={true} 
              setTriggerRerender={setTriggerRerender} 
              triggerRerender={triggerRerender}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}