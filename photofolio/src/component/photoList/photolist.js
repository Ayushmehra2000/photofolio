import "../photoList/photolist.css"
import { useRef, useState , useEffect} from "react";

// import firebase here
import { db } from "../../firebaseinit";
import { collection, addDoc,doc, deleteDoc , onSnapshot, updateDoc} from "firebase/firestore";
export default function PhotoList({selectedAlbum,togglebtwAlbumandPhoto}){
    const [images,setImages] = useState([]);
    const imageName = useRef(null);
    const imageAddress = useRef(null);
    const [showform,setShowform] = useState(false);
    const [updateImage, setUpdateImage] = useState(false);
    const [updateId, setUpdateId] = useState(null);


    // functions for database for imagelist management 
    const getImageDataofFolders=()=>{
        const unsub = onSnapshot(collection(db, "ImagesFolder"), (Snapshot) => {
          const photos = Snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setImages(photos,...images);
        });
    }
    
    useEffect(()=>{
    getImageDataofFolders();
    },[]);

    const addImagetodatabase = async (Imagedata)=>{
        const docRef = await addDoc(collection(db, "ImagesFolder"), Imagedata);
        setImages([{id:docRef.id,...Imagedata},...images]);
    }
    const deleteImagefromdatabase = async (id)=>{
        await  deleteDoc(doc(db,"ImagesFolder", id));
        const updatefolder=images.filter((data)=> data.id !== id);
        setImages(updatefolder)
    }

    const editImageINdatabase = async (imagedata)=>{
        const expenseRef = doc(db, "ImagesFolder", imagedata.id);
        await updateDoc(expenseRef, imagedata);
    }



    // function for frontend work 
    const onsubmit = (e)=>{
        e.preventDefault();
    }

    const handleshowform = ()=>{
        setShowform(!showform)
    }

    const handleAddImage= ()=>{
        const title = imageName.current.value;
        const address =imageAddress.current.value ;
        if(!title || !address){
            return;
        }
        const imgdata = {
            albumId:selectedAlbum.id,
            title:title ,
            address :  address
        }
        if(updateImage){
            const imgdatas = {
                id:updateId,
                ...imgdata
            }
            editImageINdatabase(imgdatas);
            clearInput();
            setUpdateImage(false);
            return;
        }
        addImagetodatabase(imgdata);
        clearInput();
        return;
    }

    const handleEdit = (data)=>{
        setUpdateImage(true);
        setShowform(true);
        imageName.current.value = data.title;
        imageAddress.current.value = data.address;
        setUpdateId(data.id)
    }

    const clearInput =() =>{
        imageName.current.value="";
        imageAddress.current.value="";
    }
    return(<>
    <div id={showform ?"Photo-form-container":"Photo-form-container-2"}>
        <div className="photo-form">
            <form action="submit" onSubmit={onsubmit}>
                <h2>Add Image to {selectedAlbum.name}</h2>
                <input type="text" id="Image-Name" placeholder="Image Name" ref={imageName} required/><br />
                <input type="text" id="Image-Address" placeholder="Image Address" ref={imageAddress} required/><br />
                <button onClick={clearInput} className="clear-image-input">Clear</button>
                <button onClick={handleAddImage} className="submit-image-input">Submit</button>
            </form>
        </div>
    </div>
    <div className="photolist-container">
        <div className="back-button" onClick={()=>togglebtwAlbumandPhoto(false)}>
            <img src="https://stalwart-wisp-382f3c.netlify.app/assets/back.png" alt="Back-Button"/></div>
        <div><h2>Images On Ablum {selectedAlbum.name}</h2></div>
        <div><button className={showform ? "Cancel":"AddToAlbum"} onClick={handleshowform} >{showform ?"Cancel":"Add Image"}</button></div>
    </div>
    <hr />
    <div id="imagelist-container">
        <ul>
            {images.map((data,i)=>{
                return(<>
                {data.albumId === selectedAlbum.id ? 
                    <li>
                        <div className="Image-block">
                            <div className="block-img">
                                <img src={data.address} alt={data.title} />
                            </div>
                            <h4>{data.title}</h4>
                            <div onClick={()=>handleEdit(data)} className="editImage"><img src="https://stalwart-wisp-382f3c.netlify.app/assets/edit.png" alt="edit-option"/></div>
                            <div onClick={()=>deleteImagefromdatabase(data.id)} className="editImage"><img src="https://stalwart-wisp-382f3c.netlify.app/assets/trash-bin.png" alt="edit-option"/></div>
                        </div>
                    </li> : null
                }
                </>)
            })}
        </ul>
    </div>
    </>);
}