import React, {useEffect, useState} from 'react';
import './App.css';
import LeafletMapContainer from "./map/LeafletMapContainer";
import {Manifest} from "./iiif/Manifest";
import {Collection} from "./iiif/Collection";
import {Grid, Typography} from "@mui/material";
import ManifestCard from "./components/ManifestCard";

function App() {
    const [collection, setCollection] = useState<Collection | null>(null);
    const [collectionLabel, setCollectionLabel] = useState<any | null>("loading");
    const [manifests, setManifests] = useState<Array<Manifest>>([]);
    const execute = async (options = {}) => {
        try {
            const c = new Collection('https://localhost:3000/collection/test.json');
            await c.fetch();
            const l = c.iiif?.getDefaultLabel();
            let m = c.manifests();
            setCollection(c);
            setCollectionLabel(l);
            setManifests(m)
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }
    useEffect(() => {
        execute();
    }, []);

    const features = manifests?.map( manifest => manifest.navPlace()?.['features']?.[0] ).filter( v => v !== undefined)
    const geoJson = () => features || null;
    const manifestLabels = () => manifests?.map(manifest => manifest.label())

    return (
        <Grid container spacing={2} pl={2} pr={2}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h1">{collectionLabel}</Typography>
                <div className="row">
                    <LeafletMapContainer geoJson={geoJson()} labels={manifestLabels()}/>
                </div>
            </Grid>
            {manifests.map( (manifest, idx)  => (
                <Grid item xs={3} sx={{ maxWidth: 150 }} >
                    <ManifestCard manifest={manifest}  />
                </Grid>
            ))}
            <Grid item xs={12}>
                <p className="copyright">Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</p>
            </Grid>
        </Grid>
    );
}

export default App;
