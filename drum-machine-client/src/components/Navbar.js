import React from 'react';
import {Link} from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import'./Navbar.css';

const googleStyle = {
    backgroundColor: "black",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer"
}

const Navbar = props => {
    const {user, onSignIn, onLogOut} = props;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                        <span>Drum Machine</span>
                    </Link>
                </div>
                
                <div className="navbar-right">
                    <div className="navbar-button">
                        <Link to="/new" className="navbar-create">
                            <span>Create</span>
                        </Link>
                    </div>
                    
                    {
                    !user ?
                    <div className="navbar-login_logout">
                        <GoogleLogin
                            style={googleStyle}
                            clientId="335931452532-9vnftvee7t5vt875ojccu92jkgbu7ndf.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={(response) => onSignIn(response.getAuthResponse().id_token)}
                            isSignedIn={true}
                        />
                    </div>
                    :
                    <div className="navbar-right-logged-in">
                        <div className="navbar-profile">
                            <Link to="/dashboard" className="navbar-picture">
                                <img src={user.profileImageUrl} alt="profile pic"/>
                            </Link>
                        </div>
                        <div className="navbar-login_logout">
                            <GoogleLogout
                                style={googleStyle}
                                buttonText="Logout"
                                onLogoutSuccess={() => onLogOut()}
                            />
                        </div>
                    </div>
                    }
                </div>
                
            </div>
        </nav>
    );
}

export default Navbar;