import { Route, Routes } from "react-router";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Chat from "./pages/Chat";
import Addfried from "./pages/Addfried";
export default function App() {
  return (
    <Routes>
   <Route path="/" element={<Login></Login>}></Route>
   <Route path="/register" element={<Register></Register>}></Route>
   <Route path="/chat" element={<Chat></Chat>}></Route>
   <Route path="/addfriend" element={<Addfried></Addfried>}></Route>
    </Routes>
   
  )
}
