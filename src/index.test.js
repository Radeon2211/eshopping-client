import ReactDOM from 'react-dom';
import { app, rootElement } from './index';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('index.js', () => {
  it('should render without crashing', () => {
    ReactDOM.render(app, rootElement);
    expect(ReactDOM.render).toHaveBeenCalledWith(app, rootElement);
  });
});
