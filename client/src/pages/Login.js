import React, {useState} from 'react';
import "../styles/login.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email:"",
    password:"",
  })
  const handleChange = (e) => {
    setInputs(prev => ({
      ...prev,[e.target.name]:e.target.value
     }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendResquest().then(() => navigate("/user"))
  }
  const sendResquest = async() => {
    const res = await axios.post("http://localhost:5000/api/login", {
      email: inputs.email,
      password: inputs.password,
    })
    .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  return (
    <div className="page-Login">
  <div className='Login'>
    <form className="from-Login" onSubmit={handleSubmit}>
    <h2>connecter vous !!!</h2>
        <input className="input-login"
        placeholder='email' value={inputs.email} onChange={handleChange}
        type="email" name= "email"/>
        <input 
        className="input-login" value={inputs.password} onChange={handleChange}
        placeholder='mot de passe' 
        type="password" name="password" />
        <button className="btn-login" type="submit">enregistrer</button>
        <span className='span-login'>vous avez pas de compte :  <br/>
        <Link to="/signup">cree un compte</Link></span>
    </form>
  </div>
</div>
  )
}

export default Login
