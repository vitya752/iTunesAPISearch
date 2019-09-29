import React, {Component} from 'react';
import './App.css';
import Search from '../Search/Search';
import Content from '../Content/Content';
import Media from '../Media/Media';
import ITunesAPI from '../../ITunesAPI/ITunesAPI';

export default class App extends Component {

    iTunesService = new ITunesAPI();
    _maxId = 100;

    state = {
        data: [],
        term: '',
        media: 'musicVideo',
        activeMedia: false,
        url: ''
    };

    render() {
        const typesMedia = [
            {label: 'Music Video', value: 'musicVideo'},
            {label: 'Music', value: 'music'},
            {label: 'Movie', value: 'movie'},
            {label: 'Audiobook', value: 'audiobook'},
        ];
        const { data, media, activeMedia, url } = this.state;
        const openMedia = activeMedia ? <Media url={url} typeMedia={media} closeMedia={this.closeMedia} /> : null;
        return(
            <React.Fragment>
                <Search 
                        typesMedia={typesMedia}
                        onSubmitQuery={this.onSubmitQuery} />
                <div className="main-container">
                    <div className="container">
                        <Content 
                            data={data} 
                            activeMedia={activeMedia}
                            playMedia={(url) => this.playMedia(url)} />
                        { openMedia }
                    </div>
                </div>
            </React.Fragment>
        );
    }

    playMedia = (url) => {
        const activeMedia = this.state.activeMedia;
        window.scrollTo(0, 0);
        this.setState({
            activeMedia: !activeMedia,
            url: url
        })
    };

    closeMedia = () => {
        this.setState({
            activeMedia: false
        })
    };

    onSubmitQuery = (typeMedia, term) => {
        this.iTunesService
            .getMedia(term, typeMedia)
            .then((data) => {
                this.setState((state) => {
                    return{
                        data,
                        media: typeMedia,
                        term: term
                    }
                });
            }).catch(() => {
                this.setState({
                    data: [],
                    media: typeMedia,
                    term: term
                })
            });
    }

}