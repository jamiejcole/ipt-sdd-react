import React from 'react';

const SearchForm = (props) => {

    // this is fucky, need to fix with proper syntax.
    // ask toby about proper syntax; as docs say use classes and i dont see
    // any docs that use arrow function syntax and event.target.value etc

    const handleChange = (event) => {
        this.setState({text: event.target.value})
    } 

    return (
        <div className="grid place-items-center">
            <form>   
                <h3 className="pt-8 mb-5 text-xl font-bold text-gray-900">{props.title}</h3>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={this.handleChange.bind(this)} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="2020, 2021, etc" required="" />
                </div>
            </form>
        </div>
        );
}

export default SearchForm