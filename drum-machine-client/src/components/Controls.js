import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
    constructor(props){
        super(props);
        this.state = {
            bpm: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.incrementBPM = this.incrementBPM.bind(this);
        this.decrementBPM = this.decrementBPM.bind(this);
    }

    updateStore(newData) {
        this.props.updateBeat(newData);
    }

    handleChange(event) {
        event.persist();
        this.setState(prevState => {
            return {
                bpm: Number(event.target.value)
            }
        })
    }

    handleBlur() {
        if(this.state.bpm < 60){
            this.setState(() => ({bpm: 60}))
            this.updateStore({bpm: 60})
        } 
        else if(this.state.bpm > 200){
            this.setState(()=> ({bpm: 200}))
            this.updateStore({bpm: 200})
        } 
        else this.updateStore({bpm: this.state.bpm})
    }

    incrementBPM(){
        if(this.state.bpm === null){
            this.setState(() => ({bpm: this.props.bpm === 200 ? 200 : this.props.bpm + 1}))
            if(this.props.bpm < 200){
                this.updateStore({bpm: this.props.bpm + 1})
            }
        }else {
            this.setState(prevState => {
                return {
                    bpm: prevState.bpm === 200 ? 200 : prevState.bpm + 1
                }
            })
            if(this.state.bpm < 200){
                this.updateStore({bpm: this.state.bpm + 1})
            }
        }
    }

    decrementBPM(){
        if(this.state.bpm === null){
            this.setState(() => ({bpm: this.props.bpm === 60 ? 60 : this.props.bpm - 1}))
            if(this.props.bpm > 60){
                this.updateStore({bpm: this.props.bpm - 1})
            }
        }else {
            this.setState(prevState => {
                return {
                    bpm: prevState.bpm === 60 ? 60 : prevState.bpm - 1
                }
            })
            if(this.state.bpm > 60){
                this.updateStore({bpm: this.state.bpm - 1})
            }
        }
    }

    render() {
        const {
            bpm
        } = this.props;

        return (
            <div className="controls">
                <div className="controls_left">
                    <div className="play-stop">
                        <button id="play" className="play-stop_button">
                            <div className="play_button"></div>
                        </button>
                        <button id="stop" className="play-stop_button">
                            <div className="stop_button"></div>
                        </button>
                    </div>
                    <div className="metronome">
                        <input className="metronome_checkbox" type="checkbox" checked />
                        <label for="metronome_checkbox">metronome</label>
                    </div>
                </div>

                <div className="display">
                    <div className="measure">
                        <div className="measure_number">
                            <div className="measure_measure">1</div>
                            <div className="measure_beat">1</div>
                        </div>
                        <div className="measure_title">Measure</div>
                    </div>
                    <div className="bpm">
                        <div className="bpm_display">
                            <input className="bpm_input" type="number" min="60" value={this.state.bpm || bpm} onChange={this.handleChange} onBlur={this.handleBlur}/>
                            <label for="bpm_input">BPM</label>
                        </div>
                        <div className="bpm_change">
                            <div className="bpm_plus" onClick={this.incrementBPM}>
                                <span>+</span>
                            </div>
                            <div className="bpm_minus" onClick={this.decrementBPM}>
                                <span>-</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
};

export default Controls;