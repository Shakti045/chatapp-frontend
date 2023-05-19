import { useContext, useState } from "react";
import logo from "../assets/logo .svg"
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loaderimage from "../assets/loader.gif"
import axios from "axios";
import Cookies from "js-cookie";
import { Appcontext } from "../Appcontext/Appcontextprovider";
function Login() {
    const navigate=useNavigate();
    const {setsenderoken,loader,setloader}=useContext(Appcontext);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };


    const [data,setdata]=useState({username:"",password:""})
    function changehandler(e){
        setdata(()=>{
            return {...data,[e.target.name]:e.target.value}
        })
    }
    async function login(){
        if(data.password==="" || data.password===""){
            toast.error("All fields required",toastOptions)
            return;
        }
        try{
          setloader(true);
            const output=await axios.post(`https://shaktichat.onrender.com/api/v1/login`,data)
            if(output.status===200){
              // console.log(output.data.chatapptoken);
            Cookies.set("chatapptoken",output.data.token)
            setsenderoken(output.data.chatapptoken);
            setloader(false);
            Cookies.set("sendertoken",output.data.chatapptoken);
              navigate("/chat")
            }
        }catch(err){
            console.log(err);
            toast.error(err.response.data.Message,toastOptions)
        }
    }
    function formhandler(e){
        e.preventDefault();
        login();
    }
  return (
     <div>
      {
        loader===true?<div className=" w-[100vw] h-[100vh] flex items-center justify-center bg-richblack-900">
          <img src={loaderimage} alt="Loader"></img>
        </div>:<div className=" h-[100vh] w-[100vw] flex justify-center items-center bg-gray-900">
        <div className="  flex flex-col gap-4 p-9 rounded-lg bg-richblack-900 text-white">
         <div className=" flex gap-3 items-center">
         <img src={logo} alt="Logo" className="h-[35px]"></img>
         <h1 className=" text-white text-3xl font-bold">SNAPPY</h1>
         </div>
         <form onSubmit={formhandler} className="flex flex-col gap-4">
         <input onChange={changehandler} className="outline-none bg-transparent p-3 rounded-lg border-2 border-purple-700" type="text" value={data.username} name="username" placeholder="Username or email"></input>
         <input onChange={changehandler} className="outline-none bg-transparent p-3 rounded-lg border-2 border-purple-700" type="password" value={data.password} name="password" placeholder="Password"></input>
         <button className=" w-[100%] p-3 rounded-lg bg-violet-800">LOG IN</button>
        <div className=" flex gap-2">
        <span>DO NOT HAVE AN ACCOUNT?</span>
         <span><NavLink className=" text-purple-700" to="/register">REGISTER</NavLink></span>
        </div>
         </form>
        </div>
       
     </div>
      }
     </div>
  )
}

export default Login;