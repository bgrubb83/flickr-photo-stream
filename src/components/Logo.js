import React from 'react';

function Logo(props) {
    return (
    <h1><span className="blue">{`${props.logoName}`} </span>{`${props.logoText}`}</h1>
    );
}

export default Logo