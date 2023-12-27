import React, { useState,useEffect } from 'react'
import { createImageUrl } from '../Services/movieServices'
import {FaBookmark, FaHeart, FaRegBookmark, FaRegHeart} from "react-icons/fa"
import {app} from '../firebase/firebase'
import {getDatabase,push,set,ref} from 'firebase/database'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const MovieItem = ({movie}) => {
    const [like,setLike]=useState(false);
    const [wl,setWl]=useState(false);
    const {title,backdrop_path,poster_path,overview}=movie;
    const navigate=useNavigate();

    const database=getDatabase(app);
    const auth=getAuth(app);
    const [islogedin,setIslogedin]=useState(null);

    const addtofav=(user)=>{
      console.log(movie);
      set(ref(database,`user/${user.uid}/fav/${movie.title}`),movie)
      .then(()=>console.log("movie added"))
      .catch((error)=>console.log("erorr occure "+error));
    }

    const favwork=()=>{
      if(!islogedin){
        navigate('/login')
        return;
      }
      if(like){
        setLike(false);
      }else{
        setLike(true);
        addtofav(islogedin);
      }
    }

    const addtowl=(user)=>{
      console.log(movie);
      set(ref(database,`user/${user.uid}/wl/${movie.title}`),movie)
      .then(()=>console.log("movie added"))
      .catch((error)=>console.log("erorr occure "+error));
    }


    const wlwork=()=>{
      if(!islogedin){
        navigate('/login')
        return;
      }
      if(wl){
        setWl(false);
        
      }else{
        setWl(true);
        addtowl(islogedin);
      }
    }
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
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
        
      <img className='w-full h-40 block object-cover object-top' src={createImageUrl(backdrop_path ?? poster_path,'w500')} alt={title}  />
        
      <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100' onClick={()=>navigate(`/movieview/:${title}`)}>
        <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold'>{title}</p>
        <p onClick={favwork}>
          {
            like ?
              <FaHeart size={20}  className="absolute top-2 left-2 text-gray-300" />
            :
              <FaRegHeart size={20} className="absolute top-2 left-2 text-gray-300"/>
            
          }
          
        </p>
        <p className='absolute top-2 left-10 bg-gra' onClick={wlwork}>
          
          {
            wl ? <FaBookmark size={20}/> : <FaRegBookmark size={20}/>
          }
        </p>
      </div>
    </div>
  )
}

export default MovieItem
