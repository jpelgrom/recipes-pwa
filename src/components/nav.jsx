import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        const { syncstate } = this.props;
        let syncStatus = null;
        if (syncstate.checked) {
            if (syncstate.event === "paused" || syncstate.event === "active") {
                syncStatus = <div className="sync-status">Verbonden</div>;
            } else if (syncstate.authenticated) {
                syncStatus = <div className="sync-status">Tijdelijk probleem</div>;
            } else {
                syncStatus = <div className="sync-status"><Link to="/login">Login</Link></div>
            }
        }

        return (
            <nav>
                <div className="nav-inner">
                    <h2><Link to="/">Recepten</Link></h2>
                    {syncStatus}
                </div>
            </nav>
        )
    }
}

export default Nav;