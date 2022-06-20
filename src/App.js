import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import about from "./pages/about.jsx";
import Contact from './pages/contact';
import Navbar from "./pages/navbar.js";

function App() {
  return (
    <>
    <div class='App-header'>
        <Navbar />
    </div>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Router>
        <Routes>
          <Route path="/about" component={about} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
