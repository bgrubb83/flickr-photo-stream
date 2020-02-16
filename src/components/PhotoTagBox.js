import React from 'react';
import Tag from './Tag';

function PhotoTagBox({ tags }) {
    return (
        <React.Fragment>
            <section className="photo-tag-box">
                {tags.map((tag) => {
                    return <Tag tag={tag} key={tag} />;
                })}
            </section>
            <section className="fade-end tag-fade" />
        </React.Fragment>
    );
}

export default PhotoTagBox;