import "./Home.css"
import Navbar from "../Navbar/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Link } from "react-router-dom";
// ..
AOS.init();
const Home = () => {

    return (
        <div>
            <section className="mx-auto container">
               
                <Navbar></Navbar>
                <div data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom" className="text-center top-72 absolute left-20 mr-14">
                    <p className="text-white des">
                        Experience a culinary journey at our restaurant, where we blend traditional flavors  with modern twists. Indulge in our diverse menu offering a range of mouthwatering dishes prepared with the freshest ingredients, promising a delightful dining experience for every palate
                    </p>
                    <Link to='/menu'><button className="advanced-button mt-5">MENU</button></Link>
                </div>
            </section>


        </div>
    );
};

export default Home;