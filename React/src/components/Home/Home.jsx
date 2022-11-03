import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import Banner from '../Banner/Banner'
import Button from '../Elements/Button/Button'
import './Home.css'

function Home({cards}) {

  const[scroll,setScroll]=useState(0);



  useEffect(() => {
  
    const updatePosition = () => {

        var d=((window.pageYOffset)/(document.body.clientHeight-window.innerHeight)).toFixed(2)*100;
  
        setScroll(d/5)

    }
    window.addEventListener("scroll", updatePosition);
    // updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  })
  

 return (
    <div>
      <Banner />
      <div className="home-main">
        <h1 style={{ display: 'block', textAlign: "center", margin: "3rem" }}>Services</h1>

        <div className="bottom-main-secondary" style={{background:`linear-gradient(220deg,#c8d94d ${50-scroll}%,transparent ${50-scroll}%,transparent ${50+scroll}%,#3e454d ${50+scroll}%)`}}>
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