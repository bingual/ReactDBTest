import React, { createContext, useContext } from 'react';
import useReducerWithSideEffects, {
    UpdateWithSideEffect,
} from 'use-reducer-with-side-effects';
import { getStorageItem, setStorageItem } from 'utils/useLocalStorage';

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
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem('session', {
                user: user,
                isAuthenticated: isAuthenticated,
            });
        });
    } else if (type === LOGOUT) {
        const newState = {
            user: '',
            isAuthenticated: false,
        };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem('session', {
                user: '',
                isAuthenticated: '',
            });
        });
    }
    return prevState;
};

export const AppProvider = ({ children }) => {
    const session = getStorageItem('session', '');
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        user: session.user,
        isAuthenticated: session.isAuthenticated,
    });

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
