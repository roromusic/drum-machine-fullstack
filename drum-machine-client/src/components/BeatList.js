import React from 'react';
import {Link} from 'react-router-dom';
import './BeatList.css';

import Beat from './Beat';

const BeatList = props => {
    const { beats, displayName, userId } = props;
    const list = beats.map(beat => {
        return <li key={beat._id}>
            <Beat 
                title={beat.title}
                bpm={beat.bpm}
                created={beat.createdAt}
                updated={beat.updatedAt}
                id={beat._id}
                userId={userId}
            />
        </li>
    })

    console.log(beats);

    return (
        <div className="beat-list">
            <div className="beat-list_user">
                <span>by </span>
                <Link to={"/users/" + userId} className="beat-list_user-link">
                    <span>{displayName}</span>
                </Link>
            </div>
            <div className="table">
                <div className="table_labels table_row">
                    <div className="table_title table_item">Title</div>
                    <div className="table_bpm table_item">BPM</div>
                    <div className="table_created table_item">Created</div>
                    <div className="table_updated table_item">Last Updated</div>
                </div>
                <ul className="table_beats">
                {list}
                </ul>
            </div>
        </div>
    );
}

export default BeatList;