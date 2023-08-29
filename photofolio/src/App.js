import './App.css';

// import components here  
import HeadPart from "./component/PhotoFolioHead/photofolioHead";
import AlbumForm from './component/AlbumForm/albumForm';

// import firebase here
import {db} from "./firebaseinit"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeadPart />
      </header>
      <main>
        <AlbumForm />
      </main>
    </div>
  );
}

export default App;
