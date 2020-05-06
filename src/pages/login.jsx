import React from 'react';

class LoginPage extends React.Component {
    async goLogin(form) {
        const { db } = this.props;

        try {
            const res = await db.loginToRemote(form.username.value, form.password.value);
            console.log("login returned", res);
            this.props.startsync();
            this.props.history.replace("/");
        } catch (err) {
            console.error(err);
            alert("Er ging iets niet goed bij het inloggen.");
        }
    }

    componentDidMount() {
        if (this.props.syncstate.checked && this.props.syncstate.success) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => { e.preventDefault(); this.goLogin(e.target); }}>
                    <div className="form-group">
                        <label>Gebruikersnaam</label>
                        <input type="text" name="username" required />
                    </div>

                    <div className="form-group">
                        <label>Wachtwoord</label>
                        <input type="password" name="password" required />
                    </div>
                    <button>Inloggen</button>
                </form>
            </div>
        )
    }
}

export default LoginPage;