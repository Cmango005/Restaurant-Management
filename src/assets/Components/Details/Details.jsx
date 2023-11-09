import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Details.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";




const Details = () => {
    const detail = useLoaderData();
    const { FoodImage, FoodName, FoodCategory, Price, MadeBy, FoodOrigin, Description } = detail;
    const {user}=useContext(AuthContext);
    
    const handleOrder = () =>{
        
        const order = { FoodImage, FoodName, FoodCategory, Price, MadeBy, FoodOrigin, Description, email: user.email  } ;
        console.log(order)
        fetch('https://restaurant-server-green.vercel.app/order',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
                toast('Order Confirm')
            }
        })
       
      }
    return (
        <div>
            <Navbar></Navbar>
            <div  className="flex justify-around mt-24 p-5">
                <img className="w-64 h-80 rounded-lg" src={FoodImage} alt="" />
                <div className="space-y-4">
                    <p className="text-white font-bold text-lg">Food Name: {FoodName}</p>
                    <p className="text-white font-bold text-lg">Food Type: {FoodCategory}</p>
                    <p className="text-white font-bold text-lg">Price: {Price}$</p>
                    <p className="text-white font-bold text-lg">Chef: {MadeBy}</p>
                    <p className="text-white font-bold text-lg">Country(Food Origin): {FoodOrigin}</p>
                    <p className="text-white font-bold text-lg">Ingredients: {Description}</p>
                    <button onClick={handleOrder} className="advanced-button">Order Now</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Details;