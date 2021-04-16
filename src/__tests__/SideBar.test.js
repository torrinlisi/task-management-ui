import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'; //enzyme doesn't yet support react 17
import SideBar from '../components/SideBar';


Enzyme.configure({ adapter: new Adapter() });

describe('<SideBar />', () => {

  test('check if renders', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('#sideDrawer')).toHaveLength(1);
  });
});