import React, {Component} from 'react'

export default class NewAuctionForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <div className="col-sm-12 col-sm-order-2 col-sm-offset-3 d-flex align-items-center d-flex justify-content-center" style={{height:'700px'}}>
                    <div className="jumbotron">
                    <h2 className="display-5 d-flex justify-content-center">Create New Auction</h2>
                        <form>
                            <div className="form-group col-25">
                                <label className="col-form-label" for="formGroupItemName">Item Name</label>
                                <input type="text" class="form-control" id="itemName" placeholder="Enter your Item Name"/>
                            </div>
                            <div className="form-group col-25">
                                <label className="col-form-label" for="formGroupItemDesc">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div class="form-group col-25">
                                <label className="col-form-label" for="formGroupItemName">Price Range</label>
                                <input type="Number" className="form-control" id="minPrice" placeholder="Enter the minimum amount"/>
                                <input type="Number" className="form-control" id="maxPrice" placeholder="Enter the maximum amount"/>
                            </div>

                            <label className="custom-file">
                                <input type="file" id="file2" className="custom-file-input"/>
                                <span className="custom-file-control"></span>
                            </label>
                            <hr/>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>
        );
    }
}