import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './assets/Components/Root/Root';
import Home from './assets/Components/Home/Home';
import Error from './assets/Components/Error/Error';
import Login from './assets/Components/Login/Login';
import AuthProvider from './providers/AuthProvider';
import Registration from './assets/Components/Registration/Registration';
import Blog from './assets/Components/Blog/Blog';
import Menu from './assets/Components/Menu/Menu';
import Details from './assets/Components/Details/Details';
import PrivateRoute from './assets/Components/Private/PrivateRoute';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement:<Error></Error>,
    children: [
      {
        path:"/",
        element:<Home></Home>,
      },
      {
        path:"/login",
        element:<Login></Login>,
      },
      {
        path:'/registration',
        element:<Registration></Registration>
      },
      {
        path:'/blog',
        element:<Blog></Blog>
      },
      {
        path:'/menu',
        element:<Menu></Menu>
      },
      {
        path:'/detail/:id',
        element:<PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/detail/${params.id}`)

      },
     
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
