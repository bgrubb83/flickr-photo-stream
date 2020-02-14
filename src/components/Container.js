import React from 'react';
import HeaderBar from './HeaderBar';
import PhotoFrame from './PhotoFrame';
import Loading from './Loading';
import config from '../config';
import InfiniteScroll from 'react-infinite-scroller';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPage: false,
            perPage: 50,
            photos: [],
            userTags: ['landscape', 'safe'],
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

            if (metadata.page && metadata.pages && metadata.page === metadata.pages) {
                this.setState({ lastPage: true });
            } else {
                this.setState({ lastPage: false });
            }

            const newPhotos = [];

            for (const photo of photoArray) {
                const { server, id, secret, owner } = photo;

                /* -----------------------------------------------------------------------------
                I have no idea why the below should be necessary, but it seems that when
                a photo lives on farm 1, Flickr's API incorrectly returns it as farm 0.
                I've found forum discussions describing this issue as far back as 4 years ago.*/
                let { farm } = photo;
                if (farm === 0) {
                    farm = 1;
                }
                /* ----------------------------------------------------------------------------*/

                photo.src = `${config.FLICKR_FARM_BASE_URL}${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`
                photo.imageURL = `${config.FLICKR_PUBLIC_BASE_URL}/photos/${owner}/${id}`;
                photo.ownerURL = `${config.FLICKR_PUBLIC_BASE_URL}/people/${owner}/`;
                photo.strippedText = photo.description._content.replace(/(<([^>]+)>)/ig,"");
                newPhotos.push(photo);
            }

            this.setState({ photos: Array.from(new Set([...this.state.photos, ...newPhotos])) });
        }

    }

    fetchSearchResults = async (page = 1) => {
        const url = `${config.FLICKR_API_BASE_URL}/services/rest/?method=flickr.photos.search` +
            `&api_key=${config.FLICKR_API_KEY}` +
            `&per_page=${this.state.perPage}` +
            `&format=json` +
            `&tags=${this.formatTags(this.state.userTags)}` +
            `&tag_mode=all` +
            `&page=${page}` +
            `&extras=description,tags,owner_name` +
            `&safe_search=1` + // 1 = safe search enabled (hence no mandatory safe tag required)
            `&nojsoncallback=1`;
        console.log(url);
        const results = await (await fetch(url)).json();
        this.formatResults(results);
    }

    search = (event, searchText) => {
        event.preventDefault();
        const newTags = Array.from(new Set(searchText.split(' ').slice(0, 20))); // Flickr's search API can't handle more than 20 tags
        this.setState({ userTags: newTags });
    }

    componentDidMount = async () => {
        await this.fetchSearchResults();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.state.userTags !== prevState.userTags) {
            this.setState({ photos: [] });
            await this.fetchSearchResults();
            window.scrollTo(0, 0);
        }
    }

    sortPhotosIntoColumns = (photos) => {

        let photosInColumns = {
            col1: [],
            col2: [],
            col3: [],
            col4: [],
        }
        let iterator = 1;
        photos.forEach((photo) => {
            photosInColumns[`col${iterator}`].push(photo);
            if (iterator < 4) {
                iterator ++;
            } else {
                iterator = 1;
            }
        });
        console.log(photosInColumns.col1);
        console.log(photosInColumns.col2);
        console.log(photosInColumns.col3);
        console.log(photosInColumns.col4);

        return photosInColumns;
    }

    render() {

        const photosInColumns = this.sortPhotosIntoColumns(this.state.photos);

        return (
            <section className="wrapper">
                <HeaderBar
                    search={this.search}
                />
                <section className="pic-list">
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.fetchSearchResults}
                        hasMore={!this.state.lastPage}
                        // loader={<div className="loader" key={0}>Loading ...</div>}
                        loader={<Loading />}
                        initialLoad={false}
                    >

                        <section className="row">
                            <section className="column">
                                {/* {this.state.photos.map(photo => <PhotoFrame photo={photo} key={photo.id} />)} */}
                                {photosInColumns.col1.map(photo => <PhotoFrame photo={photo} key={photo.id} />)}

                            </section>
                            <section className="column">
                            {photosInColumns.col2.map(photo => <PhotoFrame photo={photo} key={photo.id} />)}
                            </section>
                            <section className="column">
                            {photosInColumns.col3.map(photo => <PhotoFrame photo={photo} key={photo.id} />)}
                            </section>
                            <section className="column">
                            {photosInColumns.col4.map(photo => <PhotoFrame photo={photo} key={photo.id} />)}
                            </section>
                        </section>
                    </InfiniteScroll>
                </section>
            </section>
        );
    }
}

export default Container


