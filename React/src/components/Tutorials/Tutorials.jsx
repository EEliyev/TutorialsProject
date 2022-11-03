import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Tutorials.css'

function Tutorials({data}) {
    console.log(data)

    const [indexCategory, setIndexCategory]= useState(0);
  return (
    <div className="middle">
       
        <Sidebar category={data?.subjects} setIndexCategory={setIndexCategory}/>
        <div className="content ">
            <div className="content-main">
                <div className="content-title">
                    {data?.subjects[indexCategory]?.title}
                </div>
               <div dangerouslySetInnerHTML={{__html:data?.subjects[indexCategory]?.body}}/>
            </div>
        </div>
        <div className="ad">
            <div className="ad-inner"><h1>Ads</h1></div>
        </div>
    </div>
  )
}

export default React.memo(Tutorials)