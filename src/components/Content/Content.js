import React, {Component} from 'react';
import ItemList from '../ItemList/ItemList';
import './Content.css'
import 'bootstrap/dist/css/bootstrap.css';

class Content extends Component{

    render() {
        let maxId = 100;
        const {data, activeMedia, playMedia} = this.props;
        const contentWithMedia = activeMedia ? ' active' : '';
        let list = (data.length === 0) ? 'Content is empty!' : data.map((item) => {
            const { name, url, img, price } = item;
            return(
                <ItemList 
                    key={maxId++} 
                    url={url} 
                    name={name} 
                    img={img} 
                    price={price}
                    playMedia={() => playMedia(url)} />
            )
        });
        return(
            <ul className={`content ${contentWithMedia}`}>
                { list }
            </ul>
        );
    }

} 

export default Content;