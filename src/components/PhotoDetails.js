import React from 'react';
import Link from './Link';
import TextContent from './TextContent';

function PhotoDetails({ photo }) {
    return (
        <section className="photo-details">
            <Link url={photo.imageURL} text={photo.title}/>
            <Link url={photo.ownerURL} text={photo.ownername} small/>

            {/* <a href={photo.imageURL}>{photo.title}</a><br /> */}
            {/* <a href={photo.ownerURL}>{photo.ownername}</a><br /> */}
            {/* {photo.description._content}<br /> */}
            <TextContent
                text={photo.strippedText}
            />
            <br />
            {/* {photo.tags} */}
        </section>
    );

}

export default PhotoDetails