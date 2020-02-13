import React from 'react';
import PhotoFrame from './PhotoFrame';
import config from '../config';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalPages: null,
            perPage: 50,
            photos: [],
            userTags: ['cars', 'boats'],
            tagModeAll: true,
        };
    }

    formatTags = (userTags) => {
        let tagString = '';
        userTags.forEach((tag, index) => {
            if (index === userTags.length - 1) {
                tagString += `${tag}`
            } else {
                tagString += `${tag},`
            }
        });
        return tagString;
    }

    formatResults = ({ photos: metadata, photos: { photo: photoArray } }) => {

        if (metadata && photoArray) {
            console.log(metadata);

            const newPhotos = [];

            for (const photo of photoArray) {
                const { farm, server, id, secret, owner } = photo;

                photo.src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
                photo.imageURL = `${config.FLICKR_PUBLIC_BASE_URL}/photos/${owner}/${id}`;
                photo.ownerURL = `${config.FLICKR_PUBLIC_BASE_URL}/people/${owner}/`;
                newPhotos.push(photo);
            }
            this.setState({ photos: newPhotos });
            console.log(newPhotos);
        }

    }

    fetchSearchResults = async () => {
        const url = `${config.FLICKR_API_BASE_URL}/services/rest/?method=flickr.photos.search` +
            `&api_key=${config.FLICKR_API_KEY}` + // it's a secret!
            `&per_page=${this.state.perPage}` + // number of results per page
            `&format=json` + // returned format
            `&tags=${this.formatTags(this.state.userTags)}` + // tags to search by
            `&tag_mode=${this.state.tagModeAll ? 'all' : 'any'}` + // all = must match all tags, any = can match any tag
            `&page=${this.state.page}` + // which page of paginated results to return
            `&extras=description,tags` + // additioal data requested
            `&safe_search=1` + // 1 = safe search enabled (hence no mandatory safe tag required)
            `&nojsoncallback=1`; // don't pass a callback function, instead handle by awaiting result.json()
            console.log(url);
        const results = await (await fetch(url)).json();
        this.formatResults(results);
    }

    componentDidMount = async () => {
        await this.fetchSearchResults();
    }

    render() {
        return (
            <section>
                {this.state.photos.map(photo => <PhotoFrame photo={photo} key={photo.id} />)}
            </section>
        );


    }
}

export default Container