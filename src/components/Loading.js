import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Loading(props) {
    return (
        <section className="loading">
            <Loader
                type="Puff"
                color="#7c33f9"
                height={24}
                width={24}
            />
        </section>
    );
}

export default Loading