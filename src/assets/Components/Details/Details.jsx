import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Details.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";




const Details = () => {
    const detail = useLoaderData();
    const { FoodImage, FoodName, FoodCategory, Price, MadeBy, FoodOrigin, Description } = detail;
    const {user}=useContext(AuthContext);
    const foodId = detail._id;
    const [menu, setMenu] = useState([])
    useEffect(() => {
      fetch("https://restaurant-server-green.vercel.app/menu")
          .then(res => res.json())
          .then(data => setMenu(data))
  }, [menu])
    const handleOrder = () =>{
        
        if( detail.Quantity>0){
          
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = String(currentDate.getFullYear());

        const orderDate  = `${year}-${month}-${day}`;

        const order = { FoodImage, FoodName, FoodCategory, Price, MadeBy, FoodOrigin, Description, email: user.email ,foodId ,orderDate };
        const newMenu = menu.find(m => m._id === foodId)
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
              const OrderNumber = parseInt(newMenu.OrderNumber) + 1;
                    const Quantity = parseInt(newMenu.Quantity) - 1;
                    const FoodImage = newMenu.FoodImage;
                    const FoodName = newMenu.FoodName;
                    const FoodCategory = newMenu.FoodCategory;
                    const Price = newMenu.Price;
                    const Description = newMenu.Description;
              const updatedProduct ={ OrderNumber,Quantity,FoodImage, FoodName, FoodCategory, Price,Description }
              fetch(`  https://restaurant-server-green.vercel.app/menu/${detail._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            })
            
                toast('Order Confirm')
            }

        }
        )
        }else{
          toast('Sorry Our Item Is Out of Stock')
        }
       
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