import { useContext,useRef,useEffect } from "react";
import { Appcontext } from "../Appcontext/Appcontextprovider";
import {AiOutlineDownload } from "react-icons/ai";
export default function Message(props) {
const {sender}=useContext(Appcontext);
const scrollRef = useRef();
useEffect(()=>{
 scrollRef.current?.scrollIntoView({ behavior: "smooth" });
},[])
  return (
    <div ref={scrollRef}>
     {
      props.message.includes("http")?props.sender===sender?<div className="message flex justify-end">
      <a href={props.message} className="message text-white  w-fit max-w-[50%]  bg-blue-800 p-2 rounded-md font-bold"><AiOutlineDownload className=" text-3xl"></AiOutlineDownload></a>
  </div>:<div className="message flex">
  <a href={props.message} className="message text-white bg-red-900 p-2 rounded-lg w-fit max-w-[50%] "><AiOutlineDownload  className=" text-3xl"></AiOutlineDownload></a>
  
  </div>:
        <>{
          props.sender===sender?<div className="message flex justify-end">
              <h1 className="message text-white  w-fit max-w-[50%]  bg-blue-800 p-2 rounded-md font-bold">{props.message}</h1>
          </div>:<div className="message flex"><h1 className="message text-white bg-red-900 p-2 rounded-lg w-fit max-w-[50%] ">{props.message}</h1></div>
      } </>
      
     }
    </div>
  )
}
