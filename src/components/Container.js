import React from 'react';
import HeaderBar from './HeaderBar';
import PhotoFrame from './PhotoFrame';
import Loading from './Loading';
import config from '../config';
import StatusMessage from './StatusMessage';
import InfiniteScroll from 'react-infinite-scroller';
import { stripHTMLTags, stripNonAlphaNumericsAndWhiteSpace, getRandomElementFromArray } from '../lib/helpers';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPage: false,
            perPage: 50,
            photos: [],
            userTags: [],
            defaultTags: ['landscapes', 'nature', 'trees', 'cats', 'dogs'],
            mandatoryTags: ['safe'],
            lastSearch: '',
            nothingReturned: false,
        };
    }

    collateTags = (userTags, defaultTags, mandatoryTags) => {
        let tags;
        const fallbackTags = [...mandatoryTags];
        if (userTags && userTags.length > 0) {
            console.log('userTags', userTags)
            console.log('mand', mandatoryTags);
            tags = [...userTags, ...mandatoryTags];
        } else {
            fallbackTags.unshift(getRandomElementFromArray(defaultTags));
            tags = fallbackTags;
            this.setState({ lastSearch: tags[0] });
        }
        console.log('tags', tags);
        let tagString = '';
        tags.forEach((tag, index) => {
            if (index === tags.length - 1) {
                tagString += `${tag}`
            } else {
                tagString += `${tag},`
            }
        });
        console.log(tagString);
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
                photo.strippedText = stripHTMLTags(photo.description._content) || "This photo doesn't have a description.";
                newPhotos.push(photo);
            }
            this.setState({ photos: Array.from(new Set([...this.state.photos, ...newPhotos])) });

            if (newPhotos && newPhotos.length > 0) {
                this.setState({ nothingReturned: false });
            } else {
                this.setState({ nothingReturned: true });
            }
        }
    }

    fetchSearchResults = async (page = 1) => {
        const url = `${config.FLICKR_API_BASE_URL}/services/rest/?method=flickr.photos.search` +
            `&api_key=${config.FLICKR_API_KEY}` +
            `&per_page=${this.state.perPage}` +
            `&format=json` +
            `&tags=${this.collateTags(this.state.userTags, this.state.defaultTags, this.state.mandatoryTags)}` +
            `&tag_mode=all` +
            `&page=${page}` +
            `&extras=description,tags,owner_name` +
            `&safe_search=1` + // 1 = safe search enabled (not good enough though, also using a mandatory safe tag)
            `&nojsoncallback=1`;
        console.log(url);
        const results = await (await fetch(url)).json();
        this.formatResults(results);
    }

    search = (event, searchText) => {
        event.preventDefault();

        const formattedSearchString = stripNonAlphaNumericsAndWhiteSpace(searchText);
        this.setState({ lastSearch: formattedSearchString.replace(/ /g, ', ') })
        const newTags = Array.from((new Set(formattedSearchString.split(' ').slice(0, 20)))); // Flickr's search API can't handle more than 20 tags
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
                iterator++;
            } else {
                iterator = 1;
            }
        });
        return photosInColumns;
    }

    generateStatusMessage = () => {
        if (this.state.nothingReturned) {
            return 'Nothing to show here...'
        }

        const userHasEnteredTags = this.state.userTags && this.state.userTags.length > 0;
        if (userHasEnteredTags) {
            return `Here are some ${this.state.lastSearch} pictures like you asked for...`;
        } else {
            return `You've not searched for any tags yet, so here are some nice pictures of ${this.state.lastSearch} for you to look at...`;
        }
    }

    refresh = () => {
        window.location.reload(false);
    }

    render() {
        const photosInColumns = this.sortPhotosIntoColumns(this.state.photos);

        return (
            <section className="wrapper">
                <HeaderBar
                    search={this.search}
                    refresh={this.refresh}
                />
                <section className="pic-list">
                    <StatusMessage message={this.generateStatusMessage()} />
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.fetchSearchResults}
                        hasMore={!this.state.lastPage}
                        loader={<Loading />}
                        initialLoad={false}
                    >

                        <section className="row">
                            <section className="column">
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
