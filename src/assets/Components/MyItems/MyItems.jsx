import { AuthContext } from "../../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './MyItems.css'
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Ordered from "../MyOrder/Ordered";
const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrder] = useState([])

    const url = `http://localhost:5000/order?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [url])
    const handleCancel = id =>{
        fetch(`http://localhost:5000/order/${id}`,{
         method: 'DELETE'
        })
        .then(res=> res.json())
        .then(data =>{
         console.log(data)
         if(data.deletedCount>0){
             toast('Cancel Order SuccessFully')
             const remaining = orders.filter(order => order._id!== id);
             setOrder(remaining);
         }
        })
     }
    return (
        <div>
            <Navbar></Navbar>
            
            <div className="mt-28 grid grid-cols-2">
                {
                    orders.map(order => <Ordered key={order._id}
                    order={order}
                    handleCancel={handleCancel}
                    ></Ordered>)
                }
            </div>
        </div>
    );
};

export default MyItems;