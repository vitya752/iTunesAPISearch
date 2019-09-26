import React, {Component} from 'react';
import './Search.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Search extends Component {

    state = {
        selectedType: this.props.typesMedia[0].value,
        term: ''
    }

    render() {
        const { typesMedia } = this.props;
        const renderTypesMedia = typesMedia.map((item) => {
            return(
                <option key={item.value} value={item.value}>{item.label}</option>
            );
        });
        return(
            <div className="container-search">
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
                            className="btn btn-success btn-submit">
                            Search
                        </button>
                    </div>
                </form>
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
            term: e.target.value
        })
    }

    onSubmit = (e) => {
        const { selectedType, term } = this.state;
        e.preventDefault();
        this.props.onSubmitQuery(selectedType, term);
    }

}