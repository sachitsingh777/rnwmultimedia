import { FAIL, LOGIN_SUCCESS, LOGOUT, REQUEST } from "./actionTypes";
import axios from 'axios';

export const registerAction = (obj) => (dispatch) => {
    dispatch({ type: REQUEST });
    return axios.post(`https://rnwmultimediablogaasign.onrender.com/users/register`, obj)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: FAIL });
        });
};

export const loginAction = (obj) => (dispatch) => {
    dispatch({ type: REQUEST });
    return axios.post(`https://rnwmultimediablogaasign.onrender.com/users/login`, obj)
        .then((res) => {
            console.log(res);
            const userData = {
                token: res.data.token,
                user: res.data.user
            };

            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            dispatch({ type: LOGIN_SUCCESS, payload: userData });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: FAIL });
        });
};

export const logoutAction = () => (dispatch) => {
    // Remove user data from localStorage on logout
    localStorage.removeItem('userData');
    dispatch({ type: LOGOUT });
};
