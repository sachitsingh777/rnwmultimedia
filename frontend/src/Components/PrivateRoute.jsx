import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const authStore=useSelector((store)=>store.authReducer)
    if(authStore.token===""){
        return <Navigate to={'/'}/>
    }else{
        return children
    }
}