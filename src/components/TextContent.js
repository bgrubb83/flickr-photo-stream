import React from 'react';
// import LinesEllipsis from 'react-lines-ellipsis'

function TextContent(props) {
    return (
        <React.Fragment>
            <section className="text-content">
                {/* <LinesEllipsis
                text={props.text}
                maxLine='5'
                ellipsis='...'
                trimRight
                basedOn='letters'
            /> */}
                {props.text}
            </section>
            <section className="fade-end" />
        </React.Fragment>
    );
}

export default TextContent