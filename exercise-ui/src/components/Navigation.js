import React from 'react';      // import React when creaeting component
import { Link } from 'react-router-dom'; // import Link


function Navigation() {

    return (
        <div>
            <nav className="nav">
                <ul>
                    <p><Link className="App-link" to="/">Home</Link></p>
                    <p><Link className="App-link" to="/add-exercise">Create Exercise</Link></p>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation