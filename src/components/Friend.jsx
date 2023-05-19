import { useContext } from "react"
import { Appcontext } from "../Appcontext/Appcontextprovider"
export default function Friend({username,avatarurl,chattoken}) {
  const {setreceiver,setreceivertoken,setshow}=useContext(Appcontext);
  function clickhandler(){
    setreceiver(username);
    setreceivertoken(chattoken);
    setshow(false);
  }
  return (
    <div onClick={clickhandler}  className=" cursor-pointer w-full bg-gray-500 p-2 rounded-lg items-center flex gap-2">
        <img src={avatarurl} className=" h-[50px] rounded-full" alt="Profilepic"></img>
        <h1 className=" truncate text-white text-2xl">{username}</h1>
    </div>
  )
}
