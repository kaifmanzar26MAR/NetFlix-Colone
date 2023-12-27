import React, {useEffect, useState} from 'react'
import { createImageUrl } from '../Services/movieServices'
import {FaHeart, FaRegHeart} from "react-icons/fa"
import {getDatabase,get,child,ref} from 'firebase/database'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import {app} from '../firebase/firebase'

const Favrow = (data) => {
    console.log(data.data);
    const datas=data.data;
    const database=getDatabase(app);
    const auth=getAuth(app);
    const [user,setUser]=useState({})

    console.log(datas);
    const remove=(title)=>{
        console.log("clicked")
        remove(child(ref(database), `user/${user.uid}/fav/${title}`))
        .then(()=>{
            console.log("data removed");
        }).catch((error)=>{
            console.log("error "+error);
        })
    }


    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          if(user){
            console.log("logined")
            setUser(user);
          }else{
            console.log("logout")
          }
        })
      },[])

      
      
  return (
    <>
        <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide  flex flex-wrap justify-center ">
    
            {
                Object.keys(datas).map((key)=>{
                    const {title,backdrop_path,poster_path,overview}=datas[key];
                    
                    return(
                        <div key={key} className='w-relative[160px] bg-gray-950 sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
                            <img src={createImageUrl(backdrop_path ?? poster_path,'w500')} alt={backdrop_path} />
                            <p>{title}</p>
                            <hr className='w-60 mb-2' />
                            <FaHeart onClick={()=>remove(title)}/>
                            <a href={`/movieview/:${title}`}>Veiw Details</a>
                        </div>
                    )
                })
            }
            
        </div>
    </>
  )
}

export default Favrow
