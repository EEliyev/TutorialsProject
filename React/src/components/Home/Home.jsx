import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'
import Banner from '../Banner/Banner'
import Button from '../Elements/Button/Button'
import Tutorials from '../Tutorials/Tutorials'
import './Home.css'

function Home({cards}) {

 return (
    <div>
      <Banner />
      <div className="home-main">
        <h1 style={{ display: 'block', textAlign: "center", margin: "3rem" }}>Services</h1>

        <div className="bottom-main-secondary">
         {cards.map((x,i)=>{
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

export default Home