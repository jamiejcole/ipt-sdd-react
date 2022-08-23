import React from 'react';


function handleSubmit(e, props) {
    //e.preventDefault();
    props.homeElementManager(true)
}


const HomeElement = (props) => {
    return (
        <form onSubmit={(event) => handleSubmit(event, props)}>
            <button>
                <div className="w-16 h-16 bg-slate-100 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-200 duration-100">
                <svg className="ml-2 mt-2 w-11 h-11 text-gray-500 absolute" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/> <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/> </svg>          
                </div>
            </button>
       </form>
    );
}

export default HomeElement