import React from 'react';
import { Link } from 'react-router-dom';
import LogoSyncing from '../img/ic_sync.svg';
import LogoConnected from '../img/ic_cloud_done.svg';
import LogoDisconnected from '../img/ic_cloud_off.svg';

class Nav extends React.Component {
    render() {
        const { syncstate } = this.props;
        let syncStatus = null;
        if (syncstate.checked) {
            if (syncstate.event === "paused") {
                syncStatus = <div className="sync-status"><img src={LogoConnected} alt="Gesynchroniseerd" /> Verbonden</div>;
            } else if (syncstate.event === "active") {
                syncStatus = <div className="sync-status"><img src={LogoSyncing} alt="Actieve synchronisatie" /> Verbonden</div>;
            } else if (syncstate.authenticated) {
                syncStatus = <div className="sync-status"><img src={LogoDisconnected} alt="Niet gesynchroniseerd" /> Tijdelijk probleem</div>;
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