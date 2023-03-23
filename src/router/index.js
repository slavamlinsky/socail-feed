import About from "../pages/About";
import Home from "../pages/Home";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";


export const privateRoutes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},    
    {path: '/posts/:id', component: <PostIdPage/>, exact: true},    
    {path: '/', component: <Posts/>, exact: true},
    {path: '*', component: <Navigate to="/posts" replace />},
]

export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '*', component: <Navigate to="/login" replace />},    
]

