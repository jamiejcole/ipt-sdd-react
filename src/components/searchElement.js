import React from 'react';

const SearchElement = (props) => {
    return (
       <div className="top-10 right-10 absolute text-slate-700">
            <h1 className="font-bold mr-14 pb-3" >Search SDD Keywords</h1>
            <div className="relative flex flex-row gap-6 items-center justify-center">
                <div className="flex flex-row items-center justify-left rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <svg aria-hidden="true" className="ml-3 w-5 h-5 text-gray-500 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input type="text" id="default-search" className="focus:outline-blue-600 rounded-2xl w-full block p-4 pl-12 text-sm text-gray-900" placeholder="EBNF, sorting, etc" />                    
                </div>
                
            </div>
       </div>
    );
}

export default SearchElement