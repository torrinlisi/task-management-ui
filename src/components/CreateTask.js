import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

export default function CreateTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const saveTask = () => {
    console.log(taskName, taskDue, taskDescription);
  }

  return (
    //fragement so there is only 1 parent element
    <>
      <Typography varient="h3" className="sectionHeader">Create Task</Typography>
      <Paper className="formContainer">
        <Grid spacing={2} container>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              id="taskName" 
              label="Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="taskDueDateTime"
              label="Due"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              value={taskDue}
              onChange={(e) => setTaskDue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              id="taskDescription" 
              label="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Grid> 
        </Grid>
      </Paper>
      <div className="formButtonContainer">
        <Button variant="contained" color="primary" onClick={() => saveTask()}>SAVE</Button>
      </div>
    </>
  )
}