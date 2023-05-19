 import {  useState} from "react";
import logo from "../assets/logo .svg"
import Emoji from "../components/Emoji"
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";


   function Register() {
   
    const [data,setdata]=useState({username:"",password:"",confirmpassword:"",email:"",avatarurl:""})
    const [showemoji,setshowemoji]=useState(false);
    function changehandler(e){
        setdata(()=>{
            return {...data,[e.target.name]:e.target.value}
        })
    }
    function formhandler(e){
        e.preventDefault();
        if(!data.username || !data.email || !data.password || !data.confirmpassword){
            toast.dark("All fields required");
            return;
        }
        if(data.password!==data.confirmpassword){
            toast.dark("Password and confirm password should be same");
            return;
        }
       setshowemoji(true);
    }
  return (
       <>
       <div className=" h-[100vh] w-[100vw] flex justify-center items-center bg-gray-900">
        {
            showemoji===false?(<div className="  flex flex-col gap-4 p-9 rounded-lg bg-richblack-900 text-white">
            <div className=" flex gap-3 items-center">
            <img src={logo} alt="Logo" className="h-[35px]"></img>
            <h1 className=" text-white text-3xl font-bold">SNAPPY</h1>
            </div>
            <form onSubmit={formhandler} className="flex flex-col gap-4">
            <input onChange={changehandler} className="outline-none bg-transparent p-3 rounded-lg border-2 border-purple-700" type="text" value={data.username} name="username" placeholder="Username"></input>
            <input onChange={changehandler} className="outline-none bg-transparent p-3 rounded-lg border-2 border-purple-700" type="text" value={data.email} name="email" placeholder="Email"></input>
            <input onChange={changehandler} className="outline-none bg-transparent p-3 rounded-lg border-2 border-purple-700" type="password" value={data.password} name="password" placeholder="Password"></input>
            <input onChange={changehandler} className="outline-none bg-transparent p-3 rounded-lg border-2 border-purple-700" type="password" value={data.confirmpassword} name="confirmpassword" placeholder="Confirmpassword"></input>
            <button className=" w-[100%] p-3 rounded-lg bg-violet-800">CREATE ACCOUNT</button>
           <div className=" flex gap-2">
           <span>ALREADY HAVE AN ACCOUNT?</span>
            <span><NavLink className=" text-purple-700" to="/login">LOGIN</NavLink></span>
           </div>
            </form>
           </div>):
           (
              <Emoji data={data} setdata={setdata}></Emoji>
           )
        }
     </div>
       
       </>
         
          
        
     
  )
}

export default Register;