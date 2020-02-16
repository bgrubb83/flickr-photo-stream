import React from 'react';
import Link from './Link';
import TextContent from './TextContent';
import PhotoTagBox from './PhotoTagBox';

function PhotoDetails({ photo }) {
    return (
        <section className="photo-details">
            <Link url={photo.imageURL} text={photo.title} />
            <Link url={photo.ownerURL} text={photo.ownername} small />
            <TextContent
                text={photo.strippedText}
            />
            <br />
            <PhotoTagBox tags={photo.tags.split(" ")} />
        </section>
    );

}

export default PhotoDetails