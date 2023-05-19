import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import axios from "axios"
import Friend from "./Friend";
export default function Friends() {
    const [Friends,setFriends]=useState([]);
  async  function getfriends(){
        try{
           const data=await axios.post("https://shaktichat.onrender.com/api/v1/getallfriends",{"token":Cookies.get('chatapptoken')})
           setFriends(data.data.Friends);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getfriends();
    },[])
  return (
    <div className=" friends overflow-y-auto h-[80vh]  flex flex-col gap-3 text-white  ">
        {
            Friends.length===0?(<div className=" flex flex-col  gap-2">
                <h1 className=" text-xl font-bold">You have no friends till now</h1>
                <button className=" p-2 text-xl text-white bg-violet-800 rounded-lg">Add Friend +</button>
            </div>):(Friends.map((data,index)=>{
                return <Friend key={index} {...data}></Friend>
            }))
        }
    </div>
  )
}
