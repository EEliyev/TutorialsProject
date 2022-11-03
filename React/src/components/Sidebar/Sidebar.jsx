import React, { useState } from 'react'
import './Sidebar.css';

function Sidebar({category,setIndexCategory}) {
  return (
    <div className="sidebar ">

    <div className="sidebar-main" id="sidebar-main">

        <ul id="sidebar">
            {category?.map((x,i)=>{
              return <li key={i} onClick={()=>setIndexCategory(i)}><a href="#">{x.name}</a></li>
            })}
        </ul>
    </div>

</div>
  )
}

export default React.memo(Sidebar)