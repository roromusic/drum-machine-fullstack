import React from 'react';

function Grid(props) {

    let grid = [];
    props.pattern.forEach((instrumentArr, partial) => {
        instrumentArr.forEach(instrument => {
            if (instrument === props.instrument) {
                grid.push(<button key={partial} className="note note-play" data-partial={partial} />)
            }
        })
        if(!grid[Number(partial)]) grid.push(<button key={partial} className="note" data-partial={partial} />)
        
    })
    return (
        <div className="sample" onClick={(e) => {
            if(e.target.getAttribute('data-partial') !== null && !props.playing){
                props.updatePattern(e.target.parentNode.getAttribute('data-instrument'), Number(e.target.getAttribute('data-partial')))
            }
        }}>
            <div className="notes" data-instrument={props.instrument}>
                {grid}
                
            </div>
        </div>
    )
}

export default Grid