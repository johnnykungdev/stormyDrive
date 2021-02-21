import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import classes from './main.module.scss'

import Logo from './logo.png'

function Main() {
    const [vidsList, setVidsList] = useState([])

    return (
        <div className="wrapper">
            <nav>
                <a href="./index.html"><img src={Logo} id={classes.logo} alt="Stormy Drive Logo"></img></a>
                <button id="search">
                    <i className="fas fa-search"></i>
                </button>
            </nav>
            
            <h2>LIVE STREAM IN YOUR AREA</h2>
        
            <section className={classes.featuredStream}>
                <Link to="/video?v_id=6tyFAtgy4JA">
                    <iframe width="90%" height="345" src="https://www.youtube.com/embed/6tyFAtgy4JA" title="vancouver"></iframe>
                </Link>
                
            </section>
            
            <h2>LIVE STREAMS AROUND THE WORLD</h2>
            
            <section className={classes.streams}>
                <Link to="/video?v_id=svR_pijHljw">
                    <iframe width="80%" height="345" src="https://www.youtube.com/embed/svR_pijHljw" title="spain">
                    </iframe>
                </Link>
                <Link to="/video?v_id=4xWDtN6nIlE">
                    <iframe width="80%" height="345" src="https://www.youtube.com/embed/4xWDtN6nIlE" title="whatever"></iframe>
                </Link>
            </section>
        
            <footer>
                
            </footer>
        </div>
    )
}

export default Main