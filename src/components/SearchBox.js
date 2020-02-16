import React from 'react'

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
        }
    }

    handleChange = (event) => {
        this.setState({ searchText: event.target.value });
    }

    handleSubmit = (event) => {
        this.props.search(event, this.state.searchText);
        this.setState({ searchText: '' });
    }

    render() {
        return (
            <form
                onSubmit={(event) => { this.handleSubmit(event) }}
                className="form"
            >
                <input
                    id="search-box"
                    type="text"
                    value={this.state.searchText}
                    onChange={this.handleChange}
                    placeholder="What would you like to see?"
                />
                <button
                    type="submit"
                    disabled={this.state.searchText.length === 0}
                    className="button" >Search
                </button>
            </form>
        );
    }
}

export default SearchBox