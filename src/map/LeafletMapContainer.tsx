import {MapContainer} from 'react-leaflet';
import Map from "./Map";
import React from "react";

interface MapContainerProps {
    geoJson:any;
    labels:string[];
}

export default function LeafletMapContainer(props:MapContainerProps) {
    return (
        <MapContainer zoom={2}  className='LeafletContainer'>
            <Map geoJson={props.geoJson} labels={props.labels} />
        </MapContainer>
    );
}