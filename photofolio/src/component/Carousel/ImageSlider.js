import { useEffect , useState } from "react";
import "../Carousel/imageSlider.css"
import { FaArrowLeft , FaArrowRight} from 'react-icons/fa';
import {TiDelete} from "react-icons/ti";
export default function ImageCarousel({imageSliderData,selected,setShowSlider,selectedAlbum}){
    const [length, setLength] = useState(0);
    const [imagesdata,setImagesdata]=useState([])
    const imageDisplay = [];
    const [currentSlide,setCurrentSlide] = useState(0);

    useEffect(()=>{
        imageSliderData.map((data,index)=>{
            if(data.albumId === selectedAlbum.id){ 
                if(!imageDisplay.includes(data)){
                    imageDisplay.push(data);  
                    console.log(data.address)
                }
            }
            console.log(currentSlide);
        });
        imageDisplay.map((data,index)=>{
            if(data.id === selected){
                setCurrentSlide(index);
            }
        })
        setImagesdata(imageDisplay);
        setLength(imageDisplay.length);
    },[]);
    const leftArrow = ()=>{
        let Slide = currentSlide<=0 ? length-1 : currentSlide-1;
        setCurrentSlide(Slide);
    }
    const rightArrow = () =>{
        let Slide = currentSlide===length-1? 0 : currentSlide+1 ;
        setCurrentSlide(Slide);
    }
    
    return(<>
      <div id="ImageSliderContainer">
        <div className="left-arrow" onClick={leftArrow}><FaArrowLeft /></div>
        <div className="Center-Image">
            {length===0 ? "" : <img src={imagesdata[currentSlide].address} alt={imagesdata[currentSlide].title} /> }
        </div>
        <div className="right-arrow" onClick={rightArrow}><FaArrowRight /></div>
        <div className="cancel-window" onClick={()=>setShowSlider(false)}><TiDelete /></div>
      </div>
    </>);
}