import './App.css';
import { useEffect, useState } from 'react';

// import components here  
import HeadPart from "./component/PhotoFolioHead/photofolioHead";
import AlbumList from './component/Albumlist/albumList';
import PhotoList from './component/photoList/photolist';

// import firebase here
import {db} from "./firebaseinit"
import { collection, addDoc,doc, deleteDoc , onSnapshot} from "firebase/firestore";


function App() {
  const [albums, setAlbums] = useState([]);
  const [toggleBetweenAlbumlistandPhotolist,setToggleBetweenAlbumlistandPhotolist] = useState(false);
  const [selectedAlbum,setSelectedAlbum] = useState(null);

  const getDataofFolders=()=>{
    const unsub = onSnapshot(collection(db, "folders"), (Snapshot) => {
      const folders = Snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlbums(folders,...albums);
    });
  }

  useEffect(()=>{
    getDataofFolders();
  },[]);
  const handleAddAlbum = async (Albumdata)=>{
    const docRef = await addDoc(collection(db, "folders"), Albumdata);
    setAlbums([{id:docRef.id,...Albumdata},...albums]);
  }

  const handleFolderRemove = async (id) => {
    await deleteDoc(doc(db, "folders", id));
    const updatefolder=albums.filter((data)=> data.id != id);
    setAlbums(updatefolder)
  }
  return (
    <div className="App">
      <header className="App-header">
        <HeadPart />
      </header>
      <main>
        {toggleBetweenAlbumlistandPhotolist ? <PhotoList selectedAlbum={selectedAlbum} togglebtwAlbumandPhoto={setToggleBetweenAlbumlistandPhotolist} /> : 
        <AlbumList AddAlbum={handleAddAlbum}  
                   albums={albums} 
                   removeFolder={handleFolderRemove}
                   togglebtwAlbumandPhoto={setToggleBetweenAlbumlistandPhotolist} 
                   selectedAlbum={setSelectedAlbum}/>}
        
      </main>
    </div>
  );
}

export default App;
