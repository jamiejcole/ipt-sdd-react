import React from 'react';


function handleSubmit(e, props) {
    //e.preventDefault();
    props.searchElementManager(true)
}


const SearchElement = (props) => {
    return (
        <form onSubmit={(event) => handleSubmit(event, props)}>
            <button>
                <div className="w-16 h-16 bg-slate-100 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-200 duration-100">
                    <svg aria-hidden="true" className="ml-4 mt-4 w-8 h-8 text-gray-500 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>           
                </div>
            </button>
       </form>
    );
}

export default SearchElement