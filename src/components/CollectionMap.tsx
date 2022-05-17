import {Collection} from "../iiif/Collection";
import React, {useEffect, useState} from "react";
import {Manifest} from "../iiif/Manifest";
import {AppBar, Box, IconButton, Checkbox, Container, Grid, Toolbar, Typography, Button} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import ManifestMapContainer from "./ManifestMapContainer";
import DateRangeSlider from "./DateRangeSlider";
import UVDialog from "./UVDialog";
import ManifestCard from "./ManifestCard";
import ManifestMapCopyright from "./ManifestMapCopyright";

type CollectionMapProperties = {
    collection: Collection;
    viewerPath: string;
}

const CollectionMap = ({collection, viewerPath}: CollectionMapProperties) => {
    const [filterByDate, setFilterByDate] = useState(false);
    const [showMap, setShowMap] = useState(true);
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

    useEffect(()=>{
        let m = collection.manifests();
        setManifests(m)
    }, [collection]);

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

    const displayControls = () => {
        return <Box pt={4}>
            <Box ml={7} component="span">
                <Button
                    size="small"
                    variant={showMap? "contained" : "outlined"}
                    onClick={(e:any) => setShowMap(!showMap)}
                    startIcon={<MapIcon />}>
                    {showMap? "Hide map" : "Show map"}
                </Button>
            </Box>
            <Box ml={2} component="span" hidden={!collection?.manifests().some((manifest) => manifest.navDateYear())}>
                <Button
                    size="small"
                    variant={filterByDate? "contained" : "outlined"}
                    onClick={(e:any) => setFilterByDate(!filterByDate)}
                    startIcon={<CalendarMonthIcon />}>
                    {filterByDate? "Remove date limit" : "Limit by date range"}
                </Button>
            </Box>
            <Box ml={4} component="span" width={4}>
                <DateRangeSlider collection={collection} disabled={!filterByDate} dateRange={dateRange} setDateRange={setDateRange} />
            </Box>
        </Box>;
    }

    const mapCopyright = () => {
        return <Box hidden={!collection?.manifests().some((manifest) => manifest.navPlace())}>
            <ManifestMapCopyright />
        </Box>;
    }

    return (
        <>
            <Box hidden={!collection?.manifests().some((manifest) => manifest.navPlace()) || !showMap}>
                <div className="row">
                    <ManifestMapContainer manifests={filteredManifests} focus={focusManifest}/>
                </div>
            </Box>
            { displayControls() }
            <UVDialog manifest={viewerManifest} handleClose={onViewerClose} viewerPath={viewerPath}/>
            <Grid container mt={2} mr={2} ml={2} spacing={2} p={1} height="40vh" sx={{overflowY:"auto"}}>
            {filteredManifests.map( (manifest, idx)  => (
                <Grid item xs={4} sm={3} m={2} lg={2} key={manifest.uri}>
                    <ManifestCard
                        manifest={manifest}
                        onSelect={onSelectFocusManifest}
                        isSelected={manifest === focusManifest}
                        onShowInViewer={setViewerManifest} />
                </Grid>
            ))}
            </Grid>
            { mapCopyright() }
        </>
    );

}

export default CollectionMap;