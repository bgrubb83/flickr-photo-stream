import React from 'react';
// import LinesEllipsis from 'react-lines-ellipsis'

function Link(props) {
    return (
        <section>
            <a
                href={props.url}
                className={`link ${props.small ? 'small' : ''}`}
            >
                {/* <LinesEllipsis
                    text={props.text}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                /> */}
                {props.text}
            </a>
        </section>
    );
}

export default Link