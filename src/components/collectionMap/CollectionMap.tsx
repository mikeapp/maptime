import {Collection} from "../../iiif/Collection";
import React, {useEffect, useState} from "react";
import {Manifest} from "../../iiif/Manifest";
import {AppBar, Box, Checkbox, Toolbar, Typography} from "@mui/material";
import LeafletMapContainer from "../map/LeafletMapContainer";
import DateRangeSlider from "../dateRange/DateRangeSlider";
import UVDialog from "../mirador/UVDialog";
import ManifestCard from "../ManifestCard";
import MapCopyright from "../map/MapCopyright";

type CollectionMapProperties = {
    collection: Collection;
}

const CollectionMap = ({collection}: CollectionMapProperties) => {
    const [filterByDate, setFilterByDate] = useState(false);

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

    return (
        <>
            <Box hidden={!collection?.manifests().some((manifest) => manifest.navPlace())}>
                <div className="row">
                    <LeafletMapContainer manifests={filteredManifests} focus={focusManifest}/>
                </div>
            </Box>
            <Box hidden={!collection?.manifests().some((manifest) => manifest.navDateYear())} pt={2}>
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

export default CollectionMap;