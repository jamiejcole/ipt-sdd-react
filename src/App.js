/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import RadioForm from './components/radioForm';
import SearchForm from './components/searchForm';
import SearchElement from './components/searchElement';
import QueryResult from './components/queryResults';
import {dataSDDQuestions, dataSDDMarking, dataIPTQuestions, dataIPTMarking} from './data/data';
import SDD from "./data/sdd-hsc-questions";

const App = () => {
  const [contentIsDisabled, setContentIsDisabled] = useState(true);
  const [course, setCourse] = useState("SDD");
  const [content, setContent] = useState("Questions");
  const [year, setYear] = useState("2021");
  const [quesNum, setQuesNum] = useState();

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

  const searchElementManager = (submitted, val) => {
    console.log(val);
  }

  const randManager = (rand) => {
    if (rand) {
      setYear(randInt(2001, 2021))
    }
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
              <h1 className="font-bold mr-14 pb-3" >Search SDD Keywords</h1>
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
              SDD & IPT Question Finder
            </h1>
          </header>
          <div className="pt-6">
            <QueryResult width="80"/>
          </div>

          <div className="flex">
            <div className="w-full h-30 bg-blue-400">
              <p className="px-64">eeee</p>
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