import React, { Component } from 'react';

export default class ApiData extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props)
        const {data:{data, loading}, onFlaskData} = this.props;
        console.log(loading);
        return (
            <div>
                <button onClick={onFlaskData}>
                    Get Data from Flask
                </button>
                <br/>
                <span style={{color:"blue"}}>{loading}</span>
                <h2>Data goes here</h2>
                <DataList data={data}/>
            </div>
        )
    }
}

function DataList(props) {
    return (
        <div>
            {props.data.map((object) =>
                 <span key={object.id}> {object.name} {object.profession}</span>
                 )
            }
        </div>
    )
}

