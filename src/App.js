/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import RadioForm from './components/radioForm';
import SearchForm from './components/searchForm';
import SearchElement from './components/searchElement';
import Query from './components/query';
import {dataSDDQuestions, dataSDDMarking, dataIPTQuestions, dataIPTMarking} from './data/data';
import SDD from "./data/sdd-hsc-questions";
import HomeElement from './components/homeElement';

const App = () => {
  const [contentIsDisabled, setContentIsDisabled] = useState(false);
  const [course, setCourse] = useState("SDD");
  const [content, setContent] = useState("Questions");
  const [year, setYear] = useState("2021");
  const [quesNum, setQuesNum] = useState();

  const [SDDTextInput, setSDDTextInput] = useState('');

  let SDD_q_data = [];

  SDD.map((item, i) => (
      SDD_q_data.push(item)
  ))
  //console.log(SDD_q_data);

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

  const searchElementManager = (clicked) => {
    if (clicked === true) setContentIsDisabled(true);
  }
  
  const homeElementManager = (clicked) => {
    if (clicked === true) setContentIsDisabled(false);
  }

  const randManager = (rand) => {
    if (rand) {
      setYear(randInt(2001, 2021))
    }
  }

  const QueryManager = (text) => {
    setSDDTextInput(text)
    
    // we want to remove all non relevant queries here
    
  }

  const OpenPage = (event, year, question) => {
    event.preventDefault();
    let url = generateURL("SDD", "Questions", year, question);
    if (url) window.open(url);
  }

  const submitForm = () => {
    const url = generateURL(course, content, year, quesNum);
    if (url) window.open(url);
  }

  const generateURL = (course, content, year, quesNum) => {
    let url = ""
    if (course === "SDD" && content === "Questions") url = dataSDDQuestions[year];
    else if (course === "SDD" && content === "Solutions") url = dataSDDMarking[year];
    else if (course === "IPT" && content === "Solutions") url = dataIPTMarking[year];
    else if (course === "IPT" && content === "Questions") url = dataIPTQuestions[year];
    if (quesNum) url += "#Question%20" + quesNum; 
    return url
  }

  if (!contentIsDisabled) {
    return (
      <> 
        <Helmet><title>HSC Questions</title></Helmet>
        <div className="flex flex-col items-center justify-center text-center ">
          <header className="App-header">
            <h1 className="text-stone-800 text-3xl font-black underline pt-10">
              SDD & IPT Question Finder
            </h1>
            <div className="top-10 right-10 absolute text-slate-700"> 
              
              <SearchElement searchElementManager={searchElementManager} />
            </div>
          </header>
  
          <RadioForm buttonManager={buttonManager} title="Which course?" t1="SDD" d1="Software Design & Development" t2="IPT" d2="Information Processes & Technology" />
          <RadioForm buttonManager={buttonManager} title="What content?" t1="Questions" d1=" " t2="Solutions" d2=" " />
          
          <div className="w-fit">
            <SearchForm submitForm={submitForm} randManager={randManager} searchManager={searchManager} title="Which year?" placeholder="2020, 2021, etc" checkboxVisible={true} />
            <SearchForm submitForm={submitForm} searchManager={searchManager} title="(Optional) Enter question number:" placeholder="23, 31, etc" checkboxVisible={false} submitVisible={true}/>
          </div>
  
          <div className={"py-12 flex items-center flex-row"}>
            <button onClick={submitForm} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg w-full sm:w-auto px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </div>
  
        </div> 
  
        
  
    </> 
    );
  }
  else {
    return (
      <div>
        <Helmet><title>HSC Questions</title></Helmet>
        <div className="flex flex-col items-center justify-center text-center ">
          <header className="App-header">
            <h1 className="text-stone-800 text-3xl font-black underline pt-10">
              SDD HSC Question Search
            </h1>
            <div className="top-10 right-10 absolute text-slate-700"> 
              
              <HomeElement homeElementManager={homeElementManager} />
            </div>
          </header>
          <div className="pt-6">
            <Query QueryManager={QueryManager} placeholder="EBNF, Sorting, etc" width="96"/>
          </div>

          <div className="pt-10 flex w-4/5 item-center align-center">
            <div className="flex overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="w-6 py-3 pl-5">
                      Year
                    </th>
                    <th scope="col" className="w-6 py-3 px-4">
                      Question
                    </th>
                    <th scope="col" className="w-6 py-3 px-6">
                      Sub Q
                    </th>
                    <th scope="col" className="w-6 py-3 px-4">
                      Marks
                    </th>
                    <th scope="col" className="w-16 py-3 px-4">
                      Outcome(s)
                    </th>
                    <th scope="col" className="w-64 py-3 px-4">
                      Keyword(s)
                    </th>
                    <th scope="col" className="w-12 py-3 px-4">
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {SDD.filter((item) => {if (item.keywords.toLowerCase().includes(SDDTextInput.toLowerCase())) { return true; } else { return false; }}).map((item, i) => {
                      const colour = i % 2 !== 0 ? "bg-gray-50" : "bg-white"
                      return (
                        <tr className={"border-b dark:bg-gray-900 dark:border-gray-700 " + colour} key={i}>
                          <td className="py-4 px-6">{item.year}</td>
                          <td className="py-4 px-6">{item.qNum}</td>
                          <td className="py-4 px-6">{item.qPart}</td>
                          <td className="py-4 px-6">{item.Marks}</td>
                          <td className="py-4 px-6">{item.Outcome}</td>
                          <td className="py-4 px-6">{item.keywords.toTitleCase()}</td>
                          <td className="py-3 px-6"> 
                            <button onClick={(event) => OpenPage(event, item.year, item.qNum)} type="button" className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Goto
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


  

export default App;

function randInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless 
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase();
      });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
      uppers[i].toUpperCase());

  return str;
}