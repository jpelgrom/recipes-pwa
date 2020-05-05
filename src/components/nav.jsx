import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <h2><Link to="/">Recepten</Link></h2>
            </nav>
        )
    }
}

export default Nav;