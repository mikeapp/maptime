import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {Manifest} from "../iiif/Manifest";

type ManifestCardProps = {
    manifest: Manifest
}

const ManifestCard = ({manifest}: ManifestCardProps) => <Card variant="outlined">
        <CardMedia
            component="img"
            image={manifest?.thumb(800)}
            alt={manifest.label()}
            height={200}
        />
        <CardContent>
            <Typography variant="body1" component="h2" display="block" gutterBottom>{manifest.label()}</Typography>
            <Typography variant="caption" display="block" gutterBottom>{manifest.navDate()?.getUTCFullYear() || "no date"}</Typography>
        </CardContent>
    </Card>;

export default ManifestCard;