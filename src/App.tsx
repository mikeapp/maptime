import React, {useEffect, useState} from 'react';
import './App.css';
import LeafletMapContainer from "./map/LeafletMapContainer";
import {Manifest} from "./iiif/Manifest";
import {Collection} from "./iiif/Collection";

function App() {
    const [geoJson, setGeoJson] = useState<any>(null);
    const [manifestLabels, setManifestLabels] = useState<string[]>([]);
    const [label, setLabel] = useState<any | null>("loading");
    const [manifests, setManifests] = useState<Array<Manifest>>([]);
    const execute = async (options = {}) => {
        try {
            const c = new Collection('https://localhost:3000/collection/test.json');
            await c.fetch();
            const l = c.iiif?.getDefaultLabel();
            let m = c.manifests();
            setLabel(l);
            setManifests(m)
            setGeoJson(c.features());
            setManifestLabels(m.map(manifest => manifest.label()));
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }
    useEffect(() => {
        execute();
    }, []);

    return (
        <div className='App'>
            <h1>{label}</h1>
            <LeafletMapContainer geoJson={geoJson} labels={manifestLabels}/>
            {manifests.map( (manifest, idx)  => (
                <div>
                    <img src={manifest?.thumb(200)} alt={manifest.label()} key={idx} className="thumb"/>
                    <p>{manifest.label()}</p>
                </div>
            ))}
            <p className="copyright">&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</p>
        </div>

    );
}

export default App;
