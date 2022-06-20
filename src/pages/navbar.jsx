import "./navbar.css";
import {Link} from 'react-router-dom';

function Navbar() {
    return(
        <nav>
      <h1>
        <Link to="/"><i></i> Codedec</Link>
      </h1>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="contact">Contact</Link></li>
      </ul>
    </nav>   
    )
}

export default Navbar;
