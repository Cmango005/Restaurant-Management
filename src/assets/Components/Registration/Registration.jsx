import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";



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

                const user = { email };

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                fetch("  https://brand-assignment-server-mmwzcddhs-cmango005.vercel.app/user", {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json)
                    .then(data => {
                        console.log(data)

                    })
            })
            .catch(error => {
                console.log(error)
            })


    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body p-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-4">
                            <button className="btn btn-primary">Registration</button>
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