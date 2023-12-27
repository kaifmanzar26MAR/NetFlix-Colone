import React,{useEffect,useState} from 'react'
import {app} from '../firebase/firebase'
import {getDatabase,get,child,ref} from 'firebase/database'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { createImageUrl } from '../Services/movieServices'
import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa'
const WatchLatter = () => {
    const database=getDatabase(app);
    const auth=getAuth(app);
    const navigate=useNavigate();
    const [data,setData]=useState({});
    
    const getwlitem=(user)=>{
        get(child(ref(database),`user/${user.uid}/wl`)).then((snapshot)=>{
            setData(snapshot.val());
            console.log(data);
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
          if(user){
            console.log("logined")
            getwlitem(user);
          }else{
            console.log("logout")
            navigate('/login');
          }
        })
      },[])
  return (
    <>

    <h1 className='pt-20 font-bold text-[30px] ml-10' >Watch Latter</h1>
    <hr />
    <br />

    <div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide  flex flex-wrap justify-center ">
    
        {
            Object.keys(data).map((key)=>{
                const {title,backdrop_path,poster_path,overview}=data[key];

                return(
                    <div key={key}  className='w-relative[160px] bg-gray-950 sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
                        {/* <img className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2' src={createImageUrl(backdrop_path ?? poster_path,'w500')} alt={backdrop_path} /> */}
                        <img src={createImageUrl(backdrop_path ?? poster_path,'w500')} alt={backdrop_path} />
                            <div className='p-4'>
                              <p>{title}</p>
                              <hr className='w-60 mb-2' />
                              <FaBookmark/>
                              <a href={`/movieview/:${title}`}>Veiw Details</a>
                            </div>
                            
                    </div>
                )
            })
        }
        
    </div>

    </>
  )
}

export default WatchLatter
