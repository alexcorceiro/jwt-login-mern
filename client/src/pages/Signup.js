import React, {useState}from 'react';
import "../styles/register.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";



function Signup() {
    const [inputs, setInputs ] = useState({
        name:"",
        email: "",
        password: "",
        confirmpassword: ""  
    });
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

     const handleValidation = () => {
    const { password, confirmPassword, username, email } = inputs;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

    const handlesumit = (e) => {
      e.preventDefault()
      handleValidation()
      sendResquest().then(() => navigate("/"))
    }

    const sendResquest = async() => {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    }
  
    const handleChange = (e) => {
     setInputs(prev => ({
      ...prev,[e.target.name]:e.target.value
     }))
  
    }

    const navigate = useNavigate()
  return (
    <div className='page-register'>
      <div className='register'>
        <form className='from-register' onSubmit={handlesumit}>
            <h2>cree un compte</h2>
            <input className="input-register" 
            value={inputs.name} placeholder='utilisateur' name="name" onChange={handleChange}/>
            <input className="input-register" 
            value={inputs.email} placeholder='email' type="email" name= "email" onChange={handleChange}/>
            <input className="input-register" 
            value={inputs.password} placeholder='mot de passe' type="password" name="password" onChange={handleChange}/>
            <input className="input-register"  placeholder='comfirmer le mot de passe' type="password" name="confirmpassword" onChange={handleChange}/>
            <button className="btn-register"  type='submit'>enregistrer</button>
            <span className='span-register'>vous avez pas de compte :  <br/>
            <Link to="/">se connecter</Link></span>
        </form>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Signup
