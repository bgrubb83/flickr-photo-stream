import React from 'react';
import SearchBox from './SearchBox';
import Logo from './Logo';

function HeaderBar(props) {
    return (
        <section id="header-bar">
            <Logo
                logoName="flickr"
                logoText="Photo Stream"
                refresh={props.refresh}
            />
            <SearchBox
                search={props.search}
                placeholder="Enter some tags to search for"
            />
        </section>

    );
}

export default HeaderBar;