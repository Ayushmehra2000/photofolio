import './App.css';

// import components here 
import HeadPart from './component/photofolioHead';

// import firebase here
import {db} from "./firebaseinit"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeadPart />
      </header>
    </div>
  );
}

export default App;
