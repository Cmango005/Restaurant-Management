import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../../providers/AuthProvider";


const MyAdd = () => {
    const {user}=useContext(AuthContext);
    const [myAdd,setMyAdd]= useState([])
    
    const url = `http://localhost:5000/menu?email=${user?.email}`
    useEffect(()=>{
        fetch(url)
        .then(res=> res.json())
        .then(data => setMyAdd(data))
    },[url])
    return (
        <div>
            <Navbar></Navbar>
            <div>
                {

                }
            </div>
        </div>
    );
};

export default MyAdd;