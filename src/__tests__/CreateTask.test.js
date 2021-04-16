import Enzyme, { shallow, mount } from 'enzyme';
import axiosMock from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; //enzyme doesn't yet support react 17
import CreateTask from '../components/CreateTask';
import { act } from '@testing-library/react';

import { BrowserRouter as Router } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateTask />', () => {

  test('check if renders', () => {
    const wrapper = shallow(<CreateTask />);
    expect(wrapper.text().includes("Create Task")).toBe(true);
  });

  test('see if form can be filled', () => {
    const wrapper = shallow(<CreateTask />);

    wrapper.find('#taskName').simulate('change', {
      target: {
        value: 'Test Task',
      },
    });

    expect(wrapper.find('#taskName').prop('value')).toEqual(
      'Test Task',
    );

    wrapper.find('#taskDueDateTime').simulate('change', {
      target: {
        value: '55555-05-05T05:55',
      },
    });

    expect(wrapper.find('#taskDueDateTime').prop('value')).toEqual(
      '55555-05-05T05:55',
    );

    wrapper.find('#taskDescription').simulate('change', {
      target: {
        value: 'This is a test',
      },
    });

    expect(wrapper.find('#taskDescription').prop('value')).toEqual(
      'This is a test',
    );
  });

  test('checks save click', async () => {
    axiosMock.post.mockResolvedValue({data: {} })
    const wrapper = mount(<Router><CreateTask /></Router>);

    await act(async () => {
      wrapper.find('#saveButton').at(1).simulate('click');
    });
    
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
  });
});