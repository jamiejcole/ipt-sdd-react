import React from 'react';

const RadioForm = (props) => {

  return (
    <div className="grid place-items-center">
        <form>
            <h3 className="pt-8 mb-5 text-xl font-bold text-gray-900">{props.title}</h3>
            <ul className="grid gap-6 w-full md:grid-cols-2 text-left">
                <li>
                    <input type="radio" id={props.t1} name="hosting" value="hosting-small" className="hidden peer" required="" onChange={() => props.buttonManager(props.title, props.t1)} defaultChecked={true} />
                    <label htmlFor={props.t1} className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">                           
                        <div className="block">
                            <div className="w-full text-lg font-semibold">{props.t1}</div>
                            <div className="w-full">{props.d1}</div>
                        </div>
                        <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
                <li>
                    <input type="radio" id={props.t2} name="hosting" value="hosting-big" className="hidden peer" onChange={() => props.buttonManager(props.title, props.t2)} />
                    <label htmlFor={props.t2} className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">{props.t2}</div>
                            <div className="w-full">{props.d2}</div>
                        </div>
                        <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </li>
            </ul>

        </form>
    </div>
  );
}

export default RadioForm;