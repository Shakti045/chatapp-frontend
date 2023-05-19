import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router";
import { useContext } from "react";
import { Appcontext } from "../Appcontext/Appcontextprovider";
import loaderimage from "../assets/loader.gif"
function Emoji({data,setdata}) {
const navigate=useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

const {loader,setloader}=useContext(Appcontext);
  const types=["Fluffy","Angel","Baby","Cookie","Coco","Lola","Garfield","Gizmo","Kiki","Casper","Chloe","Bailey","George","Callie","Bear","Annie","Jasper","Daisy"]
  function avatarurl(avatarname){
    setdata(()=>{
      return {...data,avatarurl:`https://api.dicebear.com/6.x/avataaars/svg?seed=${avatarname}`}
    })
  }
  async function signup(){
    setloader(true);
    try{
     const output=await axios.post("https://shaktichat.onrender.com/api/v1/signup",data)
     setloader(false);
      if(output.status===200){
        
        toast.success("Accout created successfully",toastOptions)
       
          navigate("/")
        
      }
    }catch(err){
      toast.dark(err.response.data.Message);
    }finally{
      setloader(false);
    }
  }
  return (
    <>
     {
      loader===true?<div className=" w-[100vw] h-[100vh] flex items-center justify-center bg-richblack-900"><img src={loaderimage}></img></div>:<div className=" flex flex-col items-center gap-6">
      <h1 className=" text-white text-4xl font-bold">Let's Choose Your Avatar</h1>
   
      <div className=" grid lg:grid-cols-6 grid-cols-3 gap-4">
        
       {
        types.map((data,index)=>{
          return <img key={index}  onClick={()=>avatarurl(data)} className={`hover:border-2 border-pink-600 cursor-pointer rounded-full p-2 h-[100px] }`}
          src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${data}`}
          alt="avatar" />
        })
       }
      </div>
      <button onClick={signup} className=" text-white text-3xl  p-3 rounded-lg bg-violet-800">CREATE ACCOUNT</button>
      </div>
     }
    </>
  )
}

export default Emoji;