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

function App() {
    const [filterByDate, setFilterByDate] = useState(false);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [collectionLabel, setCollectionLabel] = useState<any | null>("loading");
    const [manifests, setManifests] = useState<Array<Manifest>>([]);
    const [focusManifest, setFocusManifest] = useState<Manifest | null>(null);
    const [filteredManifests, setFilteredManifests] = useState<Array<Manifest>>([]);
    const [dateRange, setDateRange] = useState([0,2022]);
    const [viewerManifest, setViewerManifest] = useState<Manifest | null>(null);

    const onSelectFocusManifest = (manifest: Manifest) => {
        if (manifest === focusManifest) {
            setFocusManifest(null);
        } else {
            setFocusManifest(manifest);
        }
    }

    const onViewerClose = () => {
        setViewerManifest(null);
    }

    const execute = async (options = {}) => {
        try {
            const c = new Collection('https://mikeapp.github.io/manifest-fixtures/collection/test.json');
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

    useEffect( () => {
        let _filteredManifests = manifests;
        if (filterByDate) {
            let earliestYear = dateRange[0];
            let latestYear = dateRange[1];
            _filteredManifests = manifests.filter((manifest) => {
                const year = manifest?.navDateYear();
                return (year !== null) && year <= latestYear && year >= earliestYear
            });
            _filteredManifests.sort( (a,b) => (a.navDateYear() || 0) - (b.navDateYear() || 0) );
        }
        setFilteredManifests(_filteredManifests);
    }, [manifests, filterByDate, dateRange]);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{backgroundColor:"dimgray"}}>
                    <Typography variant="h5" component="h1" p={2}>{collectionLabel}</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Box>
                <div className="row">
                    <LeafletMapContainer manifests={filteredManifests} focus={focusManifest}/>
                </div>
            </Box>
            <Box hidden={!collection?.manifests().some((manifest) => manifest.navDateYear())}>
                <Checkbox checked={filterByDate} onChange={(e) => {
                    setFilterByDate(e.target.checked)
                }}/>
                <Typography variant="body1" display="inline-block"  pr={4} sx={{clear:"none"}}>Limit by date range:</Typography>
                <DateRangeSlider collection={collection} disabled={!filterByDate} dateRange={dateRange} setDateRange={setDateRange} />
            </Box>
            <UVDialog manifest={viewerManifest} handleClose={onViewerClose} />
            {filteredManifests.map( (manifest, idx)  => (
                <Box maxWidth={200} sx={{float:"left"}} p={1} display="block" key={manifest.uri}>
                    <ManifestCard
                        manifest={manifest}
                        onSelect={onSelectFocusManifest}
                        isSelected={manifest === focusManifest}
                        onShowInViewer={setViewerManifest} />
                </Box>
            ))}
            <MapCopyright />
        </>
    );
}

export default App;
