import Home from "../pages/Home/Home";
import Services from "../pages/Home/Services";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layouts/Main");
const { default: Login } = require("../pages/Login/Login");
const { default: Register } = require("../pages/Login/Register");
const { default: Orders } = require("../pages/Orders/Orders");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/orders',
                element: <Orders></Orders>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/services',
                element: <Services></Services>
            }
        ]
    }
])