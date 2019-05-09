import React from 'react';
import { hot } from 'react-hot-loader';

import style from './App.css';

import Gif from '../components/Gif.js';
import Search from '../components/Search.js';

const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = '3xV3sWmEl2phXFsqVKeKnuRDAihSHMOJ';

class App extends React.Component {

    getInitialState() {

        return {
            loading: false,
            searchingText: '',
            gif: {}
        }
    }

    handleSearch(searchingText) {

        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(gif) {
            this.setState({
                loading: false,
                gif: gif,
                searchingText: seachingText
            });
        }.bind(this));
    }

    getGif(searchingText) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText).data;
                const gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            }
        };
        xhr.send();
    }

    render() {
        return (
            <div>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Wciśnij enter aby pobrać gif!</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
}

export default hot(module)(App);