import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import ErrorPage from './Component/ErrorPage/ErrorPage';
import Root from './Component/Root.jsx/Root';
import Home from './Component/HomePage/Home';
import AddProduct from './Component/Product/AddProduct';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import MyCart from './Component/User/MyCart';
import Profile from './Component/User/Profile';
import Settings from './Component/User/Settings';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import AuthProvider from './Component/Provider/AuthProvider';
import AddBrand from './Component/Product/AddBrand';
import ProductDetails from './Component/Product/ProductDetails';
import AllProduct from './Component/Product/AllProduct';
import UpdateProduct from './Component/Product/UpdateProduct';
import OurBrand from './Component/OurBrand/OurBrand';
import BrandHome from './Component/OurBrand/BrandHome';
import { serverURL } from './config';
import AddBrandSlideForm from './Component/HomePage/Slidder/AddBrandSlideForm';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root> ,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element:<Home></Home>,
      },
      {
        path: '/add-product',
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>,
      },
      {
        path: '/products',
        element: <AllProduct></AllProduct>,
      
      },
      {
        path: '/brands',
        element: <PrivateRoute><OurBrand></OurBrand></PrivateRoute>,
      },
      {
        path: '/brands/:id',
        element: <BrandHome></BrandHome>,
      },
      {
        path: '/update-product/:id',
        element: <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>,
        loader: ({params}) => fetch(`${serverURL}/products/${params.id}`)
      },
      {
        path: '/products/:id',
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
      },
      {
        path: '/add-brand',
        element: <PrivateRoute><AddBrand></AddBrand></PrivateRoute>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/add-brand-Sliders',
        element: <PrivateRoute><AddBrandSlideForm></AddBrandSlideForm></PrivateRoute>,
      },
      {
        path: '/my-cart',
        element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
      },
  
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: '/settings',
        element: <PrivateRoute><Settings></Settings></PrivateRoute>,
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
