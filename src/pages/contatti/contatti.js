import React from 'react'
import "./contatti.css"

function Contatti() {
    const siteUrl = process.env.REACT_APP_API_URL;

  return (
    <div className='layoutContatti'>
        <div className='img_head'><img src={siteUrl+'/site/contatti/contatti.png'}></img><div className='blackimg'><span>Contatti</span></div></div>
        <div className='desc_1'><span>Se stai cercando qualcuno per assistenza chiama il numero <b> 3926090200</b></span></div>
    </div>
  )
}

export default Contatti