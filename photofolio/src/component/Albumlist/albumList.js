import "../Albumlist/albumlist.css";

export default function AlbumList({albums}){
    return(<>
    <div id="main-container">
        <div>{albums.map((data,i)=>{
            return(data.name);
        })}</div>
    </div>
    </>);
}