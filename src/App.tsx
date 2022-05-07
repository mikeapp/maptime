import React, {useEffect, useState} from 'react';
import './App.css';
import {Collection} from "./iiif/Collection";
import {AppBar, Toolbar, Typography} from "@mui/material";
import CollectionMap from "./components/CollectionMap";

function App() {
    const [collectionURI, setCollectionURI] = useState(new URLSearchParams(window.location.search).get("collection") || 'https://mikeapp.github.io/manifest-fixtures/collection/test.json')
    const [collection, setCollection] = useState<Collection | null>(null);
    const [collectionLabel, setCollectionLabel] = useState<any | null>("loading");

    const execute = async (options = {}) => {
        try {
            const c = new Collection(collectionURI);
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
    }, [collectionURI]);

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
