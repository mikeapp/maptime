import {MapContainer} from 'react-leaflet';
import Map from "./Map";
import React from "react";
import {Manifest} from "../../iiif/Manifest";

interface MapContainerProps {
    manifests:Manifest[];
    focus?: Manifest | null;
}

export default function LeafletMapContainer({manifests, focus}:MapContainerProps) {
    const manifestsWithGeoJson = manifests.filter(manifest => manifest.navPlace());
    if (manifestsWithGeoJson.length === 0) return (<></>);
    return (
        <MapContainer zoom={2}  className='LeafletContainer'>
            <Map manifests={manifestsWithGeoJson} focus={focus}  />
        </MapContainer>
    );
}