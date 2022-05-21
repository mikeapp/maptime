import React, {useEffect, useState} from "react";
import {Manifest, Collection} from "../index";
import {Box, Grid, Button} from "@mui/material";
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

export function CollectionMap({collection, viewerPath}: CollectionMapProperties) {
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
        return <Box pt={4} pb={3} bgcolor="white" hidden={collectionHasNoNavDate(collection) && collectionHasNoNavPlace(collection)}>
            <Box ml={7} component="span">
                <Button
                    hidden={ collectionHasNoNavPlace(collection) }
                    size="small"
                    variant={showMap? "contained" : "outlined"}
                    onClick={(e:any) => setShowMap(!showMap)}
                    startIcon={<MapIcon />}>
                    {showMap? "Hide map" : "Show map"}
                </Button>
            </Box>
            <Box ml={2} component="span" hidden={collectionHasNoNavDate(collection)}>
                <Button
                    size="small"
                    variant={filterByDate? "contained" : "outlined"}
                    onClick={(e:any) => setFilterByDate(!filterByDate)}
                    startIcon={<CalendarMonthIcon />}>
                    {filterByDate? "Remove date limit" : "Limit by date range"}
                </Button>
            </Box>
            <Box ml={4} component="span" width={4} hidden={collectionHasNoNavDate(collection)}>
                <DateRangeSlider collection={collection} disabled={!filterByDate} dateRange={dateRange} setDateRange={setDateRange} />
            </Box>
        </Box>;
    }

    const mapCopyright = () => {
        return <Box hidden={!collection?.manifests().some((manifest) => manifest.navPlace())}>
            <ManifestMapCopyright />
        </Box>;
    }

    const collectionHasNoNavPlace = (collection: Collection) => {
        return !collection?.manifests().some((manifest) => manifest.navPlace());
    }

    const collectionHasNoNavDate = (collection: Collection) => {
        return !collection?.manifests().some((manifest) => manifest.navDateYear());
    }

    return (
        <>
            <Box sx={{position:"sticky", top:0, zIndex: 5}}>
                    <Box className="row" hidden={ collectionHasNoNavPlace(collection) || !showMap }>
                        <ManifestMapContainer manifests={filteredManifests} focus={focusManifest}/>
                    </Box>
                { displayControls() }
            </Box>

            <UVDialog manifest={viewerManifest} handleClose={onViewerClose} viewerPath={viewerPath}/>
            <Grid container mt={0} mr={2} ml={2} spacing={2} p={1}  sx={{overflowY:"auto"}}>
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