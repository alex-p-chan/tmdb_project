/* eslint-disable */
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import Homepage from '../pages/Homepage';

/**
 * @todo adjust mock store for async load
 */

configure({ adapter: new Adapter() });
const middlewares = [promise, thunk];
const mockStore = configureStore(middlewares);

describe('>>>PAGE - Homepage', () => {
  let wrapper, store;
  store = mockStore();
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Homepage />
      </Provider>,
    );
  });

  it('+++ capturing Snapshot of Homepage', () => {
    const renderedValue = renderer.create(wrapper).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('>>>COMPONENT - Render - Homepage', () => {
  let wrapper, store;
  store = mockStore();
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Homepage />
      </Provider>,
    );
  });
  it('+++ check that component renders', () => {
    expect(wrapper.length).toEqual(1);
  });
})
