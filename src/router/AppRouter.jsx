import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../components/LoginPage";
import { SignUp } from "../components/SignUp";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { UserNavbar } from "../components/user/UserNavbar";
import { ResetPassword} from "../components/ResetPassword";
import Men from "../components/user/Men";
import { CreateProduct } from "../components/seller/CreateProduct";

import { AdminHome } from "../components/admin/AdminHome";
import { SellerHome } from "../components/seller/SellerHome";
import { SellerSidebar } from "../components/seller/SellerSidebar";
import Women from "../components/user/Women";
import Kids from "../components/user/Kids";
import CartPage from "../components/user/CartPage";
import ProductDetail from "../components/user/ProductDetail";
import {UserHome }from "../components/user/UserHome";
import { Home } from "../components/user/Home";
import { MyProductsDisplay } from "../components/seller/MyProductDisplay";
import HomeProduct from "../components/user/HomeProduct";
import Beauty from "../components/user/Beauty";


const router = createBrowserRouter([
    {path:'/login' , element:<LoginPage/>},
    {path:'/signup',element:<SignUp/>},
    {path:'/resetpassword',element:<ResetPassword/>},
   
    {
        path:'/admin', element:<AdminHome/>,
        
    },
    {
        path:'/user',element:<UserHome/>,
        children:[
            { index: true, element: <Home/> }, 
            {path:'men',element:<Men/>},
            {path:'women',element:<Women/>},
            {path:'kids',element:<Kids/>},
            {path:'homeproduct',element:<HomeProduct/>},
            {path:'beauty',element:<Beauty/>},
            {path:'cartpage',element:<CartPage/>},
            {path:'product/:id' , element:<ProductDetail/>}
        ]        
    },
    {
        path:'/seller', element:<SellerHome/>,
        children:[
            {path:'myproduct',element:<MyProductsDisplay/>},
            {path:'createproduct',element:<CreateProduct/>}
        ]
    },
])



const AppRouter = () =>{
    return <RouterProvider router={router}></RouterProvider>
}



export default AppRouter