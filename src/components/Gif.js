import React from 'react';

const GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';
const styles = {
    minHeight: '310px',
    margin: '0.5em'
};
class Gif extends React.Component {

    getUrl() {
        this.props.sourceUrl || GIPHY_LOADING_URL
    }

    render() {
        const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;

        return (
            <div>
                <a href={this.getUrl()} title='view this on giphy' target='new'>
                    <img id='gif' src={url} />
                </a>
            </div>
        )
    }
}

export default Gif;