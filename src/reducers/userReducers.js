"use strict"
import {USER_SIGNUP,USER_SIGNIN,USER_SIGNIN_ERROR} from '../actions/userAction';
export function userReducers(state = {}, action) {
    switch (action.type) {
        case "USER_SIGNUP":
            console.log(state)
            return {...state,users:action.payload}
            break;
        case "USER_SIGNIN":
            console.log(state);
            return {...state,users:action.payload,msg:null}
            break;
        case "USER_SIGNIN_ERROR":
            //console.log('books=',[...state.books,...action.payload])
            return {...state,msg:action.payload};
            break;
        case  "CHANGE_PASSWORD":
            console.log(state);
            return {...state,users:action.payload,msg:null}
            break;

    }
    return state;
}
