import React from 'react';

export default function Cross(props) {
    return (
        <button
            className={`cross cross--${props.color} cross--${props.id}`}
            disabled={props.color}
            onClick={e => props.click(props.id, e)} />
    )
} 
