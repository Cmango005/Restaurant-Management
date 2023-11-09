import { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../../providers/AuthProvider";
import './Add.css'
import { Link } from "react-router-dom";

const MyAdd = () => {
    const { user } = useContext(AuthContext);
    const [myAdd, setMyAdd] = useState([])

    const url = `http://localhost:5000/menu/my?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMyAdd(data))
    }, [url])
    return (
        <div>
            <Navbar></Navbar>
            <div className="grid grid-cols-2">
                {
                    myAdd.map(m => <div className="flex justify-around mt-24 p-5" key={m._id}>
                        <img className="w-64 h-80 rounded-lg" src={m.FoodImage} alt="" />
                        <div className="space-y-4">
                           <p className="text-white font-bold text-lg">Name: {m.FoodName}</p>
                           <p className="text-white font-bold text-lg">Price: {m.Price}$</p>
                           <p className="text-white font-bold text-lg">Ingredients: {m.Description} </p>
                           <Link to={`/menu/${m._id}`}><button className="advanced-button">UPDATE</button></Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyAdd;