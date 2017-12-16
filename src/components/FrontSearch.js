import React, {Component} from 'react'

export default class FrontSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="col-sm-12 col-sm-order-2 col-sm-offset-3 d-flex align-items-center justify-content-center" style={{height:'700px'}}>
                    <div className="jumbotron">
                        <h1 className="display-5 d-flex justify-content-center">Find your item</h1>
                        <p className="lead d-flex justify-content-center">Search Auctions in the Southampton </p>
                        <p className="lead d-flex justify-content-center"> you may find what you are looking for! </p>
                        <hr className="my-4"/>
                        <div className="d-flex justify-content-center">
                            <input type="text"  placeholder="Search" />
                            <button onClick={this.props.onSearch} type="submit" className="btn btn-outline-primary"> Search  </button> 
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}