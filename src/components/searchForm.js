import { useEffect, useState } from "react";
import React from 'react';

const SearchForm = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [checkboxVisible, setCheckboxVisible] = useState('');

    useEffect(() => {
        props.checkboxVisible ? setCheckboxVisible('block') : setCheckboxVisible('hidden');
    },[props.checkboxVisible])

    return (
        <div className="grid place-items-center">
            <form>   
                <h3 className="pt-8 mb-5 text-xl font-bold text-gray-900">{props.title}</h3>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative flex flex-row gap-6 items-center justify-center">
                    <div className="flex flex-row items-center justify-center gap-1 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input value={textInput} disabled={isDisabled} onChange={(event) => {props.searchManager(props.title, event.target.value); setTextInput(event.target.value)}} type="number" id="default-search" className="w-2/3 block p-4 pl-10 w-full text-sm text-gray-900" placeholder={props.placeholder}>
                            {/* this is fucky, get Big. T to fix when he is not fucky */}
                        </input>
                    </div>
                    
                    <div className={"flex items-center flex-row " + checkboxVisible}>
                        <input id="checkbox" onChange={(event) => {setIsDisabled(event.target.checked); setTextInput('')}} type="checkbox" value="" className="w-4 h-4 accent-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                        <label htmlFor="default-checkbox" className="ml-2 whitespace-nowrap text-sm font-medium text-gray-900">Random year?</label>
                    </div>

                </div>
            </form>
        </div>
        );
}

export default SearchForm