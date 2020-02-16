import React from 'react';

function Logo(props) {
    return (
        <h1><span className="highlight" onClick={props.refresh}>{`${props.logoName}`} </span>{`${props.logoText}`}</h1>
    );
}

export default Logo