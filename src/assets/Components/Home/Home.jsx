import "./Home.css"
import Navbar from "../Navbar/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";


AOS.init();
const Home = () => {
    const [menu, setMenu] = useState([]);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        fetch('https://restaurant-server-green.vercel.app/menu')
            .then(res => res.json())
            .then(data => {
                const result = data.sort((a, b) => b.OrderNumber - a.OrderNumber);
                setMenu(result)
            })
    }, [menu])
    const handleShowAll = () => {
        setShowAll(!showAll);
    };
    return (
        <div>
          
            <section className="mx-auto container">
                <img src="https://i.ibb.co/Q834Lf9/pexels-ljupco-dzambazovski-1346132.jpg" alt="" />
                <Navbar></Navbar>
                <div data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" data-aos-duration="1500" className="text-center top-72 absolute left-20 mr-14">
                    <p className="text-white des">
                        Experience a culinary journey at our restaurant, where we blend traditional flavors  with modern twists. Indulge in our diverse menu offering a range of mouthwatering dishes prepared with the freshest ingredients, promising a delightful dining experience for every palate
                    </p>
                    <Link to='/menu'><button className="advanced-button mt-5">MENU</button></Link>
                </div>
            </section>

            <Marquee>
                <i className=" text-white text-3xl font-bold flex justify-center mt-24 p-5"><p className="space-x-2">OUR TOP SELLING ITEMS.... OUR TOP SELLING ITEMS.... OUR TOP SELLING ITEMS.... </p></i>
            </Marquee>
            <section>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 ">
                    {
                        menu.slice(0, showAll ? menu.length : 6).map((items) => <div className="mx-auto relative card overflow-hidden  w-96" key={items._id}>
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
                {!showAll && menu.length > 6 &&
                    <div className="flex justify-center mt-5">
                        <Link to='/menu'><button className="advanced-button" onClick={handleShowAll}>Show All</button></Link>
                    </div>
                }
            </section>
            <section className='mx-auto container mt-16'>

                <div className="hero min-h-screen bg-base-200">
                    <div className='mb-96'>
                        <p className='font-bold text-2xl text-center'>IF U HAVE ANY COMPLAIN ABOUT US FEEL FREE TO FILL UP THIS COMPLAIN BOX</p>
                    </div>
                    <div className="hero-content flex-col lg:flex-row-reverse">

                        <div className=" flex-shrink-0 w-full bg-slate-100  mt-16 rounded-xl shadow-2xl p-1 lg:p-6 ">
                            <form className="">
                                <div className='flex gap-4'>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">Your Name:</label>
                                            <input type="text" placeholder="name" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="email" placeholder="email" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">Your Phone:</label>
                                            <input type="number" placeholder="phone" className="input input-bordered" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="form-control">
                                            <label className="label">Your Complain:</label>
                                            <textarea type="text" placeholder="your complain" className="input h-56 w-52" required></textarea>
                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </div>
                                <div className="form-control text-center mt-6">
                                    <button className="btn btn-info">Submit Complain</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;