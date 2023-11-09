import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Details.css'

const Details = () => {
    const detail = useLoaderData();
   const {FoodImage,FoodName,FoodCategory,Price,MadeBy,FoodOrigin,Description}=detail;
    return (
        <div>
            <Navbar></Navbar>
        <div className="flex justify-around mt-24 p-5">
           <img className="w-64 h-80 rounded-lg" src={FoodImage} alt="" />
           <div className="space-y-4">
           <p className="text-white font-bold text-lg">Food Name: {FoodName}</p>
           <p className="text-white font-bold text-lg">Food Type: {FoodCategory}</p>
           <p className="text-white font-bold text-lg">Price: {Price}$</p>
           <p className="text-white font-bold text-lg">Chef: {MadeBy}</p>
           <p className="text-white font-bold text-lg">Country(Food Origin): {FoodOrigin}</p>
           <p className="text-white font-bold text-lg">Ingredients: {Description}</p>
           <button  className="advanced-button">Order Now</button>
           </div>
        </div>
        </div>
    );
};

export default Details;