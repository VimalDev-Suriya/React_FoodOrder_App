import React,{ useState, useContext } from 'react';

import Login from './components/Login/Login';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals/Meals';
import Cart from './components/Cart/Cart/Cart';
import AuthContext from './store/authentication-context';
import CartContextProvider from './store/Cart/CartProvider';

function App() {

  const ctx = useContext(AuthContext);
  const [isModalShown, setIsModalShown] = useState(false);

  const showModalHandler = () => {
    setIsModalShown(true);
  }

  const hideModalHandler = () => {
    setIsModalShown(false);
  }

  return (
    <CartContextProvider>
      <Header onModalShowHandler = {showModalHandler}/>
      <main>
        {!ctx.isLoggedIn && <Login/>}
        {ctx.isLoggedIn && <Meals/>}
      </main>
      {ctx.isLoggedIn && isModalShown && <Cart onCLoseModal = {hideModalHandler}/>}
    </CartContextProvider>
  );
}

export default App;
