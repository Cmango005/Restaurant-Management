import { useContext } from "react";
import { NavLink,  useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import'./Login.css'
import Navbar from "../Navbar/Navbar";
const Login = () => {
  const { logIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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
       
      
        
        navigate(location?.state ? location.state : "/")

      })
      
      .catch()

  }

  return (
    <div className="hero min-h-screen back2 bg-base-200">
      <Navbar></Navbar>
      <div className="flex-col lg:flex-row-reverse">

        <div className="login-box mt-10">
          <form onSubmit={handleLogin} >
            <div className="form-control user-box">
              
              <input type="email" placeholder="email" name="email" className="input input-bordered" required />
            </div>
            <div className="form-control user-box">
              
              <input type="password" placeholder="password" name="password" className="input input-bordered" required />
              
            </div>
            <div className="form-control mt-6">
              <button className="">Login</button>
            </div>
          </form>

          <div className="text-center">
            <p className="ml-2 text-white font-semibold">Have Not Account? Register Now<NavLink to='/registration'><button className="btn btn-link">Registration</button></NavLink></p>
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