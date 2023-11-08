import { Link, useRouteError } from "react-router-dom";
import "./Error.css"
const Error = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="flex flex-col items-center" id="error-page">
        <p>
          <img className="w-full mx-auto h-96" src="https://i.ibb.co/fpXgbWy/1-10.webp" alt="" />
          
        </p>
        <Link to="/"><button className="advanced-button">Home</button></Link>
      </div>
    );
};

export default Error;