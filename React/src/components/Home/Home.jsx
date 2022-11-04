import React, { useEffect, useRef, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import Banner from '../Banner/Banner'
import Button from '../Elements/Button/Button'
import './Home.css'

function Home({cards}) {


  const refBottommain=useRef();

  useEffect(() => {

 
    const updatePosition = (e) => {
        var d=((window.pageYOffset)/(document.body.clientHeight-window.innerHeight)).toFixed(2)*20;
      if(refBottommain.current!=null){
        refBottommain.current.style.cssText=`background:linear-gradient(220deg,#c8d94d ${50-d}%,transparent ${50-d}%,transparent ${50+d}%,#3e454d ${50+d}%)`

      }

    }
    window.addEventListener("scroll", (e)=>updatePosition(e));
    // updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  })
  

 return (
    <div>
      <Banner />
      <div className="home-main">
        <h1 style={{ display: 'block', textAlign: "center", margin: "3rem" }}>Services</h1>

        <div ref={refBottommain} className="bottom-main-secondary">
         {cards?.map((x,i)=>{
           return <Link to={`/tutorials/${x.url}`} key={i}>
           <div className="card" >
           <div className="card-ico">{x.name}</div>
           <div className="card-title">{x.title}</div>
           <div className="card-text">{x.text}</div>
           <Button text={"More"}/>
         </div></Link>
         })}
        </div>
      </div>

    </div>
  )
}

export default React.memo(Home)