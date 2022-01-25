import {MapContainer} from 'react-leaflet';
import Map from "./Map";

interface MapProps {
    geoJson:any
}

export default function LeafletMapContainer(props:MapProps) {
    return (
        <MapContainer zoom={3}  className='LeafletContainer'>
            <Map geoJson={props.geoJson} />
        </MapContainer>
    );
}