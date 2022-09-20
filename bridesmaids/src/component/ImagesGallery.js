
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState , useEffect } from "react";

 const ImagesGallery=({pictures})=> {
 const [loading, setLoading] = useState(true);
 const [images,setImages]=useState([])
  
  useEffect(()=>{
    const image = pictures.map((pic) =>{
      return{
        original: pic,
        thumbnail: pic,
            }
        })
        setImages(image)
        setLoading(false)
      },[]);
    
  return (
    <>
    {loading? <></>:
      <ImageGallery
      items={images}
      thumbnailPosition= "left"
      showPlayButton={false}
      disableThumbnailScroll={true}
      additionalClass="image-gallery"
    />
    }
    </>
      
  );
}
export default ImagesGallery;



