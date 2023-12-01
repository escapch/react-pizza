import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
export const MyContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <MyContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
