import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Title.css';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            title,
            displayName,
            id,
            editable
        } = this.props;

        return (
            <div className="title">
                <div className="title-header">{title}</div>
                <div className="title-author">
                    <Link to={"/users/" + id} className="title-displayName">
                        <span>{displayName}</span>
                    </Link>
                </div>

            </div>
        )
    }
}

export default Title;