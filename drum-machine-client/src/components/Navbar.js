import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import './Navbar.css';

const googleStyle = {
    backgroundColor: "black",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer"
}

const Navbar = props => {
    const {user, onSignIn, onLogOut, editable, onSave, saveStatus, displayResult, onCreate, onDelete} = props;
    let message;

    switch(saveStatus){
        case "SUCCESS":
            message = "Save Successful!";
            break;
        case "FAILED":
            message = user ? "Operation failed. Try again later." : "Please log in...";
            break;
        case "DUPLICATE":
            message = "You already have that title.";
            break;
        case "PENDING":
            message = "Saving....please wait.";
            break;
        case "DELETING":
            message = "Deletion in progress";
            break;
        case "DELETED":
            message = "Delete successful";
            break;
        default:
            break;
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                        <span>Drum Machine</span>
                    </Link>
                </div>
                <div className="navbar-result">
                    <span className={"navbar-message" + (displayResult ? " navbar-message_show" : "")}> {message} </span>
                </div>
                
                <div className="navbar-right">
                    <div className={editable && /\/users\/\w+\/\w+/.test(props.location.pathname) ? "navbar-button navbar-delete" : "navbar-hide"} onClick={saveStatus !== "DELETING" ? onDelete : undefined}>
                        <span>{saveStatus !== "DELETING" ? "Delete" : "Deleting"}</span>
                    </div>
                    <div className={!editable ? "navbar-hide" : "navbar-button navbar-save"} onClick={saveStatus !== "PENDING" && props.location.pathname !== "/create" ? onSave : onCreate}>
                        <span>{saveStatus !== "PENDING" ? "Save" : "Saving"}</span>
                    </div>
                    <div className={props.location.pathname !== "/create" ? "navbar-button" : "navbar-hide"}>
                        <Link to="/create" className="navbar-create">
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
                            <Link to={"/users/" + user.id} className="navbar-picture">
                                <img src={user.profileImageUrl} alt="profile pic"/>
                            </Link>
                        </div>
                        <div className="navbar-login_logout">
                            <GoogleLogout
                                style={googleStyle}
                                buttonText="Logout"
                                onLogoutSuccess={() => {
                                    onLogOut();
                                    window.location.reload();
                                }}
                            />
                        </div>
                    </div>
                    }
                </div>
                
            </div>
        </nav>
    );
}

export default withRouter(Navbar);