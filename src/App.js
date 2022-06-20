import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from "./pages/about.jsx";
import Contact from './pages/contact.jsx';
import Navbar from "./pages/navbar.jsx";
import Welcome from "./pages/welcome.jsx";

function App() {
  return (
      <Router>
        <React.Fragment>
      <Navbar />
      <Route exact path ="/" render={()=>(
        <Welcome name="CODEDEC" />
      )} />
      <Routes>
        <Route exact path="/aboutus" component={About} />
        <Route exact path="/contactus" component={Contact} />
      </Routes>
      </React.Fragment>
      </Router>
    );
}

export default App;
