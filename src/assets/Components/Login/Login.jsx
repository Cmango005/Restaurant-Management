import { useContext } from "react";
import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { logIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const users = useLoaderData();
  const handleLogin = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password')
    logIn(email, password)
      .then(result => {
        console.log(result.user)
       
        toast('Login successful')
        navigate(location?.state ? location.state : "/")
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleSignInGoogle = () => {
    const provider = new GoogleAuthProvider();

    googleSignIn(provider)
    
      .then(Result => {
        toast('sign in with google successful')
        console.log(Result);
        const email = Result.user.email;
        const newUser ={email};
        const user =users.find(ue=>ue.email == newUser.email)
      
        if(!user){
          fetch("  https://brand-assignment-server-mmwzcddhs-cmango005.vercel.app/user",{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })

        }
        navigate(location?.state ? location.state : "/")

      })
      
      .catch()

  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="text-center">
            <p className="ml-2">Have Not Account? Register Now<NavLink to='/registration'><button className="btn btn-link">Registration</button></NavLink></p>
            <p className="text-center mb-2">OR</p>
            <button onClick={handleSignInGoogle} className="btn btn-accent text-white mb-3 ">SignUp With <FcGoogle></FcGoogle></button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;