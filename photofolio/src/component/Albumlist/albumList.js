import "../Albumlist/albumlist.css";
import { useState, useRef, useEffect} from 'react';
import {TiDelete} from "react-icons/ti";

export default function AlbumList({albums , removeFolder, AddAlbum, togglebtwAlbumandPhoto, selectedAlbum}){
    const [toggle, setToggle] = useState(true);
    const albumName = useRef(null);

    useEffect(()=>{
        if(toggle){
            albumName.current.focus()
        }
    },[])

    function handletoggle(){
        setToggle(!toggle)
    }
    function clearInput(){
        albumName.current.value="";
    }

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(albumName.current.value === ""){
            alert("Please enter a valid name");
            return;
        }
        const albumdata={
            name: albumName.current.value
        }
        AddAlbum(albumdata);
        clearInput();
        return;
    }
    const handleSelectedAlbum = (data) =>{
        togglebtwAlbumandPhoto(true);
        selectedAlbum(data)
    }
    return(<>
    <div className="container">
            <div className={toggle?"form-container-toggle":"form-container"}>
                <form action="submit">
                    <label id="albumname" name="albumname">Create an album</label><br /><br />
                    <input type='text' placeholder='Album Name...' className='input-album-name' ref={albumName} required/>
                    <button id="clear" onClick={clearInput}>Clear</button>
                    <button id="Create" onClick={(e)=>handleSubmit(e)}>Create</button>
                </form>
            </div>
            <div className='Heading-container'>
                <div className='heading'><h2>Your albums</h2></div>
                <div className='form-button'>
                    <button onClick={handletoggle} className={toggle ? "AddToAlbum":"Cancel"}>{toggle ?"Add a Album" : "Cancel"}</button>
                </div>
            </div>
    </div>
    <hr />
    <div id="main-container">
        <ul>
        {albums.map((data,i)=>{
            return(<>
            <li key={i}>
                <div className="folder">
                    <div className="folder-img" >
                        <img onClick={()=>handleSelectedAlbum(data)} src="https://img.icons8.com/?size=512&id=12160&format=png" alt="folder-img" />
                    </div>
                    <h2>{data.name}</h2>
                    <div className="remove" onClick={()=>removeFolder(data.id)}><TiDelete /></div>
                </div>
            </li>
            </>
            );
        })}
        </ul>
    </div>
    </>);
}