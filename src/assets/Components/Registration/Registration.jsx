import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import './Registration.css'
import Navbar from "../Navbar/Navbar";


const Registration = () => {
    const [errMessage, setErrMessage] = useState('')
    const { createUser } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const email = form.get('email');
        const password = form.get('password');
        const name = form.get('name');
        const photo = form.get('photo')
        setErrMessage('')

        if (password.length < 6) {
            setErrMessage('password cannot be less then 6 character')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setErrMessage('password must have a upper case letter')
            return
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErrMessage('password must have a special character')
            return
        }
        createUser(email, password, name, photo)
            .then(result => {

                

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                
            })
            .catch(error => {
                console.log(error)
            })


    }
    return (
        <div className="hero back min-h-screen ">
            <Navbar></Navbar>
            <div className="hero-content  flex-col lg:flex-row-reverse">

                <div className=" w-full shadow-2xl ">
                    <form onSubmit={handleRegister} className=" backdrop-blur bg-transparent p-5">

                       <div className="flex gap-5">
                       <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold text-lg">Name</span>
                                </label>
                                <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold text-lg">Photo</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold text-lg">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold text-lg">Password</span>
                                </label>
                                <input type="password" placeholder=" password" name="password" className="input input-bordered" required />
                            </div>
                        </div>

                       </div>

                        <div className="form-control mt-4">
                            <button className="advanced-button">Registration</button>
                        </div>

                    </form>
                    {
                        errMessage && <p className='ml-3 p-3 text-fuchsia-700 mb-3' >{errMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Registration;