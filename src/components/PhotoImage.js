import React from 'react';

function PhotoImage(props) {
    return (
        <img src={props.src} alt={props.title} title={props.title}/>
    );
}

export default PhotoImage