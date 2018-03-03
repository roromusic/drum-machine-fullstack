import React, { Component } from 'react';
import './Patterns.css';

class Patterns extends Component {
    constructor(props){
        super(props);
    }

    render() {
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
                        <div class="sample-name">crash</div>
                        <div class="sample-name">hi-hat</div>
                        <div class="sample-name">snare</div>
                        <div class="sample-name">kick</div>
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
                        <div class="sample" id="crash">
                            <div class="notes" data-instrument="crash">
                                <button class="note crash_0" data-partial="0" />
                                <button class="note crash_1" data-partial="1" />
                                <button class="note crash_2" data-partial="2" />
                                <button class="note crash_3" data-partial="3" />
                                <button class="note crash_4" data-partial="4" />
                                <button class="note crash_5" data-partial="5" />
                                <button class="note crash_6" data-partial="6" />
                                <button class="note crash_7" data-partial="7" />
                                <button class="note crash_8" data-partial="8" />
                                <button class="note crash_9" data-partial="9" />
                                <button class="note crash_10" data-partial="10" />
                                <button class="note crash_11" data-partial="11" />
                                <button class="note crash_12" data-partial="12" />
                                <button class="note crash_13" data-partial="13" />
                                <button class="note crash_14" data-partial="14" />
                                <button class="note crash_15" data-partial="15" />
                            </div>
                        </div>
                        <div class="sample" id="hihat">
                            <div class="notes" data-instrument="hihat">
                                <button class="note hihat_0" data-partial="0" />
                                <button class="note hihat_1" data-partial="1" />
                                <button class="note hihat_2" data-partial="2" />
                                <button class="note hihat_3" data-partial="3" />
                                <button class="note hihat_4" data-partial="4" />
                                <button class="note hihat_5" data-partial="5" />
                                <button class="note hihat_6" data-partial="6" />
                                <button class="note hihat_7" data-partial="7" />
                                <button class="note hihat_8" data-partial="8" />
                                <button class="note hihat_9" data-partial="9" />
                                <button class="note hihat_10" data-partial="10" />
                                <button class="note hihat_11" data-partial="11" />
                                <button class="note hihat_12" data-partial="12" />
                                <button class="note hihat_13" data-partial="13" />
                                <button class="note hihat_14" data-partial="14" />
                                <button class="note hihat_15" data-partial="15" />
                            </div>
                        </div>
                        <div class="sample" id="snare">
                            <div class="notes" data-instrument="snare">
                                <button class="note snare_0" data-partial="0" />
                                <button class="note snare_1" data-partial="1" />
                                <button class="note snare_2" data-partial="2" />
                                <button class="note snare_3" data-partial="3" />
                                <button class="note snare_4" data-partial="4" />
                                <button class="note snare_5" data-partial="5" />
                                <button class="note snare_6" data-partial="6" />
                                <button class="note snare_7" data-partial="7" />
                                <button class="note snare_8" data-partial="8" />
                                <button class="note snare_9" data-partial="9" />
                                <button class="note snare_10" data-partial="10" />
                                <button class="note snare_11" data-partial="11" />
                                <button class="note snare_12" data-partial="12" />
                                <button class="note snare_13" data-partial="13" />
                                <button class="note snare_14" data-partial="14" />
                                <button class="note snare_15" data-partial="15" />
                            </div>
                        </div>
                        <div class="sample" id="kick">
                            <div class="notes" data-instrument="kick">
                                <button class="note kick_0" data-partial="0" />
                                <button class="note kick_1" data-partial="1" />
                                <button class="note kick_2" data-partial="2" />
                                <button class="note kick_3" data-partial="3" />
                                <button class="note kick_4" data-partial="4" />
                                <button class="note kick_5" data-partial="5" />
                                <button class="note kick_6" data-partial="6" />
                                <button class="note kick_7" data-partial="7" />
                                <button class="note kick_8" data-partial="8" />
                                <button class="note kick_9" data-partial="9" />
                                <button class="note kick_10" data-partial="10" />
                                <button class="note kick_11" data-partial="11" />
                                <button class="note kick_12" data-partial="12" />
                                <button class="note kick_13" data-partial="13" />
                                <button class="note kick_14" data-partial="14" />
                                <button class="note kick_15" data-partial="15" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Patterns;