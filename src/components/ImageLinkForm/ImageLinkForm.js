import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in the picture give it a try'}
            </p>
            <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input type='text' />
                <button 
                className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                
                >Detect</button>
            </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;