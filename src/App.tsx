import React from 'react';
import './App.css';
import Map from "./map/Map";

function App() {
  return (
    <div className='App'>
        <Map geoJson={
            {
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
            }
        } />
        <p>&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</p>
    </div>
  );
}

export default App;
