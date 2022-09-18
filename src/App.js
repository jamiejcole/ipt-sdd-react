/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import RadioForm from './components/radioForm';
import RadioFormThree from './components/radioFormThree';
import SearchForm from './components/searchForm';
import SearchElement from './components/searchElement';
import Query from './components/query';
import {dataSDDQuestions, dataSDDMarking, dataIPTQuestions, dataIPTMarking, dataEngineeringQuestions, dataEngineeringMarking} from './data/data';
import SDD from "./data/sdd-hsc-questions";
import IPT from "./data/ipt-hsc-questions";
import Engineering from "./data/engineering-hsc-questions";
import HomeElement from './components/homeElement';
import SDDQuestionIndex from './data/sdd-question-index.json'
import IPTQuestionIndex from './data/ipt-question-index.json'
import EngineeringQuestionIndex from './data/engineering-question-index.json'



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
    if (clicked === true) setContentIsDisabled(false);
  }
  
  const homeElementManager = (clicked) => {
    if (clicked === true) setContentIsDisabled(true);
  }

  const randManager = (rand) => {
    if (rand) {
      setYear(randInt(2001, 2021))
    }
  }

  const QueryManager = (text) => {
    setSDDTextInput(text)
  }

  const [searchPlaceholder, setSearchPlaceholder] = useState("EBNF, Sorting, etc");
  const [currentCourse, setCurrentCourse] = useState(SDD);
  const toggleChanged = (val) => {
    if (val === 'rSDD') {
      setCurrentCourse(SDD);
      setSearchPlaceholder("EBNF, Sorting, etc");
      setCurrentButton("SDD");
    }
    else if (val === 'rIPT') {
      setCurrentCourse(IPT);
      setSearchPlaceholder("Parity bit, keys, etc");
      setCurrentButton("IPT");
    } 
    else if (val === 'rEngineering') {
      setCurrentCourse(Engineering);
      setSearchPlaceholder("Materials, friction, etc");
      setCurrentButton("Engineering");
    }
  }

  const setCurrentButton = (course) => {
    if (course === "SDD") {
      setSDDButtonState("border-2 border-blue-600 font-bold")
      setIPTButtonState("border-gray-200 ");
      setEngineeringButtonState("border-gray-200 ");
    }
    else if (course === "IPT") {
      setSDDButtonState("border-gray-200 ")
      setIPTButtonState("border-2 border-blue-600 font-bold");
      setEngineeringButtonState("border-gray-200 ");
    }
    else if (course === "Engineering") {
      setSDDButtonState("border-gray-200 ")
      setIPTButtonState("border-gray-200 ");
      setEngineeringButtonState("border-2 border-blue-600 font-bold");
    }
  }

  const [SDDButtonState, setSDDButtonState] = useState("border-2 border-blue-600 font-bold");
  const [IPTButtonState, setIPTButtonState] = useState("");
  const [EngineeringButtonState, setEngineeringButtonState] = useState("");

  const OpenPage = (event, year, question, currentCourse, qOrA) => {
    event.preventDefault();
    let course = "";
    if (currentCourse === SDD) { course = "SDD"; }
    else if (currentCourse === IPT) course = "IPT";
    else if (currentCourse === Engineering) course = "Engineering";
    let url = generateURL(course, qOrA, year, question);
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
    else if (course === "Engineering" && content === "Questions") url = dataEngineeringQuestions[year];
    else if (course === "Engineering" && content === "Solutions") url = dataEngineeringMarking[year];
    //if (quesNum) url += "#Question%20" + quesNum; 
    // we want to replace #question%20quesnum with the corresponding page num from sdd-index.json
    if (quesNum && content === "Questions") {
      let tmpPageNum = "";
      if (course === "SDD") {
        if (year >= 2011) {
          tmpPageNum = SDDQuestionIndex["questions"][year][quesNum];
          url += "#page=" + tmpPageNum;
        }
      }
      else if (course === "IPT") {
        if (year >= 2011) {
          tmpPageNum = IPTQuestionIndex["questions"][year][quesNum];
          url += "#page=" + tmpPageNum;
        }
      }
      else if (course === "Engineering") {
        if (year >= 2013) {
          tmpPageNum = EngineeringQuestionIndex["questions"][year][quesNum];
          url += "#page=" + tmpPageNum;
        }
      }
    }
    else if (quesNum && content === "Solutions") {
      let tmpPageNum = "";
      if (course === "SDD") {
        if (year >= 2011) {
          tmpPageNum = SDDQuestionIndex["solutions"][year][quesNum];
          url += "#page=" + tmpPageNum;
        }
      }
      else if (course === "IPT") {
        if (year >= 2011) {
          tmpPageNum = IPTQuestionIndex["solutions"][year][quesNum];
          url += "#page=" + tmpPageNum;
        }
      }
      else if (course === "Engineering") {
        if (year >= 2013) {
          tmpPageNum = EngineeringQuestionIndex["solutions"][year][quesNum];
          url += "#page=" + tmpPageNum;
        }
      }
    }
    
    return url
  }

  if (contentIsDisabled) {
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
  
          <RadioFormThree buttonManager={buttonManager} title="Which course?" t1="SDD" d1="Software Design & Development" t2="IPT" d2="Information Processes & Technology" t3="Engineering" d3="Engineering Studies" />
          <RadioForm buttonManager={buttonManager} title="What content?" t1="Questions" d1=" " t2="Solutions" d2=" " />
          
          <div className="w-fit">
            <SearchForm submitForm={submitForm} randManager={randManager} searchManager={searchManager} title="Which year?" placeholder="2020, 2021, etc" checkboxVisible={true} />
            <SearchForm submitForm={submitForm} searchManager={searchManager} title="(Optional) Enter question number:" placeholder="23, 31, etc" checkboxVisible={false} submitVisible={true}/>
          </div>
  
          <div className={"py-12 flex items-center flex-row"}>
            <button onClick={submitForm} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg w-full sm:w-auto px-8 py-3 text-center">Submit</button>
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
              Past HSC Topics Question Search
            </h1>
            <div className="top-10 right-10 absolute text-slate-700"> 
              <HomeElement homeElementManager={homeElementManager} />
            </div>
          </header>
          <div className="flex items-center justify-center ">
            <Query QueryManager={QueryManager} placeholder={searchPlaceholder} width="64"/>
            <div className="mt-12 ml-10 flex items-center justify-center">
                <button onClick={(event) => {console.log(event); toggleChanged(event.target.id)}} id="rSDD" className={"flex items-center mx-2 px-2 rounded border " + SDDButtonState}>
                  <h3 className="py-4 px-4 w-full text-sm text-gray-900" id="rSDD">SDD</h3>
                </button>
                <button onClick={(event) => {console.log(event); toggleChanged(event.target.id)}} id="rIPT" className={"flex items-center mx-2 px-2 rounded border " + IPTButtonState}>
                  <h3 className="py-4 px-4 w-full text-sm text-gray-900" id="rIPT">IPT</h3>
                </button>
                <button onClick={(event) => {console.log(event); toggleChanged(event.target.id)}} id="rEngineering" className={"flex items-center mx-2 px-2 rounded border " + EngineeringButtonState}>
                  <h3 className="py-4 px-4 w-full text-sm text-gray-900" id="rEngineering">Engineering</h3>
                </button>
            </div>
          </div>

          <div className="pt-10 flex w-4/5 item-center align-center">
            <div className="flex overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="table-fixed w-full text-md text-left text-gray-500">
                <thead className="text-s text-gray-700 uppercase bg-gray-100">
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
                    <th scope="col" className="w-12 py-3 px-4">
                    
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {currentCourse.filter((item) => {if (item.keywords.toLowerCase().includes(SDDTextInput.toLowerCase())) { return true; } else { return false; }}).map((item, i) => {
                      const colour = i % 2 !== 0 ? "bg-gray-50" : "bg-white"
                      return (
                        <tr className={"border-b " + colour} key={i}>
                          <td className="py-4 px-6">{item.year}</td>
                          <td className="py-4 px-6">{item.qNum}</td>
                          <td className="py-4 px-6">{item.qPart}</td>
                          <td className="py-4 px-6">{item.Marks}</td>
                          <td className="py-4 px-6">{item.Outcome}</td>
                          <td className="py-4 px-6">{item.keywords.toTitleCase()}</td>
                          <td className="py-3 px-2"> 
                            <button onClick={(event) => OpenPage(event, item.year, item.qNum, currentCourse, "Questions")} type="button" className="py-1.5 text-center px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Open Q
                            </button>
                          </td>
                          <td className="py-3 px-2"> 
                            <button onClick={(event) => OpenPage(event, item.year, item.qNum, currentCourse, "Solutions")} type="button" className="py-1.5 text-center px-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Sol.
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