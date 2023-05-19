import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
export default function Frequsts({_id,username,avatarurl}) {
    const token=Cookies.get("chatapptoken")
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
async function acceptrequest(){
    try{
     const {data}=await axios.post("https://shaktichat.onrender.com/api/v1/acceptfriend",{"token":token,"senderid":_id})
     toast.dark(data.Message,toastOptions)
    }catch(err){
        toast.dark(err.response.data.Message,toastOptions);
    }
}
async function declinefriend(){
    try{
     const {data}=await axios.post("https://shaktichat.onrender.com/api/v1/declinefriend",{"token":token,"senderid":_id})
     toast.dark(data.Message,toastOptions)
    }catch(err){
        toast.dark(err.response.data.Message,toastOptions);
    }
}
  return (
    <div className=' mx-auto flex gap-2 items-center'>
        <img src={avatarurl} className=" h-[50px] rounded-full" alt="Profilepic"></img>
        <h1 className=" truncate text-white text-2xl">{username}</h1>
        <button onClick={acceptrequest} className='  text-2xl  bg-green-600 rounded-full'>✔</button>
        <button onClick={declinefriend} className=' bg-red-700 text-2xl w-[35px] h-[35px]  rounded-full '>X</button>
    </div>
  )
}
