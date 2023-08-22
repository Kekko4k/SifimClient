import React from 'react'
import "./footer.css"

function footer() {
    return (
        <div className='layoutFooter'>
            <div className='contentFooter'>
                <div className='description_foot'>
                    <span>Quick link</span>
                    <div><a href="/">Home</a></div>
                    <div><a href="/">Chi siamo</a></div>
                    <div><a href="/">Dove siamo</a></div>
                    <div><a href="/">Contatti</a></div>
                    <div><a href="/">Privacy policy</a></div>
                    <div><a href="/">Cookies policy</a></div>
                </div>
                <div className='description_foot'>
                    <span>Contatti</span>
                    <div>Piazza Mazzini 72 Lecce 73100 (LE)</div>
                    <div>3926690200</div>
                    <div>3926690200</div>
                    <div>3926690200</div>
                    <div>agenziadilecce@gmail.com</div>
                </div>
            </div>
        </div>
    )
}

export default footer