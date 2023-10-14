// blog actions
import axios from "axios"
import { FAIL, GET_BLOGBYID_SUCCESS, GET_BLOGID_SUCCESS, GET_BLOGUSER_SUCCESS, GET_BLOG_SUCCESS, POST_BLOG_SUCCESS, REQUEST } from "./actionTypes"

// add blog
export const addBlog = (obj, token) => (dispatch) => {
    dispatch({ type: REQUEST })
   return axios.post(`https://rnwmultimediablogaasign.onrender.com/blogs/add`, obj, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then((res) => {
            // console.log(res);
            dispatch({ type: POST_BLOG_SUCCESS })
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: FAIL })
        })
}

// get blogs
export const getBlog = (obj, token) => (dispatch) => {
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }, params:obj}
    axios.get(`https://rnwmultimediablogaasign.onrender.com/blogs/getall`,configs)
        .then((res) => {
            // console.log(res);
            dispatch({type:GET_BLOG_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: FAIL })
        })
}
export const getuser = (obj, token) => (dispatch) => {
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }, params:obj}
    axios.get(`https://rnwmultimediablogaasign.onrender.com/blogs/get`,configs)
        .then((res) => {
            // console.log(res);
            dispatch({type:GET_BLOGUSER_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: FAIL })
        })
}
export const getbyid = (obj,blogID, token) => (dispatch) => {
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }, params:obj}
    axios.get(`https://rnwmultimediablogaasign.onrender.com/blogs/get/${blogID}`,configs)
        .then((res) => {
            // console.log(res);
            dispatch({type:GET_BLOGBYID_SUCCESS, payload:res.data})
        })
        .catch((err) => {
            // console.log(err);
            dispatch({ type: FAIL })
        })
}
// update blog
export const updateBlog=(obj,blogID,token)=>(dispatch)=>{
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }}
    return axios.patch(`https://rnwmultimediablogaasign.onrender.com/blogs/update/${blogID}`,obj,configs)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
        dispatch({ type: FAIL })
    })
}

// delete blog
export const deleteBlog=(blogID,token)=>(dispatch)=>{
    dispatch({ type: REQUEST })
    let configs={headers: { "Authorization": `Bearer ${token}` }}
    return axios.delete(`https://rnwmultimediablogaasign.onrender.com/blogs/delete/${blogID}`,configs)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
        dispatch({ type: FAIL })
    })
}