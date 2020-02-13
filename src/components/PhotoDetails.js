import React from 'react';
import Link from './Link';
import TextContent from './TextContent';

function PhotoDetails({ photo }) {
    return (
        <section className="photo-details">
            <Link href={photo.imageURL} text={photo.title}/>
            <Link href={photo.ownerURL} text={photo.ownername} small/>

            {/* <a href={photo.imageURL}>{photo.title}</a><br /> */}
            {/* <a href={photo.ownerURL}>{photo.ownername}</a><br /> */}
            {/* {photo.description._content}<br /> */}
            <TextContent
                text={photo.description._content}
            />
            <br />
            {/* {photo.tags} */}
        </section>
    );

}

export default PhotoDetails