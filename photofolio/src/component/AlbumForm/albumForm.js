import './albumform.css'

export default function AlbumForm(){
    return(
        <>
        <div className="container">
            <div className='form-container'>
                <form action="submit">
                    <label id="albumname" name="albumname">Create an album</label><br /><br />
                    <input type='text' placeholder='Album Name...' className='input-album-name' />
                    <button id="clear">Clear</button>
                    <button id="Create">Create</button>
                </form>
            </div>
            <div className='Heading-container'>
                <div className='heading'><h2>Your albums</h2></div>
                <div className='form-button'>
                    <button>Add a Album</button>
                </div>
            </div>
        </div>
        </>
    );
}