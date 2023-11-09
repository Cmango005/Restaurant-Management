import { useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () => {
    const product= useLoaderData();
    const {_id, FoodImage, FoodName, FoodCategory, Price, Description, Quantity}=product;
    console.log(product)
    const handleUpdateProduct = event =>{
        event.preventDefault();
        const form = event.target;
        const FoodImage = form.FoodImage.value;
        const FoodName = form.FoodName.value;
        const FoodCategory = form.FoodCategory.value;
        const Price = form.Price.value;
        const Description = form.Description.value;
        const Quantity = form.Quantity.value;
        const updatedProduct = { FoodImage, FoodName, FoodCategory, Price, Description, Quantity}
        fetch(`  https://restaurant-server-green.vercel.app/menu/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
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
        <div className='mx-auto container'>
            <h2 className="text-center p-6">Update Product</h2>
            <form onSubmit={handleUpdateProduct} className="bg-slate-200" >

                <div className="flex flex-col form bg-no-repeat items-center p-5">
                <div className="flex justify-center items-center gap-5 ">
                            <div className="">
                                <div className="form-control">
                                    <label className='text-white'>Image:</label>
                                    <input
                                        type="text"
                                        name="FoodImage"
                                        placeholder="Photo URL" defaultValue={FoodImage} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Name:</label>
                                    <input
                                        type="text"
                                        name="FoodName"
                                        placeholder="Name" defaultValue={FoodName} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Food Category Name:</label>
                                    <input
                                        type="text"
                                        name="FoodCategory"
                                        placeholder="Food Category Name" defaultChecked={FoodCategory} className="input input-bordered"
                                    />
                                </div>
                            </div>

                            <div className=" ">

                                <div className="form-control ">
                                    <label className='text-white'>Price:</label>
                                    <input
                                        type="number"
                                        name="Price"
                                        placeholder="Price" defaultValue={ Price} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Short Description:</label>
                                    <input
                                        type="text"
                                        name="Description"
                                        placeholder="Text" defaultValue={Description} className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className='text-white'>Quantity:</label>
                                    <input
                                        type="text"
                                        name="Quantity"
                                        placeholder="Quantity" defaultValue={Quantity} className="input input-bordered"
                                    />
                                </div>

                            </div>


                        </div>
                    
                    <button className="btn btn-wide hover:bg-red-500 hover:text-white mt-5" type="submit" value="UPDATE">Update Product</button>
                    <ToastContainer />
                </div>

            </form>
        </div>
    </div>
    );
};

export default Update;