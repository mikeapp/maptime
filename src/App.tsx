import React, {useEffect, useState} from 'react';
import './App.css';
import LeafletMapContainer from "./components/map/LeafletMapContainer";
import {Manifest} from "./iiif/Manifest";
import {Collection} from "./iiif/Collection";
import {AppBar, Box, Checkbox, Toolbar, Typography} from "@mui/material";
import ManifestCard from "./components/ManifestCard";
import MapCopyright from "./components/map/MapCopyright";
import DateRangeSlider from "./components/dateRange/DateRangeSlider";
import UVDialog from "./components/mirador/UVDialog";
import CollectionMap from "./components/collectionMap/CollectionMap";

function App() {
    const [collection, setCollection] = useState<Collection | null>(null);
    const [collectionLabel, setCollectionLabel] = useState<any | null>("loading");

    const execute = async (options = {}) => {
        try {
            const c = new Collection('https://mikeapp.github.io/manifest-fixtures/collection/test.json');
            await c.fetch();
            const l = c.iiif?.getDefaultLabel();
            setCollection(c);
            setCollectionLabel(l);
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }
    useEffect(() => {
        execute();
    }, []);

    const collectionMap = () => {
        return collection !== null?
            <CollectionMap collection={collection} />
            :
            <></>
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{backgroundColor:"dimgray"}}>
                    <Typography variant="h5" component="h1" p={2}>{collectionLabel}</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            {collectionMap()}
        </>
    );

}

export default App;
