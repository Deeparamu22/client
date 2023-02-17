import React,{useEffect,useState} from 'react'
import Comment from '../Comment/Comment'
import CommentDiv from '../CommentDiv/CommentDiv'
import style from './Whole.module.css'
export default function Whole() {
    const [score,setscore]=useState(0);
    const [json,setjson]=useState([]);
    const [replies,setreplies]=useState(false);
    const [Delete,setDelete]=useState(false);
    let i=0;
    useEffect(() => {
        const fetchData=async()=>{
            const result =await fetch("http://localhost:5223/reply")
            const jsonresult=await result.json();
            setjson(jsonresult);
          }
          fetchData();
        }, [json,replies]);  
  return (
    <div className={style.outside} >
      
    <div className={style.whole}>
        <div className={style.commands}>
            {json.map(a=>{
                  return ( <div><CommentDiv score={a.score} keys={a.id} setscore={setscore} user={a.user} createdAt={a.createdAt} content={a.content} setreplies={setreplies} replies={replies} t={a.replies} parent={true}/>
                  {(replies)?<div className={style.mycommands}><Comment/></div>:null}
                  <div className={style.insideComment}>
                    <p className={style.none}>{i=-1}</p> 
                    {
                    (a.replies) ? (
                      (JSON.parse(a.replies.replace(/'/g,"\\\'"))).map(e=>{
                        i++
                        return <CommentDiv score={e.score} user={JSON.stringify(e.user)} createdAt={e.createdAt} content={e.content} keys={a.id+" "+i} username={a.user} parent={false}/>
                    })
                    ):null
                    }
                 </div>
                  </div>)    
            })}  
        </div>
        <div className={style.mycommands}><Comment/></div>
    </div>
    {(Delete)?<div className={style.popup}></div>:null}
    {(Delete)?<div className={style.inside}>
      <p className={style.delete}>Delete Comment?</p>
      <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className={style.deletebox}>
            <div className={style.cancel} onClick={()=>setDelete(!Delete)}>CANCEL</div>
            <div className={style.delete1} >DELETE</div>
        </div>
        </div>:null}
    </div>
  )
}