export const star=({height,delay,top,left})=>{

    return(
        <div style={{height:height, width:height, display:"absolute", top:top, left:left, animationDelay:delay, borderRadius:"50%",boxShadow:"0 0 5px 1px rgba(0,99,99,0.5)"}}> 

        </div>
    )
}