import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './Menu.css'
import { Link } from "react-router-dom";

const Menu = () => {
    const [menu,setMenu]= useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/menu')
        .then(res => res.json())
        .then(data => {
            const result = data.sort((a,b)=> b.OrderNumber-a.OrderNumber);
            setMenu(result)
        })
        },[menu])
    return (
        <div>
            <Navbar></Navbar>
            <p className="text-center text-white text-3xl font-bold mt-24 p-5">OUR MENU ITEMS</p>
             <div className="mt-36 grid grid-cols-3 gap-5">
                {
                    menu.map(items=> <div className="mx-auto relative card overflow-hidden  w-96" key={items._id}>
                        <img className="w-full h-full object-cover" src={items.FoodImage} alt="" />
                        <div className="w-full h-full top-0 -right-full card-body  p-8 absolute backdrop-blur-sm bg-transparent flex flex-col justify-center">
                        <p className="uppercase text-white font-bold text-lg">Food Name:{items.FoodName}</p>
                        <p className="text-white font-bold text-lg">Food Category:{items.FoodCategory}</p>
                        <p className="text-white font-bold text-lg">Price:${items.Price}</p>
                        <p className="text-white font-bold text-lg">Quantity:{items.Quantity}</p>
                        <Link to={`/detail/${items._id}`}><button className="advanced-button">Details</button></Link>
                        </div>

                    </div>)
                }
             </div>
             
        </div>
    );
};

export default Menu;