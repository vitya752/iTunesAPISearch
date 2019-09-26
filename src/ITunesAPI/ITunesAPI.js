export default class ITunesAPI {

    _apiBase = 'https://itunes.apple.com/search';

    getResource = async (url) => {
        const newUrl = new URL(`${this._apiBase}${url}`);
        const responce = await fetch(newUrl, { method: 'POST' });
        return await responce.json();
    };
    
    getMedia = async (term, media) => {
        const newQuery = term.toLowerCase().split(' ').join('+');
        const res = await this.getResource(`?term=${newQuery}&media=${media}`);
        return await res.results.map(this._transformResults);
    };

    _transformResults = (item) => {
        return{
            name: item.trackName,
            img: item.artworkUrl100,
            url: item.previewUrl,
            price: item.trackPrice
        }
    };

}