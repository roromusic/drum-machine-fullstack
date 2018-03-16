import React, { Component } from 'react';
import './Patterns.css';
import Grid from './Grid';

class Patterns extends Component {

    render() {

        let {
            pattern,
            instruments,
            beat,
            displayedPattern,
            updatePattern,
            switchPattern,
            newPattern,
            playing
        } = this.props;

        if(!pattern){
            pattern = new Map(newPattern());
        }

        const sampleName = instruments.map(item => {
            if(item[0] !== "cowbell"){
                return <div key={item[0]} className="sample-name">{item[0]}</div>
            }
        });

        const grid = instruments.map(item => {
            if(item[0] !== "cowbell"){
                return <Grid key={item[0]} instrument={item[0]} pattern={pattern} updatePattern={updatePattern} playing={playing}/>
            }
        });

        return (
            <div className="patterns">
                <div className="patterns_patterns" onClick={(e) => {
                    if(e.target.getAttribute('data-pattern') && !playing){
                        switchPattern(e.target.getAttribute('data-pattern'))
                    }
                }}>
                    <button className={`patterns_pattern patterns_pattern1 ${displayedPattern == 1 ? 'patterns_pattern-selected' : ''}`} data-pattern='1'>1</button>
                    <button className={`patterns_pattern patterns_pattern1 ${displayedPattern == 2 ? 'patterns_pattern-selected' : ''}`} data-pattern='2'>2</button>
                    <button className={`patterns_pattern patterns_pattern1 ${displayedPattern == 3 ? 'patterns_pattern-selected' : ''}`} data-pattern='3'>3</button>
                    <button className={`patterns_pattern patterns_pattern1 ${displayedPattern == 4 ? 'patterns_pattern-selected' : ''}`} data-pattern='4'>4</button>
                </div>
                <div className="patterns_instruments">
                    <div className="patterns_instrument-names">
                        {sampleName}
                    </div>
                    <div className="patterns_grid">
                        <div className="bars">
                            <div className={`bars_measure bars_measure1 ${beat === 1 ? 'bars_measure-selected' : ''}`}>1</div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className={`bars_measure bars_measure1 ${beat === 2 ? 'bars_measure-selected' : ''}`}>2</div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className={`bars_measure bars_measure1 ${beat === 3 ? 'bars_measure-selected' : ''}`}>3</div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className={`bars_measure bars_measure1 ${beat === 4 ? 'bars_measure-selected' : ''}`}>4</div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                            <div className="bars_measure"></div>
                        </div>
                        {grid}
                    </div>
                </div>
            </div>
        )
    }
}

export default Patterns;