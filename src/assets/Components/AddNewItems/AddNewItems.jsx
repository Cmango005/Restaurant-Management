import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './New.css'
import Navbar from '../Navbar/Navbar';
const AddNewItems = () => {
    const handleAddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const FoodImage = form.FoodImage.value;
        const FoodName = form.FoodName.value;
        const FoodCategory = form.FoodCategory.value;
        const Price = form.Price.value;
        const Description = form.Description.value;
        const Quantity = form.Quantity.value;


        const newMenu = { FoodImage, FoodName, FoodCategory, Price, Description, Quantity }
        console.log(newMenu)
        fetch("http://localhost:5000/menu", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMenu)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    toast("Menu Items Added Successfully")
                }
            })

    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='mx-auto mt-20 container'>
                <h2 className="text-center p-6">Add Product</h2>
                <form onSubmit={handleAddProduct} className="bg-slate-200" >

                    <div className="flex flex-col back3 bg-no-repeat items-center p-5">
                        <div className="flex justify-center items-center gap-5 ">
                            <div className="">
                                <div className="form-control">
                                    <label className='text-white'>Image:</label>
                                    <input
                                        type="text"
                                        name="FoodImage"
                                        placeholder="Photo URL" className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Name:</label>
                                    <input
                                        type="text"
                                        name="FoodName"
                                        placeholder="Name" className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Food Category Name:</label>
                                    <input
                                        type="text"
                                        name="FoodCategory"
                                        placeholder="Food Category Name" className="input input-bordered"
                                    />
                                </div>
                            </div>

                            <div className=" ">

                                <div className="form-control ">
                                    <label className='text-white'>Price:</label>
                                    <input
                                        type="number"
                                        name="Price"
                                        placeholder="Price" className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Short Description:</label>
                                    <input
                                        type="text"
                                        name="Description"
                                        placeholder="Text" className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Quantity:</label>
                                    <input
                                        type="text"
                                        name="Quantity"
                                        placeholder="Quantity" className="input input-bordered"
                                    />
                                </div>

                            </div>


                        </div>

                        <button className="advanced-button" type="submit" value="Add Product">Add Product</button>
                        <ToastContainer />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddNewItems;