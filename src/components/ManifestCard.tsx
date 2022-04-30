import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {Manifest} from "../iiif/Manifest";
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type ManifestCardProps = {
    manifest: Manifest
}

const ManifestCard = ({manifest}: ManifestCardProps) =>
    <Card variant="outlined"
          raised={true}
    >
        <CardMedia
            component="img"
            image={manifest?.thumb(200)}
            alt={manifest.label()}
            height={150}
            key={manifest.uri}
        />
        <CardContent>
            <Typography
                variant="caption"
                component="h2"
                display="-webkit-box"
                overflow="hidden"
                height={60}
                sx={{"-webkit-line-clamp":3}}
                mb={2}
                >{manifest.label()}</Typography>
            { (manifest.navDateYear()) ?
                <div>
                 <CalendarMonthIcon sx={{float:"left"}} />
                 <Typography variant="caption" display="inline" gutterBottom>{manifest.navDateYear()}</Typography>
                </div>
                :
                <div>
                    <CalendarMonthIcon color="disabled" sx={{float:"left", opacity: '50%'}} />
                </div>
            }
            <Box sx={{clear:"left"}}>
                { (manifest.navPlace()) ? <MapIcon/> : <MapIcon color="disabled" sx={{opacity: '50%'}} /> }
            </Box>
        </CardContent>
    </Card>;

export default ManifestCard;