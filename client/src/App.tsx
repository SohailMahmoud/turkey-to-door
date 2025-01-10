import './App.css'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { StoreContext, UserContext } from './context/context.ts'
import { useEffect, useState } from 'react'
import agent from './app/agent.ts'
import { Basket } from './models/basket.ts'
import { getCookie } from './util/util.ts'
import { toast, ToastContainer } from "react-toastify";
import { User } from './models/user.ts'

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | undefined>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : undefined;
  });
  const [basket, setBasket] = useState<Basket>();

  async function getCurrentUser() {
    try {
      const currentUserDto = await agent.Account.currentUser();
      const {basket, ...user} = currentUserDto;
      setBasket(basket);
      setUser(user);
    } catch (error) {
      console.log(error);
      setUser(undefined)
      localStorage.removeItem('user');
      toast.error('Session expired - Please login again');
      navigate('/');
    }
  }
  
  useEffect(() => {
    if (user) {
      getCurrentUser();
    }
  }, []);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
      }
  }, [setBasket])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <StoreContext.Provider value={{basket, setBasket}}>
        <ToastContainer />
        <Navbar />
        <Outlet />
      </StoreContext.Provider>
    </UserContext.Provider>
    
  )
}

export default App
