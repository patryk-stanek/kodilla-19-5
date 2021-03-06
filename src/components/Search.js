import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchingText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleChange(event) {
        const searchingText = event.target.value;

        this.setState({
            searchingText: searchingText
        });
        
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    }

    render() {
        return (
            <input 
                type='text'
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                placeholder='Search...'
                value={this.state.searchTerm}
            />
        )
    }
}

export default Search;