import React from 'react';
import image from "./background2.jpg"
import "./style.css";

import Compress from 'react-image-file-resizer';
import Resizer from 'react-image-file-resizer';

// Resizer.imageFileResizer(
//     image, // the file from input
//     480, // width
//     480, // height
//     "PNG", // compress format WEBP, JPEG, PNG
//     100, // quality
//     0, // rotation
//     (uri) => {
//       console.log(uri);
//       // You upload logic goes here
//     },
//     "base64" // blob or base64 default base64
//   );


class Background extends React.Component {
    constructor(props){
        super(props)
        this.state={
            height: window.innerHeight,
            width: window.innerWidth
        }
    }

    componentDidlMount() {
        window.addEventListener("resize", ()=>{
            this.setState(
                {
                    "height": window.innerHeight < window.innerWidth * 0.5 ? window.innerWidth * 0.5 : window.innerHeight,
                    "width": window.innerWidth > window.innerHeight * 1.75 ? window.innerWidth : window.innerHeight * 1.75
                });
        });
    }

    // resizeFile = image => new Promise(resolve => {
    //     Resizer.imageFileResizer(image, 300, 300, 'PNG', 100, 0,
    //     uri => {
    //       resolve(uri);
    //     }
    //     );
    // })

    render() {
        return (
            <div className="fill-screen" on='true'>
                <img alt = "" src={image} width = {this.state.width}  height = {this.state.height} ></img>
            </div>
        )
    }
}

export default Background;

