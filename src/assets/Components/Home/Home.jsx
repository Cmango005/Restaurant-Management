import "./Home.css"
import Navbar from "../Navbar/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
// ..
AOS.init();
const Home = () => {
    const [menu, setMenu] = useState([]);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/menu')
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

                <div className="mt-16 grid grid-cols-3 gap-5 ">
                    {
                        menu.slice(0, showAll ? menu.length : 6).map((items) => <div className="mx-auto relative card overflow-hidden  w-96" key={items._id}>
                            <img className="w-full h-full object-cover" src={items.FoodImage} alt="" />
                            <div className="w-full h-full top-0 -right-full card-body  p-8 absolute backdrop-blur-sm bg-transparent flex flex-col justify-center">
                                <p className="uppercase text-white font-bold text-lg">Food Name:{items.FoodName}</p>
                                <p className="text-white font-bold text-lg">Food Category:{items.FoodCategory}</p>
                                <p className="text-white font-bold text-lg">Price:${items.Price}</p>
                                <p className="text-white font-bold text-lg">Quantity:{items.Quantity}</p>
                                <button className="advanced-button">Details</button>
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


        </div>
    );
};

export default Home;