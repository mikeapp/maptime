import React, {useEffect, useState} from 'react';
import './App.css';
import LeafletMapContainer from "./map/LeafletMapContainer";
import {Manifest} from "./iiif/Manifest";
import {Collection} from "./iiif/Collection";
import {Checkbox, Grid, Slider, Typography} from "@mui/material";
import ManifestCard from "./components/ManifestCard";

function App() {
    const [filterByDate, setFilterByDate] = useState(false);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [geoJSON, setGeoJSON] = useState<any[] | null>(null);
    const [collectionLabel, setCollectionLabel] = useState<any | null>("loading");
    const [manifests, setManifests] = useState<Array<Manifest>>([]);
    const [filteredManifests, setFileteredManifests] = useState<Array<Manifest>>([]);
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
        // Filtered data
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

        let geoJsonFromCollection: any = _filteredManifests?.map( manifest => manifest.navPlace()?.['features']?.[0] ).filter( v => v !== undefined);
        if (geoJsonFromCollection.length == 0) {
            geoJsonFromCollection = null;
        }
        setGeoJSON(geoJsonFromCollection);
        setFileteredManifests(_filteredManifests);
    }, [manifests, filterByDate, dateRange]);

    // Slider
    const manifestYears: number[] = manifests.flatMap(manifest => manifest.navDateYear()).filter((v): v is number => v !== null);
    const marks = manifestYears.map((v) => ({ value: v, label: `${v}`}) );

    const handleDateChange = (event: any, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) newValue = [newValue, newValue];
        setDateRange(newValue);
    };

    return (
        <Grid container spacing={2} pl={2} pr={2}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h1">{collectionLabel}</Typography>
                <div className="row">
                    <LeafletMapContainer geoJson={geoJSON} labels={filteredManifests?.map(manifest => manifest.label())}/>
                </div>
            </Grid>
            <Grid item xs={3}>
                <Checkbox checked={filterByDate} onChange={(e) => {setFilterByDate( e.target.checked)}} /> Restrict to date range
            </Grid>
            <Grid item xs={9} pr={2} mt={2}>
                <Slider
                    getAriaLabel={() => 'Years'}
                    value={dateRange}
                    min={-1000}
                    max={2022}
                    step={1}
                    marks={marks}
                    onChange={handleDateChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value) => ""+value}
                    disableSwap
                    disabled={!filterByDate}
                />
            </Grid>
            {filteredManifests.map( (manifest, idx)  => (
                <Grid item xs={2} sx={{ maxWidth: 150 }} >
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
