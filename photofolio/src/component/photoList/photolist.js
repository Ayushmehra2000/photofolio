import "../photoList/photolist.css"

export default function PhotoList({selectedAlbum,togglebtwAlbumandPhoto}){
    return(<>
    <button onClick={()=>togglebtwAlbumandPhoto(false)}>X</button>
    <h3>{selectedAlbum.id}</h3>
    <h4>{selectedAlbum.name}</h4>
    </>);
}