import React from 'react';

function Grid(props) {
    return (
        <div className="sample" onClick={(e) => console.log(e.target)}>
            <div className="notes" data-instrument={props.instrument}>
                <button class="note" data-partial="0" />
                <button class="note" data-partial="1" />
                <button class="note" data-partial="2" />
                <button class="note" data-partial="3" />
                <button class="note" data-partial="4" />
                <button class="note" data-partial="5" />
                <button class="note" data-partial="6" />
                <button class="note" data-partial="7" />
                <button class="note" data-partial="8" />
                <button class="note" data-partial="9" />
                <button class="note" data-partial="10" />
                <button class="note" data-partial="11" />
                <button class="note" data-partial="12" />
                <button class="note" data-partial="13" />
                <button class="note" data-partial="14" />
                <button class="note" data-partial="15" />
            </div>
        </div>
    )
}

export default Grid