import { AuthContext } from "../../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './MyItems.css'
const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState([])

    const url = `http://localhost:5000/order?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [url])
    return (
        <div>
            <Navbar></Navbar>
            <p>{order.length}</p>
            <div className="mt-28 grid grid-cols-2">
                {
                    order.map(i => <div className="flex justify-around" key={i._id}>
                        <img className="w-64 h-80 rounded-lg" src={i.FoodImage} alt="" />
                        <div className="space-y-4">
                            <p className="text-white font-bold text-lg">Ordered By: {i.email}</p>
                            <p className="text-white font-bold text-lg">Food Name: {i.FoodName}</p>
                            <p className="text-white font-bold text-lg">Price: {i.Price}</p>
                            <button className="unique-button">Cancel Order</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyItems;