import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../assets/logo .svg"
import Chatsection from "../components/Chatsection";
import Friends from "../components/Friends";
import About from "../components/About"
import { useContext } from "react";
import { Appcontext } from "../Appcontext/Appcontextprovider";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
function Chat(){
    const [userdata,setuserdata]=useState();
    const {setsender,width,show,setshow}=useContext(Appcontext);
    async function getuserdata(){
    try{
        const output=await axios.post("http://localhost:4000/api/v1/getuserdetails",{"token":Cookies.get('chatapptoken')})
         setuserdata(output.data.User);
         setsender(output.data.User.username)
    }catch(err){
    toast.dark(err.response.data.Message);
    }
    }
    useEffect(()=>{
        getuserdata();
    },[])
    return (
        <div className=" h-[100vh] w-[100vw] overflow-hidden flex  bg-gray-900">
            
        {
            width>=1017?<div className="  w-[20vw]  rounded-lg">

            <NavLink to="/chat"> <div className=" h-[10vh] flex gap-3 items-center">
             <img src={logo} alt="Logo" className="h-[35px]"></img>
             <h1 className=" text-white text-3xl font-bold">SNAPPY</h1>
            </div></NavLink>
            <Friends {...userdata}></Friends>
            <About    {...userdata}></About>
            
            
            </div>:<>{
                show===true?<div className=" transition-all duration-1000 absolute right-0 left-0  bg-richblack-900   rounded-lg">

                <NavLink to="/chat"> <div className=" h-[10vh] flex gap-3 items-center">
                 <img src={logo} alt="Logo" className="h-[35px]"></img>
                 <h1 className=" text-white text-3xl font-bold">SNAPPY</h1>
                </div></NavLink>
                <Friends {...userdata}></Friends>
                <About    {...userdata}></About>
                
                
                </div>:""
            }</>
        }

          <div className="  bg-richblack-900 w-[100vw] lg:w-[80vw]">
           {
            width>=1017?"": <button onClick={()=>setshow(!show)} className=" absolute right-2 top-3"><AiOutlineMenu className=" text-2xl text-white"></AiOutlineMenu></button>
           }
          {
            width>=1017? <Chatsection {...userdata}></Chatsection>:<>
            {
                show===false? <Chatsection {...userdata}></Chatsection>:""
            }
            </>
          }
          </div>
        </div>
    )
}

export default Chat;