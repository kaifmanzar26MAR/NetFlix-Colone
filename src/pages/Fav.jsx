import React,{useEffect,useState} from 'react'
import {app} from '../firebase/firebase'
import {getDatabase,get,child,ref} from 'firebase/database'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Favrow from '../Components/Favrow'

const Fav = () => {
    const database=getDatabase(app);
    const auth=getAuth(app);
    const navigate=useNavigate();
    const [data,setData]=useState({});

    const getfavitems=(user)=>{
        
        get(child(ref(database),`user/${user.uid}/fav`)).then((snapshot)=>{
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
            getfavitems(user);
          }else{
            console.log("logout")
            navigate('/login');
          }
        })
      },[])
  return (
    <>

    <h1 className='pt-16 font-bold text-[30px] ml-10' >Favroutes</h1>
    <hr />
    <br />

    <Favrow data={data}/>

    </>
  )
}

export default Fav
