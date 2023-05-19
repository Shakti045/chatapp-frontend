export default function About({avatarurl,username}) {
  return (
    <div className=" bg-blue-900 p-4  h-[10vh] items-center flex gap-2">
        <img src={avatarurl} className=" h-[50px] rounded-full" alt="Profilepic"></img>
        <h1 className=" text-white text-xl">{username}</h1>
    </div>
  )
}
