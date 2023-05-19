import { useContext,  useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { Appcontext } from "../Appcontext/Appcontextprovider";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import {BiLink } from "react-icons/bi";
import {IoCloudUploadSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import io  from 'socket.io-client';
import Loader from "./loader";
const socket=io.connect("https://shaktichat.onrender.com")
export default function Sendmessage() {
    const [showemoji,setshowemoji]=useState(false);
    const token=Cookies.get("chatapptoken");
    const [mesage,setmeassage]=useState({v:""});
    const {receiver,sender,receivertoken,sendertoken}=useContext(Appcontext);
    const [file,setfile]=useState(null);
    const [showfile,setshowfile]=useState(false);
    const [filename,setfilename]=useState("Select File");
    const[fileloader,setfileloader]=useState(false);
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    function handler(e){
       setmeassage(()=>{
        return {v:e.target.value}
       })
    }
    const sendtoken=sendertoken || parseInt(Cookies.get("sendertoken"));
   const room=receivertoken+sendtoken;
    async function addmessage(){
        try{
        socket.emit("send_message",{message:mesage.v,sender:sender,room:room});
         await axios.post("https://shaktichat.onrender.com/api/v1/addchat",{"token":token,"message":mesage.v,"receiver":receiver})
         setmeassage(()=>{
            return {v:""}
           })
        }catch(err){
          console.log(err);
        }
      }


function filehandler(e){
  // console.log(e.target.files[0]);
  setfile(e.target.files[0]);
  setfilename(e.target.files[0].name)
}
    function formhandler(e){
        e.preventDefault();
        if(mesage.v){
            addmessage();
        }
    }
   function emojihandle(data){
    setmeassage(()=>{
        return {v:mesage.v+data.native}
       })
   }
  async function uploadfile(){
    if(file){
      setfileloader(true);
    try{
      const formData = new FormData();
      formData.append('file', file);
      
     const {data}=await axios.post('https://shaktichat.onrender.com/api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setmeassage(()=>{
        return {v:data.filelink};
      })
      setfileloader(false);
      toast.dark("File link generated you can now send the link")
    }catch(err){
      console.log(err);
      toast.dark(err.response.data.Message,toastOptions);
    }
    }else{
      toast.dark("Please select a file first")
    }
  }
  return (
    <div className=" ">
          <div className={` duration-1000 transition-all ${showemoji===true?"  lg:h-[450px]":"h-0 overflow-hidden absolute top-20  "} overflow-hidden absolute top-20`}>
          <Picker  data={data} onEmojiSelect={emojihandle} />
          </div>
      <div className="flex justify-center relative top-3  gap-2">
        <button onClick={()=>setshowemoji(!showemoji)} className=" text-white text-3xl p-2 bg-blue-900 rounded-lg"><BsEmojiLaughing></BsEmojiLaughing></button>
      <form className=" flex justify-center gap-2" onSubmit={formhandler}>
      
        <input  className=" message lg:w-[60vw] w-[54vw]   p-3 rounded-lg text-2xl text-white bg-blue-900  outline-none " placeholder="Type your message" type="text" value={mesage.v} onChange={handler}></input>
  

         {
         showfile===true?(<div className=" flex flex-col gap-3 absolute bottom-20 bg-richblack-800 p-2 rounded-lg ">
           <div className=" flex gap-3 items-center">
           <label htmlFor="file-upload">
         <IoCloudUploadSharp className=" cursor-pointer text-white text-6xl p-1 bg-blue-900 rounded-lg"></IoCloudUploadSharp>
        </label>
        <div className=" flex flex-col gap-2">
        <p className=" text-white">{filename}</p>
        {
          fileloader===true?<Loader></Loader>:""
        }
        </div>
           </div>
        <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={filehandler}
      /> 
    <div className=" flex items-center gap-6">
      <button onClick={uploadfile} className=" text-white p-2 rounded-lg bg-blue-900">Upload</button>
       <button onClick={()=>setshowfile(!showfile)} className=" text-white p-2 rounded-lg bg-blue-900">Cancel</button>
    </div>
         </div>):""
         }
         <BiLink onClick={()=>setshowfile(!showfile)} className=" cursor-pointer text-white text-6xl p-1 bg-blue-900 rounded-lg"></BiLink>
        <button  className=" text-white text-3xl p-2 bg-blue-900 rounded-lg"><AiOutlineSend></AiOutlineSend></button>
        </form>
      </div>
    </div>
  )
}


