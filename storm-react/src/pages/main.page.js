import React, { useState, useEffect } from 'react';

function Main() {
    const [vidsList, setVidsList] = useState([])

    return (
        <div className="wrapper">
            <nav>
                <a href="./index.html"><img src="./img/logo.png" id="logo" alt="Stormy Drive Logo"></img></a>
                <button id="search">
                    <i class="fas fa-search"></i>
                </button>
            </nav>
            
            <h2>LIVE STREAM IN YOUR AREA</h2>
        
            <section class="featuredStream">
                <iframe width="90%" height="345" src="https://www.youtube.com/embed/6tyFAtgy4JA">
                </iframe>
            </section>
            
            <h2>LIVE STREAMS AROUND THE WORLD</h2>
            
            <section class="streams">
                <iframe width="80%" height="345" src="https://www.youtube.com/embed/svR_pijHljw">
                </iframe>
                <iframe width="80%" height="345" src="https://www.youtube.com/embed/4xWDtN6nIlE">
                </iframe>
            </section>
        
            <footer>
                
            </footer>
        </div>
    )
}

export default Main