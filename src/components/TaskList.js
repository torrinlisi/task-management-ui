import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TaskList(params) {
  const [tasks, setTasks] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  //only get tasks on mount
  useEffect(() => {
    getTasks();
  }, [])

  const getTasks = () => {
    console.log(params.filterType)
    axios.get("http://localhost:3000/", {
        params: {
          filter: params.filterType
        }
      })
      .then(res => {
        setTasks(res.data);
      });
  }

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

    //call api to complete task

    /* This is done below so that we don't have to call back to the api every time there is an update */
    //create array of tasks not reference
    let holdTasks = [...tasks];

    //set is complete to true
    holdTasks[index].isComplete = true;
    
    //update state
    setTasks(holdTasks);
  }

  const unCompleteTask = (index) => {

    //call api to mark task incomplete

    /* This is done below so that we don't have to call back to the api every time there is an update */
    //create array of tasks not reference
    let holdTasks = [...tasks];

    //set is complete to false
    holdTasks[index].isComplete = false;
    
    //update state
    setTasks(holdTasks);
  }

  const deleteTask = (index) => {
    //call to delete task

    /* This is done below so that we don't have to call back to the api every time there is an update */
    //create array of tasks not reference
    let holdTasks = [...tasks];

    //remove deleted task
    holdTasks.splice(index, 1);

    //update state
    setTasks(holdTasks);
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
                {modalInfo.isComplete && <CheckCircleIcon onClick={() => unCompleteTask(modalInfo.index)} edge="end" />}
                {!modalInfo.isComplete && <CheckCircleOutlineIcon onClick={() => completeTask(modalInfo.index)} edge="end" />}
              </h2>
              <p id="transition-modal-description">{modalInfo.description}</p>
              <p id="transition-modal-due">{new Date(modalInfo.due).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
            </div>
          </Paper>
        </Fade>
      </Modal>
      <List subheader={<li />}>
        {tasks.map((task, index) => (
          <>
            <ListItem button key={task._id} onClick={() => handleModalOpen(task, index)}>
              <ListItemText primary={`${task.name.substring(0, 40)}`} />
              <ListItemSecondaryAction>
                {task.isComplete &&
                 <CheckCircleIcon
                    onClick={() => unCompleteTask(index)}
                    edge="end"
                  />
                }
                {!task.isComplete &&
                  <CheckCircleOutlineIcon
                    onClick={() => completeTask(index)}
                    edge="end"
                  />
                }
                <DeleteIcon
                  onClick={() => deleteTask(index)}
                  edge="end"
                />
                </ListItemSecondaryAction>
            </ListItem>
          </>
        ))}
      </List>
    </>
  )
}