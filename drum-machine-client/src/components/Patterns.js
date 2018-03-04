import React, { Component } from 'react';
import './Patterns.css';
import Grid from './Grid';

class Patterns extends Component {
    constructor(props){
        super(props);
    }

    render() {

        const {
            instruments
        } = this.props;

        const sampleName = instruments.map(item => {
            if(item[0] !== "cowbell"){
                return <div className="sample-name">{item[0]}</div>
            }
        });

        const grid = instruments.map(item => {
            if(item[0] !== "cowbell"){
                return <Grid instrument={item[0]} />
            }
        });

        return (
            <div class="patterns">
                <div class="patterns_patterns">
                    <button class="patterns_pattern patterns_pattern1 patterns_pattern-selected" data-pattern='1'>1</button>
                    <button class="patterns_pattern patterns_pattern2" data-pattern='2'>2</button>
                    <button class="patterns_pattern patterns_pattern3" data-pattern='3'>3</button>
                    <button class="patterns_pattern patterns_pattern4" data-pattern='4'>4</button>
                </div>
                <div class="patterns_instruments">
                    <div class="patterns_instrument-names">
                        {sampleName}
                    </div>
                    <div class="patterns_grid">
                        <div class="bars">
                            <div class="bars_measure bars_measure1">1</div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure bars_measure2">2</div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure bars_measure3">3</div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure bars_measure4">4</div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                            <div class="bars_measure"></div>
                        </div>
                        {grid}
                    </div>
                </div>
            </div>
        )
    }
}

export default Patterns;