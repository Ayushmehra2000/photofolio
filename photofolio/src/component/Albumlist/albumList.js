import "../Albumlist/albumlist.css";

export default function AlbumList({albums , removeFolder}){
    return(<>
    <div id="main-container">
        {albums.map((data,i)=>{
            return(<>
            <div className="folder" key={i} >
               <div>
                <img src="https://img.icons8.com/?size=512&id=12160&format=png" />
               </div>
               <h3>{data.name}</h3>
               <button className="remove" onClick={()=>removeFolder(data.id)}>X</button>
            </div></>
            );
        })}
    </div>
    </>);
}