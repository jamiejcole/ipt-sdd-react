import './App.css';
//import NameForm from './components/form';
import RadioForm from './components/radioForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-stone-800 text-3xl font-bold underline pt-10">
          SDD IPT Question Finder
        </h1>
      </header>

      <RadioForm t1="SDD" d1="Software Design & Development" t2="IPT" d2="Information Processes & Technology" />

    </div>
  );
}

export default App;
