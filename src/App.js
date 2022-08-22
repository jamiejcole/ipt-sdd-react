/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import './App.css';
import RadioForm from './components/radioForm';
import SearchForm from './components/searchForm';

const App = () => {
  const [course, setCourse] = useState("SDD");
  const [content, setContent] = useState("Questions");
  const [year, setYear] = useState("2021");
  const [quesNum, setQuesNum] = useState();

  const buttonManager = (formID, selection) => {
    //console.log(formID, selection);
    if (formID === "Which course?") setCourse(selection);
    else if (formID === "What content?") setContent(selection);
  }

  const searchManager = (searchID, text) => {
    //console.log(searchID, text);
    if (searchID === "Which year?") setYear(text);
    else if (searchID === "(Optional) Enter question number:") setQuesNum(text);
  }

  const submitForm = () => {
    console.log(course, content, year, quesNum);
  }


  return (
    <div className="flex flex-col items-center justify-center text-center">
      <header className="App-header">
        <h1 className="text-stone-800 text-3xl font-black underline pt-10">
          SDD & IPT Question Finder
        </h1>
      </header>

      <RadioForm buttonManager={buttonManager} title="Which course?" t1="SDD" d1="Software Design & Development" t2="IPT" d2="Information Processes & Technology" />
      <RadioForm buttonManager={buttonManager} title="What content?" t1="Questions" d1=" " t2="Solutions" d2=" " />
      
      <div className="w-fit">
        <SearchForm searchManager={searchManager} title="Which year?" placeholder="2020, 2021, etc" checkboxVisible={true} />
        <SearchForm searchManager={searchManager} title="(Optional) Enter question number:" placeholder="23, 31, etc" checkboxVisible={false} submitVisible={true}/>
      </div>

      <div className={"pt-10 flex items-center flex-row"}>
        <button onClick={submitForm} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg w-full sm:w-auto px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </div>

    </div>
  );
}

export default App;
