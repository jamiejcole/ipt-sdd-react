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
          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Product name
                </th>
                <th scope="col" class="py-3 px-6">
                    Color
                </th>
                <th scope="col" class="py-3 px-6">
                    Category
                </th>
                <th scope="col" class="py-3 px-6">
                    Price
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">
                    Sliver
                </td>
                <td class="py-4 px-6">
                    Laptop
                </td>
                <td class="py-4 px-6">
                    $2999
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                    White
                </td>
                <td class="py-4 px-6">
                    Laptop PC
                </td>
                <td class="py-4 px-6">
                    $1999
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                    Black
                </td>
                <td class="py-4 px-6">
                    Accessories
                </td>
                <td class="py-4 px-6">
                    $99
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td class="py-4 px-6">
                    Gray
                </td>
                <td class="py-4 px-6">
                    Phone
                </td>
                <td class="py-4 px-6">
                    $799
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch 5
                </th>
                <td class="py-4 px-6">
                    Red
                </td>
                <td class="py-4 px-6">
                    Wearables
                </td>
                <td class="py-4 px-6">
                    $999
                </td>
                <td class="py-4 px-6">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
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