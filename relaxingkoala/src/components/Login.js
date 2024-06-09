import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, user } = useContext(AuthContext); // Access the user object
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if already logged in
    if (user) { 
      setError('Already logged in.');
      return; 
    }

    const success = await login(email, password);

    if (success) {
      navigate('/'); 
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            {error} 
          </div>
        )}
        {/* Conditionally render the form or "Already logged in" message */}
        {user ? ( 
          <div className="text-green-500">Already logged in.</div> 
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;