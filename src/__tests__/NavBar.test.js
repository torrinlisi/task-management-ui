import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; //enzyme doesn't yet support react 17
import NavBar from '../components/NavBar';


Enzyme.configure({ adapter: new Adapter() });

describe('<NavBar />', () => {

  test('check if renders', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.text().includes("Task Manager")).toBe(true);
  });
});