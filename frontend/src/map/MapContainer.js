import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import keys from '../keys';
import axios from 'axios';
import './Map.scss';

export class MapContainer extends Component {

    state = {
        coordinates: [
            // {
            //     longitude: 0,
            //     lantitude: 0,
            //     location: "",
            //     counter: 0
            // }
        ]
    }

    async componentDidMount() {
        // get all users
        const users = await axios.get('/users');
        users.data.map(async user => {
            // get coordinates for each user from geocode api
            let coordinates = await axios.get(`/geocode/${user.country}`);
            // get num of user for the country
            let numOfUsersFromCountry = await axios.get(`/users/counries/${user.country}`);
            let obj = {
                country: user.country.charAt(0).toUpperCase() + user.country.slice(1),
                counter: numOfUsersFromCountry.data.totalUsersFromCountry,
                longitude: coordinates.data.longitude,
                lantitude: coordinates.data.lantitude,
            }
            console.log(obj);
            this.setState({ coordinates: [...this.state.coordinates, obj] });
        });
    }

    getUniqueCounries(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    render() {

        const unique = this.getUniqueCounries(this.state.coordinates, 'country');

        const counriesTags = unique.map((c, index) => (
            <div key={index} className="field is-grouped is-grouped-multiline">
                <div className="control">
                    <div className="tags has-addons">
                        <span className="tag is-dark">{c.country}</span>
                        <span className="tag is-outlined">{c.counter}</span>
                    </div>
                </div>
            </div>
        ));

        const markerTemplate = this.state.coordinates.map((c, index) =>
            <Marker
                key={index}
                title={c.country}
                name={c.country}
                position={{ lat: c.longitude, lng: c.lantitude }}
            />
        );

        return (
            <>
                <div className="box map-box">
                    <div className="container">
                        <p className="menu-label">Legend:</p>
                        {counriesTags}
                    </div>
                </div>

                <Map google={this.props.google}
                    zoom={4}
                    initialCenter={{
                        lat: 39.04105295,
                        lng: 17.15858459
                    }}>
                    {markerTemplate}
                </Map>
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: keys.googleMaps
})(MapContainer)