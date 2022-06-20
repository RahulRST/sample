import "./navbar.css";
import { Link } from "react-router-dom";
function Navbar(){
    return(
        <>
        <div class="topnav">
            <a class="active" href="#home">Home</a>
            <a href="/about">About
            <li>
            <Link to="/about">About</Link>
            </li>
            </a>
            <a href="/contact">Contact</a>
        </div>
        </>

    );
}
export default Navbar;