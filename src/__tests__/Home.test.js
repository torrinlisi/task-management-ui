import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; //enzyme doesn't yet support react 17
import Home from '../components/Home';
import TaskList from '../components/TaskList'

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
  test('check if renders', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.text().includes("Dashboard")).toBe(true);
  });

  test('renders 4 tasklist components', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(TaskList)).toHaveLength(4);
  });
});