import React from 'react'
import Logo from "../assets/img/logo/logo.png"
export default function Header() {
    return (
        <header className="header-section">
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo">
                        <a href="/">
                            <img src={Logo} alt="logo" />
                        </a>
                    </div>
                    {/* <ul className="menu">
                        <li>
                            <a href="/cart" className="custom-button">Cart</a>
                        </li>
                    </ul> */}
                    {/* <div className="header-bar d-lg-none">
                        <span />
                        <span />
                        <span />
                    </div> */}
                </div>
            </div>
        </header>
        

    )
}
