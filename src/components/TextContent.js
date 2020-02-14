import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis'

function TextContent(props) {
    return (
        <section className="text-content">
            <LinesEllipsis
                text={props.text}
                maxLine='1'
                ellipsis='...'
                trimRight
                basedOn='letters'
            />
        </section>
    );
}

export default TextContent