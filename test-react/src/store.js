import React, { createContext, useContext } from 'react';
import useReducerWithSideEffects, {
    UpdateWithSideEffect,
} from 'use-reducer-with-side-effects';

const AppContext = createContext();

const reducer = (prevState, action) => {
    const { type } = action;

    if (type === LOGIN) {
        const { payload } = action;
        const { user, isAuthenticated } = payload;
        const newState = {
            user: user,
            isAuthenticated: isAuthenticated,
        };
        console.log('session : ', newState);
        return UpdateWithSideEffect(newState, (state, dispatch) => {});
    } else if (type === LOGOUT) {
        const newState = {
            user: '',
            isAuthenticated: false,
        };
        return UpdateWithSideEffect(newState, (state, dispatch) => {});
    }
    return prevState;
};

export const AppProvider = ({ children }) => {
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        user: '',
        isAuthenticated: false,
    });

    console.log('store', store);

    return (
        <AppContext.Provider value={{ store, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

// Action Creators
const LOGIN = 'APP/LOGIN';
const LOGOUT = 'APP/LOGOUT';

export const setSession = (session) => ({ type: LOGIN, payload: session }); // 얻은 세션값을 dispatch로 통해 전달
export const deleteSession = () => ({ type: LOGOUT });
