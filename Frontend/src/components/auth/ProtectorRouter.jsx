import React from "react";
import { Navigate } from "react-router-dom";

const ProtectorRouter = ({ children }) => {
    const isAuth = localStorage.getItem('authToken');

    if(!isAuth){
        return <Navigate to='/' />
    }

    return(
        <>{ children }</>
    );
}

export default ProtectorRouter;