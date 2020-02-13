import React from 'react';

function TextContent(props) {
    return(
        <section className="text-content">
            {props.text}
        </section>
    );
}

export default TextContent