import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {MdChevronLeft, MdChevronRight} from "react-icons/md"
import MovieItem from './MovieItem';
import {app} from '../firebase/firebase'
import {getDatabase,set,ref} from 'firebase/database'

const MovieRow = ({title,url}) => {
    const [movies,setMovies]=useState([]);
    

    const mvoeSlider=(offset)=>{
      const slider=document.getElementById('slider' +title);
      slider.scrollLeft=slider.scrollLeft+offset;
    }

    useEffect(()=>{
        console.log("ok");
        axios.get(url).then((response)=>{
            setMovies(response.data.results);
            console.log(response.data.results);
        }).catch((e)=>{
            console.log("error in axios "+e);
        })
    },[])
  return (
    <>
      <h2 className='font-bold md:text-xl p-4 capitalize'>{title}</h2>

      <div className='relative flex items-center  group'>
        <MdChevronLeft 
        onClick={()=>{mvoeSlider(-300)}}
        size={40} 
        className='bg-white rounded-full absolute left-2 opacity-50 text-gray-700 z-10 hidden group-hover:block cursor-pointer'/>
        <div id={'slider' + title} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide  '>
            {
                movies.map((movie)=>{
                    return(<MovieItem key={movie.id} movie={movie}/> )
                })
            }
        </div>
        <MdChevronRight 
        onClick={()=>{mvoeSlider(300)}}
        size={40} 
        className='bg-white rounded-full absolute right-2 opacity-50 text-gray-700 z-10 hidden group-hover:block cursor-pointer'/>
      </div>
    </>
  )
}

export default MovieRow
