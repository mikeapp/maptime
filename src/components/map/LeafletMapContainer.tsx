import {MapContainer} from 'react-leaflet';
import Map from "./Map";
import React from "react";
import {Manifest} from "../../iiif/Manifest";
import {Box, Stack, Typography} from "@mui/material";
import "./LeafletMapContainer.css";

interface MapContainerProps {
    manifests:Manifest[];
    focus?: Manifest | null;
}

export default function LeafletMapContainer({manifests, focus}:MapContainerProps) {
    const manifestsWithGeoJson = manifests.filter(manifest => manifest.navPlace());
    return manifestsWithGeoJson.length === 0?
        <Stack className='LeafletContainer'
               justifyContent="center"
               alignItems="center">
            <Typography>No mappable items</Typography>
        </Stack>
        :
        <MapContainer zoom={2}  className='LeafletContainer'>
            <Map manifests={manifestsWithGeoJson} focus={focus}  />
        </MapContainer>
    ;
}