/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import './App.css';
import RadioForm from './components/radioForm';

const App = () => {
  const [course, setCourse] = useState();
  

  const buttonManager = (formID, selection) => {
    console.log(formID, selection);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-stone-800 text-3xl font-bold underline pt-10">
          SDD IPT Question Finder
        </h1>
      </header>

      <RadioForm buttonManager={buttonManager} title="Which course?" t1="SDD" d1="Software Design & Development" t2="IPT" d2="Information Processes & Technology" />
      <RadioForm buttonManager={buttonManager} title="What content?" t1="Questions" d1=" " t2="Solutions" d2=" " />

    </div>
  );
}

export default App;
