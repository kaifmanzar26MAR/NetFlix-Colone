import React, { useEffect, useState } from 'react'
import endpoints, { createImageUrl } from '../Services/movieServices';
import axios from 'axios'
import {app} from '../firebase/firebase'
import {getDatabase,set,ref} from 'firebase/database'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const [movie,setMovie]=useState({});
    const [username,setUsername]=useState(null);
    const database=getDatabase(app);
    const auth=getAuth(app);
    const navigate=useNavigate();

    const addtofav=(user)=>{
        console.log(user);
        set(ref(database,`user/${user.uid}/fav/${newtitle}`),movie)
        .then(()=>console.log("movie added"))
        .catch((error)=>console.log("erorr occure "+error));
      }

    const addtowl=(user)=>{
        console.log(movie);
        set(ref(database,`user/${user.uid}/wl/${movie.title}`),movie)
        .then(()=>console.log("movie added"))
        .catch((error)=>console.log("erorr occure "+error));
    }
    const wlwork=()=>{
        if(!username){
          navigate('/login')
          return;
        }
        addtowl(username);
        alert("added succefully to watch latter")
      }

      const favwork=()=>{
          if(!username){
              navigate('/login')
              return;
            }
          
          addtofav(username);
          alert("added succefully to fav")
          
      }

    useEffect(()=>{
        axios.get(endpoints.popular).then((response)=>{
            console.log(response.data.results);
            const movies=response.data.results;
            const randomMovie=movies[Math.floor(Math.random()*movies.length)];
            // console.log(randomMovie);
            setMovie(randomMovie);
        })
        onAuthStateChanged(auth,(user)=>{
            if(user){
              console.log("logined")
              setUsername(user);
            }else{
              console.log("logout")
              setUsername(null);
            }
          })
    },[])
    if(!movie){
        return(
            <>
                <p>featching movie....</p>
            </>
        )
    }
    const truncate=(str,length)=>{
        if(!str){
            return "";
        }
        return str.length>length ? str.slice(0,length)+'...' : str;
    }

    const {title,backdrop_path,release_date,overview}=movie;
    
  return (
    <div className="w-full h-[80vh] lg:h-[100vh]">
        <div className="w-full h-full">
            <div className="absolute w-full h-[80vh] lg:h-[100vh] bg-gradient-to-r from-black "></div>

            <img className='w-full h-full object-cover object-top' 
            src={createImageUrl(backdrop_path,'original')} alt={title ? title : "Title"} />
            
            <div className='absolute w-full top-[50%] lg:top-[60%] pl-6'>
                <h1 className='font-bold text-3xl md:text-5xl pb-3'>{title ? title : "Loding...."}</h1>
                
                <p className='font-bold text-gray-400 text-[13px] pb-1' >{release_date}</p>
                <p className='w-[90%] lg:w-[60%]'>{truncate(overview,200)}</p>

                <div className='flex mt-5'>
                    <button className='capitalize border border-gray-300 py-2 px-7 mr-5 
                    bg-gray-200 text-black font-bold hover:bg-transparent hover:text-white' onClick={()=>navigate(`/movieview/:${title}`)}>Play</button>

                    <button className='capitalize border border-gray-300 py-2 px-7 mr-5 ' onClick={wlwork}>Watch Later</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
