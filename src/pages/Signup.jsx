import React, { useState } from 'react';
import { Await, Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true)
  const [email, setEmail] =useState("")
  const [password, setPassword] = useState("")

  const {user, signUp} = UserAuth();
  const navigate = useNavigate();

const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  try {
   await signUp(email, password);
    navigate('/');
  } catch (err) {
      console.log(err);
    }
  
};

  return (
    <>
      <div className='w-full h-screen'>
        <img className='sm:block absolute w-full h-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/443881de-6e3c-4cbc-ac83-9e2a5affa6aa/NG-en-20240115-trifectadaily-perspective_alpha_website_medium.jpg' alt='///' />
        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />

        <div className='fixed w-full px-4 py-24 z-20'>
          <div className='max-w-[400px] h-[450px] mx-auto bg-black/70 rounded-lg'>
            <div className='max-w-[300px] mx-auto py-16'>
              <h1 className='text-3xl font-sans font-bold'>Sign Up</h1>
              <form onSubmit={handleFormSubmit}
              className='w-full flex flex-col py-4'>
                <input className='p-2 my-2 bg-gray-700 rounded'
                  type='email'
                  placeholder='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input className='p-2 my-2 bg-gray-700 rounded'
                  type='password'
                  placeholder='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-red-600 py-3 my-6 rounded font-sans font-bold'>Sign Up</button>
                <div className='flex justify-between items-center text-gray-600'>
                  <p>
                    <input type='checkbox' className='mr-2' checked={rememberLogin}
                    onChange={(e) => setRememberLogin(!rememberLogin)}
                    />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='my-4'><span className='text-gray-600 mr-2'>Already subscribed to Netflix</span>
                <Link to="/Login">Sign In</Link>
                
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;