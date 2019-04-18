import React, { Component } from 'react';
import { Consumer } from '../../context'

class Tracks extends Component {
    render() {
        return ( 
        <Consumer>
            { value => {
                return <h1>Tracks</h1>
            }}
            console.log(value);
        </Consumer>
        );
    }
}

export default Tracks;