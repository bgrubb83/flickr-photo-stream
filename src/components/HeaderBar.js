import React from 'react';
import SearchBox from './SearchBox';

function HeaderBar(props) {
    return (
        <section id="header-bar">
            <SearchBox
                search={props.search}
            />
        </section>

    );
}

export default HeaderBar;