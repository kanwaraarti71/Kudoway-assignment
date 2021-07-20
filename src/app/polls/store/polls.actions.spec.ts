import {
    GetAllpolls,
    GET_pollS,
    GET_pollS_SUCCESS,
    GetAllpollsSuccess,
    GetAllpollsError,
    GET_pollS_ERROR,
    Getpoll,
    GET_poll,
    GetpollSuccess,
    GET_poll_SUCCESS,
    GetpollError,
    GET_poll_ERROR,
    Addpoll,
    CREATE_poll,
    AddpollSuccess,
    CREATE_poll_SUCCESS,
    CREATE_poll_ERROR,
    AddpollError,
    Removepoll,
    DELETE_poll,
    RemovepollSuccess,
    DELETE_poll_SUCCESS,
    DELETE_poll_ERROR,
    RemovepollError,
    Updatepoll,
    UPDATE_poll,
    UpdatepollSuccess,
    UPDATE_poll_ERROR,
    UpdatepollError,
    UPDATE_poll_SUCCESS
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
/****************************************
 * GET all the polls
 ****************************************/
describe('Load All polls ACTION', () => {
    it('should create the action GET_pollS', () => {
        const action = new GetAllpolls();
        expect({...action}).toEqual({type: GET_pollS});
    });
    it('should create the action GET_pollS_SUCCESS', () => {
        const payload = [...MOCK_DATA];
        const action = new GetAllpollsSuccess(payload);
        expect({...action}).toEqual({type: GET_pollS_SUCCESS, payload});
    });
    it('should create the action GET_pollS_ERROR', () => {
        const payload = new Error('Error loading all polls');
        const action = new GetAllpollsError(payload);
        expect({...action}).toEqual({
            type: GET_pollS_ERROR, payload
        });
    });
});
/****************************************
 * GET poll by id
 ****************************************/
describe('Load specific poll ACTION', () => {
    it('should create the action GET_poll', () => {
        const payload = MOCK_DATA[0].id;
        const action = new Getpoll(payload);
        expect({...action}).toEqual({ type: GET_poll, payload });
    });
    it('should create the action GET_poll_SUCCESS', () => {
        const payload = MOCK_DATA[0];
        const action = new GetpollSuccess(payload);
        expect({...action}).toEqual({ type: GET_poll_SUCCESS, payload });
    });
    it('should create the action GET_poll_ERROR', () => {
        const payload = new Error('Error loading the poll');
        const action = new GetpollError(payload);
        expect({...action}).toEqual({
            type: GET_poll_ERROR, payload
        });
    });
});

/****************************************
 * ADD new poll
 ****************************************/
describe('Create new poll ACTION', () => {
    it('should create the action CREATE_poll', () => {
        const payload = MOCK_DATA[1];
        const action = new Addpoll(payload);
        expect({...action}).toEqual({
            type: CREATE_poll, payload
        });
    });
    it('should create the action CREATE_poll_SUCCESS', () => {
        const payload = MOCK_DATA[1].id;
        const action = new AddpollSuccess(payload);
        expect({...action}).toEqual({ type: CREATE_poll_SUCCESS, payload });
    });
    it('should create the action CREATE_poll_ERROR', () => {
        const payload = new Error('Error while adding a new poll');
        const action = new AddpollError(payload);
        expect({...action}).toEqual({ type: CREATE_poll_ERROR, payload });
    });
});
/****************************************
 * REMOVE a poll by id
 ****************************************/
describe('Remove a poll ACTION', () => {
    it('should create the action DELETE_poll', () => {
        const payload = MOCK_DATA[1].id;
        const action = new Removepoll(payload);
        expect({...action}).toEqual({ type: DELETE_poll, payload });
    });
    it('should create the action DELETE_poll_SUCCESS', () => {
        const payload = MOCK_DATA[1];
        const action = new RemovepollSuccess(payload);
        expect({...action}).toEqual({ type: DELETE_poll_SUCCESS, payload });
    });
    it('should create the action DELETE_poll_ERROR', () => {
        const payload = new Error('Error removing poll.');
        const action = new RemovepollError(payload);
        expect({...action}).toEqual({ type: DELETE_poll_ERROR, payload });
    });
});
/****************************************
 * UPDATE poll by id
 ****************************************/
describe('Update a poll ACTION', () => {
    it('should create the action UPDATE_poll', () => {
        const payload = MOCK_DATA[0];
        const action = new Updatepoll(payload);
        expect({...action}).toEqual({ type: UPDATE_poll, payload });
    });
    it('should create the action UPDATE_poll_SUCCESS', () => {
        const action = new UpdatepollSuccess();
        expect({...action}).toEqual({type: UPDATE_poll_SUCCESS});
    });
    it('should create the action UPDATE_poll_ERROR', () => {
        const payload = new Error('Error updating poll.');
        const action = new UpdatepollError(payload);
        expect({...action}).toEqual({
            type: UPDATE_poll_ERROR, payload
        });
    });
});
