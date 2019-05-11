import React from 'react';
import { hot } from 'react-hot-loader';

import style from './App.css';

import Gif from '../components/Gif.js';
import Search from '../components/Search.js';

const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = '3xV3sWmEl2phXFsqVKeKnuRDAihSHMOJ';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchingText: '',
            gif: {}
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    getGif(searchingText) {
        return new Promise((resolve, reject) => {
            const url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;
            console.log('getGif -> ' + url);
            const json = response => response.json()
            let xhr = new XMLHttpRequest();
            return fetch(url)
                .then(json)
                .then(() => {
                    xhr.open('GET', url);
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            const data = JSON.parse(xhr.responseText).data;
                            const gif = {
                                url: data.fixed_width_downsampled_url,
                                sourceURL: data.url
                            }
                            resolve(gif);
                        } else {
                            reject(new Error(this.statusText));
                        }
                    };
                    xhr.onerror = () => reject(console.log('fail2'));
                    xhr.send(searchingText);
                })
        })
    }

    handleSearch(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText)
            .then((response) => {
                console.log(response.url);
                this.setState({
                    loading: false,
                    gif: {
                        url: response.url,
                    },
                    searchingText: searchingText
                })
            })
    }

    render() {
        return (
            <div className={style.App}>
                <h1>Wyszukiwarka GIFów!</h1>
                <h2>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Wciśnij enter aby pobrać gif!</h2>
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