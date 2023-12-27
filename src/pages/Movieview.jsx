import React,{useState,useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios';
import endpoints, { createImageUrl } from '../Services/movieServices';
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import {app} from '../firebase/firebase'
import {getDatabase,push,set,ref} from 'firebase/database'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
const Movieview = () => {
    const {title}=useParams();
    const newtitle=title.slice(1);
    console.log(newtitle);
    const [movie,setMovie]=useState('');
    const [username,setUsername]=useState(null);
    const database=getDatabase(app);
    const auth=getAuth(app);


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
    function findMovieByTitle(titlee,movies) {
        for (var key in movies) {
            if (movies[key].title === titlee) {
             return movies[key];
            }
        }
        return null;
    }

    useEffect(()=>{
        axios.get(endpoints.popular).then((response)=>{
            console.log(response.data.results);
            const movies=response.data.results;
            const element=findMovieByTitle(newtitle,movies);
            // console.log(element);
            setMovie(element);
        })

        
        console.log(movie);

    },[])
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
              console.log("logined")
              setUsername(user);
            }else{
              console.log("logout")
              setUsername(null);
            }
          })
    
    })
    const {backdrop_path,poster_path,overview,release_date,original_language,popularity,vote_average,vote_count}=movie;
  return (
    <>
        <div className="w-full h-[550px] lg:h-[100vh]">
            <div className="w-full h-full">
                <div className="absolute w-full h-[550px] lg:h-[100vh] bg-gradient-to-r from-black "></div>

                <img className='w-full h-full object-cover object-top' 
                src={createImageUrl(backdrop_path,'original')} alt={newtitle ? newtitle : "newtitle"} />
                <p className='absolute top-0 h-full flex flex-col justify-center items-center w-full cursor-pointer'><FaPlayCircle size={50}/>Can't Play. Video is Temprery Unavilable</p>
            </div>


            <div className='w-full top-[40%] lg:top-[60%] pl-6 pt-5 pb-5 bg-gray-950'>
                <h1 className='font-bold text-3xl md:text-5xl pb-3'>{newtitle ? newtitle : "Loding...."}</h1>
                
                <p className='font-bold text-gray-400 text-[13px] pb-1' >{release_date}</p>
                
                <p className='text-[17px] pb-3 '><span>Ratings : </span>{Math.floor(vote_average)}/10</p>
                <p className='text-[17px] pb-3 '><span>Toal Votes : </span>{vote_count}</p>
                <p className='text-[17px] pb-3 flex gap-2 h-8 items-center'><FaHeart/> {popularity} per week</p>
                <p className='text-[17px] pb-3 w-[90%] lg:w-[80%]'>{overview}</p>

                <div className='flex mt-5 '>
                    <button className='capitalize border border-gray-300 py-2 px-7 mr-5 
                    bg-gray-200 text-black font-bold hover:bg-transparent hover:text-white' onClick={favwork}>Add to Fav</button>

                    <button className='capitalize border border-gray-300 py-2 px-7 mr-5 ' onClick={wlwork}>Watch Later</button>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Movieview
