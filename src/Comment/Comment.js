import React,{useEffect, useState,useRef} from 'react'
import Avatar from '../Avatar/Avatar'
import style from './Comment.module.css'
export default function Comment(props) {
  const [reply,setreply]=useState("");
  const [reply1,setreply1]=useState({"content":"","createdAt":"now","score":1,"replyingTo": "ramsesmiron","user": {"image": {"png": "./images/avatars/image-juliusomo.png","webp": "./images/avatars/image-juliusomo.webp"},"username": "juliusomo"}});
  const ref= useRef(null);
    useEffect(() => {
      setreply1({...reply1,content:reply});
      console.log(reply1);
    }, [reply]);
    const send=async (e)=>{
      if(e.target.id==="")
      {
      if(reply.length!==0)
      {
        let reply2={replies:reply};
        const result =await fetch ("http://localhost:5223/reply",{
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(reply2)
    })
    const resultJson=await result.json();
    console.log(resultJson);
    ref.current.value="";
      }   
    } 
    else{
      if(e.target.id.includes(" ")){
        e.target.id=e.target.id[0];
      }
      console.log(typeof reply1);
        let temp={id:e.target.id,reply:[reply1]}
        const result =await fetch ("http://localhost:5223/commentreply",{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(temp)
        })
         const resultJson=await result.json();
          console.log(resultJson);
          ref.current.value="";
      }
    }
  return (
    <div className={style.whole}>
        <div><Avatar/></div>
        <textarea placeholder='Add comment...' onChange={(e)=>setreply(e.target.value)} ref={ref}></textarea>
        <div><button id={props.comid} onClick={(event)=>send(event,this)} >Send</button></div>
    </div>
  )
}
