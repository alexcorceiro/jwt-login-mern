import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";


function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/user" element={<Welcome/>}/>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;