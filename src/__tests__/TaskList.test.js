import Enzyme, { shallow, mount } from 'enzyme';
import axiosMock from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; //enzyme doesn't yet support react 17
import TaskList from '../components/TaskList';
import { act } from '@testing-library/react'; 
import { AssessmentRounded } from '@material-ui/icons';

// import { BrowserRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe('<TaskList />', () => {

  test('check if full screen renders', () => {
    const wrapper = shallow(<TaskList isWidget={false}/>);
    expect(wrapper.text().includes("Task Viewer")).toBe(true);
  });

  test('check if widget renders', () => {
    const wrapper = shallow(<TaskList isWidget={true}/>);
    expect(wrapper.text().includes("Task Viewer")).toBe(false);
  });

  test('see if task visible', () => {
    const wrapper = shallow(<TaskList isWidget={true}/>);

    //looks for value returned in mocked axios function
    expect(wrapper.text().includes("test name")).toBe(false);
  })

  test('complete task', async () => {
    axiosMock.get.mockResolvedValue({data: [{
      "_id": "1",
      "name": "test name",
      "description": "test description",
      "due": new Date().toISOString(),
      "isComplete": false
    }] })

    const setTriggerRerender = jest.fn();

    let wrapper;
    await act(async () => {
      wrapper = mount(<TaskList isWidget={true} setTriggerRerender={setTriggerRerender}/>);
    });
    
    await act(async () => {
      wrapper.update();
    })

    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    await act(async () => {
      wrapper.find('[data-testid="uncompletedTaskButton"]').at(1).simulate('click');
    });

    expect(setTriggerRerender).toHaveBeenCalledTimes(1);
  })

  test('uncomplete task', async () => {
    axiosMock.get.mockResolvedValue({data: [{
      "_id": "1",
      "name": "test name",
      "description": "test description",
      "due": new Date().toISOString(),
      "isComplete": true
    }] })

    const setTriggerRerender = jest.fn();

    let wrapper;
    await act(async () => {
      wrapper = mount(<TaskList isWidget={true} setTriggerRerender={setTriggerRerender}/>);
    });
    
    await act(async () => {
      wrapper.update();
    })

    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    await act(async () => {
      wrapper.find('[data-testid="completedTaskButton"]').at(1).simulate('click');
    });

    expect(axiosMock.put).toHaveBeenCalledTimes(1);

    expect(setTriggerRerender).toHaveBeenCalledTimes(1);
  })

  test('delete task', async () => {
    axiosMock.get.mockResolvedValue({data: [{
      "_id": "1",
      "name": "test name",
      "description": "test description",
      "due": new Date().toISOString(),
      "isComplete": true
    }] })

    const setTriggerRerender = jest.fn();

    let wrapper;
    await act(async () => {
      wrapper = mount(<TaskList isWidget={true} setTriggerRerender={setTriggerRerender}/>);
    });
    
    await act(async () => {
      wrapper.update();
    })

    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    await act(async () => {
      wrapper.find('[data-testid="deleteTaskButton"]').at(1).simulate('click');
    });

    expect(axiosMock.delete).toHaveBeenCalledTimes(1);

    expect(setTriggerRerender).toHaveBeenCalledTimes(1);
  })
  
  test('open task modal', async () => {
    axiosMock.get.mockResolvedValue({data: [{
      "_id": "1",
      "name": "test name",
      "description": "test description",
      "due": new Date().toISOString(),
      "isComplete": true
    }] })

    let wrapper;
    await act(async () => {
      wrapper = mount(<TaskList isWidget={true}/>);
    });
    
    await act(async () => {
      wrapper.update();
    })

    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    await act(async () => {
      wrapper.find('[data-testid="listItem"]').at(1).simulate('click');
    });

    await act(async () => {
      wrapper.update();
    })

    console.log(wrapper.debug())

    expect(wrapper.exists('[data-testid="modalHeader"]')).toBe(true);
  })

  test('close task modal', async () => {
    expect(true);
  })

  test('check full screen filters', async () => {
    expect(true);
  })

//     expect(wrapper.find('#taskName').prop('value')).toEqual(
//       'Test Task',
//     );

//     wrapper.find('#taskDueDateTime').simulate('change', {
//       target: {
//         value: '55555-05-05T05:55',
//       },
//     });

//     expect(wrapper.find('#taskDueDateTime').prop('value')).toEqual(
//       '55555-05-05T05:55',
//     );

//     wrapper.find('#taskDescription').simulate('change', {
//       target: {
//         value: 'This is a test',
//       },
//     });

//     expect(wrapper.find('#taskDescription').prop('value')).toEqual(
//       'This is a test',
//     );
//   });

//   test('checks save click', async () => {
//     axiosMock.post.mockResolvedValue({data: {} })
//     const wrapper = mount(<Router><CreateTask /></Router>);

//     await act(async () => {
//       wrapper.find('#saveButton').at(1).simulate('click');
//     });
    
//     expect(axiosMock.post).toHaveBeenCalledTimes(1);
//   });
});