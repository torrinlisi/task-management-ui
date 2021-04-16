import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function CreateTask() {
  //states for the controlled input fields
  const [taskName, setTaskName] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [isCreated, setIsCreated] = useState(false);

  const saveTask = async () => {
    //call the api to create the task record
    await axios.post("http://localhost:3000/", {
        name: taskName,
        description: taskDescription,
        due: taskDue
      })

      console.log("Success!");

      //this will trigger a render of the Redirect component which will bring us to the / route
      setIsCreated(true);
  }

  return (
    //fragement so there is only 1 parent element
    <>
      { isCreated && <Redirect to='/'/> }
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
        <Button id="saveButton" variant="contained" color="primary" onClick={() => saveTask()}>SAVE</Button>
      </div>
    </>
  )
}