import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
    
    render() {

        return (
            <div class="controls">
                <div class="controls_left">
                    <div class="play-stop">
                        <button id="play" class="play-stop_button">
                            <div class="play_button"></div>
                        </button>
                        <button id="stop" class="play-stop_button">
                            <div class="stop_button"></div>
                        </button>
                    </div>
                    <div class="metronome">
                        <input class="metronome_checkbox" type="checkbox" checked />
                        <label for="metronome_checkbox">metronome</label>
                    </div>
                </div>

                <div class="display">
                    <div class="measure">
                        <div class="measure_number">
                            <div class="measure_measure">1</div>
                            <div class="measure_beat">1</div>
                        </div>
                        <div class="measure_title">Measure</div>
                    </div>
                    <div class="bpm">
                        <input class="bpm_input" type="number" min="60" max='200' value="60" />
                        <label for="bpm_input">BPM</label>
                    </div>

                </div>
            </div>
        );
    }
};

export default Controls;