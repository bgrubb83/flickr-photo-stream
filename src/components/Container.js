import React from 'react';
import config from '../config';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPages: null,
            apiKey: config.FLICKR_API_KEY,
            perPage: 50,
            photos: [],
        };
    }

    formatResults = ({ photos: metadata, photos: { photo: photoArray } }) => {

        if (metadata && photoArray) {
            console.log(metadata);

            const newPhotos = [];

            for (const photo of photoArray) {
                photo.imageURL = `${config.FLICKR_PUBLIC_BASE_URL}/photos/${photo.owner}/${photo.id}`;
                photo.ownerURL = `${config.FLICKR_PUBLIC_BASE_URL}/people/${photo.owner}/`;
                newPhotos.push(photo);
            }
            this.setState({ photos: newPhotos });
            console.log(newPhotos);
        }

    }

    fetchSearchResults = async () => {
        const url = `${config.FLICKR_API_BASE_URL}/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&per_page=${this.state.perPage}&format=json&tags=cars&page=1&extras=description,tags&nojsoncallback=1`
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