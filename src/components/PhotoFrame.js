import React from 'react';
import PhotoImage from './PhotoImage';

function PhotoFrame(props) {
    return (
        <section className="photo-frame">
            <PhotoImage
                src={props.photo.src}
                title={props.photo.title}
            />
        </section>
    );
}

export default PhotoFrame;