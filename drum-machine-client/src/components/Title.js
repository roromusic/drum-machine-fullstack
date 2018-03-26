import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Title.css';

class Title extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editingTitle: false,
            newTitle: ""
        }

        this.changeTitle = this.changeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    changeTitle() {
        if (this.props.editable) {
            this.setState((prevState) => {
                return { editingTitle: !prevState.editingTitle, newTitle: this.props.title }
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.changeTitle();
        if(this.state.newTitle){
            this.props.updateBeat({title: this.state.newTitle});
        }
    }

    handleChange(e) {
        this.setState({newTitle: e.target.value})
    }

    handleBlur() {
        this.changeTitle();
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
                {
                !this.state.editingTitle ?

                <div className={editable ? "title-header title-header_editable" : "title-header"} onClick={this.changeTitle} >
                    {title}
                </div>
                :
                <div className="title-input">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.newTitle} onChange={this.handleChange} onBlur={this.handleBlur} autoFocus />
                    </form>
                </div>
                }
                <div className="title-author">
                    <Link to={"/users/" + id} className="title-displayName" onClick={e =>{if(displayName === "Please Log In") e.preventDefault()}}>
                        <span>{displayName}</span>
                    </Link>
                </div>

            </div>
        )
    }
}

export default Title;