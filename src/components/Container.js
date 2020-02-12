import React from 'react';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPages: null,
            apiKey: '',
            perPage: 50,

        };
    }

    formatResults = ({ photos: metadata, photos: { photo: photoArray } }) => {
        console.log(metadata);
        console.log(photoArray);

    }

    fetchSearchResults = async () => {
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&per_page=${this.state.perPage}&format=json&tags=cars&page=2&extras=description,tags&nojsoncallback=1`
        const results = await (await fetch(url)).json();
        this.formatResults(results);
    }

    componentDidMount = async () => {
        await this.fetchSearchResults();
    }

    render() {
        return <p>Container</p>
    }
}

export default Container