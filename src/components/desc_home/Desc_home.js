import React from 'react'
import './Desc_home.css'

function Desc_home() {
  return (
    <div>
        <div className='descrizione row_ gray0'>
            <div className='image_descrizione '></div>
            <div className='descrizione_home'>
                <b>Chi siamo?</b><br/>
                <span>Siamo una realtà immobiliare dinamica e in continua espansione ed evoluzione, sempre attenta ai mutamenti del mercato e improntata sull’innovazione.
Selezioniamo accuratamente le migliori opportunità immobiliari presenti sul nostro territorio. <a href='/chi_siamo'>Continua a leggere...</a></span>
            </div>
        </div>
        <div className='descrizione row_reverse gray1'>
            <div className='image_descrizione'></div>
            <div className='descrizione_home'>
                <b>Ricerca immobili</b><br/>
                <span>Con tantissime opzioni, ti facciamo trovare l'immobile giusta per te! <br/></span>
                <button className='button_immobili'><a href="/cerca?tipologia=case&page=1">Ricerca immobile</a></button>
            </div>
        </div>
    </div>
  )
}

export default Desc_home