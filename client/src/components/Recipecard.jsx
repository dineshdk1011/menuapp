import React from 'react'
import '../assets/css/recipecard.css'
import veg from '../assets/img/logo/veg.png'
import nonveg from '../assets/img/logo/non-veg.png'
import { FaCartPlus } from 'react-icons/fa'
import { MdAddShoppingCart } from "react-icons/md"
import * as FA from "react-icons/fa"

export default function Recipecard({ food, addTocart,decrement, increment }) {
    const { foodimage: image, foodname, price, offerprice, description, foodtype, foodid, iscart,cartid } = food
    return (
        <>
            <div className="row shadow rounded menuitemdiv">
                <div className="col-md-1"></div>
                <div className="col-sm-2 col-2">
                    <div className="single-recipe">
                        <div className="top-area">
                            <div className="img" style={{ backgroundImage: `url('${image[0]}')` }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-10">
                    <div className="recipe-main-content mt-3">
                        <h6 className="name"><span>{foodtype === "Veg" ? <img className="vegicon" src={veg} alt="" width="2%" /> : <img className="nonvegicon" src={nonveg} alt="" width="2%" />}</span><b>{foodname}</b></h6>
                        <span className="text">{description}</span>
                        {
                            offerprice === 0 ? <div className="pricedis">
                                <span className="priceamount"> ₹{price}</span>
                                {
                                     iscart === true ? <span className="custom-button ml-2" id={foodid} onClick={(e) => addTocart(e, foodid)} ><FaCartPlus /></span> : 
                                     <span className="custom-button ml-2" id={foodid}  ><MdAddShoppingCart /></span>
                                }
                            </div> : (
                                <React.Fragment>
                                    <div className="pricedis">
                                        <span className="priceamount"> ₹{offerprice}</span><span className="ml-2"></span>
                                        {
                                            iscart === true ? <span className="custom-button ml-2" id={foodid} onClick={(e) => addTocart(e, foodid)} ><FaCartPlus /></span> : 
                                            <span className="custom-button ml-2" id={foodid} ><MdAddShoppingCart /></span>
                                        }

                                    </div>
                                </React.Fragment>
                            )
                        }



                    </div>
                </div>

                <div className="col-md-1">

                </div>
            </div>

        </>

    )
}
