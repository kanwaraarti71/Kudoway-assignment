import {State, reducer} from './polls.reducers';
import {
    GET_pollS,
    GetAllpolls,
    GetAllpollsSuccess,
    GET_pollS_ERROR,
    GetAllpollsError,
    Getpoll,
    GET_poll,
    GetpollSuccess,
    GetpollError,
    CREATE_poll,
    CREATE_poll_ERROR,
    AddpollSuccess,
    AddpollError,
    Addpoll,
    UPDATE_poll,
    Updatepoll,
    UpdatepollSuccess,
    UpdatepollError,
    DELETE_poll,
    Removepoll,
    RemovepollSuccess,
    RemovepollError
} from './polls.actions';
import {poll} from '../shared/poll';

const MOCK_DATA: poll[] = [
    {
        id: 1,
        image: 'picture.jpg',
        name: 'poll 1',
        releaseDate: new Date(),
        platforms: [1],
        description: 'Descripion of poll 1'
    }, {
        id: 2,
        image: 'picture2.jpg',
        name: 'poll 2',
        releaseDate: new Date(),
        platforms: [2],
        description: 'Descripion of poll 2'
    }
];

let state: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

describe('Load all polls REDUCER', () => {
    it('should reduce the action GET_pollS', () => {
        const action = new GetAllpolls();
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            action: GET_pollS,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_pollS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllpollsSuccess(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            data: payload,
            done: true
        });
        state = newState;
    });
    it('should reduce the action GET_pollS_ERROR', () => {
        const payload = new Error('Error loading all polls');
        const action = new GetAllpollsError(payload);
        const newState = reducer(state, action);
        expect({ ...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('GET poll by id REDUCER', () => {
    it('should reduce the action GET_poll', () => {
        const payload = MOCK_DATA[0].id;
        const action = new Getpoll(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            action: GET_poll,
            done: false
        });
        state = newState;
    });
    it('should reduce the action GET_poll_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetpollSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action GET_poll_ERROR', () => {
        const payload = new Error('Error loading the poll');
        const action = new GetpollError(payload);
        const newState = reducer(state, action);
        expect({...newState }).toEqual({
            ...state,
            done: true,
            error: action.payload
        });
    });
});

describe('Create new poll REDUCER', () => {
    it('should reduce the action CREATE_poll', () => {
        const payload = {
            id: 3,
            image: 'picture3.jpg',
            name: 'poll 3',
            releaseDate: new Date(),
            platforms: [1, 2],
            description: 'Descripion of poll 3'
        };
        const action = new Addpoll(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: payload,
            action: CREATE_poll,
            done: false
        });
        state = newState;
    });
    it('should reduce the action CREATE_poll_SUCCESS', () => {
        const payload = 3;
        const action = new AddpollSuccess(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            data: [
                ...state.data,
                {
                    ...state.selected,
                    id: payload
                }
            ],
            selected: null,
            done: true
        });
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action CREATE_poll_ERROR', () => {
        const payload = new Error('Error creating the poll');
        const action = new AddpollError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({
            ...state,
            selected: null,
            done: true,
            error: payload
        });
    });
});

describe('Update existing poll REDUCER', () => {
    it('should reduce the action UPDATE_poll', () => {
        const payload = {...MOCK_DATA[0], description: 'Descripion of poll 1 edited'};
        const action = new Updatepoll(payload);
        const newState = reducer(state, action);
        expect({ ...newState}).toEqual({
            ...state,
            selected: payload,
            action: UPDATE_poll,
            done: false
        });
        state = newState;
    });
    it('should reduce the action UPDATE_poll_SUCCESS', () => {
        const index = 0;
        const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
        ];
        const action = new UpdatepollSuccess();
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, data, done: true, selected: null, error: null});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action UPDATE_poll_ERROR', () => {
        const payload = new Error('Error updating the poll');
        const action = new UpdatepollError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});

describe('Deleting existing poll REDUCER', () => {
    it('should reduce the action DELETE_poll', () => {
        const selected = MOCK_DATA[1];
        const payload = selected.id;
        const action = new Removepoll(payload);
        const newState = reducer(state, action);

        expect({ ...newState}).toEqual({
            ...state,
            selected,
            action: DELETE_poll,
            done: false
        });
        state = newState;
    });
    it('should reduce the action DELETE_poll_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemovepollSuccess(payload);
        const data = state.data.filter(h => h.id !== state.selected.id);
        const newState = reducer(state, action);
        expect({...newState}).toEqual( {...state, data, selected: null, done: true});
        state = {...state, selected: null, done: true};
    });
    it('should reduce the action DELETE_poll_ERROR', () => {
        const payload = new Error('Error while deleting the poll');
        const action = new RemovepollError(payload);
        const newState = reducer(state, action);
        expect({...newState}).toEqual({...state, done: true, error: payload});
    });
});
