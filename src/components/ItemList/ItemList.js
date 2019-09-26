import React from 'react';
import './ItemList.css';

const ItemList = ({ name, url, img, price, playMedia }) => {
    return(
        <li 
            data-name={name}
            onClick={playMedia}>
            <img src={img} alt={name} />
        </li>
    );
};

export default ItemList;