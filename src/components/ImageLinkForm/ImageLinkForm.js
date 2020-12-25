import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({OnInputChange,OnSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in the picture give it a try'}
            </p>
            <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input type='text' onChange={OnInputChange}/>
                <button 
                onClick = {OnSubmit}
                className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                >Detect</button>
            </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;