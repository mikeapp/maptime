import {GeoJSON,  TileLayer, Tooltip, useMap} from 'react-leaflet';
import L, {IconOptions, LatLng} from 'leaflet';
import React, {ReactElement, useEffect, useState} from "react";
import {bbox, featureCollection} from "@turf/turf";
import {Manifest} from "../../iiif/Manifest";


interface MapProps {
    manifests: Manifest[];
}

const iconProps:IconOptions = {
    iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
}
const blueIcon = L.icon(iconProps);
const blueMarker = (geoJsonPoint:any, latlng: LatLng) => {
    return new L.Marker(latlng, {icon: blueIcon});
}

export default function Map(props:MapProps) {
    const [geoJsonComponent, setGeoJsonComponent] = useState<null | Array<ReactElement>>(null);
    const map = useMap();

    useEffect(() => {
        const geoJson = props.manifests.map( manifest => manifest.navPlace()?.['features']?.[0] );
        const labels = props.manifests.map(manifest => manifest.label());
        console.log(geoJson);
        console.log(labels);
        if (geoJson === null || geoJson.length === 0) {
            setGeoJsonComponent([]);
            map.fitWorld();
        } else {
            setGeoJsonComponent(geoJson.map((data: any, index: number) => (<GeoJSON
                key={"Map:" + props.manifests[index].uri}
                data={data}
                pointToLayer={blueMarker}
                style={{color: 'blue'}}
            ><Tooltip>{labels[index]}</Tooltip></GeoJSON>)));

            const allBounds = bbox(featureCollection(geoJson));
            map.fitBounds([[allBounds[1], allBounds[0]], [allBounds[3], allBounds[2]]]);
        }
    }, [props.manifests, map]);

    return (
        <>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoJsonComponent}
        </>
    );
}