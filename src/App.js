/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import './App.css';
import RadioForm from './components/radioForm';
import SearchForm from './components/searchForm';

const App = () => {
  const [course, setCourse] = useState();
  const [questionsOrSolutions, setQuestionsOrSolutions] = useState();
  const [year, setYear] = useState();

  const buttonManager = (formID, selection) => {
    console.log(formID, selection);
  }

  const searchManager = (searchID, text) => {
    console.log(searchID, text);
  }

  const questionManager = (questionID, text) => {
    console.log(questionID, text);
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
        <SearchForm questionManager={questionManager} title="(Optional) Enter question number:" placeholder="23, 31, etc" checkboxVisible={false} />
      </div>

    </div>
  );
}

export default App;
