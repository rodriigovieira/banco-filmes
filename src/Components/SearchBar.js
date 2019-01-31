import React, { Component } from 'react'

export default class SearchBar extends Component {
  state = {
    searchText: '',
  }
  
  onChangeHandler = (event) => {
    this.setState({ searchText: event.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.handleSubmit(this.state.searchText)
          this.setState({ searchText: '' })
        }}>
          <input
            id="search-bar"
            type="text"
            onChange={this.onChangeHandler}
            value={this.state.searchText}
          />
        </form>
      </div>
    )
  }
}

