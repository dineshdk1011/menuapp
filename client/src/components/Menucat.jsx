import React from 'react'
import "../assets/css/menucat.css"
export default function Menucat({ activecat, cat, image, name, filterCat }) {
    return (
        <span className={`nav-link ${activecat === cat ? 'activecat' : null}`} onClick={(e) => filterCat(e, name,cat)} style={{ cursor: "pointer" }} >
            <img className="categoryimg" src={image} alt="" />
           <span className="categoryname"> {name}</span>
        </span>
    )
}
