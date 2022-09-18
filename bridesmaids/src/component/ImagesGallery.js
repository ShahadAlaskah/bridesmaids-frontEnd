import { Box } from "@chakra-ui/react";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

 const ImagesGallery=()=> {

    const images=[
        {
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/"
        },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/"
        }
      ];

  return (
      <ImageGallery
        items={images}
        thumbnailPosition= "left"
        showPlayButton={false}
      />
  );
}
export default ImagesGallery;



// import { Box } from "@chakra-ui/react";
// import React from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import { useState , useEffect } from "react";

//  const ImagesGallery=(pictures)=> {
//  const [loading, setLoading] = useState(true);
//  const [images,setImages]=useState([])
  
//   useEffect(()=>{
//     const image = pictures.map((pic) =>{
//       return{
//         original: pic,
//         thumbnail: pic
//       }
//         })
//         setImages(image)
//         setLoading(false)
//       },[]);
    
//   return (
//     <>
//     {loading? <></>:
//       <ImageGallery
//       items={images}
//       thumbnailPosition= "left"
//       showPlayButton={false}
//     />
//     }
//     </>
      
//   );
// }
// export default ImagesGallery;
