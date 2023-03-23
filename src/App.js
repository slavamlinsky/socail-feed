import React, { useEffect, useState } from "react";

import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import { AuthContext } from "./context";





function App() {  
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //console.log("Isloading = "+isLoading);

  useEffect(() => {
    //console.log("AUTH"+localStorage.getItem('auth'));

    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoading(false);
  }, [])

  //console.log(isAuth);

  return(    
    <AuthContext.Provider value={{
      isAuth, setIsAuth, isLoading
    }}>
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>      
    </BrowserRouter>
    </AuthContext.Provider>
    
  )
}

export default App
