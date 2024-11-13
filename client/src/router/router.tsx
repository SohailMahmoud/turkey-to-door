import { createBrowserRouter } from "react-router-dom"; 
import App from "../App";
import About from '../Components/About/About'
import SingleProduct from "../Components/SingleProduct/SingleProduct";
import HomePage from "../Components/HomePage/HomePage";
import SignIn from "../Components/SignIn/SignIn";
import CreateAccount from "../Components/CreateAccount/CreateAccount";
import NotFound from "../Components/NotFound/NotFound";
import BasketSummery from "../Components/BasketSummery/BasketSummery";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '',element: <HomePage />},
            {path: 'about',element: <About />},
            {path: 'sign-in',element: <SignIn />},
            {path: 'create-account',element: <CreateAccount />},
            {path: 'product/:productId',element: <SingleProduct />},
            {path: 'basket-summery',element: <BasketSummery />},
            {path: '*',element: <NotFound />},
        ]
    }
])