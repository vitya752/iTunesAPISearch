import React, {Component} from 'react';
import './Search.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faSearch } from '@fortawesome/free-solid-svg-icons'

export default class Search extends Component {

    state = {
        selectedType: this.props.typesMedia[0].value,
        term: '',
        disabled: true,
        openWindow: true
    }

    render() {
        const { typesMedia } = this.props;
        const renderTypesMedia = typesMedia.map((item) => {
            return(
                <option key={item.value} value={item.value}>{item.label}</option>
            );
        });
        const close = this.state.openWindow ? '' : 'close';
        return(
            <div className="search">
                <button 
                    type="button" 
                    className="btn btn-success btn--open"
                    onClick={() => this.onSearchWindowSetState(true)}>
                        <FontAwesomeIcon icon={faSearch} />
                </button>
                <div className={`container-search ${close}`}>
                    <button 
                        type="button" 
                        className="btn btn-danger btn--close"
                        onClick={() => this.onSearchWindowSetState(false)}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </button>
                    <div className="container">
                        <h1 className="header mb-3">iTunes API Search</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Search</span>
                                </div>
                                <select 
                                    className="form-control select-custom" 
                                    onChange={this.onChangeType}
                                    value={this.state.selectedType}>
                                    { renderTypesMedia }
                                </select>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={this.onChangeTerm}
                                    value={this.state.term} />
                                <button 
                                    type="submit"
                                    className="btn btn-success btn-submit"
                                    disabled={this.state.disabled}>
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    onChangeType = (e) => {
        this.setState({
            selectedType: e.target[e.target.selectedIndex].value
        })
    }

    onChangeTerm = (e) => {
        this.setState({
            term: e.target.value,
            disabled: e.target.value.length > 0 ? false : true 
        })
    }

    onSubmit = (e) => {
        const { selectedType, term } = this.state;
        e.preventDefault();
        this.props.onSubmitQuery(selectedType, term);
        this.onSearchWindowSetState(false);
        this.props.onDisableScroll(false);
    }

    onSearchWindowSetState = (windowState) => {
        this.setState({
            openWindow: windowState
        });
        if( windowState === true ) {
            this.props.onDisableScroll(true);
        }else this.props.onDisableScroll(false);
    }

}