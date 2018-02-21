import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Interface from './Interface';

class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLatest();
    }

    render() {

        return (
            <div className="homepage">
                <header className="homepage-header"
                        style={{
                            fontWeight: '700',
                            fontSize: '36px',
                            color: 'white',
                            borderBottom: '6px solid #47cf73'
                        }}
                >
                    <span>Latest Beat</span>
                </header>
                <Interface />
            </div>
        )
    }
};

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getLatest() {dispatch(actions.getLatest())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);