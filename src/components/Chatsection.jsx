import { useContext, useEffect, useState } from "react"
import loaderimage from "../assets/loader.gif"
import anime from "../assets/robot.gif"
import { Appcontext } from "../Appcontext/Appcontextprovider"
import axios from "axios";
import Cookies from "js-cookie";
import Chats from "./Chats";
import { useNavigate } from "react-router";
import io  from 'socket.io-client';
const socket=io.connect("https://shaktichat.onrender.com")
export default function Chatsection({username}) {
  const {receiver,receivertoken,sendertoken,show,width}=useContext(Appcontext);
  const [showrobot,setshowrobot]=useState(true);
  const [chats,setchats]=useState([]);
  const [prevroom,setprevroom]=useState();
  const navigate=useNavigate();
const {loader,setloader}=useContext(Appcontext);
  async function getdata(){
    try{
      setloader(true);
      const output=await axios.post("https://shaktichat.onrender.com/api/v1/getchats",{"user2":receiver,"token":Cookies.get('chatapptoken')})
      setchats(output.data.Chats);
      // console.log(output.data.Chats);
    }catch(err){
      console.log(err);
    }finally{
      setloader(false);
    }
  }

    socket.on("receive_message",(data)=>{
      const msgs=[...chats]
      msgs.push({sender:data.sender,message:data.message});
      setchats(msgs)
    })
   
function robotset(){
 if(receiver){
   setshowrobot(false);
 }
}

const sendtoken=sendertoken || parseInt(Cookies.get("sendertoken"));

function updation(){
  robotset();
  getdata();
  if(prevroom){
   socket.emit("leave_room",prevroom)
  }
  if(receivertoken && sendtoken){
   // console.log(receivertoken," ",sendtoken);
   socket.emit("join_room",receivertoken+sendtoken)
   setprevroom(receivertoken+sendtoken);
  }
}

  useEffect(()=>{
    updation();
  },[receiver])

  


  return (
  <>
   {
  showrobot===true?(  <div className=" flex flex-col items-center justify-center">
       
   <img className="lg:h-[300px] " src={anime} alt="Roboto"></img>
   <h1 className=" text-3xl text-white">Welcome <span className=" text-blue-700 font-bold">{username}</span>,</h1>
   <h1 className="text-3xl text-white">Please select a  chat <br></br> from menu option to <br></br> start chatting</h1>
   <div className=" pt-5 flex gap-3">
        <button  className=" bg-blue-900 text-white p-2 rounded-md" onClick={()=>navigate("/addfriend")}>Add New Friend+</button>
         <button onClick={()=>navigate("/addfriend")} className=" bg-blue-900 text-white p-2 rounded-md">See friend requests</button>
      </div>
</div>):(<Chats chats={chats}></Chats>)
   }
  </>
  )
}
