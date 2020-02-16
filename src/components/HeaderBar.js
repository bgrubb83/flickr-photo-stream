import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';

function HeaderBar(props) {
    return (
        <section id="header-bar">
            <Logo
                logoName="Flickr"
                logoText="Photo Stream"
            />
            <SearchBox
                search={props.search}
                placeholder="Enter comma separated tags to search for"
            />
        </section>

    );
}

export default HeaderBar;