import { useEffect, useState } from 'react';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';


export default function TaskList({filterType, isWidget, triggerRerender, setTriggerRerender}) {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [filter, setFilter] = useState(filterType);

  //only get tasks on mount
  useEffect(() => {
    const getTasks = () => {
      axios.get("http://localhost:3000/", {
          params: {
            filter: filter
          }
        })
        .then(res => {
          setTasks(res.data);
        });
    }

    //get tasks on first load or whenever a filter or triggerRerender is updated
    getTasks();
  }, [filter, triggerRerender])

  const handleModalClose = () => {
    setOpenModal(false);
    setModalInfo({});
  }

  const handleModalOpen = (task, index) => {
    //add array index to task object in order to mark complete in task
    task['index'] = index

    setModalInfo(task);
    setOpenModal(true);
  }

  const completeTask = (index) => {
    let task = tasks[index];
    let isCompleteNew = !task.isComplete

    //call api to update task
    axios.put("http://localhost:3000/", { _id: task._id, isComplete: isCompleteNew})
      .then(res => {
        handleModalClose();
        rerenderProcess(index, isCompleteNew, true)
      });
  }

  const deleteTask = (index) => {
    let task = tasks[index];

    //call api to delete task
    axios.delete("http://localhost:3000/", {
      params: { 
        _id: task._id
      }
    })
      .then(res => {
        handleModalClose();
        rerenderProcess(index)
      });
  }

  //this really just determines if we want a local task update or to force all sibling components to get updated tasks
  const rerenderProcess = (index, isCompleteNew = null, isUpdate = false) => {
    //local update only
    if(!isWidget) {
      //create array of tasks instead of directly storing the reference
      let holdTasks = [...tasks];

      if(isUpdate) holdTasks[index].isComplete = isCompleteNew; //set is complete to true
      else holdTasks.splice(index, 1); //remove deleted task
      
      //update state
      setTasks(holdTasks);
    } else {
      //this will set the parent state in order to trigger use effect in all children since they're using the same data
      //increment will ensure it will always trigger the rerender
      setTriggerRerender(triggerRerender + 1);
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => handleModalClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        className="modalStyle"
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Paper className="modalPaper">
            <div>
              <h2 id="transition-modal-title">
                {modalInfo.name}
                {modalInfo.isComplete && 
                  <CheckCircleIcon 
                    className="actionIcon" 
                    onClick={() => completeTask(modalInfo.index)} 
                    edge="end" />
                }
                {!modalInfo.isComplete &&
                  <CheckCircleOutlineIcon 
                    className="actionIcon" 
                    onClick={() => completeTask(modalInfo.index)} 
                    edge="end" />
                 }
                <DeleteIcon
                  className="actionIcon"
                  onClick={() => deleteTask(modalInfo.index)}
                  edge="end"/>
              </h2>
              <p id="transition-modal-description">{modalInfo.description}</p>
              <p id="transition-modal-due">{new Date(modalInfo.due).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
            </div>
          </Paper>
        </Fade>
      </Modal>
      {!isWidget &&
        <>
          <Typography varient="h3" className="sectionHeader">Task Viewer</Typography>
          <div className="filterContent">
            <FormControl component="fieldset">
              <RadioGroup 
                row 
                aria-label="position"
                name="position"
                defaultValue=""
                onChange={(e) => setFilter(e.target.value)}
              >
                <FormControlLabel
                  value=""
                  control={<Radio color="primary" />}
                  label="All"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="urgent"
                  control={<Radio color="primary" />}
                  label="Urgent"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="upcoming"
                  control={<Radio color="primary" />}
                  label="Upcoming"
                  labelPlacement="top"
                />
                <FormControlLabel 
                  value="overdue"
                  control={<Radio color="primary" />}
                  label="Overdue"
                  labelPlacement="top"
                />
                <FormControlLabel 
                  value="completed"
                  control={<Radio color="primary" />}
                  label="Completed"
                  labelPlacement="top"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </>
      }
      <List subheader={<li />}>
        {tasks.map((task, index) => (
          <ListItem button key={`${index}_${filterType}`} onClick={() => handleModalOpen(task, index)}>
            <ListItemText primary={`${task.name.substring(0, 40)}`} />
            <ListItemSecondaryAction>
              {task.isComplete &&
                <CheckCircleIcon
                className="actionIcon"
                  onClick={() => completeTask(index)}
                  edge="end"
                />
              }
              {!task.isComplete &&
                <CheckCircleOutlineIcon
                  className="actionIcon"
                  onClick={() => completeTask(index)}
                  edge="end"
                />
              }
              <DeleteIcon
                className="actionIcon"
                onClick={() => deleteTask(index)}
                edge="end"
              />
              </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}