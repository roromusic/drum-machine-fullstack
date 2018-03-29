import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Title from '../components/Title';
import Controls from '../components/Controls';
import Patterns from '../components/Patterns';

const files = [
    ["cowbell", "https://freesound.org/data/previews/34/34272_304419-lq.mp3"],
    ["crash", "https://freesound.org/data/previews/13/13244_36719-lq.mp3"],
    ["hi-hat", "https://freesound.org/data/previews/140/140514_177850-lq.mp3"],
    ["snare", "https://freesound.org/data/previews/13/13750_32468-lq.mp3"],
    ["kick", "https://freesound.org/data/previews/132/132584_2409787-lq.mp3"]
]

class Interface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            beat: 1,
            metronomeOn: true,
            playing: false,
            displayedPattern: 1
        }

        this.getBuffer = this.getBuffer.bind(this);
        this.setup = this.setup.bind(this);
        this.toggleMet = this.toggleMet.bind(this);
        this.playSample = this.playSample.bind(this);
        this.playBeat = this.playBeat.bind(this);
        this.stop = this.stop.bind(this);
        this.showBeat = this.showBeat.bind(this);
        this.updatePattern = this.updatePattern.bind(this);
        this.switchPattern = this.switchPattern.bind(this);
    }

    componentDidMount(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.setValueAtTime(0.8, this.audioContext.currentTime);
        this.metGain = this.audioContext.createGain();
        this.metGain.connect(this.audioContext.destination);
        this.metGain.gain.setValueAtTime(0.8, this.audioContext.currentTime);

        this.instruments = new Map();
        files.forEach(file => this.getBuffer(file[1], file[0]));

        this.scheduledPlays = [];
        this.beatsLeft = 0;
        this.nextRepeatPoint = undefined;
        this.animationFrame = null;
        this.animationRequest = null;
    }

    componentWillUnmount(){
        this.audioContext.close();
        this.props.updateBeat({editable: false});
        this.props.emptyBeat();
    }

    async getBuffer(file, instrument) {
        const promise = await fetch(file);
        const data = await promise.arrayBuffer();
        const buffer = await this.audioContext.decodeAudioData(data).then(function (decodedData) {
            return decodedData
        });

        this.instruments.set(instrument, buffer);
    }

    setup(instrument) {
        let sourceNode = this.audioContext.createBufferSource();
        sourceNode.buffer = this.instruments.get(instrument);
        sourceNode.connect(instrument === "cowbell" ? this.metGain : this.gainNode);

        if (instrument === "cowbell") {
            this.beatsLeft += 1;

            sourceNode.onended = () => {
                this.beatsLeft -= 1;
                if (this.state.playing === true && this.beatsLeft === 3) {
                    this.playBeat()
                }
            }
        }

        this.scheduledPlays.push(sourceNode);

        return sourceNode;
    }

    toggleMet(e){
        const ct = this.audioContext.currentTime + 0.05;

        e.target.checked ? this.metGain.gain.exponentialRampToValueAtTime(.8, ct) :
                           this.metGain.gain.exponentialRampToValueAtTime(.001, ct);

        this.setState(prevState => {
            return {
                metronomeOn: !prevState.metronomeOn
            }
        })
    }

    playSample(time, instrument) {
        let sourceNode = this.setup(instrument);
        sourceNode.start(time);
    }

    playBeat() {
        const bpm = (60 / this.props.bpm);
        const sixteenth = (bpm / 4);
        const currentTime = this.nextRepeatPoint === undefined ? this.audioContext.currentTime : this.nextRepeatPoint;
        const patterns = this.props.pattern.map(item => new Map(item));

        this.setState((prevState) => {
            return {
                playing: true,
                displayedPattern: prevState.playing ? prevState.displayedPattern : 1
            }
        })

        patterns.forEach((pattern, index) => {
            pattern.forEach((instrumentArr, partial) => {
                if (instrumentArr.length !== 0) {
                    instrumentArr.forEach(instrument => {
                        this.playSample(currentTime + (sixteenth * partial) + (bpm * 4 * index), instrument);
                    })
                }
            })
        })

        this.nextRepeatPoint = currentTime + (bpm * 4 * patterns.length);
    }

    stop() {
        const ct = this.audioContext.currentTime + 0.1;
        this.gainNode.gain.exponentialRampToValueAtTime(.01, ct);

        this.scheduledPlays.forEach(node => node.stop());

        this.setState(() => {
            return {
                playing: false,
                beat: 1
            }
        });

        this.nextRepeatPoint = undefined;
        this.gainNode.gain.setValueAtTime(0.8, ct);

        window.cancelAnimationFrame(this.animationRequest);
        this.animationFrame = null;
    }

    showBeat(timestamp) {
        if(!this.animationFrame) this.animationFrame = timestamp;
        let progress = timestamp - this.animationFrame;

        if(progress > (60 / this.props.bpm) * 1000) {
            this.setState((prevState) => ({beat: (prevState.beat === 4 ? 1 : prevState.beat + 1)}));
            this.animationFrame += (60 / this.props.bpm) * 1000;

            if(this.state.beat === 1) {
                this.setState((prevState) => ({displayedPattern: (this.props.pattern.length > prevState.displayedPattern ? prevState.displayedPattern + 1 : 1)}))
            }
        }

        this.animationRequest = window.requestAnimationFrame(this.showBeat);
    }

    updateBeat(newData) {
        this.props.updateBeat(newData);
    }

    updatePattern(instrument, partial) {
        let wholePattern = this.props.pattern.concat();
        if(wholePattern.length < this.state.displayedPattern){
            for(var i=0, times=this.state.displayedPattern - wholePattern.length; i < times; i++){
                wholePattern.push(this.newPattern())
            }
        }
        let pattern = new Map(wholePattern[this.state.displayedPattern - 1]);
        let partialInstruments = pattern.get(partial);
        if (!partialInstruments.includes(instrument)) {
            partialInstruments.push(instrument);
            pattern.set(partial, partialInstruments);
        } else {
            pattern.set(partial, partialInstruments.filter(item => item !== instrument));
        }

        wholePattern[this.state.displayedPattern - 1] = Array.from(pattern);

        this.updateBeat({pattern: wholePattern});

        this.playSample(this.audioContext.currentTime, instrument);
    }

    switchPattern(pattern) {
        this.setState(() => ({displayedPattern: Number(pattern)}));
    }

    newPattern() {
        return [
          [0, ["cowbell"]],
          [1, []],
          [2, []],
          [3, []],
          [4, ["cowbell"]],
          [5, []],
          [6, []],
          [7, []],
          [8, ["cowbell"]],
          [9, []],
          [10, []],
          [11, []],
          [12, ["cowbell"]],
          [13, []],
          [14, []],
          [15, []],
        ];
      }

    render() {
        const {
            title,
            bpm,
            displayName,
            id,
            editable,
            pattern = [this.newPattern()]
        } = this.props;

        const mappedPattern = pattern.map(item => new Map(item));

        return (
            <div>
                <Title
                    title={title}
                    displayName={displayName}
                    id={id}
                    editable={editable}
                    updateBeat={this.props.updateBeat}
                />
                <Controls 
                    playBeat={this.playBeat}
                    stop={this.stop}
                    toggleMet={this.toggleMet}
                    showBeat={this.showBeat}
                    displayedPattern={this.state.displayedPattern}
                    updateBeat={this.props.updateBeat}
                    metronomeOn={this.state.metronomeOn}
                    bpm={bpm}
                    beat={this.state.beat}
                    playing={this.state.playing}
                />
                <Patterns
                    pattern={mappedPattern[this.state.displayedPattern - 1]}
                    instruments={files}
                    updatePattern={this.updatePattern}
                    switchPattern={this.switchPattern}
                    beat={this.state.beat}
                    displayedPattern={this.state.displayedPattern}
                    newPattern={this.newPattern}
                    playing={this.state.playing}
                />
            </div>
        )
    }
};

const mapStateToProps = state => ({
    title: state.currentBeat.title,
    bpm: state.currentBeat.bpm,
    pattern: state.currentBeat.pattern,
    displayName: state.currentBeat.userId.displayName,
    id: state.currentBeat.userId._id,
    editable: state.currentBeat.editable
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateBeat(newData) {dispatch(actions.updateBeat(newData))},
    emptyBeat() {dispatch(actions.emptyBeat())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Interface);