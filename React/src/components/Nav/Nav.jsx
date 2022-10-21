import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

import Logo from '../../logos/AgFontTransparent.png'

function Nav({data}) {


  return (
    <div className="nav">
      <div className="nav-logo">
          <Link to={'/'}><img src={Logo} alt="" width={"170px"}/></Link>
      </div>
      <div className="nav-items">
        <Link className='nav-item' to={"/"}>Home</Link>
        <ul><Link className='nav-item' to={"/tutorials"}>Tutorials</Link>
          <div className='nav-menu'>
            {data.map((x,i)=>{
              return <Link key={i} to={`/tutorials/${x.url}`}><li className='nav-menu-item'>{x.name}</li></Link>
            })}
          </div>
        </ul>
        <Link className='nav-item'>News</Link>
      </div>
      <div className="nav-sign-in-up">
      <Link to="/sign-in" id='sign' className='nav-item'>Sign In</Link>
      <Link to="/sign-up" className='nav-item'>Sing Up</Link>
      </div>
    </div>
  )
}

export default Nav