'use strict';
import React from 'react';      // import React when creaeting component
import { Link } from 'react-router-dom'; // import Link


function Navigation() {

    return (
        <div>
            <nav class="nav">
                <ul>
                    <li><Link className="App-link" to="/">Home</Link></li>
                    <li><Link className="App-link" to="/add-exercise">Create Exercise</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation