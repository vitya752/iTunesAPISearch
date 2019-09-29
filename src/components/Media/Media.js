import React from 'react';
import './Media.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const Media = ({ url, typeMedia, closeMedia }) => {
    let content;
    switch(typeMedia) {
        case 'music':{
            content = <audio autoPlay controls src={url} />;
            break;
        }
        default:{
            content = <video autoPlay controls src={url} />;
        }
    }
    return(
        <div className="media">
            { content }
            <button 
                type="button"
                className="btn btn-danger btn-media-close"
                onClick={closeMedia}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
        </div>
    );
};

export default Media;