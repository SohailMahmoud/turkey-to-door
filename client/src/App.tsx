import './App.css'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { StoreContext } from './context/context.ts'
import { useEffect, useState } from 'react'
import agent from './app/agent.ts'
import { Basket } from './models/basket.ts'
import { getCookie } from './util/util.ts'

function App() {
  const [basket, setBasket] = useState<Basket>();

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
      }
  }, [setBasket])

  // console.log(basket);
  

  return (
    <StoreContext.Provider value={{basket, setBasket}}>
      <Navbar />
      <Outlet />
    </StoreContext.Provider>
  )
}

export default App
