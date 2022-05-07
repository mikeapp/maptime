import {MapContainer} from 'react-leaflet';
import Map from "./Map";
import React, {CSSProperties} from "react";
import {Manifest} from "../../iiif/Manifest";
import {Box, Stack, Typography} from "@mui/material";

interface MapContainerProps {
    manifests:Manifest[];
    focus?: Manifest | null;
}

export default function LeafletMapContainer({manifests, focus}:MapContainerProps) {
    const manifestsWithGeoJson = manifests.filter(manifest => manifest.navPlace());
    const mapStyle:CSSProperties = {
        justifyContent:"center",
        width:"100%",
        height:"45vh",
        clear:"both",
        margin:"auto"
    };
    return manifestsWithGeoJson.length === 0?
        <Box sx={mapStyle}>
            <Typography>No mappable items</Typography>
        </Box>
        :
        <MapContainer zoom={2} style={mapStyle}>
            <Map manifests={manifestsWithGeoJson} focus={focus}  />
        </MapContainer>
    ;
}