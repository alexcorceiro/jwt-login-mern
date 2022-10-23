import React from 'react';
import "../styles/navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
        <nav className='nav'>
            <a href="/user" className='logo-nav'>pro-connect</a>
            <ul className='lu-nav'>
                <li>
                    <a className="a-nav" href="/">login</a>
                </li>
                <li>
                    <a className="a-nav" href="/signup">cree un compte</a>
                </li>
                <li>
                    <a className="a-nav" href="/login"><button>se deconnecter</button></a>
                </li>
            </ul>
        </nav>
      
    </div>
  )
}

export default Navbar
