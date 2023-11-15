import { AuthContext } from "../../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './MyItems.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ordered from "../MyOrder/Ordered";
const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrder] = useState([])
    const [menu, setMenu] = useState([])
    const url = `https://restaurant-server-green.vercel.app/order?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [url])
    useEffect(() => {
        fetch("https://restaurant-server-green.vercel.app/menu")
            .then(res => res.json())
            .then(data => setMenu(data))
    }, [menu])
    const handleCancel = (id, foodId) => {
        const newMenu = menu.find(m => m._id === foodId)
        fetch(`https://restaurant-server-green.vercel.app/order/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    const OrderNumber = parseInt(newMenu.OrderNumber) - 1;
                    const Quantity = parseInt(newMenu.Quantity) + 1;
                    const FoodImage = newMenu.FoodImage;
                    const FoodName = newMenu.FoodName;
                    const FoodCategory = newMenu.FoodCategory;
                    const Price = newMenu.Price;
                    const Description = newMenu.Description;
                    const updatedProduct = { OrderNumber, Quantity, FoodImage, FoodName, FoodCategory, Price, Description }
                    fetch(`  https://restaurant-server-green.vercel.app/menu/${foodId}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedProduct)
                    })
                    toast('Cancel Order SuccessFully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                    const remaining = orders.filter(order => order._id !== id);
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