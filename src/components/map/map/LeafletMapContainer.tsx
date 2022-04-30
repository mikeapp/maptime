import {MapContainer} from 'react-leaflet';
import Map from "./Map";
import React from "react";
import {Manifest} from "../../../iiif/Manifest";

interface MapContainerProps {
    manifests:Manifest[];
}

export default function LeafletMapContainer(props:MapContainerProps) {
    return (
        <MapContainer zoom={2}  className='LeafletContainer'>
            <Map manifests={props.manifests}  />
        </MapContainer>
    );
}