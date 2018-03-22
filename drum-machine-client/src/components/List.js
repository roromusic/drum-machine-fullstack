import React from 'react';
import {Link} from 'react-router-dom';

const List = props => {
    const { title, bpm, created, updated, id, userId } = props;
    const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const cd = new Date(created); 
    const createdDate = `${MONTH_NAMES[cd.getMonth()]} ${cd.getDate()}, ${cd.getFullYear()}`
    const ud = new Date(updated);
    const updatedDate = `${MONTH_NAMES[ud.getMonth()]} ${ud.getDate()}, ${ud.getFullYear()}`

    return (
        <div className="table_list table_row">
            <div className="table_title table_item">
            <Link to={"/users/" + userId + "/" + id} className="table_title-link">
                <span>{title}</span>
            </Link>
            </div>
            <div className="table_bpm table_item">{bpm}</div>
            <div className="table_created table_item">{createdDate}</div>
            <div className="table_updated table_item">{updatedDate}</div>
        </div>
    );
}

export default List;