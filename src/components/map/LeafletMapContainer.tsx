import {MapContainer} from 'react-leaflet';
import Map from "./Map";
import React from "react";
import {Manifest} from "../../iiif/Manifest";

interface MapContainerProps {
    manifests:Manifest[];
}

export default function LeafletMapContainer(props:MapContainerProps) {
    const manifestsWithGeoJson = props.manifests.filter(manifest => manifest.navPlace());
    return (
        <MapContainer zoom={2}  className='LeafletContainer'>
            <Map manifests={manifestsWithGeoJson}  />
        </MapContainer>
    );
}