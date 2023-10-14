import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Blogs from "../Pages/Blogs";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile";

export default function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/blogs" element={<PrivateRoute><Blogs/></PrivateRoute>}/>
        </Routes>
    )
}