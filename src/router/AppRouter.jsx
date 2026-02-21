import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "../components/LoginPage";
import { SignUp } from "../components/SignUp";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { UserNavbar } from "../components/user/UserNavbar";
import { SellerNavbar } from "../components/seller/SellerNavbar";
import { ProductList } from "../components/user/ProductList";




const router = createBrowserRouter([
    {path:'/login' , element:<LoginPage/>},
    {path:'/signup',element:<SignUp/>},
    {
        path:'/admin', element:<AdminSidebar/>,
        
    },
    {
        path:'/user',element:<UserNavbar/>,
        children:[
            {path:"prolist",element:<ProductList/>},
        ]
    },
    {
        path:'/seller', element:<SellerNavbar/>,
    },
])

const AppRouter = () =>{
    return <RouterProvider router={router}></RouterProvider>
}


export default AppRouter