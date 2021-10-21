import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import "../assets/css/cart.css"
import * as FA from "react-icons/fa"
import veg from '../assets/img/logo/veg.png'
import nonveg from '../assets/img/logo/non-veg.png'

export default function Recipeaddcart({ food, decrement, increment, cancelFood, getCustomizefood }) {
    const { foodimage: image, foodname, iscustomize, price, quantity, foodtype, description, offerprice, cartid, foodid, } = food
    const handleShow = (e) => getCustomizefood(e.target.id)
    return (
        <div className="row g-0 shadow rounded">
            <div className="col-md-2 col-2">
                <div className="cardaddimg img" style={{ backgroundImage: `url('${image[0]}')` }}>
                </div>
                {
                    iscustomize === true ? <span><a href="##" id={foodid} onClick={(e) => handleShow(e, foodid)} className="text-center mt-1 foodcostomize">Customize</a></span> : null
                }
            </div>
            <div className="col-md-8 col-8" style={{ textAlign: 'initial' }}>
                <div className="card-body">
                    <p className="card-text carttitle"><span>{foodtype === "Veg" ? <img className="vegicon" src={veg} alt="" width="2%" /> : <img className="nonvegicon" src={nonveg} alt="" width="2%" />}</span><b style={{color:"black"}}>{foodname}</b></p>
                    <p className="textcart description">{description}</p>
                    <div className="row">
                        <div className="col-md-2 sm-6">
                            <p className="card-text price">₹ {offerprice === 0 ? price : offerprice}</p>
                        </div>
                        <div className="col-md-10 sm-6 btndiv">
                            <div className='tempcounter d-flex w-50 justify-content-center rounded-pill bg-light'>
                                <button className='p-0 border-0 bg-transparent white decrementbtn' id={foodid} onClick={(e) => decrement(e, cartid)}><FA.FaMinus /></button>
                                <input value={quantity} readOnly name="temperature" className='selected-temp-inp w-50 white bg-transparent border-0 cartinput' />
                                <button className='p-0 border-0 fw-bold bg-transparent white incrementbtn' id={foodid} onClick={(e) => increment(e, cartid)} ><FA.FaPlus/></button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="col-md-2 col-2">
                <span className="closeicon" id={cartid} onClick={(e) => cancelFood(e, cartid)} ><AiOutlineClose /></span>
            </div>

        </div>
    )
}
