import React, { Component } from 'react'
import menuleft2 from "../assets/img/menu/menuleft2.png"
import menuright2 from "../assets/img/menu/menuright2.png"
import icon1 from "../assets/img/menu/starter.png"
import icon2 from "../assets/img/menu/dishes.png"
import icon3 from "../assets/img/menu/dessert.png"
import icon4 from "../assets/img/menu/drink.png"
import { ToastContainer, toast, Slide } from "react-toastify"
import { Recipecard, Menucat } from "../components"
import { getRequest, postRequest, patchRequest } from "../api"
import { BiCartAlt } from 'react-icons/bi'
import { GrLocation } from 'react-icons/gr'
import { FcNext } from 'react-icons/fc'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { AiOutlineSearch, AiFillCaretRight } from 'react-icons/ai'
import { ImEqualizer2 } from 'react-icons/im'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
// import 'swiper/css';
import { Link } from 'react-router-dom'
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foods: [],
            activecat: 0,
            customizedata: [],
            userid: localStorage.getItem("userid"),
            myCarts: [],
            totalAmount: 0

        }
    }
    componentDidMount = async () => {
        const { userid } = this.state
        const myCarts = await patchRequest(`/cart/${userid}`)
        const allFoods = await getRequest("/food")
        if (allFoods.length !== 0) {
            const myallFoods = []
            for (var i = 0; i < allFoods.length; i++) {
                const checkcart = await myCarts.filter((cart) => cart.foodid === allFoods[i].foodid)
                var foods = allFoods[i]
                foods["quantity"] = 1
                foods["costomize"] = []
                foods["amount"] = foods["offerprice"] === 0 ? (foods["price"] * 1) : (foods["offerprice"] * 1)
                if (checkcart.length === 0) {
                    foods["iscart"] = true
                    foods["cartid"] = "null"
                } else {
                    foods["iscart"] = false
                    foods["cartid"] = checkcart[0].cartid
                }
                myallFoods.push(foods)
            }
            const mynewCart = []
            for (var j = 0; j < myCarts.length; j++) {
                const food = await getRequest(`/food/${myCarts[j].foodid}`)
                if (food.length !== 0) {
                    food[0]["cartid"] = myCarts[j].cartid
                    food[0]["quantity"] = 1
                    food[0]["costomize"] = []
                    food[0]["amount"] = food[0]["offerprice"] === 0 ? (food[0]["price"] * 1) : (food[0]["offerprice"] * 1)
                    mynewCart.push(...food)
                }
            }
            const total = this.totalAmount(mynewCart)
            this.setState({ foods: myallFoods, myCarts: mynewCart, totalAmount: total })
        }

    }
    addTocart = async (e, foodid) => {
        const { foods } = this.state
        const findindex = foods.findIndex((food) => food.foodid === foodid)
        const selectedFood = foods[findindex]
        selectedFood["iscart"] = false
        foods[findindex] = selectedFood
        const newCart = {
            table: localStorage.getItem("tablename"),
            foodid: foodid,
            userid: localStorage.getItem("userid")
        }
        const cart = await postRequest("/cart", newCart)
        if (cart.cartid !== undefined) {
            this.setState({ foods: foods })
            toast.success("Food Added Successfully", {
                delay: 1000,
                transition: Slide
            })
        } else {
            toast.error("Server Error", {
                delay: 1000,
                transition: Slide
            })
        }
    }
    filterCat = async (e, category, activecat) => {
        const allFoods = await getRequest("/food")
        if (allFoods.length !== 0) {
            const myFilterfoods = []
            for (var i = 0; i < allFoods.length; i++) {
                for (var j = 0; j < allFoods[i].category.length; j++) {
                    if (allFoods[i].category[j] === category) {
                        myFilterfoods.push(allFoods[i])
                    }
                }
            }
            this.setState({ foods: myFilterfoods, activecat })
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
    totalAmount = (cart) => {
        const total = cart.reduce((a, b) => {
            if (b["offerprice"] === 0) {
                return a + b["price"] * b["quantity"]
            } else {
                return a + b["offerprice"] * b["quantity"]
            }
        }, 0)
        return total
    }
    render() {
        const { foods, activecat, myCarts, totalAmount } = this.state
        return (
            <section className="menu-section2" id="menu">
                <img className="shape1" src={menuleft2} alt="" />
                <img className="shape2" src={menuright2} alt="" />
                <div className="container">
                    <p><GrLocation /><span className="textlocation">  Tamil Nadu, India</span></p>
                    <div className="topdiv">
                        <p className="notificationicon"><IoMdNotificationsOutline /></p>
                        <h6>Hii NoHa <span className="fontcolor">!</span></h6>
                        <p>Find Your Favorite dish</p>
                        <div className="row">
                            <div className="col-sm-10 col-10">
                                <div className="main">
                                    <div className="form-group has-search">
                                        <AiOutlineSearch className="fa fa-search form-control-feedback" />
                                        <input type="text" className="form-control" placeholder="Search for a food" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2 col-2">
                                <p className="filtericon"><ImEqualizer2 /></p>
                            </div>
                        </div>
                        <p className="categoryheading">Categories</p>
                        <Splide options={{
                            rewind: true,
                            perPage: 4,
                            perMove: 1,
                            arrows: false,
                            pagination: false
                        }}>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={1} image={icon1} name="Starters" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={2} image={icon2} name="Dishes" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={3} image={icon3} name="Deserts" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={4} image={icon4} name="Drinks" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={2} image={icon2} name="Dishes" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={3} image={icon3} name="Deserts" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={4} image={icon4} name="Drinks" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={2} image={icon2} name="Dishes" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={3} image={icon3} name="Deserts" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                            <SplideSlide>
                                <div className="nav-item col-sm-3 col-4 categoryitem" role="presentation">
                                    <Menucat activecat={activecat} className="categoryimg" cat={4} image={icon4} name="Drinks" filterCat={this.filterCat} />
                                </div>
                            </SplideSlide>
                        </Splide>


                    </div>


                    <div className="row">
                        <div className="col-lg-12">

                            <div className="menu-tab-area">
                                <div className="tab-content">
                                    <p className="categoryheading">Menu</p>
                                    <div className="tab-pane fade show active" id="pills-tone" role="tabpanel" aria-labelledby="pills-tone-tab">
                                        <div className="main-content">
                                            <div className="container-fluid row">
                                                {
                                                    foods.length !== 0 ?
                                                        foods.map((food, index) => (
                                                            <div className="col-lg-12 col-md-6 col-sm-6 p-2" key={index} style={{ height: "auto" }}>
                                                                <Recipecard food={food} addTocart={this.addTocart} decrement={this.decrement} increment={this.increment} />
                                                            </div>

                                                        ))
                                                        : <div ><p className="text-center">No Food Found..</p></div>
                                                }
                                                <hr />
                                            </div>
                                            {
                                                myCarts.length !== 0 ? <Link className="cartviewlink btn checkoutbtn" to="/cart">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-6 itemdiv">
                                                            <span className="itemname"><span>{myCarts.length}</span> ITEM </span><br />
                                                            <span className="itemamount">₹ <span>{totalAmount} </span><span className="taxname"> Plus Taxes</span></span>
                                                        </div>

                                                        <div className="col-sm-6 col-6">
                                                            <p className="viewcartbtn">VIEW CART <AiFillCaretRight /></p>
                                                        </div>
                                                    </div></Link> : <div></div>
                                            }

                                        </div>
                                    </div>
                                </div>

                                {/* <div>
                                    <a href="##" className="float ">
                                       <span className="viewcart"> < BiCartAlt/></span>
                                    </a>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>

        )
    }
}
