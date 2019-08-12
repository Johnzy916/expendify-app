import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

// required for process.env firebase variables in test mode
DotEnv.config({ path: '.env.test' });

Enzyme.configure({
  adapter: new Adapter()
});