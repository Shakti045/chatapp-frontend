import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Searchfreind from '../components/Searchfreind';
import Cookies from 'js-cookie';
import Frequsts from '../components/Frequsts';
export default function Addfried() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const token=Cookies.get("chatapptoken");
  const [searchvalue,setsearchvalue]=useState("");
  const [searchdata,setsearchdata]=useState(null);
  const [requests,setrequests]=useState([]);
  function changehandler(e){
    setsearchvalue(e.target.value);
  }
  async function searchfriend(){
    try{
      const output=await axios.post(`https://shaktichat.onrender.com/api/v1/getuser`,{"username":searchvalue})
      setsearchvalue("");
      setsearchdata(output.data.User);
    }catch(err){
      toast.dark(err.response.data.Message);
    }
  }
  function submithandler(e){
    e.preventDefault();
    if(searchvalue){
      searchfriend();
    }
  }

  async function getfriendrequests(){
    try{
        const {data}=await axios.post("https://shaktichat.onrender.com/api/v1/getfrequests",{"token":token})
        toast.dark(data.Message,toastOptions)
        setrequests(data.Friendrequests);
    }catch(err){
        toast.dark(err.response.data.Message,toastOptions);
    }
 }

 useEffect(()=>{
  if(token){
    getfriendrequests();
  }
 },[]);
  return (
    <div className=' pt-5 bg-richblack-900 text-white lg:flex justify-between lg:h-[100vh] min-h-[100vh] w-[100vw]'>
      <div className=' p-6 flex flex-col gap-5 lg:w-[50%]'>
     <h1 className=' text-center text-3xl'>Search for a friend</h1>
    <form onSubmit={submithandler} className=' flex flex-col gap-2 '>
    <input value={searchvalue} onChange={changehandler} className=" p-3 rounded-lg text-2xl text-white bg-blue-900  outline-none " placeholder="Enter your friends userid" type="text" ></input>
    <button className=' text-white p-2 bg-red-900 rounded-lg'>SEARCH</button>
    </form>
    {
      searchdata!==null?<Searchfreind {...searchdata}></Searchfreind>:""
     }
      </div>
      <div className='p-6 flex flex-col gap-5  lg:w-[50%]'>
     <h1  className=' text-center text-3xl'>Your Friend Requests</h1>
   {
    requests.length===0?<p className=' text-2xl font-bold text-center'>No new Friend Requests till now</p>:<>{
      requests.map((data)=>{
        return <Frequsts key={data?._id} {...data}></Frequsts>
      })
     }</>
   }
      </div>
    </div>
  )
}

