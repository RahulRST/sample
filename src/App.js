import './App.css';
import React from "react";
import About from "./pages/about.jsx";
import Contact from './pages/contact.jsx';
import Navbar from "./pages/navbar.jsx";


function App() {
  return (
    <div class="App-header">
      <Navbar />
      <About />
      <Contact />
    </div>
  );
}

export default App;
