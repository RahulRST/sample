import './App.css';
import Content from "./pages/content.js";
import About from "./pages/about.js";
import Navbar from "./pages/navbar.js";

function App() {
  return (
    <div class='App-header'>
        <Navbar />
        <About />
        <Content />
    </div>
  );
}

export default App;
