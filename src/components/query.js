import React from 'react';

const Query = (props) => {
    return (
        <div className="grid place-items-center">
            <h3 className="pt-8 mb-5 text-xl font-bold text-gray-900">{props.title}</h3>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className={"relative flex flex-row gap-6 items-center justify-center w-" + props.width}>
                <div className="flex flex-row items-center justify-left rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <svg aria-hidden="true" className="ml-3 w-5 h-5 text-gray-500 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input autoFocus onChange={(event) => props.QueryManager(event.target.value)} type="text" id="default-search" className={"focus:outline-blue-600 rounded-lg block p-4 pl-12 text-sm text-gray-900 w-" + props.width} placeholder={props.placeholder} />                    
                </div>
            </div>
        </div>
        );
}

export default Query