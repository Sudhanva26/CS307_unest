import React, { Component } from 'react';
import Filter from "./Filter.jsx";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '', // Initialize the state with an empty value
    };
  }

  handleChange = (e) => {
    // Update the state when input value changes
    this.setState({ inputValue: e.target.value });
  };

  handleClick = () => {
    // Access the input value when the button is clicked
    alert('Input value is: ' + this.state.inputValue);
  };

  render() {
    return <>
        <div>
          <div className="space-y-10">
            <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
              <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="bg-gray-100 outline-none" onChange={this.handleChange} type="text" placeholder="Property Name" />
              </div>
              <Filter/>
              <div onClick={this.handleClick} className="bg-red-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                <div>Search</div>
              </div>
            </div>
          </div>
        </div>
      </>
  }
}

export default SearchBar;