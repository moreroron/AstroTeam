import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import keys from '../keys';
import axios from 'axios';

export class MapContainer extends Component {

    state = {
        coordinates: []
    }

    componentDidMount() {
        // get all users
        axios.get('http://localhost:3001/users').then(res => {
            const users = res.data;
            users.map((user) => {
                // get coordinates for each user from geocode api
                axios.get(`http://localhost:3001/geocode/${user.country}`).then(res => {
                    console.log(res.data);
                    // this.setState({ coordinates: [...this.state, res.data] })
                    // cord.push(res.data);
                    this.setState({ coordinates: [...this.state.coordinates, res.data] })
                    // setCoordinates([...coordinates, res.data]);
                })
            });
        })
    }

    render() {
        console.log(this.state.coordinates);
        const markerTemplate = this.state.coordinates.map((c, index) =>
            <Marker
                key={index}
                title={'israel'}
                name={'ISRAEL'}
                position={{ lat: c.longitude, lng: c.lantitude }}
            />
        );

        return (
            <div className="div">
                <Map
                    google={this.props.google}
                    zoom={5}
                    initialCenter={{
                        lat: 39.04105295,
                        lng: 17.15858459
                    }}
                >
                    {markerTemplate}
                </Map>
            </div>

        );
    }
}


export default GoogleApiWrapper({
    apiKey: keys.googleMaps
})(MapContainer)