import React from 'react';
import Tag from './Tag';

function PhotoTagBox({ tags }) {
    console.log(tags);
    console.log(typeof tags);
    return (
        <React.Fragment>
            <section className="photo-tag-box">
                {tags.map((tag) => {
                    return <Tag tag={tag} />;
                })}
            </section>
            <section className="fade-end tag-fade" />
        </React.Fragment>
    );
}

export default PhotoTagBox;