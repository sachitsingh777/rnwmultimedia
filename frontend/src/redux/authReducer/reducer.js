import { FAIL, LOGIN_SUCCESS, LOGOUT, REQUEST } from "./actionTypes"

const initialState={
    isLoading:false,
    isError:false,
    token:"",
    user:{}
}

export const reducer=(state=initialState,{type,payload})=>{
    switch(type){
        case REQUEST: return {...state, isLoading:true}
        case LOGIN_SUCCESS: return {...state, isLoading:false, token:payload.token, user:payload.user}
        case FAIL: return {...state, isLoading:false, isError:true}
        case LOGOUT: return initialState
        default: return state
    }
}