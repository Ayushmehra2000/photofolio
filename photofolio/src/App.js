import './App.css';
import { useState } from 'react';

// import components here  
import HeadPart from "./component/PhotoFolioHead/photofolioHead";
import AlbumForm from './component/AlbumForm/albumForm';

// import firebase here
import {db} from "./firebaseinit"
import AlbumList from './component/Albumlist/albumList';

function App() {
  const [albums, setAlbums] = useState([]);
  const handleAddAlbum = (Albumdata)=>{
    setAlbums([Albumdata,...albums]);
  }
  return (
    <div className="App">
      <header className="App-header">
        <HeadPart />
      </header>
      <main>
        <AlbumForm AddAlbum={handleAddAlbum}  />
        <hr></hr>
        <AlbumList albums={albums} />
      </main>
    </div>
  );
}

export default App;
