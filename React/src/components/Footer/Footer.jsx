import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook,faGoogle,faTwitter} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className="footer">
      <div className="inside-footer">

        <li><a href="">Everything for education</a></li>
        <li><a href="">You just try to learn</a></li>
        <ul>
          <li className='font-li'><FontAwesomeIcon icon={faFacebook}/></li>
          <li className='font-li'><FontAwesomeIcon icon={faTwitter}/></li>
          <li className='font-li'><FontAwesomeIcon icon={faGoogle}/></li>
        </ul>

      </div>
    </div>
  )
}

export default Footer