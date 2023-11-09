import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Ordered = ({order , handleCancel}) => {
    const {_id , FoodImage ,email,FoodName,Price}= order;
    return (
        <div className="flex justify-around" >
                        <img className="w-64 h-80 rounded-lg" src={FoodImage} alt="" />
                        <div className="space-y-4">
                            <p className="text-white font-bold text-lg">Ordered By: {email}</p>
                            <p className="text-white font-bold text-lg">Food Name: {FoodName}</p>
                            <p className="text-white font-bold text-lg">Price: {Price}</p>
                            <button onClick={()=> handleCancel(_id)} className="unique-button">Cancel Order</button>
                            <ToastContainer />
                        </div>
                    </div>
    );
};

export default Ordered;