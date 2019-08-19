import authReducer from '../../reducers/auth';

test('should set uid on login', () => {
    const uid = 'Johnzy916';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should set uid to empty object on logout', () => {
   const uid = 'Johnzy916';
   const action = {
       type: 'LOGOUT'
   };
   const state = authReducer({ uid }, action);
   expect(state).toEqual({});
});