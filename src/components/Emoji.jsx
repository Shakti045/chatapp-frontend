import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router";
function Emoji({data,setdata}) {
const navigate=useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const types=["Fluffy","Angel","Baby","Cookie","Coco","Lola","Garfield","Gizmo","Kiki","Casper","Chloe","Bailey","George","Callie","Bear","Annie","Jasper","Daisy"]
  function avatarurl(avatarname){
    setdata(()=>{
      return {...data,avatarurl:`https://api.dicebear.com/6.x/avataaars/svg?seed=${avatarname}`}
    })
  }
  async function signup(){
    try{
     const output=await axios.post("http://localhost:4000/api/v1/signup",data)
      if(output.status===200){
        toast.success("Accout created successfully",toastOptions)
       
          navigate("/")
        
      }
    }catch(err){
      toast.dark(err.response.data.Message);
    }
  }
  return (
    <div className=" flex flex-col items-center gap-6">
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
  )
}

export default Emoji;