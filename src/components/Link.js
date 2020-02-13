import React from 'react';

function Link(props) {
    return (
        <section>
            <a
                href={props.url}
                className={`link ${props.small ? 'small' : ''}`}
            >
                {props.text}
            </a>
        </section>
    );
}

export default Link