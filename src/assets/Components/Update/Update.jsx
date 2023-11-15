import { useLoaderData } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const food= useLoaderData();
    //const {FoodImage, FoodName, FoodCategory, Price, Description}=food;
    console.log(food[0].Quantity)
    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const FoodImage = form.FoodImage.value;
        const FoodName = form.FoodName.value;
        const FoodCategory = form.FoodCategory.value;
        const Price = form.Price.value;
        const Description = form.Description.value;
        const Quantity = form.Quantity.value;
        const OrderNumber = food[0].OrderNumber;
        const updateMenu = { OrderNumber,Quantity, FoodImage, FoodName, FoodCategory, Price, Description }
        console.log(updateMenu)
        fetch(`https://restaurant-server-green.vercel.app/menu/${food[0]._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateMenu)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount>0) {
                    toast("Update Successfully")
                }
            })
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='mx-auto mt-20 container'>
                <h2 className="text-center p-6">Update Product</h2>
                <form onSubmit={handleUpdate} className="bg-slate-200" >

                    <div className="flex flex-col back3 bg-no-repeat items-center p-5">
                        <div className="flex justify-center items-center gap-5 ">
                            <div className="">
                                <div className="form-control">
                                    <label className='text-white'>Image:</label>
                                    <input
                                        type="text"
                                        name="FoodImage"
                                        placeholder="Photo URL" defaultValue={food[0].FoodImage} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Name:</label>
                                    <input
                                        type="text"
                                        name="FoodName"
                                        placeholder="Name" defaultValue={food[0].FoodName} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Food Category Name:</label>
                                    <input
                                        type="text"
                                        name="FoodCategory"
                                        placeholder="Food Category Name" defaultValue={food[0].FoodCategory} className="input input-bordered"
                                    />
                                </div>

                            </div>

                            <div className=" ">

                                <div className="form-control ">
                                    <label className='text-white'>Price:</label>
                                    <input
                                        type="number"
                                        name="Price"
                                        placeholder="Price" defaultValue={food[0].Price} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Short Description:</label>
                                    <input
                                        type="text"
                                        name="Description"
                                        placeholder="Text" defaultValue={food[0].Description} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Quantity:</label>
                                    <input
                                        type="text"
                                        name="Quantity"
                                        placeholder="Quantity" defaultValue={food[0].Quantity} className="input input-bordered"
                                    />
                                </div>


                            </div>


                        </div>

                        <button className="advanced-button mt-2" type="submit" value="Update">Update</button>
                        <ToastContainer />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Update;