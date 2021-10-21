import React from 'react'
import * as FA from "react-icons/fa"
import Logo from "../assets/img/logo/logo.png"
import Shape from "../assets/img/others/footer-shape.png"
import fLeft from "../assets/img/others/f-left.png"
import fRight from "../assets/img/others/f-right.png"
import ii1 from "../assets/img/contact/ii1.png"
import ii2 from "../assets/img/contact/ii2.png"
import ii3 from "../assets/img/contact/ii3.png"
export default function Footer() {
    return (
        <footer className="footer-section">
            <img className="shape" src={Shape} alt="" />
            <img className="f-left wow fadeInLeft" data-wow-delay=".5s" src={fLeft} alt="" />
            <img className="f-right wow fadeInRight" data-wow-delay=".5s" src={fRight} alt="" />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="top-area">
                            <div className="logo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="footer-social-links">
                                <span className="label">Follow us :</span>
                                <ul>
                                    <li>
                                        <a href="##">
                                            <FA.FaFacebookF />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="##">
                                            <FA.FaTwitter />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="##">
                                            <FA.FaGooglePlusG />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="##">
                                            <FA.FaLinkedinIn />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="newslater-wrapper">
                            <form className="newslater-form">
                                <input type="text" placeholder="Your Email Address" />
                                <button type="submit">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="info-box">
                                    <div className="icon">
                                        <img src={ii1} alt="" />
                                    </div>
                                    <p>
                                        Phone Number:
                                    </p>
                                    <p>
                                        +1 111 000 111
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="info-box">
                                    <div className="icon">
                                        <img src={ii2} alt="" />
                                    </div>
                                    <p>
                                        17 South Sherman Street
                                        Astoria, NY 11106
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="info-box">
                                    <div className="icon">
                                        <img src={ii3} alt="" />
                                    </div>
                                    <p>
                                        Drop us a line:
                                    </p>
                                    <p>
                                        <a href="http://pixner.net/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="6b030e0707042b11040418030245080406">[email&nbsp;protected]</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright-text">
                            Copyright © 2020.All Rights Reserved By Zooshi
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
