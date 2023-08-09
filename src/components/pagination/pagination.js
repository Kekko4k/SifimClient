import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import "./pagination.css"

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];
    const [index, setIndex] = useState(parseInt(currentPage))

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    function eventPage(number) {
        paginate(number);
        setIndex(number)
    }

    function showPage(number) {
        if (number === index) {
            return (<li key={number} className="page-item">
                <a onClick={() => eventPage(number)} hreaf="!#" id='use' className='page-link'>
                    {number}
                </a>
            </li>);
        }
        else if (number === 1) {
                return (<li key={number} className="page-item">
                <a onClick={() => eventPage(number)} hreaf="!#"  className='page-link'>
                    {number}
                </a>
            </li>);
        }
        else if ((number >= index && number - 1 <= index) || (number < index && number + 1 >= index)) {
            return (<li key={number} className="page-item">
                <a onClick={() => eventPage(number)} hreaf="!#" className='page-link'>
                    {number}
                </a>
            </li>);
        }

        else if (number === pageNumbers[pageNumbers.length - 1]) {
            if(index<=number-2){
                return (
           <li key={number} className="page-item">
            ...  &nbsp;
                <a onClick={() => eventPage(number)} hreaf="!#" id="lastOne" className='page-link'>
                    {number}
                </a>
            </li>);
            }
        }

    }

    function SuccPage(){
        paginate(index+1);
        setIndex(index+1)
    }

    function PredPage(){
        paginate(index-1);
        setIndex(index-1)
    }

    return (
        <nav className="pagination">
            {index > 1  && <div onClick={() => PredPage()} className='direct_page' > {'<'} Precedente</div>}
            
            {pageNumbers.map(number => (
                showPage(number)
            ))}
            {index < pageNumbers.length && <div onClick={() => SuccPage()} className='direct_page'>Successivo {'>'}</div>}
        </nav>

    )

}

export default Pagination