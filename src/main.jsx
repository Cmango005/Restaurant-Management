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
import AddNewItems from './assets/Components/AddNewItems/AddNewItems';
import Update from './assets/Components/Update/Update';
import MyAddedItems from './assets/Components/MyAdd/MyAddedItems';
import MyOrderedItems from './assets/Components/MyItems/MyOrderedItems';

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
        loader: ({params})=> fetch(`https://restaurant-server-green.vercel.app/detail/${params.id}`)
      },
      {
        path:'/my-items',
        element:<PrivateRoute><MyOrderedItems></MyOrderedItems></PrivateRoute>,
      },
      {
        path:'/add-item',
        element:<PrivateRoute><AddNewItems></AddNewItems></PrivateRoute>
      },
      {
        path:'/my-addItems',
        element:<PrivateRoute><MyAddedItems></MyAddedItems></PrivateRoute>
      },
      {
        path:'/update/:id',
        element:<PrivateRoute><Update></Update></PrivateRoute>,
        loader:({params})=> fetch(`https://restaurant-server-green.vercel.app/menu/${params.id}`)
      }
     
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
