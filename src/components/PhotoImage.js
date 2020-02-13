import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function PhotoImage(props) {
    return (
        <LazyLoadImage
            alt={props.title}
            title={props.title}
            src={props.src}
            effect="opacity"
            width="100%"
        />
    );
}

export default PhotoImage