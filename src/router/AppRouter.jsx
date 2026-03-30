import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../components/LoginPage";
import { SignUp } from "../components/SignUp";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { UserNavbar } from "../components/user/UserNavbar";

import Men from "../components/user/Men";
import { CreateProduct } from "../components/seller/CreateProduct";

import { AdminHome } from "../components/admin/AdminHome";
import { SellerHome } from "../components/seller/SellerHome";
import { SellerSidebar } from "../components/seller/SellerSidebar";
import Women from "../components/user/Women";
import Kids from "../components/user/Kids";
import CartPage from "../components/user/CartPage";

import {UserHome }from "../components/user/UserHome";
import { Home } from "../components/user/Home";
import { MyProductsDisplay } from "../components/seller/MyProductDisplay";

import Beauty from "../components/user/Beauty";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { EditProduct } from "../components/seller/EditProduct";
import  { Checkout }  from "../components/user/CheckOut";
import ThankYou from "../components/user/ThankYou";
import OrderHistory from "../components/user/OrderHistory";
import { ManageUser } from "../components/admin/ManageUser";
import { ManageSeller } from "../components/admin/ManageSeller";
import { ApproveProducts } from "../components/admin/ApproveProducts";
import OrderDetail from "../components/user/OrderDetail";
import Accessories from "../components/user/Accessories";
import SellerOrder from "../components/seller/SellerOrder";
import SellerOrderDetails from "../components/seller/SellerOrderDetails";
import ViewSale from "../components/admin/ViewSale";
import SearchPage from "../components/user/SearchPage";
import { ForgotPassword } from "../components/ForgotPassword";
import { ResetPassword } from "../components/ResetPassword";
import ProductDetail from "../components/user/ProductDetail";
import Review from "../components/admin/Review";


const router = createBrowserRouter([
    {path:'/login' , element:<LoginPage/>},
    {path:'/signup',element:<SignUp/>},
    {path:'/forgotpassword',element:<ForgotPassword/>},
    {path:'/ResetPassword/:token',element:<ResetPassword/>},
  
   
    {
        path:'/admin', element:
        <ProtectedRoutes userRoles={["admin"]}>
            <AdminSidebar/>
        </ProtectedRoutes>,
        children:[
            {index:true,element:<AdminHome/>},
           {path:'manage-user',element:<ManageUser/>},
           { path: 'manage-seller', element: <ManageSeller /> },
           { path: 'approve-products', element: <ApproveProducts /> },
           {path:'view-sales',element:<ViewSale/>},
            {path:'review',element:<Review/>}
        ]
        
    },
    {
        path:'/user',element:
        <ProtectedRoutes userRoles={["user"]}>
            <UserHome/>
        </ProtectedRoutes>,
        children:[
            { index: true, element: <Home/> }, 
            {path:'men',element:<Men/>},
            {path:'women',element:<Women/>},
            {path:'kids',element:<Kids/>},
          {path:'accessories',element:<Accessories/>},
            {path:'beauty',element:<Beauty/>},
            {path:'cartpage',element:<CartPage/>},
           {path:'checkout',element:<Checkout/>},
           {path:'thankyou',element:<ThankYou/>},
           {path:'orderhistory',element:<OrderHistory/>},
           { path: 'order-detail/:id', element: <OrderDetail /> },
           {path:'search',element:<SearchPage/>},
           {path:'productdetail/:id',element:<ProductDetail/>},
          
        ]        
    },
    {
        path:'/seller', element:
        <ProtectedRoutes userRoles={["seller"]}>
            <SellerSidebar/>
        </ProtectedRoutes>,
        children:[
            {index:true,element:<SellerHome/>},
            {path:'myproduct',element:<MyProductsDisplay/>},
            {path:'createproduct',element:<CreateProduct/>},
             {path:"edit-product/:id" ,element:<EditProduct/>},
             {path:'order',element:<SellerOrder/>},
             {path:'orderdetail/:id',element:<SellerOrderDetails/>}
        ]
    },
])



const AppRouter = () =>{
    return <RouterProvider router={router}></RouterProvider>
}



export default AppRouter