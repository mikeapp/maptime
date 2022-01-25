import {GeoJSON, MapContainer, TileLayer, Tooltip} from 'react-leaflet';
import L, {IconOptions, LatLng} from 'leaflet';
import {useEffect, useState} from "react";

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
    const [geoJsonComponent, setGeoJsonComponent] = useState(<></>);
    useEffect(() => {
        if (props.geoJson === null) {
            setGeoJsonComponent(<></>);
            return;
        }
        setGeoJsonComponent( (<GeoJSON
            key='1'
            data={props.geoJson}
            pointToLayer={blueMarker}
            style={{color: 'blue'}}
        ><Tooltip>Hello</Tooltip></GeoJSON>) );
    }, [props.geoJson]);

    return (
        <MapContainer center={[0, 0]} zoom={3} className='LeafletContainer'>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {geoJsonComponent}
        </MapContainer>
    );
}