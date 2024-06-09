import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import OnlineMenu from './pages/OnlineMenu';
import Contact from './pages/Contact';
import ReservationForm from './pages/ReservationForm';
import Cart from './pages/Cart';
import cartIcon from './resources/icons/cart.png';
import './App.css';
import FeedbackForm from './pages/FeedbackForm';
import Login from './components/Login'; 
import Logout from './components/Logout'; 
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './scripts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <header className="bg-gray-800 text-white shadow-md">
              <nav className="container mx-auto p-4 flex justify-between items-center">
                <div className="nav-left">
                  <ul className="flex space-x-4">
                    <li>
                      <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/menu" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Menu
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/reservation" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Reservation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/feedback" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Feedback
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="nav-right">
                  <ul className="flex space-x-4 items-center">
                    <li>
                      <NavLink to="/cart" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        <img src={cartIcon} alt="Cart" className="cart-icon w-6 h-6 inline-block mr-1" />
                        Cart
                      </NavLink>
                    </li>
                    {/* Always display Login and Logout buttons */}
                    <li> 
                      <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/logout" className={({ isActive }) => (isActive ? 'nav-link active text-yellow-500' : 'nav-link text-white hover:text-yellow-500')}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            <main className="container mx-auto p-4">
              <h1 className="text-4xl font-bold text-center my-8">The Relaxing Koala</h1>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<OnlineMenu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/reservation" element={<ReservationForm />} />
                  <Route path="/feedback" element={<FeedbackForm />} />
                  <Route path="/logout" element={<Logout />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
