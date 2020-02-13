import React from 'react';
import PhotoImage from './PhotoImage';
import PhotoDetails from './PhotoDetails';

function PhotoFrame(props) {
    return (
        <section className="photo-frame">
            <PhotoImage
                src={props.photo.src}
                title={props.photo.title}
            />
            <PhotoDetails photo={props.photo}/>
        </section>
    );
}

export default PhotoFrame;