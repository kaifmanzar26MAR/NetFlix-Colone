import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [rememberLogin,setRememberLogin]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const db=getAuth(app);
  const loginUser=()=>{
    signInWithEmailAndPassword(db,email,password)
    .then(()=>{
      alert("User Login");
      navigate('/')
    }).catch((error)=>{
      alert(error);
    })
  }

  const handelsubmit=(e)=>{
    e.preventDefault();
    console.log(email);
    console.log(password);
    loginUser();
    setEmail("");
    setPassword("");

  }
  return (
    <>
      <div className="w-full h-screen">
        <img className=' sm:block absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="///" />


        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen'>

          <div className="fixed w-full px-4 py-24 z-20">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
              <div className='max-w-[320px] mx-auto py-16'>
                <h1 className='capitalize text-3xl font-bold '>LogIn</h1>
                <form onSubmit={handelsubmit} className='w-full flex flex-col py-4'>

                  <input type="email" className='p-3 my-2 bg-gray-700 rounded outline-none' placeholder='E-mail' autoComplete='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

                  <input type="password" className='p-3 my-2 bg-gray-700 rounded outline-none' placeholder='Password' autoComplete='current-password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

                  <button className='bg-red-600 py-3 my-6 rounded font-bold' type='submit' >LogIn</button>
                  
                </form>

                <div className='flex justify-between items-center text-gray-600'>
                  <p>
                    <input type="checkbox" className='mr-2' checked={rememberLogin} onChange={(e)=>setRememberLogin(!rememberLogin)}/>
                    Remeber me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='my-4'>
                  <span className='text-gray-600 mr-2'>Not subscribed to Netflex?</span>
                  <Link to='/signin'>Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
