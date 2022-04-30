import React, {useEffect, useState} from 'react';
import './App.css';
import LeafletMapContainer from "./components/map/LeafletMapContainer";
import {Manifest} from "./iiif/Manifest";
import {Collection} from "./iiif/Collection";
import {AppBar, Box, Checkbox, Grid, Slider, Typography} from "@mui/material";
import ManifestCard from "./components/ManifestCard";
import MapCopyright from "./components/map/MapCopyright";

function App() {
    const [filterByDate, setFilterByDate] = useState(false);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [geoManifests, setGeoManifests] = useState<Manifest[]>([]);
    const [collectionLabel, setCollectionLabel] = useState<any | null>("loading");
    const [manifests, setManifests] = useState<Array<Manifest>>([]);
    const [filteredManifests, setFilteredManifests] = useState<Array<Manifest>>([]);
    const [dateRange, setDateRange] = useState([0,2022]);
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
        const _manifestsWithGeoJson = _filteredManifests.filter(manifest => manifest.navPlace());
        setGeoManifests(_manifestsWithGeoJson);
        setFilteredManifests(_filteredManifests);
    }, [manifests, filterByDate, dateRange]);

    // Slider
    const manifestYears: number[] = manifests.flatMap(manifest => manifest.navDateYear()).filter((v): v is number => v !== null);
    const marks = Array.from(new Set(manifestYears)).map((v) => ({ value: v, label: null}) );

    const handleDateChange = (event: any, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) newValue = [newValue, newValue];
        setDateRange(newValue);
    };

    return (
        <>
            <AppBar position="sticky">
                <Typography variant="h4" component="h1" p={2} bgcolor={"dimgray"}>{collectionLabel}</Typography>
            </AppBar>
            <Grid container spacing={2} pl={2} pr={2} pt={2}>
                <Grid item xs={12}>
                    <div className="row">
                        <LeafletMapContainer manifests={geoManifests}/>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Checkbox checked={filterByDate} onChange={(e) => {setFilterByDate( e.target.checked)}} />
                    <Typography variant="body1" display="inline" mr={4} sx={{clear:"none"}}>Limit by date range:</Typography>
                    <Slider
                        getAriaLabel={() => 'Years'}
                        value={dateRange}
                        min={1000}
                        max={2022}
                        step={1}
                        sx={{width:"60%", verticalAlign:"middle"}}
                        marks={marks}
                        onChange={handleDateChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value) => ""+value}
                        disableSwap
                        disabled={!filterByDate}
                    />
                </Grid>
            </Grid>
            {filteredManifests.map( (manifest, idx)  => (
                <Box maxWidth={200} sx={{float:"left"}} p={1} display="block">
                    <ManifestCard manifest={manifest} />
                </Box>
            ))}
            <MapCopyright />
        </>
    );
}

export default App;
