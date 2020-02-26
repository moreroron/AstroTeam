import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import keys from '../keys';

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={5}
                initialCenter={{
                    lat: 39.04105295,
                    lng: 17.15858459
                }}
            >
                <Marker
                    title={'israel'}
                    name={'ISRAEL'}
                    position={{ lat: 33.59231525, lng: 35.17616272 }} />

                <Marker
                    title={'israel'}
                    name={'ISRAEL'}
                    position={{ lat: 46.20692332, lng: 2.56874084 }} />

                <Marker
                    title={'italy'}
                    name={'ITALY'}
                    position={{ lat: 41.25767829, lng: 14.96131897 }} />



                {/* <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>blaaaaa</h1>
                    </div>
                </InfoWindow> */}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: keys.googleMaps
})(MapContainer)