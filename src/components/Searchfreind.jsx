import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Searchfreind({_id,username,avatarurl,friends}) {
    const token=Cookies.get("chatapptoken")
    const userid=Cookies.get("userid");
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

 async function sendfriendrequest(){
    try{
   const {data}=await axios.post("https://shaktichat.onrender.com/api/v1/sendrequest",{"token":token,"receiverid":_id})
    toast.dark(data.Message,toastOptions)
    }catch(err){
        toast.dark(err.response.data.Message,toastOptions);
    }
 }

 async function deleterequest(){
    try{
   const {data}=await axios.post("https://shaktichat.onrender.com/api/v1/deleterequest",{"token":token,"receiverid":_id})
    toast.dark(data.Message,toastOptions)
    }catch(err){
        toast.dark(err.response.data.Message,toastOptions);
    }
 }

  return (
    <div className=' flex flex-col gap-2  mx-auto'>
        <div className=' flex gap-2 items-center mx-auto'>
        <img src={avatarurl} className=" h-[300px] rounded-full" alt="Profilepic"></img>
        <h1 className=" truncate text-white text-2xl">{username}</h1>
        </div>
        <div className=' flex gap-2'>
        {
          friends.includes(userid)===true?<button  className=' mx-auto  text-white p-2 rounded-lg bg-red-900'>YOU BOTH ARE FRIENDS</button>:<><button onClick={sendfriendrequest} className=' text-white p-2 rounded-lg bg-red-900'>SEND FRIEND REQUEST</button>
          <button onClick={deleterequest} className=' text-white p-2 rounded-lg bg-red-900'>REMOVE FRIEND REQUEST</button></>
        }
        </div>
    </div>
  )
}
