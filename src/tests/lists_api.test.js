import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
// import mockAxios from 'jest-mock-axios';
import axios from 'axios';

import ListsContainer from '../components/elements/lists_container';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        token: null,
    },
    task: {
        lists: [],
        tasks: [],
        activeList: null,
        isFetching: false,
    },
});

// clear all mocks between tests
afterEach(() => {
    // cleaning up the mess left behind the previous test
});


jest.mock('axios', () => {
    const mockedLists = {
        data: {
            items: [{
                id: 1,
                title: 'Dummy List',
            }],
        },
    };

    return {
        get: jest.fn(() => Promise.resolve(mockedLists)),
    };
});

describe('List tasks', () => {
    it('fetch lists on #componentDidMount', async (done) => {
        const wrapper = mount(<ListsContainer store={store}/>);
        await wrapper.instance().componentDidMount();
        expect(axios.get).toHaveBeenCalled();
        done();
    });
});

