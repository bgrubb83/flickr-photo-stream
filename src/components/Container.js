import React from 'react';
import PhotoFrame from './PhotoFrame';
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
                const { farm, server, id, secret, owner } = photo;

                photo.src=`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
                photo.imageURL = `${config.FLICKR_PUBLIC_BASE_URL}/photos/${owner}/${id}`;
                photo.ownerURL = `${config.FLICKR_PUBLIC_BASE_URL}/people/${owner}/`;
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
        return (
            <section>
                {this.state.photos.map(photo => <PhotoFrame photo={photo} key={photo.id}/>)}
            </section>
        );


    }
}

export default Container