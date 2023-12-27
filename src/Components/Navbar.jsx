import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {app} from '../firebase/firebase'
import { getAuth, onAuthStateChanged,signOut } from 'firebase/auth'
const Navbar = () => {
  const auth=getAuth(app);
  const [islogedin,setIslogedin]=useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log("logined")
        setIslogedin(user);
      }else{
        console.log("logout")
        setIslogedin(null);
      }
    })
  },[])
  return (
    <div className='flex items-center justify-between p-4 w-full fixed z-50 ' >
      <Link to="/">
        <h1 className='uppercase text-red-600 font-bold text-[38px] lg:text-5xl cursor-pointer '>Netflix</h1>
      </Link>
      {
        !islogedin ? 
        <div>
          <Link to="/login"><button className='capitalize pr-4 '>Login</button></Link>
          <Link to="/signin"><button className='capitalize px-6 py-2 rounded cursor-pointer bg-red-600'>Sign up</button></Link>
        </div>
        :
        <div className='flex gap-4'>
          <button className='capitalize px-6 py-2 rounded cursor-pointer bg-red-600' onClick={()=>signOut(auth)}>Logout</button>
          <div className="group">
            <div className='capitalize px-4 py-2 rounded cursor-pointer transition duration-300 bg-gray-50 text-black font-bold'>{islogedin.email.slice(0,1)}</div>
            <div className=" flex flex-col items-center justify-center absolute top-14 transition duration-300  p-1 right-3 rounded ">
                <div className=" w-full hidden flex-col bg-gray-900 p-4 mt-1 rounded group-hover:flex " id='dd'>
                <Link to='/fav' className=' mt-1'>Your Favourate</Link>
                <Link to='/watchlatter' className=' mt-1'>Your WatchLatter</Link>
              </div>
          </div>
            
          </div>
        </div>
      }
      

    </div>
  )
}

export default Navbar
