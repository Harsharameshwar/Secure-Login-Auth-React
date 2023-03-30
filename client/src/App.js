import React, { useEffect, useState} from "react";
import Login from "./Components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Admin from "./Pages/Admin";
import Doctor from "./Pages/Doctor";
import Patient from "./Pages/Patient";
import Pharma from "./Pages/Pharma";
import Signup from "./Components/Login/Signup";
import Reception from "./Pages/Reception";
import Landing from "./Components/Login/Landing";
import { RequireAuth, useAuthHeader, useAuthUser } from "react-auth-kit";




function App() {
  // const [role,setRole]=useState(JSON.parse(localStorage.getItem("role")) ? JSON.parse(localStorage.getItem("role")):"")
  
  const auth = useAuthUser()
  const [role,setRole]=useState("")
  // const authHeader = useAuthHeader()
  // const string=authHeader();
  // console.log(string);

  function CallBack(x){
    x && setRole(x)
    // console.log(authHeader());
    }


    useEffect(()=>{
      async function fetch(){
        const role1=await auth()?.data?.role 
        setRole(role1)
      }
      fetch()
    },[])
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login OnLogin={CallBack}/>} />
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/*"
          element={
            role === "Admin" && <RequireAuth loginPath={'/login'}><Admin /> </RequireAuth>
          }
        />
        <Route
          path="/doctor/*"
          element={
            role === "Doctor" && <RequireAuth loginPath={'/login'}><Doctor /> </RequireAuth>
          }
        />
        <Route
          path="/patient/*"
          element={
            role === "Patient" && <RequireAuth loginPath={'/login'}><Patient/></RequireAuth>
          }
        />
        <Route
          path="/receptionist/*"
          element={
            role === "Receptionist"  && 
            <RequireAuth loginPath={'/login'}>
              <Reception/>
            </RequireAuth>
          }
        />
        <Route
          path="/pharma/*"
          element={
            role === "Pharmaceutical" && <RequireAuth loginPath={'/login'}><Pharma/></RequireAuth>
          }
        />
      </Routes>
      </Router>
  );
}

export default App;
