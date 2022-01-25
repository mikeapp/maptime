import {GeoJSON,  TileLayer, Tooltip, useMap} from 'react-leaflet';
import L, {IconOptions, LatLng} from 'leaflet';
import {ReactElement, useEffect, useState} from "react";
import {bbox, featureCollection} from "@turf/turf";


interface MapProps {
    geoJson:any
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
        if (props.geoJson === null) {
            setGeoJsonComponent([]);
            map.fitWorld();
        } else {
            const allBounds = bbox(featureCollection(props.geoJson));
            map.fitBounds([[allBounds[1], allBounds[0]], [allBounds[3], allBounds[2]]]);

            setGeoJsonComponent(props.geoJson.map((data: any, index: number) => (<GeoJSON
                key={"Map:" + index}
                data={data}
                pointToLayer={blueMarker}
                style={{color: 'blue'}}
            ><Tooltip>Hello</Tooltip></GeoJSON>)));
        }
    }, [props.geoJson, map]);

    return (
        <>
            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoJsonComponent}
        </>
    );
}