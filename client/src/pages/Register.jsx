import React, { Component } from 'react'
import left from '../assets/img/book-table/left-img.png'
import right from '../assets/img/book-table/right-img.png'
import icon1 from '../assets/img/book-table/icon1.png'
import icon4 from '../assets/img/book-table/icon4.png'
import icon5 from '../assets/img/book-table/icon5.png'
import { ToastContainer, toast, Slide } from "react-toastify"
import { postRequest, getRequest } from "../api"
import qs from "qs"
import QrReader from 'react-qr-scanner'
import Header from "./Header";

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tablename: null
        }
    }
    handlechange = async (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleScan = async (data) => {
        if (data !== null) {
            var scandata = data.text.split('?')
            var tablename = scandata[1].split("=")
            this.setState({
                tablename: tablename[1]
            })
        }

    }
    enterbtn = async () => {
        const { tablename } = this.state
        const newuser = {
            table: tablename
        }
        const user = await postRequest("/user", newuser)
        if (user.userid !== undefined) {
            localStorage.setItem("userid", user.userid)
            localStorage.setItem("tablename", tablename)
            toast.success("Table Added Successfully", {
                transition: Slide
            })
            setTimeout(() => {
                window.location.replace("/menu")
            }, 2000)
        } else {
            toast.error("Server Error", {
                delay: 1000,
                transition: Slide
            })
        }

    }
    render() {
        const previewStyle = {
            // height: 280,
            width: 280,
        }
        const { tablename } = this.state
        console.log(tablename);
        return (
            <React.Fragment>
                <Header />
                <section className="book-table-section">
                    <img className="shape1" src={left} alt="" />
                    <img className="shape2" src={right} alt="" />
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="content">
                                    <div className="section-header">
                                        <h6 className="sub-title wow fadeInUp">
                                            World Class Atmosphere
                                        </h6>
                                        <h2 className="title wow fadeInUp">
                                            Scan Qr Code
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-1"></div>
                            <div className="col-md-4 col-10">
                                <QrReader className="qrscan"
                                    delay={this.state.delay}
                                    style={previewStyle}
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                />
                            </div>
                            <div className="col-md-4 col-1"></div>
                            <div className="col-lg-12">
                                <div className="row">
                                    {
                                        tablename !== null ?
                                            <div className="col-lg-12 text-center mt-2">
                                                {/* <h5 className="mt-2">Your Table Number : {tablename}</h5> */}
                                                <button type="submit" onClick={this.enterbtn} className="registerbtn mt-2">View Menu</button>
                                            </div>
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </section>
            </React.Fragment>

        )
    }
}
