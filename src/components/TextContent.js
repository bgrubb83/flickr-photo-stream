import React from 'react';

function TextContent(props) {
    return (
        <React.Fragment>
            <section className="text-content">
                {props.text}
            </section>
            <section className="fade-end" />
        </React.Fragment>
    );
}

export default TextContent