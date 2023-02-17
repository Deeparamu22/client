import React,{useEffect,useState,useRef} from 'react'
import Comment from '../Comment/Comment';
import style from './CommentDiv.module.css'
export default function CommentDiv(props) {
    const [score,setscore]=useState(props.score);
    const [image,setimage]=useState([]);
    const [user,setuser]=useState("");
    const [replybutton, setreplybutton]=useState(false);
    const [id,setid]=useState("");
    const [id1,setid1]=useState(0);
    const [textarea,settextarea]=useState(false);
    const edit = useRef(null)
    const reply=(e)=>{
        setid(e.target.id);
        console.log(e.target.id);
        setreplybutton(!replybutton);
    }
    const handldelete=async (e)=>{
            let temp={id:e.target.id};
            const result =await fetch ("http://localhost:5223/delete",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(temp)
          })
          const resultJson=await result.json();
          console.log(resultJson)
    }
     const handletextarea=()=>{
        settextarea(!textarea);
     }  
     const handleupdate=async (e)=>{
        if(typeof e.target.id==="number")
        {
            let temp={id:e.target.id,value:edit.current.value,score:score};
            const result =await fetch ("http://localhost:5223/update",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(temp)
          })
          const resultJson=await result.json();
          console.log(resultJson)
          settextarea(!textarea);
        }
        else{
            let temp={id:e.target.id,value:edit.current.value};
            const result =await fetch ("http://localhost:5223/updatereplies",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(temp)
          })
          const resultJson=await result.json();
          console.log(resultJson);
          settextarea(!textarea);
        }   
     }
   useEffect(() => {
    setimage(JSON.parse(props.user).image.png.slice(JSON.parse(props.user).image.png.lastIndexOf('/')+1,JSON.parse(props.user).image.png.length));
    setuser(JSON.parse(props.user).username);
    setid1(props.keys);
   }, [props.keys,props.user,user,image])

  return (
    <div>
    <div className={style.whole} id={"'"+id1+"'"}>
        <div className={style.score}>
            <div className={style.plus} onClick={()=>setscore(score+1)}></div>
           <input type={"number"} className={style.number} value={score} min='0'/>
           <div className={style.minus} onClick={()=>{if(score!==0){setscore(score-1)}}}></div> 
        </div>
        <div className={style.command}>
            <div className={style.head}>
                <img src={`assests/${image}`} alt={"avator"}/>
                <p className={style.user}>{user}</p>
                {(user==="juliusomo")?<div className={style.you}>you</div>:null}
                <p className={style.createdAt}>{props.createdAt}</p>
                {(user!=="juliusomo"||props.parent)?<div className={style.replydiv} onClick={reply} id={props.keys}><img src='assests/icon-reply.svg' id={props.keys} alt={"reply"}/><p id={props.keys}>Reply</p></div>:<div className={style.flex}><div className={style.remove} id={id1} onClick={handldelete}><img src='assests/icon-delete.svg' alt={"delete"} id={id1}/><p id={id1}>Delete</p></div><div className={style.edit} id={id1} onClick={handletextarea}><img src='assests/icon-edit.svg' alt='edit' id={id1}/><p id={id1}>Edit</p></div></div>}
            </div>
            <div>
            {(textarea)?<textarea defaultValue={props.content.replace(/\\'/g,"'")} ref={edit}></textarea>:<div className={style.commandlines} id={user}>
               {props.content.replace(/\\'/g,"'")} 
            </div>}
            {(textarea)?<div className={style.updatediv} onClick={handleupdate} id={id1}><button id={id1}>Update</button></div>:null}
            </div>
        </div>
    </div>
    {(replybutton)?<div className={style.mycommands}><Comment comid={id} id={props.keys} replies={props.t}/></div>:null}
    </div>
  )
}