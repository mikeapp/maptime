import React from 'react';
import './App.css';
import LeafletMapContainer from "./map/LeafletMapContainer";


const geoJsonData = {
    type: "Feature",
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0]
            ]
        ]
    }
};

function App() {
  return (
    <div className='App'>
        <h1>IIIF Story Map</h1>
        <LeafletMapContainer geoJson={ geoJsonData } />
        <p>&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</p>
    </div>
  );
}

export default App;
