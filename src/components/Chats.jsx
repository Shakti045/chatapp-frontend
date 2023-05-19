import { Appcontext } from "../Appcontext/Appcontextprovider";
import Message from "./Message";
import { useContext } from "react";
import Sendmessage from "./Sendmessage"

// import io  from 'socket.io-client';
// const socket=io.connect("http://localhost:4000")

export default function Chats({chats}) {
  // console.log(chats);
    const {receiver}=useContext(Appcontext);
    // const [sendmessage,setsendmessage]=useState([])
   

    // useEffect(()=>{
    //   socket.on("receive_message",(data)=>{
    //    console.log(data.message);
    //    setsendmessage([...sendmessage,data.message]);
    //   })
    // },[socket])
 
  
  return (
         <div className=" p-2 flex flex-col  gap-4">
          <h1 className=" text-red-600 text-3xl">{receiver}</h1>
           <div  className="message p-2 flex flex-col  gap-4 lg:h-[75vh] h-[83vh] overflow-y-auto">
           {
                chats.map((data)=>{
                    return <Message key={data._id} {...data}></Message>
                })
            }
            {/* {
              sendmessage.map((data)=>{
                return <h1 className="text-white bg-red-900 p-2 rounded-lg w-fit max-w-[50%] ">{data}</h1>
              })
            } */}
           </div>
           <Sendmessage></Sendmessage>
          </div>
  )
}

