import { createContext, useState } from "react";
export const Appcontext=createContext();
function Appcontextprovider({children}){
    const [loader,setloader]=useState(false);
    const [sender,setsender]=useState();
    const [receiver,setreceiver]=useState();
    // const [userid,setuserid]=useState();
    const [receivertoken,setreceivertoken]=useState();
    const [sendertoken,setsenderoken]=useState();
    const [width,setwidth]=useState(window.screen.width);
    const[show,setshow]=useState(false);
   window.onresize=()=>{
    setwidth(window.screen.width);
   }
    const value={
        loader,
        setloader,
        sender,
        setsender,
        receiver,
       setreceiver ,
       receivertoken,
       setreceivertoken,
       setsenderoken,
       sendertoken,
       width,
       show,
       setshow

    }
    return <Appcontext.Provider value={value}>
          {children}
    </Appcontext.Provider>
}

export default Appcontextprovider;