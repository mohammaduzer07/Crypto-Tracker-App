import React from "react";
import "./styles.css";
import AnchorTemporaryDrawer from "./drawer";
import Button from "../Button";
import { Link } from "react-router-dom";

function Header() {
    return(
        <div className="navbar">
            <h1 className="logo">CryptoTracker<span style = {{color: "var(--blue)"}}>.</span></h1>
        <div className="links">
            <Link to="/">
                <p className="link">Home</p>
            </Link>
            <Link to="/compare">
                <p className="link">Compare</p>
            </Link>
            <Link to="/watchList">
                <p className="link">Watchlist</p>
            </Link>
            <Link to="/dashboard">
               <Button text={"Dashboard"} onClick={() => console.log("Btn clicked")}/>
            </Link>
        </div>
        <div className="mobile-drawer">
            <AnchorTemporaryDrawer/>
        </div>
        </div>
    )
}

export default Header;