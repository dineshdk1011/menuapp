import React, { Component } from 'react'
import * as FA from "react-icons/fa"
import '../assets/css/cart.css'
import { patchRequest, getRequest, deleteRequest, postRequest } from "../api"
import { Recipeaddcart } from "../components"
import { Button, Modal } from 'react-bootstrap'
import { ToastContainer, toast, Slide } from "react-toastify"
import { AiFillCaretRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: null,
            myCarts: [],
            customizedata: [],
            userid: localStorage.getItem("userid"),
            totalAmount: 0,
            customizefoodid: null,
            ismodel: false,
            mycostomize: [],
            totalquanitity:0
        }
    }
    componentDidMount = async () => {
        const { userid } = this.state
        const myCarts = await patchRequest(`/cart/${userid}`)
        if (myCarts.length !== 0) {
            const myCart = []
            for (var i = 0; i < myCarts.length; i++) {
                const food = await getRequest(`/food/${myCarts[i].foodid}`)
                if (food.length !== 0) {
                    food[0]["cartid"] = myCarts[i].cartid
                    food[0]["quantity"] = 1
                    food[0]["costomize"] = []
                    food[0]["amount"] = food[0]["offerprice"] === 0 ? (food[0]["price"] * 1) : (food[0]["offerprice"] * 1)
                    myCart.push(...food)
                }
            }
            const total = this.totalAmount(myCart)
            this.setState({ myCarts: myCart, totalAmount: total })
        }
    }
    decrement = (e, cartid) => {
        const { myCarts } = this.state
        const findindex = myCarts.findIndex((cart) => cart.cartid === cartid)
        const selectedCart = myCarts[findindex]
        const myquantity = selectedCart.quantity - 1
        if (myquantity !== 0) {
            selectedCart["quantity"] = myquantity
            selectedCart["amount"] = selectedCart["offerprice"] === 0 ? (selectedCart["price"] * myquantity) : (selectedCart["offerprice"] * myquantity)
            myCarts[findindex] = selectedCart
            const total = this.totalAmount(myCarts)
            this.setState({ myCarts: myCarts, totalAmount: total })
        }
    }
    increment = (e, cartid) => {
        const { myCarts } = this.state
        const findindex = myCarts.findIndex((cart) => cart.cartid === cartid)
        const selectedCart = myCarts[findindex]
        const myquantity = selectedCart.quantity + 1
        selectedCart["quantity"] = myquantity
        selectedCart["amount"] = selectedCart["offerprice"] === 0 ? (selectedCart["price"] * myquantity) : (selectedCart["offerprice"] * myquantity)
        myCarts[findindex] = selectedCart
        const total = this.totalAmount(myCarts)
        this.setState({ myCarts: myCarts, totalAmount: total })
    }
    confirmOrder = async () => {
        const { myCarts, userid } = this.state
        if (myCarts.length === 0) return toast.info("Please Add Food In Cart", {
            delay: 1000,
            transition: Slide
        })
        const cartid = []
        for (var i = 0; i < myCarts.length; i++) {
            const newOrder = {
                foodid: myCarts[i].foodid,
                userid: userid,
                quantity: myCarts[i].quantity,
                table: localStorage.getItem("tablename"),
                amount: myCarts[i].amount,
                foodname: myCarts[i].foodname,
                costomize: myCarts[i].costomize
            }
            const order = await postRequest("/order", newOrder)
            if (order.orderid !== undefined) {
                cartid.push(myCarts[i].cartid)
            }
        }
        if (cartid.length !== 0) {
            for (var j = 0; j < cartid.length; j++) {
                await deleteRequest(`/cart/${cartid[j]}`)
            }
            toast.success("Order Successfully Placed", {
                delay: 1000,
                transition: Slide
            })
            setTimeout(() => { window.location.replace("/menu") }, 2000)
        }
    }
    totalAmount = (cart) => {
        const total = cart.reduce((a, b) => {
            if (b["offerprice"] === 0) {
                return a + b["price"] * b["quantity"]
            } else {
                return a + b["offerprice"] * b["quantity"]
            }
        }, 0)
        const totalquanitity = cart.reduce((a, b) => {
            return a + b["quantity"]
        }, 0)
        this.setState({
            totalquanitity:totalquanitity
        })
        return total
    }
    cancelFood = async (e, cartid) => {
        const confirm = window.confirm("Are You Sure To Remove The Cart")
        if (confirm) {
            const deleteCart = await deleteRequest(`cart/${cartid}`)
            if (deleteCart.deletedCount !== undefined) {
                if (deleteCart.deletedCount === 1) {
                    toast.success("Cart Removed", {
                        delay: 1000,
                        transition: Slide
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                } else {
                    toast.error("Server Error", {
                        delay: 1000,
                        transition: Slide
                    })
                }
            } else {
                toast.error("Server Error", {
                    delay: 1000,
                    transition: Slide
                })
            }
        }
    }
    getCustomizefood = async (foodid) => {
        var finalcostomizedata = []
        const customizedata = await getRequest("/customization")
        for (var i = 0; i < customizedata.length; i++) {
            if (customizedata[i].foodid === foodid) {
                finalcostomizedata.push(customizedata[i].customizationdata[0])
            }
        }
        this.setState({ customizedata: finalcostomizedata, customizefoodid: foodid, ismodel: true })
    }
    handleClose = () => {
        this.setState({ ismodel: false, mycostomize: [] })
    }
    mycostomize = (e) => {
        var { mycostomize } = this.state
        const value = e.target.value
        var ischecked = e.target.checked
        if (ischecked) {
            mycostomize.push(value)
        } else {
            const findindex = mycostomize.indexOf(value)
            mycostomize.splice(findindex, 1)
        }
        this.setState({ mycostomize })
    }
    customizesubmit = async () => {
        const { customizefoodid, mycostomize, myCarts } = this.state
        const findindex = await myCarts.findIndex((food) => food.foodid === customizefoodid)
        const selectedFood = myCarts[findindex]
        selectedFood["costomize"] = mycostomize
        myCarts[findindex] = selectedFood
        this.setState({ myCarts, ismodel: false, mycostomize: [] })
    }
    render() {
        const { myCarts, totalAmount, customizedata, ismodel,totalquanitity } = this.state
        return (
            <section className="menu-section" id="menu">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-12">

                            <div className="menu-secrion-innner">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p><a href="/menu" ><FA.FaArrowLeft /> Back to Menu</a></p>
                                        <div className="opening-time  d-flex align-items-center">
                                            <ul className="time-list" >
                                                {
                                                    myCarts.length !== 0 ? myCarts.map((cart, index) => (
                                                        <React.Fragment key={index} >
                                                            <li>
                                                                <Recipeaddcart food={cart} getCustomizefood={this.getCustomizefood} decrement={this.decrement} increment={this.increment} cancelFood={this.cancelFood} />
                                                            </li>

                                                        </React.Fragment>
                                                    )) : <div>Loading...</div>
                                                }

                                            </ul>
                                            
                                            <Link className="cartviewlink btn checkoutbtn" to="/cart">
                                                <div className="row">
                                                    <div className="col-sm-6 col-6 itemdiv">
                                                        <span className="itemname"><span>{totalquanitity}</span> ITEM </span><br />
                                                        <span className="itemamount">₹ <span>{totalAmount} </span><span className="taxname"> Plus Taxes</span></span>
                                                    </div>

                                                    <div className="col-sm-6 col-6">
                                                        <p className="viewcartbtnsave" onClick={this.confirmOrder}>CONFIRM ORDER <AiFillCaretRight /></p>
                                                    </div>
                                                </div></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={ismodel}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Food Costomization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="menu-sectioncostomize">
                        <section className="menu-sectioncostomize" id="menu">
                            <div className="set">
                                {
                                    customizedata.length !== 0 ? customizedata.map((food, index) => (
                                        <div key={index} >
                                            <h6>{food.headings}</h6>
                                            {
                                                food.options.map((optiondata, indexoption) => (
                                                    <div key={indexoption}>
                                                        <input type="checkbox" className="checkboxsize" onChange={(e) => this.mycostomize(e)} id={`${index}-${indexoption}`} name="mycostomize" defaultValue={optiondata} />
                                                        <label htmlFor={`${index}-${indexoption}`} className="labelcostomize"> {optiondata}</label><br />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    )) : null
                                }

                            </div>
                        </section>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.customizesubmit}>
                            Submit
                        </Button>
                        <Button variant="danger" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer />
            </section>


        )
    }
}
