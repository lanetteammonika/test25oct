import axios from 'axios';

const baseUrl='http://localhost:4000/'

export function postUser(user,callback) {
    return function(dispatch){

        console.log(user);
        axios.post('http://localhost:4000/confirmation',user)
            .then(function(res){

                console.log(res);

                callback()

            })
            .catch(function (err) {

                console.log(err);

            })
        dispatch({
            type: "USER_SIGNUP",
            payload:user
        })
    }



}

export function loginUser(userlogin,callback) {
    return function(dispatch){
        let user={};
        console.log('---userlogin---',userlogin);
        axios.post('http://localhost:4000/login',userlogin)
            .then(function(res){

                    console.log('response from login-----', res.data);

                    dispatch({
                        type: "USER_SIGNIN",
                        payload: res.data
                    })

                    callback()

                    // dispatch({
                    //     type: "USER_SIGNIN_ERROR",
                    //     payload: res.data.msg
                    // })
                    //

            })
            .catch(function (err) {

                console.log(err);

            })

    }



}

export function changepassword(user,callback) {
    debugger
    return function(dispatch){
        let user1={};
        debugger
        console.log('---userlogin---',user1);
        axios.post('http://localhost:4000/changepassword',user)
            .then(function(res){
debugger
                console.log('response from login-----', res.data);

                dispatch({
                    type: "CHANGE_PASSWORD",
                    payload: res.data
                })

                callback()

                // dispatch({
                //     type: "USER_SIGNIN_ERROR",
                //     payload: res.data.msg
                // })
                //

            })
            .catch(function (err) {
debugger
                console.log(err);

            })

    }

}
